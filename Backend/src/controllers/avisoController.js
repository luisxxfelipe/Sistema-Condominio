const avisoService = require("../services/avisoService");

const avisoController = {
  async getAllAvisos(req, res) {
    try {
      const avisos = await avisoService.getAll();
      res.status(200).json(avisos || []);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar avisos", error: error.message });
    }
  },

  async getAvisoById(req, res) {
    const { id } = req.params;
    try {
      const aviso = await avisoService.getById(id);
      if (!aviso) {
        return res.status(404).json({ message: "Aviso não encontrado" });
      }
      res.status(200).json(aviso);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar aviso", error: error.message });
    }
  },

  async getAvisosRecentes(req, res) {
    const { limite = 10 } = req.query;
    try {
      const avisos = await avisoService.getRecentes(parseInt(limite));
      res.status(200).json(avisos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar avisos recentes", error: error.message });
    }
  },

  async createAviso(req, res) {
    try {
      const aviso = await avisoService.create(req.body);
      res.status(201).json(aviso);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar aviso", error: error.message });
    }
  },

  async updateAviso(req, res) {
    const { id } = req.params;
    try {
      const aviso = await avisoService.update(id, req.body);
      if (!aviso) {
        return res.status(404).json({ message: "Aviso não encontrado" });
      }
      res.status(200).json(aviso);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar aviso", error: error.message });
    }
  },

  async deleteAviso(req, res) {
    const { id } = req.params;
    try {
      const aviso = await avisoService.delete(id);
      if (!aviso) {
        return res.status(404).json({ message: "Aviso não encontrado" });
      }
      res.status(200).json({ message: "Aviso excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir aviso", error: error.message });
    }
  },
};

module.exports = avisoController;
