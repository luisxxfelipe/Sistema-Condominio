import api from './api';

const getUsuarios = async () => {
    const response = await api.get('/usuarios');
    return response.data;
}

const getUsuarioById = async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
}

const createUsuario = async (usuario) => {
    const response = await api.post('/usuarios/criar', usuario);
    return response.data;
}

const updateUsuario = async (id, usuario) => {
    const response = await api.put(`/usuarios/atualizar/${id}`, usuario);
    return response.data;
}

const deleteUsuario = async (id) => {
    const response = await api.delete(`/usuarios/excluir/${id}`);
    return response.data;
}

export {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};

export default {
    getAll: getUsuarios,
    getById: getUsuarioById,
    create: createUsuario,
    update: updateUsuario,
    delete: deleteUsuario
};
