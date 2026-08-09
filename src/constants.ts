
import { User, Role, Session, Remark, Doubt } from './types';

// Utility to get days from now
const getDate = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
};

const adminId = 'admin-01';
const client1Id = 'client-01';
const client2Id = 'client-02';
const client3Id = 'client-03';

export const MOCK_USERS: User[] = [
    {
        id: adminId,
        email: 'admin@zenith.com',
        role: Role.ADMIN,
        name: 'John Instructor',
        instructorCode: 'FIT-DAD123'
    },
    {
        id: client1Id,
        email: 'client1@test.com',
        role: Role.CLIENT,
        name: 'Alice Smith',
        linkedInstructorId: adminId
    },
    {
        id: client2Id,
        email: 'client2@test.com',
        role: Role.CLIENT,
        name: 'Bob Johnson',
        linkedInstructorId: adminId
    },
    {
        id: client3Id,
        email: 'client3@test.com',
        role: Role.CLIENT,
        name: 'Charlie Brown',
        linkedInstructorId: adminId
    }
];

export const MOCK_SESSIONS: Session[] = [
    { id: 's1', clientId: client1Id, title: 'Leg Day', date: getDate(2) },
    { id: 's2', clientId: client1Id, title: 'Cardio & Core', date: getDate(4) },
    { id: 's3', clientId: client1Id, title: 'Upper Body', date: getDate(6) },
    { id: 's4', clientId: client2Id, title: 'Full Body HIIT', date: getDate(1) },
    { id: 's5', clientId: client2Id, title: 'Yoga & Stretch', date: getDate(5) },
    { id: 's6', clientId: client3Id, title: 'Strength Training', date: getDate(3) },
];

export const MOCK_REMARKS: Remark[] = [
    { id: 'r1', clientId: client1Id, senderId: adminId, text: 'Great form on the squats today. Keep it up!', timestamp: getDate(-1) },
    { id: 'r2', clientId: client1Id, senderId: adminId, text: 'Remember to focus on hydration this week.', timestamp: getDate(-3) },
    { id: 'r3', clientId: client2Id, senderId: adminId, text: 'Pushing through that plateau was impressive. Lets target 5 more pounds next week.', timestamp: getDate(0) },
];

export const MOCK_DOUBTS: Doubt[] = [
    { id: 'd1', clientId: client1Id, senderId: client1Id, text: 'Hey, I felt a slight twinge in my knee during lunges. Is that normal?', timestamp: getDate(-1) },
    { id: 'd2', clientId: client1Id, senderId: adminId, text: 'Thanks for letting me know. Let\'s check your form next session. For now, ice it for 15 minutes.', timestamp: getDate(0) },
    { id: 'd3', clientId: client1Id, senderId: client1Id, text: 'Will do, thanks!', timestamp: getDate(0) },
    { id: 'd4', clientId: client2Id, senderId: client2Id, text: 'Can I swap my Friday session to Saturday morning?', timestamp: getDate(0) },
];
