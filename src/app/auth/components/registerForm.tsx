"use client";

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useRegister } from '../services/auth.service';
import { RegisterCredentials } from '../types/auth.type';
import { registerSchema } from '../validation/auth.validation';

const RegisterForm = () => {
    const router = useRouter();
    const { control, handleSubmit } = useForm<RegisterCredentials>({
        resolver: yupResolver(registerSchema),
    });
    const registerMutation = useRegister();

    const onSubmit: SubmitHandler<RegisterCredentials> = async (data) => {
        try {
            await registerMutation.mutateAsync(data);
            alert('Registration successful! Please login.');
            router.push('/login'); // Adjust route as needed
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name</label>
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <input {...field} type="text" id="name" />
                            {fieldState?.error && <p>{fieldState.error.message}</p>}
                        </>
                    )}
                />
            </div>
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
            <div>
                <label htmlFor="phone">Phone</label>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <input {...field} type="text" id="phone" />
                            {fieldState?.error && <p>{fieldState.error.message}</p>}
                        </>
                    )}
                />
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <Controller
                    name="role"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <select {...field} id="role">
                                <option value="">Select role</option>
                                <option value="society">Society</option>
                                <option value="owner">Owner</option>
                            </select>
                            {fieldState?.error && <p>{fieldState.error.message}</p>}
                        </>
                    )}
                />
            </div>
            <button type="submit" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default RegisterForm;