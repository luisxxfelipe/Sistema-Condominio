const visitanteService = require("../services/visitanteService");

const visitanteController = {
  async getAllVisitantes(req, res) {
    try {
      const visitantes = await visitanteService.getAll();
      res.status(200).json(visitantes || []);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar visitantes", error: error.message });
    }
  },

  async getVisitanteById(req, res) {
    const { id } = req.params;
    try {
      const visitante = await visitanteService.getById(id);
      if (!visitante) {
        return res.status(404).json({ message: "Visitante não encontrado" });
      }
      res.status(200).json(visitante);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar visitante", error: error.message });
    }
  },

  async getVisitantesByUnidade(req, res) {
    const { unidadeId } = req.params;
    try {
      const visitantes = await visitanteService.getByUnidade(unidadeId);
      res.status(200).json(visitantes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar visitantes da unidade", error: error.message });
    }
  },

  async createVisitante(req, res) {
    try {
      const visitante = await visitanteService.create(req.body);
      res.status(201).json(visitante);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar visitante", error: error.message });
    }
  },

  async updateVisitante(req, res) {
    const { id } = req.params;
    try {
      const visitante = await visitanteService.update(id, req.body);
      if (!visitante) {
        return res.status(404).json({ message: "Visitante não encontrado" });
      }
      res.status(200).json(visitante);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar visitante", error: error.message });
    }
  },

  async deleteVisitante(req, res) {
    const { id } = req.params;
    try {
      const visitante = await visitanteService.delete(id);
      if (!visitante) {
        return res.status(404).json({ message: "Visitante não encontrado" });
      }
      res.status(200).json({ message: "Visitante excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir visitante", error: error.message });
    }
  },
};

module.exports = visitanteController;
