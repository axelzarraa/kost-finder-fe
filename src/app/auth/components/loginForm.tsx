"use client";

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useLogin } from '../services/auth.service';
import { LoginCredentials } from '../types/auth.type';
import { loginSchema } from '../validation/auth.validation';
import Button from '@/components/atom/button';
import { showError, showSuccess } from '@/hooks/useToast';

const LoginForm = () => {
    const router = useRouter();
    const { control, handleSubmit } = useForm<LoginCredentials>({
        resolver: yupResolver(loginSchema),
    });
    const loginMutation = useLogin();

    const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
        try {
            const response = await loginMutation.mutateAsync(data);
            localStorage.setItem('token', response.token);
            showSuccess('Login successful!');
            router.push('/society/kos');
        } catch (error) {
            console.error('Login failed:', error);
            showError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
                    <p className="text-gray-600">Welcome back! Please sign in to your account.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: "Email is required" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <input
                                        {...field}
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                                        placeholder="Enter your email"
                                    />
                                    {fieldState?.error && (
                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <input
                                        {...field}
                                        type="password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                                        placeholder="Enter your password"
                                    />
                                    {fieldState?.error && (
                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loginMutation.isPending}
                            className="w-full"
                        >
                            {loginMutation.isPending ? 'Logging in...' : 'Login'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;