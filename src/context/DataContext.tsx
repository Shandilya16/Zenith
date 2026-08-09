
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, ClientProfile, Session, Remark, Doubt, Role } from '../types';
import { MOCK_USERS, MOCK_SESSIONS, MOCK_REMARKS, MOCK_DOUBTS } from '../constants';

// Utility to get days from now
const getFutureDate = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
};

const MOCK_CLIENT_PROFILES: ClientProfile[] = (MOCK_USERS.filter(u => u.role === Role.CLIENT) as User[]).map((user, index) => ({
    ...user,
    renewalDate: getFutureDate((index + 1) * 10),
}));


interface DataContextType {
    users: User[];
    clients: ClientProfile[];
    sessions: Session[];
    remarks: Remark[];
    doubts: Doubt[];
    findUserByEmail: (email: string) => User | undefined;
    getClientsForAdmin: (adminId: string) => ClientProfile[];
    getSessionsForClient: (clientId: string) => Session[];
    getRemarksForClient: (clientId: string) => Remark[];
    getDoubtsForClient: (clientId: string) => Doubt[];
    addSession: (session: Omit<Session, 'id'>) => void;
    addRemark: (remark: Omit<Remark, 'id' | 'timestamp'>) => void;
    addDoubt: (doubt: Omit<Doubt, 'id'| 'timestamp'>) => void;
    updateRenewalDate: (clientId: string, date: string) => void;
    createUser: (name: string, email: string, role: Role, instructorCode?: string) => User | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [clients, setClients] = useState<ClientProfile[]>(MOCK_CLIENT_PROFILES);
    const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
    const [remarks, setRemarks] = useState<Remark[]>(MOCK_REMARKS);
    const [doubts, setDoubts] = useState<Doubt[]>(MOCK_DOUBTS);

    const findUserByEmail = (email: string) => users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    const getClientsForAdmin = (adminId: string) => clients.filter(c => c.linkedInstructorId === adminId);

    const getSessionsForClient = (clientId: string) => sessions.filter(s => s.clientId === clientId).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const getRemarksForClient = (clientId: string) => remarks.filter(r => r.clientId === clientId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const getDoubtsForClient = (clientId: string) => doubts.filter(d => d.clientId === clientId).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const addSession = (session: Omit<Session, 'id'>) => {
        const newSession: Session = { ...session, id: `session-${Date.now()}` };
        setSessions(prev => [...prev, newSession]);
    };

    const addRemark = (remark: Omit<Remark, 'id' | 'timestamp'>) => {
        const newRemark: Remark = { ...remark, id: `remark-${Date.now()}`, timestamp: new Date().toISOString() };
        setRemarks(prev => [...prev, newRemark]);
    };
    
    const addDoubt = (doubt: Omit<Doubt, 'id' | 'timestamp'>) => {
        const newDoubt: Doubt = { ...doubt, id: `doubt-${Date.now()}`, timestamp: new Date().toISOString() };
        setDoubts(prev => [...prev, newDoubt]);
    };

    const updateRenewalDate = (clientId: string, date: string) => {
        setClients(prev => prev.map(c => c.id === clientId ? { ...c, renewalDate: date } : c));
    };
    
    const createUser = (name: string, email: string, role: Role, instructorCode?: string): User | null => {
        let newUser: User;
        if (role === Role.ADMIN) {
            newUser = {
                id: `user-${Date.now()}`,
                name,
                email,
                role,
                instructorCode: `ZENITH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
            };
        } else {
            const admin = users.find(u => u.role === Role.ADMIN && u.instructorCode === instructorCode);
            if (!admin) return null;
            newUser = {
                id: `user-${Date.now()}`,
                name,
                email,
                role,
                linkedInstructorId: admin.id,
            };
            const newClientProfile: ClientProfile = {
                ...newUser,
                renewalDate: getFutureDate(30),
            };
            setClients(prev => [...prev, newClientProfile]);
        }
        setUsers(prev => [...prev, newUser]);
        return newUser;
    };


    const value = {
        users, clients, sessions, remarks, doubts,
        findUserByEmail, getClientsForAdmin, getSessionsForClient,
        getRemarksForClient, getDoubtsForClient, addSession,
        addRemark, addDoubt, updateRenewalDate, createUser
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
