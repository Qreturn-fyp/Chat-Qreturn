"use client";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NavBar from '@/component/Nav/NavBar';

export default function Dashboard() {
    const { user, logout, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/pages/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-200 mb-8">Dashboard</h1>
                    
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold text-gray-200 mb-4">Welcome, {user?.username}!</h2>
                        <div className="space-y-2 text-gray-300">
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Status:</strong> {user?.isOnline ? 'Online' : 'Offline'}</p>
                            <p><strong>Last Seen:</strong> {user?.lastSeen ? new Date(user.lastSeen).toLocaleString() : 'Never'}</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={logout}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => router.push('/pages/login')}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
