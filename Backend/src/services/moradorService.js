const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const moradorService = {
    async getAll() {
        return await prisma.morador.findMany({
            include: {
                unidade: true
            },
            orderBy: {
                nome: 'asc'
            }
        });
    },

    async getById(id) {
        return await prisma.morador.findUnique({
            where: { id: parseInt(id) },
            include: {
                unidade: true
            }
        });
    },

    async getByCpf(cpf) {
        return await prisma.morador.findUnique({
            where: { cpf },
            include: {
                unidade: true
            }
        });
    },

    async getByUnidade(unidadeId) {
        return await prisma.morador.findMany({
            where: { unidadeId: parseInt(unidadeId) },
            include: {
                unidade: true
            },
            orderBy: {
                nome: 'asc'
            }
        });
    },

    async create(data) {
        // Verificar se CPF já existe
        const cpfExistente = await this.getByCpf(data.cpf);
        if (cpfExistente) {
            throw new Error('CPF já cadastrado no sistema');
        }

        return await prisma.morador.create({
            data: {
                nome: data.nome,
                cpf: data.cpf,
                telefone: data.telefone,
                unidadeId: data.unidadeId ? parseInt(data.unidadeId) : null
            },
            include: {
                unidade: true
            }
        });
    },

    async update(id, data) {
        // Se estiver atualizando CPF, verificar se não existe
        if (data.cpf) {
            const cpfExistente = await prisma.morador.findFirst({
                where: { 
                    cpf: data.cpf,
                    id: { not: parseInt(id) }
                }
            });
            if (cpfExistente) {
                throw new Error('CPF já cadastrado para outro morador');
            }
        }

        const updateData = {
            nome: data.nome,
            cpf: data.cpf,
            telefone: data.telefone,
            unidadeId: data.unidadeId ? parseInt(data.unidadeId) : null
        };

        return await prisma.morador.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                unidade: true
            }
        });
    },

    async delete(id) {
        return await prisma.morador.delete({
            where: { id: parseInt(id) }
        });
    }
};

module.exports = moradorService;