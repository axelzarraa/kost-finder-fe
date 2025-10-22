"use client";

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useLogin } from '../services/auth.service';
import { LoginCredentials } from '../types/auth.type';
import { loginSchema } from '../validation/auth.validation';

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
            router.push('/kos');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email</label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <input {...field} type="email" id="email" />
                            {fieldState?.error && <p>{fieldState.error.message}</p>}
                        </>
                    )}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <input {...field} type="password" id="password" />
                            {fieldState?.error && <p>{fieldState.error.message}</p>}
                        </>
                    )}
                />
            </div>
            <button type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;