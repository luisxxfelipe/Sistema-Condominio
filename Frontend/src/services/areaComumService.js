import api from "./api";

const getAreasComuns = async () => {
    const response = await api.get('/areas-comuns');
    return response.data;
}

const getAreaComumById = async (id) => {
    const response = await api.get(`/areas-comuns/${id}`);
    return response.data;
}

const createAreaComum = async (area) => {
    const response = await api.post('/areas-comuns', area);
    return response.data;
}

const updateAreaComum = async (id, area) => {
    const response = await api.put(`/areas-comuns/${id}`, area);
    return response.data;
}

const deleteAreaComum = async (id) => {
    const response = await api.delete(`/areas-comuns/${id}`);
    return response.data;
}

export {
    getAreasComuns,
    getAreaComumById,
    createAreaComum,
    updateAreaComum,
    deleteAreaComum
}

const areaComumService = {
    getAll: getAreasComuns,
    getById: getAreaComumById,
    create: createAreaComum,
    update: updateAreaComum,
    delete: deleteAreaComum
}

export default areaComumService;
