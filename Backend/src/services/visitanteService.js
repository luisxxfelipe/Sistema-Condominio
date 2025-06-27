const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const visitanteService = {
    async getAll() {
        return await prisma.visitante.findMany({
            include: {
                unidade: true
            },
            orderBy: {
                dataVisita: 'desc'
            }
        });
    },

    async getById(id) {
        return await prisma.visitante.findUnique({
            where: { id: parseInt(id) },
            include: {
                unidade: true
            }
        });
    },

    async getByUnidade(unidadeId) {
        return await prisma.visitante.findMany({
            where: { unidadeId: parseInt(unidadeId) },
            include: {
                unidade: true
            },
            orderBy: {
                dataVisita: 'desc'
            }
        });
    },

    async create(data) {
        return await prisma.visitante.create({
            data: {
                nome: data.nome,
                documento: data.documento,
                dataVisita: new Date(data.dataVisita),
                unidadeId: parseInt(data.unidadeId)
            },
            include: {
                unidade: true
            }
        });
    },

    async update(id, data) {
        return await prisma.visitante.update({
            where: { id: parseInt(id) },
            data: {
                nome: data.nome,
                documento: data.documento,
                dataVisita: data.dataVisita ? new Date(data.dataVisita) : undefined,
                unidadeId: data.unidadeId ? parseInt(data.unidadeId) : undefined
            },
            include: {
                unidade: true
            }
        });
    },

    async delete(id) {
        return await prisma.visitante.delete({
            where: { id: parseInt(id) }
        });
    }
};

module.exports = visitanteService;
