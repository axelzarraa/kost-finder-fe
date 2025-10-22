import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        console.error("Error in request: ", error);
        return Promise.reject(error);
    }
);

// response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`Response from: ${response.config.url}`, response);
        return response;
    },
    (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
        console.error("Error in response: ", errorMessage);

        return Promise.reject({
            ...error,
            message: errorMessage,
            status: error.response?.status,
        });
    }
);

export default axiosInstance;