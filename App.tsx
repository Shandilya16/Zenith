
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import AuthForm from './components/auth/AuthForm';
import AdminDashboard from './components/admin/AdminDashboard';
import ClientDashboard from './components/client/ClientDashboard';
import { Logo } from './components/common/Logo';

const AppContent: React.FC = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">
                <Logo />
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-background text-text-primary font-sans">
            {currentUser ? (
                currentUser.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />
            ) : (
                <AuthForm />
            )}
        </div>
    );
};


const App: React.FC = () => {
  return (
    <DataProvider>
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    </DataProvider>
  );
}

export default App;
