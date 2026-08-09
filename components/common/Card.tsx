
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-card border border-border rounded-lg shadow-lg p-4 md:p-6 ${className}`}>
            {children}
        </div>
    );
};
