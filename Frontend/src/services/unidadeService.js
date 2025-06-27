import api from "./api";

const getUnidades = async () => {
    const response = await api.get('/unidades');
    return response.data;
}

const getUnidadeById = async (id) => {
    const response = await api.get(`/unidades/${id}`);
    return response.data;
}

const createUnidade = async (unidade) => {
    const response = await api.post('/unidades/criar', unidade);
    return response.data;
}

const updateUnidade = async (id, unidade) => {
    const response = await api.put(`/unidades/atualizar/${id}`, unidade);
    return response.data;
}

const deleteUnidade = async (id) => {
    const response = await api.delete(`/unidades/excluir/${id}`);
    return response.data;
}

export {
    getUnidades,
    getUnidadeById,
    createUnidade,
    updateUnidade,
    deleteUnidade
};

export default {
    getAll: getUnidades,
    getById: getUnidadeById,
    create: createUnidade,
    update: updateUnidade,
    delete: deleteUnidade
};