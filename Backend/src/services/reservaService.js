const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const reservaService = {
    async getAll() {
        return await prisma.reserva.findMany({
            include: {
                unidade: true,
                areaComum: true
            },
            orderBy: {
                data: 'asc'
            }
        });
    },

    async getById(id) {
        return await prisma.reserva.findUnique({
            where: { id: parseInt(id) },
            include: {
                unidade: true,
                areaComum: true
            }
        });
    },

    async getByUnidade(unidadeId) {
        return await prisma.reserva.findMany({
            where: { unidadeId: parseInt(unidadeId) },
            include: {
                unidade: true,
                areaComum: true
            },
            orderBy: {
                data: 'asc'
            }
        });
    },

    async getByAreaComum(areaComumId) {
        return await prisma.reserva.findMany({
            where: { areaComumId: parseInt(areaComumId) },
            include: {
                unidade: true,
                areaComum: true
            },
            orderBy: {
                data: 'asc'
            }
        });
    },

    async getByPeriodo(dataInicio, dataFim) {
        return await prisma.reserva.findMany({
            where: {
                data: {
                    gte: new Date(dataInicio),
                    lte: new Date(dataFim)
                }
            },
            include: {
                unidade: true,
                areaComum: true
            },
            orderBy: {
                data: 'asc'
            }
        });
    },

    async verificarDisponibilidade(areaComumId, data, horarioInicio, horarioFim, excludeReservaId = null) {
        const dataReserva = new Date(data);
        
        const whereClause = {
            areaComumId: parseInt(areaComumId),
            data: dataReserva,
        };

        // Só adiciona o filtro de exclusão se excludeReservaId for válido
        if (excludeReservaId && excludeReservaId !== null && excludeReservaId !== undefined) {
            whereClause.id = { not: parseInt(excludeReservaId) };
        }

        const conflitos = await prisma.reserva.findMany({
            where: {
                ...whereClause,
                OR: [
                    // Horário de início está dentro de uma reserva existente
                    {
                        AND: [
                            { horarioInicio: { lte: horarioInicio } },
                            { horarioFim: { gt: horarioInicio } }
                        ]
                    },
                    // Horário de fim está dentro de uma reserva existente
                    {
                        AND: [
                            { horarioInicio: { lt: horarioFim } },
                            { horarioFim: { gte: horarioFim } }
                        ]
                    },
                    // A nova reserva engloba uma reserva existente
                    {
                        AND: [
                            { horarioInicio: { gte: horarioInicio } },
                            { horarioFim: { lte: horarioFim } }
                        ]
                    }
                ]
            }
        });

        return conflitos.length === 0;
    },

    async create(data) {
        return await prisma.reserva.create({
            data: {
                data: new Date(data.data),
                horarioInicio: data.horarioInicio,
                horarioFim: data.horarioFim,
                unidadeId: parseInt(data.unidadeId),
                areaComumId: parseInt(data.areaComumId)
            },
            include: {
                unidade: true,
                areaComum: true
            }
        });
    },

    async update(id, data) {
        return await prisma.reserva.update({
            where: { id: parseInt(id) },
            data: {
                data: data.data ? new Date(data.data) : undefined,
                horarioInicio: data.horarioInicio,
                horarioFim: data.horarioFim,
                unidadeId: data.unidadeId ? parseInt(data.unidadeId) : undefined,
                areaComumId: data.areaComumId ? parseInt(data.areaComumId) : undefined
            },
            include: {
                unidade: true,
                areaComum: true
            }
        });
    },

    async delete(id) {
        return await prisma.reserva.delete({
            where: { id: parseInt(id) }
        });
    }
};

module.exports = reservaService;
