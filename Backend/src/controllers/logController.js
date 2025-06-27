const logService = require("../services/logService");

const logController = {
  async getAllLogs(req, res) {
    try {
      const logs = await logService.getAll();
      res.status(200).json(logs || []);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar logs", error: error.message });
    }
  },

  async getLogById(req, res) {
    const { id } = req.params;
    try {
      const log = await logService.getById(id);
      if (!log) {
        return res.status(404).json({ message: "Log não encontrado" });
      }
      res.status(200).json(log);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar log", error: error.message });
    }
  },

  async getLogsByUsuario(req, res) {
    const { usuarioId } = req.params;
    try {
      const logs = await logService.getByUsuario(usuarioId);
      res.status(200).json(logs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar logs do usuário", error: error.message });
    }
  },

  async getLogsPorPeriodo(req, res) {
    const { dataInicio, dataFim } = req.query;
    try {
      const logs = await logService.getByPeriodo(dataInicio, dataFim);
      res.status(200).json(logs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar logs por período", error: error.message });
    }
  },

  async getLogsPorAcao(req, res) {
    const { acao } = req.params;
    try {
      const logs = await logService.getByAcao(acao);
      res.status(200).json(logs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar logs por ação", error: error.message });
    }
  },

  async createLog(req, res) {
    try {
      const log = await logService.create(req.body);
      res.status(201).json(log);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar log", error: error.message });
    }
  },

  async deleteLog(req, res) {
    const { id } = req.params;
    try {
      const log = await logService.delete(id);
      if (!log) {
        return res.status(404).json({ message: "Log não encontrado" });
      }
      res.status(200).json({ message: "Log excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir log", error: error.message });
    }
  },

  async limparLogsAntigos(req, res) {
    const { diasParaManter = 90 } = req.query;
    try {
      const logsRemovidos = await logService.limparLogsAntigos(parseInt(diasParaManter));
      res.status(200).json({ 
        message: `${logsRemovidos} logs antigos foram removidos`,
        diasParaManter: parseInt(diasParaManter)
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao limpar logs antigos", error: error.message });
    }
  },
};

module.exports = logController;
