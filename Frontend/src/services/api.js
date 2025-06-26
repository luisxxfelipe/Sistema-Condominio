import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL
});

// Interceptor para adicionar o token de autenticação em todas as requisições

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor para tratar erros de autenticação

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // Redirecionar para a página de login ou tratar o erro de autenticação
        console.error('Erro de autenticação:', error);
    }
    return Promise.reject(error);
});

export default api;

