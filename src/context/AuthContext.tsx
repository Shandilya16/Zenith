
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';
import { useData } from './DataContext';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string) => Promise<User | null>;
    logout: () => void;
    signup: (name: string, email: string, role: Role, instructorCode?: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const dataContext = useData();

    useEffect(() => {
        // Simulate checking for a logged-in user in localStorage
        const storedUser = localStorage.getItem('zenith-user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);
    
    const login = async (email: string): Promise<User | null> => {
        const user = dataContext.findUserByEmail(email);
        if (user) {
            setCurrentUser(user);
            localStorage.setItem('zenith-user', JSON.stringify(user));
        }
        return user;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('zenith-user');
    };
    
    const signup = async (name: string, email: string, role: Role, instructorCode?: string): Promise<User | null> => {
        const existingUser = dataContext.findUserByEmail(email);
        if (existingUser) {
            alert("User with this email already exists.");
            return null;
        }

        if (role === Role.CLIENT && !instructorCode) {
            alert("Instructor code is required for client sign up.");
            return null;
        }

        const newUser = dataContext.createUser(name, email, role, instructorCode);
        if(newUser) {
            setCurrentUser(newUser);
            localStorage.setItem('zenith-user', JSON.stringify(newUser));
        } else {
            alert("Invalid instructor code.");
        }
        return newUser;
    };

    const value = { currentUser, loading, login, logout, signup };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
