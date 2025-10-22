'use client';

import LoginForm from '../components/loginForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Login Kos Hunter</h2>
                <LoginForm />
            </div>
        </div>
    );
}