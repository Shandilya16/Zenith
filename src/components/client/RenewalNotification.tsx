
import React from 'react';
import { ClientProfile } from '../../types';
import { Card } from '../common/Card';

const RenewalNotification: React.FC<{ client: ClientProfile }> = ({ client }) => {
    const renewalDate = new Date(client.renewalDate);
    const today = new Date();
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let message;
    let style;

    if (diffDays <= 0) {
        message = `Your plan has expired. Please contact your instructor for renewal.`;
        style = 'bg-warning/20 border-warning text-warning';
    } else if (diffDays <= 7) {
        message = `Your plan renews in ${diffDays} day(s) on ${renewalDate.toLocaleDateString()}.`;
        style = 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
    } else {
        message = `Your next renewal date is ${renewalDate.toLocaleDateString()}.`;
        style = 'bg-primary/20 border-primary text-primary';
    }

    return (
        <div className={`p-4 rounded-lg border ${style}`}>
            <p className="font-semibold">{message}</p>
        </div>
    );
};

export default RenewalNotification;
