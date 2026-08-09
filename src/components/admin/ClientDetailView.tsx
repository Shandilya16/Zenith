
import React, { useState } from 'react';
import { ClientProfile } from '../../types';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useData } from '../../context/DataContext';
import SharedCalendar from './SharedCalendar';
import RemarksSection from './RemarksSection';
import DoubtSection from './DoubtSection';

interface ClientDetailViewProps {
    client: ClientProfile;
}

const formatDateForInput = (isoDate: string) => {
    return isoDate.split('T')[0];
};

export const ClientDetailView: React.FC<ClientDetailViewProps> = ({ client }) => {
    const { updateRenewalDate } = useData();
    const [renewalDate, setRenewalDate] = useState(formatDateForInput(client.renewalDate));

    const handleUpdateRenewal = () => {
        const newIsoDate = new Date(renewalDate).toISOString();
        updateRenewalDate(client.id, newIsoDate);
        alert('Renewal date updated!');
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-text-primary">{client.name}</h1>
                <p className="text-text-secondary">{client.email}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <SharedCalendar client={client} />
                    <RemarksSection client={client} />
                </div>

                <div className="space-y-6">
                    <Card>
                        <h3 className="text-xl font-semibold mb-3 text-text-primary">Renewal Date</h3>
                        <div className="flex items-end gap-2">
                            <Input
                                id="renewalDate"
                                type="date"
                                label="Next Renewal"
                                value={renewalDate}
                                onChange={(e) => setRenewalDate(e.target.value)}
                            />
                            <Button onClick={handleUpdateRenewal}>Set</Button>
                        </div>
                    </Card>
                    <DoubtSection client={client} />
                </div>
            </div>
        </div>
    );
};
