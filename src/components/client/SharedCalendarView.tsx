
import React from 'react';
import { ClientProfile } from '../../types';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';

const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
};

const SharedCalendarView: React.FC<{ client: ClientProfile }> = ({ client }) => {
    const { getSessionsForClient } = useData();
    const sessions = getSessionsForClient(client.id).filter(s => new Date(s.date) >= new Date());

    return (
        <Card>
            <h3 className="text-xl font-semibold mb-4 text-text-primary">Upcoming Sessions</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {sessions.length > 0 ? sessions.map(session => (
                    <div key={session.id} className="bg-secondary p-3 rounded-md">
                        <p className="font-semibold text-text-primary">{session.title}</p>
                        <p className="text-sm text-text-secondary">{formatDate(session.date)}</p>
                    </div>
                )) : (
                    <p className="text-text-secondary">You have no upcoming sessions scheduled.</p>
                )}
            </div>
        </Card>
    );
};

export default SharedCalendarView;
