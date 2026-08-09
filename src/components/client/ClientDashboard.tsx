
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ClientProfile } from '../../types';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import RenewalNotification from './RenewalNotification';
import SharedCalendarView from './SharedCalendarView';
import RemarksView from './RemarksView';
import DoubtSectionView from './DoubtSectionView';

const ClientDashboard: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const { clients } = useData();

    if (!currentUser) return null;

    const clientProfile = clients.find(c => c.id === currentUser.id) as ClientProfile;

    if (!clientProfile) {
        return (
            <div className="p-4 text-center">
                <p>Error: Could not load client profile.</p>
                <Button onClick={logout} className="mt-4">Logout</Button>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-background text-text-primary p-4 md:p-8">
            <header className="max-w-4xl mx-auto flex justify-between items-center mb-8">
                <Logo />
                <div className="text-right">
                    <p className="font-semibold text-text-primary">{currentUser.name}</p>
                    <button onClick={logout} className="text-sm text-primary hover:underline">Logout</button>
                </div>
            </header>
            
            <main className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Your Dashboard</h1>
                <RenewalNotification client={clientProfile} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SharedCalendarView client={clientProfile} />
                    <RemarksView client={clientProfile} />
                </div>
                
                <DoubtSectionView client={clientProfile} />
            </main>
        </div>
    );
};

export default ClientDashboard;
