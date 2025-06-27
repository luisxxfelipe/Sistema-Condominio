import api from "./api";

const getReservas = async () => {
    const response = await api.get('/reservas');
    return response.data;
}

const getReservaById = async (id) => {
    const response = await api.get(`/reservas/${id}`);
    return response.data;
}

const createReserva = async (reserva) => {
    const response = await api.post('/reservas', reserva);
    return response.data;
}

const updateReserva = async (id, reserva) => {
    const response = await api.put(`/reservas/${id}`, reserva);
    return response.data;
}

const deleteReserva = async (id) => {
    const response = await api.delete(`/reservas/${id}`);
    return response.data;
}

export {
    getReservas,
    getReservaById,
    createReserva,
    updateReserva,
    deleteReserva
};

export default {
    getAll: getReservas,
    getById: getReservaById,
    create: createReserva,
    update: updateReserva,
    delete: deleteReserva
};