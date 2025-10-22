import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { PREFIX_KEY } from "@/lib/constant";
import { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse } from "../types/auth.type";

const PRIMARY_QUERY_KEY = "AUTH";

export const useLogin = () => {
    return useMutation<LoginResponse, Error, LoginCredentials>({
        mutationKey: [PRIMARY_QUERY_KEY, PREFIX_KEY.POST, "LOGIN"],
        mutationFn: async (credentials: LoginCredentials) => {
            const response =  await axiosInstance.post<LoginResponse>('/login', credentials);
            return response.data;
        },
    });
}

export const useRegister = () => {
    return useMutation<RegisterResponse, Error, RegisterCredentials>({
        mutationKey: [PRIMARY_QUERY_KEY, PREFIX_KEY.POST, "REGISTER"],
        mutationFn: async (credentials: RegisterCredentials) => {
            const response = await axiosInstance.post<RegisterResponse>('/register', credentials);
            return response.data;
        },
    });
}