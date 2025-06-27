const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const areaComumService = {
    async getAll() {
        return await prisma.areaComum.findMany({
            include: {
                reservas: {
                    where: {
                        data: {
                            gte: new Date()
                        }
                    },
                    orderBy: {
                        data: 'asc'
                    }
                }
            },
            orderBy: {
                nome: 'asc'
            }
        });
    },

    async getById(id) {
        return await prisma.areaComum.findUnique({
            where: { id: parseInt(id) },
            include: {
                reservas: {
                    include: {
                        unidade: true
                    },
                    orderBy: {
                        data: 'asc'
                    }
                }
            }
        });
    },

    async getAreasDisponiveis(data, horarioInicio, horarioFim) {
        const dataReserva = new Date(data);
        
        // Buscar todas as áreas comuns
        const todasAreas = await prisma.areaComum.findMany();
        
        // Para cada área, verificar se está disponível no horário solicitado
        const areasDisponiveis = [];
        
        for (const area of todasAreas) {
            const conflitos = await prisma.reserva.findMany({
                where: {
                    areaComumId: area.id,
                    data: dataReserva,
                    OR: [
                        {
                            AND: [
                                { horarioInicio: { lte: horarioInicio } },
                                { horarioFim: { gt: horarioInicio } }
                            ]
                        },
                        {
                            AND: [
                                { horarioInicio: { lt: horarioFim } },
                                { horarioFim: { gte: horarioFim } }
                            ]
                        },
                        {
                            AND: [
                                { horarioInicio: { gte: horarioInicio } },
                                { horarioFim: { lte: horarioFim } }
                            ]
                        }
                    ]
                }
            });

            if (conflitos.length === 0) {
                areasDisponiveis.push(area);
            }
        }

        return areasDisponiveis;
    },

    async verificarReservasAssociadas(id) {
        const count = await prisma.reserva.count({
            where: {
                areaComumId: parseInt(id)
            }
        });
        return count;
    },

    async create(data) {
        return await prisma.areaComum.create({
            data
        });
    },

    async update(id, data) {
        return await prisma.areaComum.update({
            where: { id: parseInt(id) },
            data
        });
    },

    async delete(id) {
        return await prisma.areaComum.delete({
            where: { id: parseInt(id) }
        });
    }
};

module.exports = areaComumService;
