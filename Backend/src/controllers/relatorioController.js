const relatorioService = require("../services/relatorioService");

const relatorioController = {
  async getRelatorioOcupacao(req, res) {
    try {
      const relatorio = await relatorioService.getRelatorioOcupacao();
      res.status(200).json(relatorio);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao gerar relatório de ocupação", error: error.message });
    }
  },

  async getRelatorioFinanceiro(req, res) {
    const { mesRef } = req.query;
    try {
      const relatorio = await relatorioService.getRelatorioFinanceiro(mesRef);
      res.status(200).json(relatorio);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao gerar relatório financeiro", error: error.message });
    }
  },

  async getRelatorioReservas(req, res) {
    const { dataInicio, dataFim } = req.query;
    try {
      const relatorio = await relatorioService.getRelatorioReservas(dataInicio, dataFim);
      res.status(200).json(relatorio);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao gerar relatório de reservas", error: error.message });
    }
  },

  async getRelatorioVisitantes(req, res) {
    const { dataInicio, dataFim } = req.query;
    try {
      const relatorio = await relatorioService.getRelatorioVisitantes(dataInicio, dataFim);
      res.status(200).json(relatorio);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao gerar relatório de visitantes", error: error.message });
    }
  },

  async getRelatorioPrestadores(req, res) {
    const { dataInicio, dataFim } = req.query;
    try {
      const relatorio = await relatorioService.getRelatorioPrestadores(dataInicio, dataFim);
      res.status(200).json(relatorio);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao gerar relatório de prestadores", error: error.message });
    }
  },

  async getDashboardResumo(req, res) {
    try {
      const dashboard = await relatorioService.getDashboardResumo();
      res.status(200).json(dashboard);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao gerar dashboard resumo", error: error.message });
    }
  },

  async getRelatorioInadimplencia(req, res) {
    try {
      const relatorio = await relatorioService.getRelatorioInadimplencia();
      res.status(200).json(relatorio);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao gerar relatório de inadimplência", error: error.message });
    }
  },
};

module.exports = relatorioController;
