import api from "./api";

const getVisitantes = async () => {
    const response = await api.get('/visitantes');
    return response.data;
}

const getVisitanteById = async (id) => {
    const response = await api.get(`/visitantes/${id}`);
    return response.data;
}

const createVisitante = async (visitante) => {
    const response = await api.post('/visitantes', visitante);
    return response.data;
}

const updateVisitante = async (id, visitante) => {
    const response = await api.put(`/visitantes/${id}`, visitante);
    return response.data;
}

const deleteVisitante = async (id) => {
    const response = await api.delete(`/visitantes/${id}`);
    return response.data;
}

export {
    getVisitantes,
    getVisitanteById,
    createVisitante,
    updateVisitante,
    deleteVisitante
};

export default {
    getAll: getVisitantes,
    getById: getVisitanteById,
    create: createVisitante,
    update: updateVisitante,
    delete: deleteVisitante
};