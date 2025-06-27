import api from "./api";

const getBoletos = async () => {
    const response = await api.get('/boletos');
    return response.data;
}

const getBoletoById = async (id) => {
    const response = await api.get(`/boletos/${id}`);
    return response.data;
}

const createBoleto = async (boleto) => {
    const response = await api.post('/boletos', boleto);
    return response.data;
}

const updateBoleto = async (id, boleto) => {
    const response = await api.put(`/boletos/${id}`, boleto);
    return response.data;
}

const deleteBoleto = async (id) => {
    const response = await api.delete(`/boletos/${id}`);
    return response.data;
}

const pagarBoleto = async (id) => {
    const response = await api.patch(`/boletos/${id}/pagar`);
    return response.data;
}

export {
    getBoletos,
    getBoletoById,
    createBoleto,
    updateBoleto,
    deleteBoleto,
    pagarBoleto
};

export default {
    getAll: getBoletos,
    getById: getBoletoById,
    create: createBoleto,
    update: updateBoleto,
    delete: deleteBoleto,
    pagar: pagarBoleto
};