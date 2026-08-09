
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
    return (
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1">{label}</label>}
            <input
                id={id}
                className="w-full bg-secondary border border-border text-text-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                {...props}
            />
        </div>
    );
};
