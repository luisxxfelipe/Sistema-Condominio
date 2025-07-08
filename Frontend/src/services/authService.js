import api from './api';

const login = async (login, senha) => {
    try {
        const response = await api.post('/auth/login', { login, senha });
        const { usuario } = response.data;

        localStorage.setItem('usuario', JSON.stringify(usuario));

        return usuario;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}

const logout = () => {
    localStorage.removeItem('usuario');
}

const getUsuarioLogado = () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
}

const getToken = () => {
    return null; // Removendo token por enquanto
}

const authService = {
    login,
    logout,
    getUsuarioLogado,
    getToken
};

export default authService;