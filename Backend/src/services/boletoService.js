const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const boletoService = {
    async getAll() {
        return await prisma.boleto.findMany({
            include: {
                unidade: true
            },
            orderBy: {
                vencimento: 'desc'
            }
        });
    },

    async getById(id) {
        return await prisma.boleto.findUnique({
            where: { id: parseInt(id) },
            include: {
                unidade: true
            }
        });
    },

    async getByUnidade(unidadeId) {
        return await prisma.boleto.findMany({
            where: { unidadeId: parseInt(unidadeId) },
            include: {
                unidade: true
            },
            orderBy: {
                vencimento: 'desc'
            }
        });
    },

    async getPendentes() {
        return await prisma.boleto.findMany({
            where: {
                status: 'PENDENTE'
            },
            include: {
                unidade: true
            },
            orderBy: {
                vencimento: 'asc'
            }
        });
    },

    async create(data) {
        const validData = {
            mesRef: data.mesRef,
            valor: parseFloat(data.valor),
            status: data.status || 'PENDENTE',
            vencimento: new Date(data.vencimento),
            unidadeId: parseInt(data.unidadeId)
        };

        return await prisma.boleto.create({
            data: validData,
            include: {
                unidade: true
            }
        });
    },

    async update(id, data) {
        return await prisma.boleto.update({
            where: { id: parseInt(id) },
            data: {
                mesRef: data.mesRef,
                valor: parseFloat(data.valor),
                status: data.status,
                vencimento: data.vencimento ? new Date(data.vencimento) : undefined,
                unidadeId: data.unidadeId ? parseInt(data.unidadeId) : undefined
            },
            include: {
                unidade: true
            }
        });
    },

    async marcarComoPago(id) {
        return await prisma.boleto.update({
            where: { id: parseInt(id) },
            data: {
                status: 'PAGO'
            },
            include: {
                unidade: true
            }
        });
    },

    async gerarBoletosParaTodasUnidades(mesRef, valor) {
        // Buscar todas as unidades
        const unidades = await prisma.unidade.findMany();
        
        // Calcular data de vencimento (10º dia do mês seguinte)
        const [ano, mes] = mesRef.split('-').map(Number);
        const proximoMes = mes === 12 ? 1 : mes + 1;
        const proximoAno = mes === 12 ? ano + 1 : ano;
        const vencimento = new Date(proximoAno, proximoMes - 1, 10);

        const boletos = [];
        
        for (const unidade of unidades) {
            // Verificar se já existe boleto para esta unidade neste mês
            const boletoExistente = await prisma.boleto.findFirst({
                where: {
                    unidadeId: unidade.id,
                    mesRef: mesRef
                }
            });

            if (!boletoExistente) {
                const boleto = await prisma.boleto.create({
                    data: {
                        mesRef,
                        valor: parseFloat(valor),
                        status: 'PENDENTE',
                        vencimento,
                        unidadeId: unidade.id
                    },
                    include: {
                        unidade: true
                    }
                });
                boletos.push(boleto);
            }
        }

        return boletos;
    },

    async delete(id) {
        return await prisma.boleto.delete({
            where: { id: parseInt(id) }
        });
    }
};

module.exports = boletoService;
