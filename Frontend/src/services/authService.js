import api from './api';

const login = async (login, senha) => {
    try {
        const response = await api.post('/auth/login', { login, senha });
        const {token, usuario} = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        return usuario;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
}

const getUsuarioLogado = () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
}

const getToken = () => {
    return localStorage.getItem('token');
}

const authService = {
    login,
    logout,
    getUsuarioLogado,
    getToken
};

export default authService;