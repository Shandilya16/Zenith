
import React, { useState } from 'react';
import { ClientProfile, Session } from '../../types';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface SharedCalendarProps {
    client: ClientProfile;
}

const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const SharedCalendar: React.FC<SharedCalendarProps> = ({ client }) => {
    const { getSessionsForClient, addSession } = useData();
    const sessions = getSessionsForClient(client.id);
    
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const handleAddSession = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && date) {
            const newSession: Omit<Session, 'id'> = {
                clientId: client.id,
                title,
                date: new Date(date).toISOString(),
            };
            addSession(newSession);
            setTitle('');
            setDate('');
        }
    };

    return (
        <Card>
            <h3 className="text-xl font-semibold mb-4 text-text-primary">Shared Calendar</h3>
            <form onSubmit={handleAddSession} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-2">
                     <Input id="sessionTitle" type="text" placeholder="Session Title (e.g., Leg Day)" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <Input id="sessionDate" type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
                <div className="md:col-span-3">
                    <Button type="submit" className="w-full md:w-auto">Add Session</Button>
                </div>
            </form>
            
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {sessions.length > 0 ? sessions.map(session => (
                    <div key={session.id} className="bg-secondary p-3 rounded-md">
                        <p className="font-semibold text-text-primary">{session.title}</p>
                        <p className="text-sm text-text-secondary">{formatDate(session.date)}</p>
                    </div>
                )) : (
                    <p className="text-text-secondary">No upcoming sessions.</p>
                )}
            </div>
        </Card>
    );
};

export default SharedCalendar;
