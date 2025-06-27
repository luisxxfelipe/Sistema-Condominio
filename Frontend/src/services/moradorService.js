import api from "./api";

const getMoradores = async () => {
    const response = await api.get('/moradores');
    return response.data;
}

const getMoradorById = async (id) => {
    const response = await api.get(`/moradores/${id}`);
    return response.data;
}

const createMorador = async (morador) => {
    const response = await api.post('/moradores', morador);
    return response.data;
}

const updateMorador = async (id, morador) => {
    const response = await api.put(`/moradores/${id}`, morador);
    return response.data;
}

const deleteMorador = async (id) => {
    const response = await api.delete(`/moradores/${id}`);
    return response.data;
}

export {
    getMoradores,
    getMoradorById,
    createMorador,
    updateMorador,
    deleteMorador
};

export default {
    getAll: getMoradores,
    getById: getMoradorById,
    create: createMorador,
    update: updateMorador,
    delete: deleteMorador
};