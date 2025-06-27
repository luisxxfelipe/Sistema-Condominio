const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const relatorioService = {
    async getRelatorioOcupacao() {
        const totalUnidades = await prisma.unidade.count();
        const unidadesOcupadas = await prisma.unidade.count({
            where: {
                moradores: {
                    some: {}
                }
            }
        });
        const unidadesVazias = totalUnidades - unidadesOcupadas;

        const ocupacaoPorBloco = await prisma.unidade.groupBy({
            by: ['bloco'],
            _count: {
                id: true
            }
        });

        const moradoresTotais = await prisma.morador.count();

        return {
            totalUnidades,
            unidadesOcupadas,
            unidadesVazias,
            ocupacaoPorBloco,
            moradoresTotais,
            percentualOcupacao: totalUnidades > 0 ? (unidadesOcupadas / totalUnidades * 100).toFixed(2) : 0
        };
    },

    async getRelatorioFinanceiro(mesRef) {
        const filtro = mesRef ? { mesRef } : {};
        
        const totalBoletos = await prisma.boleto.count({ where: filtro });
        const boletosPagos = await prisma.boleto.count({
            where: { ...filtro, status: 'PAGO' }
        });
        const boletosPendentes = await prisma.boleto.count({
            where: { ...filtro, status: 'PENDENTE' }
        });

        const valorTotal = await prisma.boleto.aggregate({
            where: filtro,
            _sum: { valor: true }
        });

        const valorArrecadado = await prisma.boleto.aggregate({
            where: { ...filtro, status: 'PAGO' },
            _sum: { valor: true }
        });

        const valorPendente = await prisma.boleto.aggregate({
            where: { ...filtro, status: 'PENDENTE' },
            _sum: { valor: true }
        });

        return {
            mesRef: mesRef || 'Todos os meses',
            totalBoletos,
            boletosPagos,
            boletosPendentes,
            valorTotal: valorTotal._sum.valor || 0,
            valorArrecadado: valorArrecadado._sum.valor || 0,
            valorPendente: valorPendente._sum.valor || 0,
            percentualArrecadacao: valorTotal._sum.valor > 0 
                ? ((valorArrecadado._sum.valor || 0) / valorTotal._sum.valor * 100).toFixed(2) 
                : 0
        };
    },

    async getRelatorioReservas(dataInicio, dataFim) {
        const filtro = {};
        if (dataInicio && dataFim) {
            filtro.data = {
                gte: new Date(dataInicio),
                lte: new Date(dataFim)
            };
        }

        const totalReservas = await prisma.reserva.count({ where: filtro });

        const reservasPorArea = await prisma.reserva.groupBy({
            by: ['areaComumId'],
            where: filtro,
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } }
        });

        const areasComNomes = await Promise.all(
            reservasPorArea.map(async (item) => {
                const area = await prisma.areaComum.findUnique({
                    where: { id: item.areaComumId }
                });
                return {
                    areaComum: area?.nome || 'Área não encontrada',
                    quantidade: item._count.id
                };
            })
        );

        const reservasPorUnidade = await prisma.reserva.groupBy({
            by: ['unidadeId'],
            where: filtro,
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
            take: 10
        });

        return {
            periodo: dataInicio && dataFim ? `${dataInicio} a ${dataFim}` : 'Todas as datas',
            totalReservas,
            reservasPorArea: areasComNomes,
            reservasPorUnidade
        };
    },

    async getRelatorioVisitantes(dataInicio, dataFim) {
        const filtro = {};
        if (dataInicio && dataFim) {
            filtro.dataVisita = {
                gte: new Date(dataInicio),
                lte: new Date(dataFim)
            };
        }

        const totalVisitantes = await prisma.visitante.count({ where: filtro });

        const visitantesPorUnidade = await prisma.visitante.groupBy({
            by: ['unidadeId'],
            where: filtro,
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
            take: 10
        });

        const visitantesPorDia = await prisma.visitante.groupBy({
            by: ['dataVisita'],
            where: filtro,
            _count: { id: true },
            orderBy: { dataVisita: 'desc' },
            take: 30
        });

        return {
            periodo: dataInicio && dataFim ? `${dataInicio} a ${dataFim}` : 'Todas as datas',
            totalVisitantes,
            visitantesPorUnidade,
            visitantesPorDia: visitantesPorDia.map(item => ({
                data: item.dataVisita.toISOString().split('T')[0],
                quantidade: item._count.id
            }))
        };
    },

    async getRelatorioPrestadores(dataInicio, dataFim) {
        const filtro = {};
        if (dataInicio && dataFim) {
            filtro.entrada = {
                gte: new Date(dataInicio),
                lte: new Date(dataFim)
            };
        }

        const totalPrestadores = await prisma.prestadorServico.count({ where: filtro });
        
        const prestadoresAtivos = await prisma.prestadorServico.count({
            where: { ...filtro, saida: null }
        });

        const servicosMaisFrequentes = await prisma.prestadorServico.groupBy({
            by: ['servico'],
            where: filtro,
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
            take: 10
        });

        return {
            periodo: dataInicio && dataFim ? `${dataInicio} a ${dataFim}` : 'Todas as datas',
            totalPrestadores,
            prestadoresAtivos,
            servicosMaisFrequentes: servicosMaisFrequentes.map(item => ({
                servico: item.servico,
                quantidade: item._count.id
            }))
        };
    },

    async getDashboardResumo() {
        const totalUnidades = await prisma.unidade.count();
        const totalMoradores = await prisma.morador.count();
        const totalAvisos = await prisma.aviso.count();
        
        const hoje = new Date();
        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const mesAnterior = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
        const fimMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
        
        // Contadores do mês atual
        const visitantesHoje = await prisma.visitante.count({
            where: {
                dataVisita: {
                    gte: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()),
                    lt: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1)
                }
            }
        });

        const reservasHoje = await prisma.reserva.count({
            where: {
                data: {
                    gte: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()),
                    lt: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1)
                }
            }
        });

        const boletosPendentesHoje = await prisma.boleto.count({
            where: {
                status: 'PENDENTE',
                vencimento: {
                    lte: hoje
                }
            }
        });

        const prestadoresAtivos = await prisma.prestadorServico.count({
            where: { saida: null }
        });

        // Avisos recentes (últimos 5)
        const avisosRecentes = await prisma.aviso.findMany({
            take: 5,
            orderBy: {
                id: 'desc'
            }
        });

        // Calcular crescimento mensal de moradores
        const moradoresEsteMs = await prisma.morador.count({
            where: {
                id: {
                    gte: 1 // Assumindo que IDs maiores são mais recentes
                }
            }
        });

        const crescimentoMoradores = totalMoradores > 0 ? 
            ((moradoresEsteMs / totalMoradores) * 100 - 100) : 0;

        return {
            totalUnidades,
            totalMoradores,
            totalAvisos,
            visitantesHoje,
            reservasHoje,
            boletosPendentesHoje,
            prestadoresAtivos,
            avisosRecentes,
            crescimentoMoradores: Math.round(crescimentoMoradores * 100) / 100,
            dataAtualizacao: new Date()
        };
    },

    async getRelatorioInadimplencia() {
        const hoje = new Date();
        
        const boletosVencidos = await prisma.boleto.findMany({
            where: {
                status: 'PENDENTE',
                vencimento: {
                    lt: hoje
                }
            },
            include: {
                unidade: true
            },
            orderBy: {
                vencimento: 'asc'
            }
        });

        const valorTotalInadimplencia = boletosVencidos.reduce(
            (total, boleto) => total + boleto.valor, 0
        );

        const inadimplenciaPorUnidade = boletosVencidos.reduce((acc, boleto) => {
            const key = `${boleto.unidade.bloco}-${boleto.unidade.numero}`;
            if (!acc[key]) {
                acc[key] = {
                    unidade: key,
                    boletos: 0,
                    valorTotal: 0
                };
            }
            acc[key].boletos++;
            acc[key].valorTotal += boleto.valor;
            return acc;
        }, {});

        return {
            totalBoletosVencidos: boletosVencidos.length,
            valorTotalInadimplencia,
            boletosVencidos,
            inadimplenciaPorUnidade: Object.values(inadimplenciaPorUnidade),
            dataConsulta: hoje
        };
    }
};

module.exports = relatorioService;
