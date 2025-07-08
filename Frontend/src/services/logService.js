import api from "./api";

const getLogs = async () => {
    const response = await api.get('/logs');
    return response.data;
}

const getLogById = async (id) => {
    const response = await api.get(`/logs/${id}`);
    return response.data;
}

const createLog = async (log) => {
    const response = await api.post('/logs', log);
    return response.data;
}

const deleteLog = async (id) => {
    const response = await api.delete(`/logs/${id}`);
    return response.data;
}

const getLogsPorUsuario = async (usuarioId) => {
    const response = await api.get(`/logs/usuario/${usuarioId}`);
    return response.data;
}

const getLogsPorTipo = async (tipo) => {
    const response = await api.get(`/logs/tipo/${tipo}`);
    return response.data;
}

export {
    getLogs,
    getLogById,
    createLog,
    deleteLog,
    getLogsPorUsuario,
    getLogsPorTipo
};

export default {
    getAll: getLogs,
    getAllLogs: getLogs,
    getById: getLogById,
    create: createLog,
    delete: deleteLog,
    getPorUsuario: getLogsPorUsuario,
    getPorTipo: getLogsPorTipo
};