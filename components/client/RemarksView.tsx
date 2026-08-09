
import React from 'react';
import { ClientProfile } from '../../types';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';

const formatTimestamp = (isoString: string) => {
    return new Date(isoString).toLocaleDateString();
};

const RemarksView: React.FC<{ client: ClientProfile }> = ({ client }) => {
    const { getRemarksForClient } = useData();
    const remarks = getRemarksForClient(client.id);

    return (
        <Card>
            <h3 className="text-xl font-semibold mb-4 text-text-primary">Trainer's Remarks</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {remarks.length > 0 ? remarks.map(remark => (
                    <div key={remark.id} className="bg-secondary p-3 rounded-md">
                        <p className="text-text-primary">"{remark.text}"</p>
                        <p className="text-xs text-text-secondary text-right mt-1">- {formatTimestamp(remark.timestamp)}</p>
                    </div>
                )) : (
                    <p className="text-text-secondary">No remarks from your trainer yet.</p>
                )}
            </div>
        </Card>
    );
};

export default RemarksView;
