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
        return await prisma.usuario.create({
            data: {
                nome: data.nome,
                login: data.login,
                senhaHash: data.senhaHash,
                tipoPerfil: data.tipoPerfil
            }
        });
    },

    async update(id, data) {    
        // Filtrar apenas os campos que foram fornecidos
        const updateData = {};
        
        if (data.nome !== undefined) updateData.nome = data.nome;
        if (data.login !== undefined) updateData.login = data.login;
        if (data.senhaHash !== undefined) updateData.senhaHash = data.senhaHash;
        if (data.tipoPerfil !== undefined) updateData.tipoPerfil = data.tipoPerfil;
        
        return await prisma.usuario.update({
            where: { id: parseInt(id) },
            data: updateData
        });
    },

    async delete(id) {
        return await prisma.usuario.delete({
            where: { id: parseInt(id) }
        });
    }
};

module.exports = usuarioService;