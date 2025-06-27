const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const prestadorServicoService = {
    async getAll() {
        return await prisma.prestadorServico.findMany({
            orderBy: {
                entrada: 'desc'
            }
        });
    },

    async getById(id) {
        return await prisma.prestadorServico.findUnique({
            where: { id: parseInt(id) }
        });
    },

    async getAtivos() {
        return await prisma.prestadorServico.findMany({
            where: {
                saida: null
            },
            orderBy: {
                entrada: 'desc'
            }
        });
    },

    async create(data) {
        return await prisma.prestadorServico.create({
            data: {
                ...data,
                entrada: new Date(data.entrada),
                saida: data.saida ? new Date(data.saida) : null
            }
        });
    },

    async update(id, data) {
        return await prisma.prestadorServico.update({
            where: { id: parseInt(id) },
            data: {
                ...data,
                entrada: data.entrada ? new Date(data.entrada) : undefined,
                saida: data.saida ? new Date(data.saida) : undefined
            }
        });
    },

    async registrarSaida(id) {
        return await prisma.prestadorServico.update({
            where: { id: parseInt(id) },
            data: {
                saida: new Date()
            }
        });
    },

    async delete(id) {
        return await prisma.prestadorServico.delete({
            where: { id: parseInt(id) }
        });
    }
};

module.exports = prestadorServicoService;
