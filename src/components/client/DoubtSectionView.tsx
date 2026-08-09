
import React, { useState, useRef, useEffect } from 'react';
import { ClientProfile, Doubt } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

const DoubtSectionView: React.FC<{ client: ClientProfile }> = ({ client }) => {
    const { currentUser } = useAuth();
    const { getDoubtsForClient, addDoubt } = useData();
    const doubts = getDoubtsForClient(client.id);
    const [newDoubt, setNewDoubt] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [doubts]);

    const handleAddDoubt = (e: React.FormEvent) => {
        e.preventDefault();
        if (newDoubt.trim() && currentUser) {
            const doubt: Omit<Doubt, 'id' | 'timestamp'> = {
                clientId: client.id,
                senderId: currentUser.id,
                text: newDoubt,
            };
            addDoubt(doubt);
            setNewDoubt('');
        }
    };

    return (
        <Card>
            <h3 className="text-xl font-semibold mb-4 text-text-primary">Ask Your Trainer</h3>
            <div className="h-80 overflow-y-auto space-y-4 pr-2 mb-4 bg-secondary p-4 rounded-md">
                {doubts.map(doubt => {
                    const isClient = doubt.senderId === currentUser?.id;
                    return (
                        <div key={doubt.id} className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${isClient ? 'bg-primary text-white' : 'bg-card-light text-text-primary'}`}>
                                <p>{doubt.text}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleAddDoubt} className="flex gap-2">
                <input
                    type="text"
                    value={newDoubt}
                    onChange={(e) => setNewDoubt(e.target.value)}
                    placeholder="Type your question here..."
                    className="flex-1 bg-secondary border border-border text-text-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit">Send</Button>
            </form>
        </Card>
    );
};

export default DoubtSectionView;
