
import React from 'react';
import { ClientProfile } from '../../types';

interface ClientListProps {
    clients: ClientProfile[];
    selectedClientId?: string | null;
    onSelectClient: (client: ClientProfile) => void;
}

export const ClientList: React.FC<ClientListProps> = ({ clients, selectedClientId, onSelectClient }) => {
    return (
        <nav className="flex-1 overflow-y-auto">
            <h3 className="text-lg font-semibold text-text-primary mb-3 px-2">Your Clients</h3>
            <ul className="space-y-1">
                {clients.map(client => (
                    <li key={client.id}>
                        <button
                            onClick={() => onSelectClient(client)}
                            className={`w-full text-left px-3 py-2.5 rounded-md transition-colors text-sm ${
                                selectedClientId === client.id 
                                ? 'bg-primary text-white font-semibold' 
                                : 'text-text-secondary hover:bg-secondary hover:text-text-primary'
                            }`}
                        >
                            {client.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
