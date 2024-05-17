import axios from 'axios';
import {windowParams} from '@/utils/Helper';
const {VITE_API_URL} = import.meta.env;

const instance = axios.create({
    baseURL:VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
instance.interceptors.request.use(
    (config) => {
        config.params = {...config.params, ...windowParams()};
        const token = sessionStorage.getItem('token');
        if (!token) {
            return config;
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error: any) => Promise.reject(error),
);

instance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if (error.response) {
            return Promise.reject({message: error.response.data.message});
        }
        if (error.request) {
            return Promise.reject({message: error.request.message});
        }
        return Promise.reject({message: error.message || 'Server error'});
    },
);

export default instance;
