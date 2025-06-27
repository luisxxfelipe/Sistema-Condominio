const unidadeService = require("../services/unidadeService");

const unidadeController = {
  getAllUnidades: async (req, res) => {
    try {
      const unidades = await unidadeService.getAll();
      res.status(200).json(unidades || []);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar unidades", error: error.message });
    }
  },

  getUnidadeById: async (req, res) => {
    const { id } = req.params;
    try {
      const unidade = await unidadeService.getById(id);
      if (!unidade) {
        return res.status(404).json({ message: "Unidade não encontrada" });
      }
      res.status(200).json(unidade);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar unidade", error: error.message });
    }
  },

  createUnidade: async (req, res) => {
    try {
      const unidade = await unidadeService.create(req.body);
      res.status(201).json(unidade);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar unidade", error: error.message });
    }
  },

  updateUnidade: async (req, res) => {
    const { id } = req.params;
    try {
      const unidade = await unidadeService.update(id, req.body);
      if (!unidade) {
        return res.status(404).json({ message: "Unidade não encontrada" });
      }
      res.status(200).json(unidade);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar unidade", error: error.message });
    }
  },

  deleteUnidade: async (req, res) => {
    const { id } = req.params;
    try {
      const unidade = await unidadeService.delete(id);
      if (!unidade) {
        return res.status(404).json({ message: "Unidade não encontrada" });
      }
      res.status(200).json({ message: "Unidade excluída com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir unidade", error: error.message });
    }
  },
};

module.exports = unidadeController;
