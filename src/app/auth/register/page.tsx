"use client"

import RegisterForm from '../components/registerForm';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Register Kos Hunter</h2>
                <RegisterForm />
            </div>
        </div>
    );
}