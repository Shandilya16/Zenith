
export enum Role {
    ADMIN = 'admin',
    CLIENT = 'client',
}

export interface User {
    id: string;
    email: string;
    role: Role;
    name: string;
    instructorCode?: string; // For admins
    linkedInstructorId?: string; // For clients
}

export interface ClientProfile extends User {
    renewalDate: string; // ISO 8601 string
}

export interface Session {
    id: string;
    clientId: string;
    title: string;
    date: string; // ISO 8601 string
}

export interface Message {
    id: string;
    clientId: string;
    senderId: string; // 'admin' or client's user ID
    text: string;
    timestamp: string; // ISO 8601 string
}

export interface Remark extends Message {}
export interface Doubt extends Message {}
