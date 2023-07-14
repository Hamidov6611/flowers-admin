import axios from "axios";

const defaultOptions = {
    baseURL: "https://buketyana-admin.ru/api/base",
    headers: {
        'Content-Type': 'application/json',
    },
};

let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default axiosInstance;

export const url = "https://buketyana-admin.ru"