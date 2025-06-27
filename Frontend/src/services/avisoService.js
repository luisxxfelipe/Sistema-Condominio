import api from "./api";

const getAvisos = async () => {
    const response = await api.get('/avisos');
    return response.data;
}

const getAvisoById = async (id) => {
    const response = await api.get(`/avisos/${id}`);
    return response.data;
}

const createAviso = async (aviso) => {
    const response = await api.post('/avisos', aviso);
    return response.data;
}

const updateAviso = async (id, aviso) => {
    const response = await api.put(`/avisos/${id}`, aviso);
    return response.data;
}

const deleteAviso = async (id) => {
    const response = await api.delete(`/avisos/${id}`);
    return response.data;
}

export {
    getAvisos,
    getAvisoById,
    createAviso,
    updateAviso,
    deleteAviso
};

export default {
    getAll: getAvisos,
    getById: getAvisoById,
    create: createAviso,
    update: updateAviso,
    delete: deleteAviso
};