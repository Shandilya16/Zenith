
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ClientProfile } from '../../types';
import { ClientList } from './ClientList';
import { ClientDetailView } from './ClientDetailView';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';

const AdminDashboard: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const { getClientsForAdmin } = useData();
    const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (!currentUser) return null;

    const clients = getClientsForAdmin(currentUser.id);

    const handleSelectClient = (client: ClientProfile) => {
        setSelectedClient(client);
        setIsMenuOpen(false); // Close menu on selection in mobile view
    };

    return (
        <div className="flex h-screen bg-background text-text-primary">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex md:flex-col md:w-72 bg-card border-r border-border p-4">
                <header className="mb-6">
                    <Logo />
                    <div className="mt-4 text-text-secondary">
                        <p>Welcome, <span className="font-semibold text-text-primary">{currentUser.name}</span></p>
                        <p className="text-sm">Instructor Code: <span className="font-bold text-primary">{currentUser.instructorCode}</span></p>
                    </div>
                </header>
                <ClientList clients={clients} selectedClientId={selectedClient?.id} onSelectClient={handleSelectClient} />
                <Button onClick={logout} variant="secondary" className="mt-auto">Logout</Button>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 bg-card border-b border-border p-4 flex justify-between items-center z-20">
                <Logo />
                <div className="flex items-center gap-4">
                     <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </button>
                </div>
            </header>

            {/* Mobile Off-canvas Menu */}
            {isMenuOpen && (
                 <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsMenuOpen(false)}>
                    <aside className="fixed top-0 left-0 w-72 h-full bg-card p-4 flex flex-col transform transition-transform duration-300 ease-in-out" onClick={e => e.stopPropagation()}>
                        <header className="mb-6">
                             <div className="mt-4 text-text-secondary">
                                <p>Welcome, <span className="font-semibold text-text-primary">{currentUser.name}</span></p>
                                <p className="text-sm">Instructor Code: <span className="font-bold text-primary">{currentUser.instructorCode}</span></p>
                            </div>
                        </header>
                        <ClientList clients={clients} selectedClientId={selectedClient?.id} onSelectClient={handleSelectClient} />
                        <Button onClick={logout} variant="secondary" className="mt-auto">Logout</Button>
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto mt-16 md:mt-0">
                {selectedClient ? (
                    <ClientDetailView client={selectedClient} key={selectedClient.id} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <svg className="w-16 h-16 text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <h2 className="text-2xl font-bold text-text-primary">Welcome to your Dashboard</h2>
                        <p className="text-text-secondary mt-2">Select a client from the list to view their details and manage their schedule.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
