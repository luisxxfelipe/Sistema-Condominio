const moradorService = require("../services/moradorService");

const moradorController = {
  async getAllMoradores(req, res) {
    try {
      const moradores = await moradorService.getAll();
      res.status(200).json(moradores || []);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar moradores", error: error.message });
    }
  },

  async getMoradorById(req, res) {
    const { id } = req.params;
    try {
      const morador = await moradorService.getById(id);
      if (!morador) {
        return res.status(404).json({ message: "Morador não encontrado" });
      }
      res.status(200).json(morador);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar morador", error: error.message });
    }
  },

  async createMorador(req, res) {
    try {
      const morador = await moradorService.create(req.body);
      res.status(201).json(morador);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar morador", error: error.message });
    }
  },

  async updateMorador(req, res) {
    const { id } = req.params;
    try {
      const morador = await moradorService.update(id, req.body);
      if (!morador) {
        return res.status(404).json({ message: "Morador não encontrado" });
      }
      res.status(200).json(morador);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar morador", error: error.message });
    }
  },

  async deleteMorador(req, res) {
    const { id } = req.params;
    try {
      const morador = await moradorService.delete(id);
      if (!morador) {
        return res.status(404).json({ message: "Morador não encontrado" });
      }
      res.status(200).json({ message: "Morador excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir morador", error: error.message });
    }
  },

  async getMoradorByCpf(req, res) {
    const { cpf } = req.params;
    try {
      const morador = await moradorService.getByCpf(cpf);
      if (!morador) {
        return res.status(404).json({ message: "Morador não encontrado" });
      }
      res.status(200).json(morador);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar morador por CPF", error: error.message });
    }
  },

  async getMoradoresByUnidade(req, res) {
    const { unidadeId } = req.params;
    try {
      const moradores = await moradorService.getByUnidade(unidadeId);
      res.status(200).json(moradores);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar moradores da unidade", error: error.message });
    }
  },
};

module.exports = moradorController;
