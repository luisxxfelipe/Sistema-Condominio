const areaComumService = require("../services/areaComumService");

const areaComumController = {
  async getAllAreasComuns(req, res) {
    try {
      const areasComuns = await areaComumService.getAll();
      res.status(200).json(areasComuns || []);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar áreas comuns", error: error.message });
    }
  },

  async getAreaComumById(req, res) {
    const { id } = req.params;
    try {
      const areaComum = await areaComumService.getById(id);
      if (!areaComum) {
        return res.status(404).json({ message: "Área comum não encontrada" });
      }
      res.status(200).json(areaComum);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar área comum", error: error.message });
    }
  },

  async getAreasDisponiveis(req, res) {
    const { data, horarioInicio, horarioFim } = req.query;
    try {
      const areasDisponiveis = await areaComumService.getAreasDisponiveis(data, horarioInicio, horarioFim);
      res.status(200).json(areasDisponiveis);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar áreas disponíveis", error: error.message });
    }
  },

  async createAreaComum(req, res) {
    try {
      const areaComum = await areaComumService.create(req.body);
      res.status(201).json(areaComum);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar área comum", error: error.message });
    }
  },

  async updateAreaComum(req, res) {
    const { id } = req.params;
    try {
      const areaComum = await areaComumService.update(id, req.body);
      if (!areaComum) {
        return res.status(404).json({ message: "Área comum não encontrada" });
      }
      res.status(200).json(areaComum);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar área comum", error: error.message });
    }
  },

  async deleteAreaComum(req, res) {
    const { id } = req.params;
    try {
      // Verificar se há reservas associadas
      const reservasAssociadas = await areaComumService.verificarReservasAssociadas(id);
      if (reservasAssociadas > 0) {
        return res.status(400).json({ 
          message: "Não é possível excluir área comum com reservas associadas" 
        });
      }

      const areaComum = await areaComumService.delete(id);
      if (!areaComum) {
        return res.status(404).json({ message: "Área comum não encontrada" });
      }
      res.status(200).json({ message: "Área comum excluída com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir área comum", error: error.message });
    }
  },
};

module.exports = areaComumController;
