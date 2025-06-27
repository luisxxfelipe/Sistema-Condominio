const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const avisoService = {
    async getAll() {
        return await prisma.aviso.findMany({
            orderBy: {
                dataCriacao: 'desc'
            }
        });
    },

    async getById(id) {
        return await prisma.aviso.findUnique({
            where: { id: parseInt(id) }
        });
    },

    async getRecentes(limite = 10) {
        return await prisma.aviso.findMany({
            take: limite,
            orderBy: {
                dataCriacao: 'desc'
            }
        });
    },

    async create(data) {
        return await prisma.aviso.create({
            data: {
                titulo: data.titulo,
                descricao: data.descricao,
                dataCriacao: new Date()
            }
        });
    },

    async update(id, data) {
        return await prisma.aviso.update({
            where: { id: parseInt(id) },
            data: {
                titulo: data.titulo,
                descricao: data.descricao
            }
        });
    },

    async delete(id) {
        return await prisma.aviso.delete({
            where: { id: parseInt(id) }
        });
    }
};

module.exports = avisoService;
