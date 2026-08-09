
import React, { useState } from 'react';
import { ClientProfile, Remark } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

const formatTimestamp = (isoString: string) => {
    return new Date(isoString).toLocaleString();
};

const RemarksSection: React.FC<{ client: ClientProfile }> = ({ client }) => {
    const { currentUser } = useAuth();
    const { getRemarksForClient, addRemark } = useData();
    const remarks = getRemarksForClient(client.id);
    const [newRemark, setNewRemark] = useState('');

    const handleAddRemark = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRemark.trim() && currentUser) {
            const remark: Omit<Remark, 'id' | 'timestamp'> = {
                clientId: client.id,
                senderId: currentUser.id,
                text: newRemark,
            };
            addRemark(remark);
            setNewRemark('');
        }
    };

    return (
        <Card>
            <h3 className="text-xl font-semibold mb-4 text-text-primary">Private Remarks</h3>
            <form onSubmit={handleAddRemark} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newRemark}
                    onChange={(e) => setNewRemark(e.target.value)}
                    placeholder="Add a new remark for your client..."
                    className="flex-1 bg-secondary border border-border text-text-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit">Post</Button>
            </form>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {remarks.length > 0 ? remarks.map(remark => (
                     <div key={remark.id} className="bg-secondary p-3 rounded-md">
                        <p className="text-text-primary">{remark.text}</p>
                        <p className="text-xs text-text-secondary mt-1">{formatTimestamp(remark.timestamp)}</p>
                    </div>
                )) : (
                    <p className="text-text-secondary text-center py-4">No remarks yet.</p>
                )}
            </div>
        </Card>
    );
};

export default RemarksSection;
