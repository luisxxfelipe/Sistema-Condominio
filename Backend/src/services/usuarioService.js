const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const usuarioService = {
    async getAll() {
        return await prisma.usuario.findMany();
    },

    async getById(id) {
        return await prisma.usuario.findUnique({
            where: { id: parseInt(id) }
        });
    },

    async create(data) {
        return await prisma.usuario.create({data});
    },

    async update(id, data) {    
        return await prisma.usuario.update({
            where: { id: parseInt(id) },
            data
        });
    },

    async delete(id) {
        return await prisma.usuario.delete({
            where: { id: parseInt(id) }
        });
    }
};

module.exports = usuarioService;