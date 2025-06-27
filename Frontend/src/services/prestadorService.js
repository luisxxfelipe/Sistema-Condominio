import api from "./api";

const getPrestadores = async () => {
    const response = await api.get('/prestadores-servico');
    return response.data;
}

const getPrestadorById = async (id) => {
    const response = await api.get(`/prestadores-servico/${id}`);
    return response.data;
}

const createPrestador = async (prestador) => {
    const response = await api.post('/prestadores-servico', prestador);
    return response.data;
}

const updatePrestador = async (id, prestador) => {
    const response = await api.put(`/prestadores-servico/${id}`, prestador);
    return response.data;
}

const deletePrestador = async (id) => {
    const response = await api.delete(`/prestadores-servico/${id}`);
    return response.data;
}

export {
    getPrestadores,
    getPrestadorById,
    createPrestador,
    updatePrestador,
    deletePrestador
};

export default {
    getAll: getPrestadores,
    getById: getPrestadorById,
    create: createPrestador,
    update: updatePrestador,
    delete: deletePrestador
};