const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const unidadeService = {
    async getAll() {
        return await prisma.unidade.findMany();
    },

    async getById(id) {
        return await prisma.unidade.findUnique({
            where: { id: parseInt(id) }
        });
    },

    async create(data) {
        return await prisma.unidade.create({data});
    },

    async update(id, data) {    
        return await prisma.unidade.update({
            where: { id: parseInt(id) },
            data
        });
    },

    async delete(id) {
        return await prisma.unidade.delete({
            where: { id: parseInt(id) }
        });
    }
};

module.exports = unidadeService;