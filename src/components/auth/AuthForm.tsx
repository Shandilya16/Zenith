
import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { Logo } from '../common/Logo';

const AuthForm: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<Role>(Role.CLIENT);
    const [instructorCode, setInstructorCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const { login, signup } = useAuth();
    
    // Demo account credentials
    const demoAdminEmail = 'admin@zenith.com';
    const demoClientEmail = 'client1@test.com';

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const user = await login(email);
        if (!user) {
            setError('Invalid email. Please try again or sign up.');
        }
        setIsLoading(false);
    };

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const user = await signup(name, email, role, instructorCode);
        if (user) {
            setSignupSuccess(true);
        } else {
             setError('Signup failed. Please check your details.');
        }
        setIsLoading(false);
    };

    const handleDemoLogin = async (demoEmail: string) => {
        setIsLoading(true);
        setError('');
        await login(demoEmail);
        setIsLoading(false);
    };

    if(signupSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">Welcome to ZENITH!</h2>
                    <p className="text-text-secondary">Your account has been created. You are now being redirected to your dashboard.</p>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
            <Logo className="mb-8" />
            <Card className="w-full max-w-md">
                <div className="flex border-b border-border mb-6">
                    <button onClick={() => setIsLogin(true)} className={`w-1/2 py-3 font-semibold ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>Login</button>
                    <button onClick={() => setIsLogin(false)} className={`w-1/2 py-3 font-semibold ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-text-secondary'}`}>Sign Up</button>
                </div>
                
                {isLogin ? (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input id="email" type="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        {error && <p className="text-warning text-sm">{error}</p>}
                        <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</Button>
                        <div className="text-center text-text-secondary text-sm">Or use a demo account:</div>
                        <div className="flex gap-4">
                            <Button type="button" variant="secondary" onClick={() => handleDemoLogin(demoAdminEmail)} className="w-full">Demo Admin</Button>
                            <Button type="button" variant="secondary" onClick={() => handleDemoLogin(demoClientEmail)} className="w-full">Demo Client</Button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSignup} className="space-y-4">
                        <Input id="name" type="text" label="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                        <Input id="signup-email" type="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">I am a...</label>
                            <div className="flex gap-4">
                                <label className={`flex-1 p-3 border rounded-md cursor-pointer ${role === Role.CLIENT ? 'border-primary bg-secondary' : 'border-border'}`}>
                                    <input type="radio" name="role" value={Role.CLIENT} checked={role === Role.CLIENT} onChange={() => setRole(Role.CLIENT)} className="sr-only"/>
                                    Client
                                </label>
                                <label className={`flex-1 p-3 border rounded-md cursor-pointer ${role === Role.ADMIN ? 'border-primary bg-secondary' : 'border-border'}`}>
                                    <input type="radio" name="role" value={Role.ADMIN} checked={role === Role.ADMIN} onChange={() => setRole(Role.ADMIN)} className="sr-only"/>
                                    Instructor
                                </label>
                            </div>
                        </div>
                        {role === Role.CLIENT && (
                            <Input id="instructorCode" type="text" label="Instructor Code" value={instructorCode} onChange={e => setInstructorCode(e.target.value)} required />
                        )}
                        {error && <p className="text-warning text-sm">{error}</p>}
                        <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Signing up...' : 'Sign Up'}</Button>
                    </form>
                )}
            </Card>
        </div>
    );
};

export default AuthForm;
