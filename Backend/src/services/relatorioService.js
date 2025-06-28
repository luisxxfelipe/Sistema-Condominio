const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const relatorioService = {
  async getRelatorioOcupacao() {
    const totalUnidades = await prisma.unidade.count();
    const unidadesOcupadas = await prisma.unidade.count({
      where: {
        moradores: {
          some: {},
        },
      },
    });
    const unidadesVazias = totalUnidades - unidadesOcupadas;

    const ocupacaoPorBloco = await prisma.unidade.groupBy({
      by: ["bloco"],
      _count: {
        id: true,
      },
    });

    const moradoresTotais = await prisma.morador.count();

    return {
      totalUnidades,
      unidadesOcupadas,
      unidadesVazias,
      ocupacaoPorBloco,
      moradoresTotais,
      percentualOcupacao:
        totalUnidades > 0
          ? ((unidadesOcupadas / totalUnidades) * 100).toFixed(2)
          : 0,
    };
  },

  async getRelatorioFinanceiro(mesRef) {
    const filtro = mesRef ? { mesRef } : {};

    const totalBoletos = await prisma.boleto.count({ where: filtro });
    const boletosPagos = await prisma.boleto.count({
      where: { ...filtro, status: "PAGO" },
    });
    const boletosPendentes = await prisma.boleto.count({
      where: { ...filtro, status: "PENDENTE" },
    });

    const valorTotal = await prisma.boleto.aggregate({
      where: filtro,
      _sum: { valor: true },
    });

    const valorArrecadado = await prisma.boleto.aggregate({
      where: { ...filtro, status: "PAGO" },
      _sum: { valor: true },
    });

    const valorPendente = await prisma.boleto.aggregate({
      where: { ...filtro, status: "PENDENTE" },
      _sum: { valor: true },
    });

    return {
      mesRef: mesRef || "Todos os meses",
      totalBoletos,
      boletosPagos,
      boletosPendentes,
      valorTotal: valorTotal._sum.valor || 0,
      valorArrecadado: valorArrecadado._sum.valor || 0,
      valorPendente: valorPendente._sum.valor || 0,
      percentualArrecadacao:
        valorTotal._sum.valor > 0
          ? (
              ((valorArrecadado._sum.valor || 0) / valorTotal._sum.valor) *
              100
            ).toFixed(2)
          : 0,
    };
  },

  async getRelatorioReservas(dataInicio, dataFim) {
    const filtro = {};
    if (dataInicio && dataFim) {
      filtro.data = {
        gte: new Date(dataInicio),
        lte: new Date(dataFim),
      };
    }

    const totalReservas = await prisma.reserva.count({ where: filtro });

    const reservasPorArea = await prisma.reserva.groupBy({
      by: ["areaComumId"],
      where: filtro,
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    });

    const areasComNomes = await Promise.all(
      reservasPorArea.map(async (item) => {
        const area = await prisma.areaComum.findUnique({
          where: { id: item.areaComumId },
        });
        return {
          areaComum: area?.nome || "Área não encontrada",
          quantidade: item._count.id,
        };
      })
    );

    const reservasPorUnidade = await prisma.reserva.groupBy({
      by: ["unidadeId"],
      where: filtro,
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    });

    return {
      periodo:
        dataInicio && dataFim ? `${dataInicio} a ${dataFim}` : "Todas as datas",
      totalReservas,
      reservasPorArea: areasComNomes,
      reservasPorUnidade,
    };
  },

  async getRelatorioVisitantes(dataInicio, dataFim) {
    const filtro = {};
    if (dataInicio && dataFim) {
      filtro.dataVisita = {
        gte: new Date(dataInicio),
        lte: new Date(dataFim),
      };
    }

    const totalVisitantes = await prisma.visitante.count({ where: filtro });

    const visitantesPorUnidade = await prisma.visitante.groupBy({
      by: ["unidadeId"],
      where: filtro,
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    });

    const visitantesPorDia = await prisma.visitante.groupBy({
      by: ["dataVisita"],
      where: filtro,
      _count: { id: true },
      orderBy: { dataVisita: "desc" },
      take: 30,
    });

    return {
      periodo:
        dataInicio && dataFim ? `${dataInicio} a ${dataFim}` : "Todas as datas",
      totalVisitantes,
      visitantesPorUnidade,
      visitantesPorDia: visitantesPorDia.map((item) => ({
        data: item.dataVisita.toISOString().split("T")[0],
        quantidade: item._count.id,
      })),
    };
  },

  async getRelatorioPrestadores(dataInicio, dataFim) {
    const filtro = {};
    if (dataInicio && dataFim) {
      filtro.entrada = {
        gte: new Date(dataInicio),
        lte: new Date(dataFim),
      };
    }

    const totalPrestadores = await prisma.prestadorServico.count({
      where: filtro,
    });

    const prestadoresAtivos = await prisma.prestadorServico.count({
      where: { ...filtro, saida: null },
    });

    const servicosMaisFrequentes = await prisma.prestadorServico.groupBy({
      by: ["servico"],
      where: filtro,
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    });

    return {
      periodo:
        dataInicio && dataFim ? `${dataInicio} a ${dataFim}` : "Todas as datas",
      totalPrestadores,
      prestadoresAtivos,
      servicosMaisFrequentes: servicosMaisFrequentes.map((item) => ({
        servico: item.servico,
        quantidade: item._count.id,
      })),
    };
  },

  async getDashboardResumo() {
    const totalUnidades = await prisma.unidade.count();
    const totalMoradores = await prisma.morador.count();
    const totalAvisos = await prisma.aviso.count();

    // Obter data atual no fuso horário brasileiro (GMT-3)
    const now = new Date();
    const brasiliaOffset = -3 * 60; // GMT-3 em minutos
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const brasiliaTime = new Date(utcTime + (brasiliaOffset * 60000));
    
    const hoje = brasiliaTime;
    const inicioMesAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fimMesAtual = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    const inicioMesAnterior = new Date(
      hoje.getFullYear(),
      hoje.getMonth() - 1,
      1
    );
    const fimMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0);

    // Início e fim do dia de hoje no horário de Brasília
    const inicioDiaHoje = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      0, 0, 0, 0
    );
    const fimDiaHoje = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      23, 59, 59, 999
    );

    // Contadores do dia atual
    const visitantesHoje = await prisma.visitante.count({
      where: {
        dataVisita: {
          gte: inicioDiaHoje,
          lt: fimDiaHoje,
        },
      },
    });

    const reservasHoje = await prisma.reserva.count({
      where: {
        data: {
          gte: inicioDiaHoje,
          lte: fimDiaHoje,
        },
      },
    });
    
    // Para debug, vamos buscar todas as reservas
    const todasReservas = await prisma.reserva.findMany({
      select: {
        id: true,
        data: true,
      }
    });

    // Boletos vencidos (status VENCIDO ou PENDENTE com vencimento passado)
    const boletosVencidos = await prisma.boleto.count({
      where: {
        OR: [
          {
            status: "VENCIDO",
          },
          {
            status: "PENDENTE",
            vencimento: {
              lt: inicioDiaHoje,
            },
          },
        ],
      },
    });

    // Boletos pendentes (status PENDENTE com vencimento futuro ou hoje)
    const boletosPendentes = await prisma.boleto.count({
      where: {
        status: "PENDENTE",
        vencimento: {
          gte: inicioDiaHoje,
        },
      },
    });
    
    // Para debug, vamos buscar todos os boletos
    const todosBoletos = await prisma.boleto.findMany({
      select: {
        id: true,
        status: true,
        vencimento: true,
      }
    });
    // Comparação de moradores: mês atual vs mês anterior
    const moradoresMesAtual = await prisma.morador.count({
      where: {
        createdAt: {
          gte: inicioMesAtual,
          lte: fimMesAtual,
        },
      },
    });

    const moradoresMesAnterior = await prisma.morador.count({
      where: {
        createdAt: {
          gte: inicioMesAnterior,
          lte: fimMesAnterior,
        },
      },
    });

    // Calcular porcentagem de crescimento
    let crescimentoMoradores = 0;
    if (moradoresMesAnterior > 0) {
      crescimentoMoradores =
        ((moradoresMesAtual - moradoresMesAnterior) / moradoresMesAnterior) *
        100;
    } else if (moradoresMesAtual > 0) {
      crescimentoMoradores = 100; // 100% se não havia moradores no mês anterior
    }

    // Total de áreas comuns (mais relevante que prestadores para um condomínio)
    const totalAreasComuns = await prisma.areaComum.count();

    // Avisos recentes (últimos 5)
    const avisosRecentes = await prisma.aviso.findMany({
      take: 5,
      orderBy: {
        dataCriacao: "desc",
      },
    });

    return {
      totalUnidades,
      totalMoradores,
      totalAvisos,
      visitantesHoje,
      reservasHoje,
      boletosPendentes,
      boletosVencidos,
      totalAreasComuns,
      avisosRecentes,
      crescimentoMoradores: Math.round(crescimentoMoradores * 100) / 100,
      dataAtualizacao: new Date(),
    };
  },

  async getRelatorioInadimplencia() {
    const hoje = new Date();

    const boletosVencidos = await prisma.boleto.findMany({
      where: {
        OR: [
          {
            status: "PENDENTE",
            vencimento: {
              lt: hoje,
            },
          },
          {
            status: "VENCIDO",
          },
        ],
      },
      include: {
        unidade: true,
      },
      orderBy: {
        vencimento: "asc",
      },
    });

    const valorTotalInadimplencia = boletosVencidos.reduce(
      (total, boleto) => total + boleto.valor,
      0
    );

    const inadimplenciaPorUnidade = boletosVencidos.reduce((acc, boleto) => {
      const key = `${boleto.unidade.bloco}-${boleto.unidade.numero}`;
      if (!acc[key]) {
        acc[key] = {
          unidade: key,
          boletos: 0,
          valorTotal: 0,
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
      dataConsulta: hoje,
    };
  },
};

module.exports = relatorioService;
