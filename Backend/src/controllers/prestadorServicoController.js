const prestadorServicoService = require("../services/prestadorServicoService");

const prestadorServicoController = {
  async getAllPrestadores(req, res) {
    try {
      const prestadores = await prestadorServicoService.getAll();
      res.status(200).json(prestadores || []);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar prestadores de serviço", error: error.message });
    }
  },

  async getPrestadorById(req, res) {
    const { id } = req.params;
    try {
      const prestador = await prestadorServicoService.getById(id);
      if (!prestador) {
        return res.status(404).json({ message: "Prestador de serviço não encontrado" });
      }
      res.status(200).json(prestador);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar prestador de serviço", error: error.message });
    }
  },

  async getPrestadoresAtivos(req, res) {
    try {
      const prestadores = await prestadorServicoService.getAtivos();
      res.status(200).json(prestadores);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar prestadores ativos", error: error.message });
    }
  },

  async createPrestador(req, res) {
    try {
      const prestador = await prestadorServicoService.create(req.body);
      res.status(201).json(prestador);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar prestador de serviço", error: error.message });
    }
  },

  async updatePrestador(req, res) {
    const { id } = req.params;
    try {
      const prestador = await prestadorServicoService.update(id, req.body);
      if (!prestador) {
        return res.status(404).json({ message: "Prestador de serviço não encontrado" });
      }
      res.status(200).json(prestador);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar prestador de serviço", error: error.message });
    }
  },

  async registrarSaida(req, res) {
    const { id } = req.params;
    try {
      const prestador = await prestadorServicoService.registrarSaida(id);
      if (!prestador) {
        return res.status(404).json({ message: "Prestador de serviço não encontrado" });
      }
      res.status(200).json(prestador);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao registrar saída", error: error.message });
    }
  },

  async deletePrestador(req, res) {
    const { id } = req.params;
    try {
      const prestador = await prestadorServicoService.delete(id);
      if (!prestador) {
        return res.status(404).json({ message: "Prestador de serviço não encontrado" });
      }
      res.status(200).json({ message: "Prestador de serviço excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir prestador de serviço", error: error.message });
    }
  },
};

module.exports = prestadorServicoController;
