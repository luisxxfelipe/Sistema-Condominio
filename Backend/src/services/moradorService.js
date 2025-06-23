const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const moradorService = {
    async getAll() {
        return await prisma.morador.findMany();
    },

    async getById(id) {
        return await prisma.morador.findUnique({
            where: { id: parseInt(id) }
        });
    },

    async create(data) {
        return await prisma.morador.create({data});
    },

    async update(id, data) {
        return await prisma.morador.update({
            where: { id: parseInt(id) },
            data
        });
    },

    async delete(id) {
        return await prisma.morador.delete({
            where: { id: parseInt(id) }
        });
    } 
};

module.exports = moradorService;