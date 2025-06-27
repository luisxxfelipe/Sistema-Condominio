const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const logService = {
    async getAll() {
        return await prisma.logTransacao.findMany({
            include: {
                usuarioFK: {
                    select: {
                        id: true,
                        nome: true,
                        login: true,
                        tipoPerfil: true
                    }
                }
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
    },

    async getById(id) {
        return await prisma.logTransacao.findUnique({
            where: { id: parseInt(id) },
            include: {
                usuarioFK: {
                    select: {
                        id: true,
                        nome: true,
                        login: true,
                        tipoPerfil: true
                    }
                }
            }
        });
    },

    async getByUsuario(usuarioId) {
        return await prisma.logTransacao.findMany({
            where: { usuarioId: parseInt(usuarioId) },
            include: {
                usuarioFK: {
                    select: {
                        id: true,
                        nome: true,
                        login: true,
                        tipoPerfil: true
                    }
                }
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
    },

    async getByPeriodo(dataInicio, dataFim) {
        return await prisma.logTransacao.findMany({
            where: {
                timestamp: {
                    gte: new Date(dataInicio),
                    lte: new Date(dataFim)
                }
            },
            include: {
                usuarioFK: {
                    select: {
                        id: true,
                        nome: true,
                        login: true,
                        tipoPerfil: true
                    }
                }
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
    },

    async getByAcao(acao) {
        return await prisma.logTransacao.findMany({
            where: { acao },
            include: {
                usuarioFK: {
                    select: {
                        id: true,
                        nome: true,
                        login: true,
                        tipoPerfil: true
                    }
                }
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
    },

    async create(data) {
        return await prisma.logTransacao.create({
            data: {
                usuario: data.usuario,
                acao: data.acao,
                sql: data.sql,
                usuarioId: parseInt(data.usuarioId),
                timestamp: new Date()
            },
            include: {
                usuarioFK: {
                    select: {
                        id: true,
                        nome: true,
                        login: true,
                        tipoPerfil: true
                    }
                }
            }
        });
    },

    async delete(id) {
        return await prisma.logTransacao.delete({
            where: { id: parseInt(id) }
        });
    },

    async limparLogsAntigos(diasParaManter = 90) {
        const dataLimite = new Date();
        dataLimite.setDate(dataLimite.getDate() - diasParaManter);

        const result = await prisma.logTransacao.deleteMany({
            where: {
                timestamp: {
                    lt: dataLimite
                }
            }
        });

        return result.count;
    },

    // Método utilitário para registrar automaticamente logs de transações
    async registrarTransacao(usuario, acao, sql, usuarioId) {
        try {
            await this.create({
                usuario,
                acao,
                sql,
                usuarioId
            });
        } catch (error) {
            console.error('Erro ao registrar log de transação:', error);
        }
    }
};

module.exports = logService;
