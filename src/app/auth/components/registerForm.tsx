"use client";

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useRegister } from '../services/auth.service';
import { RegisterCredentials } from '../types/auth.type';
import { registerSchema } from '../validation/auth.validation';
import Button from '@/components/atom/button';
import { showError, showSuccess } from '@/hooks/useToast';

const RegisterForm = () => {
    const router = useRouter();
    const { control, handleSubmit } = useForm<RegisterCredentials>({
        resolver: yupResolver(registerSchema),
    });
    const registerMutation = useRegister();

    const onSubmit: SubmitHandler<RegisterCredentials> = async (data) => {
        try {
            await registerMutation.mutateAsync(data);
            showSuccess('Registration successful! Please login.');
            router.push('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            showError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Register</h1>
                    <p className="text-gray-600">Create your account to get started.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <input
                                        {...field}
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                                        placeholder="Enter your name"
                                    />
                                    {fieldState?.error && (
                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                    )}
                                </>
                            )}
                        />
                    </div>

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

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                        </label>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: "Phone is required" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <input
                                        {...field}
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                                        placeholder="Enter your phone number"
                                    />
                                    {fieldState?.error && (
                                        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: "Role is required" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <select
                                        {...field}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                                    >
                                        <option value="">Select role</option>
                                        <option value="society">Society</option>
                                        <option value="owner">Owner</option>
                                    </select>
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
                            loading={registerMutation.isPending}
                            className="w-full"
                        >
                            {registerMutation.isPending ? 'Registering...' : 'Register'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;