
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`flex items-center space-x-2 ${className}`}>
        <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
            />
        </svg>
        <h1 className="text-2xl font-bold tracking-tighter text-text-primary">
            ZENITH
        </h1>
    </div>
);
