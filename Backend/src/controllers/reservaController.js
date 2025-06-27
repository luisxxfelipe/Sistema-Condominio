const reservaService = require("../services/reservaService");

const reservaController = {
  async getAllReservas(req, res) {
    try {
      const reservas = await reservaService.getAll();
      res.status(200).json(reservas || []);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar reservas", error: error.message });
    }
  },

  async getReservaById(req, res) {
    const { id } = req.params;
    try {
      const reserva = await reservaService.getById(id);
      if (!reserva) {
        return res.status(404).json({ message: "Reserva não encontrada" });
      }
      res.status(200).json(reserva);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar reserva", error: error.message });
    }
  },

  async getReservasByUnidade(req, res) {
    const { unidadeId } = req.params;
    try {
      const reservas = await reservaService.getByUnidade(unidadeId);
      res.status(200).json(reservas);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar reservas da unidade", error: error.message });
    }
  },

  async getReservasByAreaComum(req, res) {
    const { areaComumId } = req.params;
    try {
      const reservas = await reservaService.getByAreaComum(areaComumId);
      res.status(200).json(reservas);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar reservas da área comum", error: error.message });
    }
  },

  async getReservasPorPeriodo(req, res) {
    const { dataInicio, dataFim } = req.query;
    try {
      const reservas = await reservaService.getByPeriodo(dataInicio, dataFim);
      res.status(200).json(reservas);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar reservas por período", error: error.message });
    }
  },

  async verificarDisponibilidade(req, res) {
    const { areaComumId, data, horarioInicio, horarioFim } = req.query;
    try {
      const disponivel = await reservaService.verificarDisponibilidade(
        areaComumId, 
        data, 
        horarioInicio, 
        horarioFim
      );
      res.status(200).json({ disponivel });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao verificar disponibilidade", error: error.message });
    }
  },

  async createReserva(req, res) {
    try {
      // Verificar disponibilidade antes de criar
      const { areaComumId, data, horarioInicio, horarioFim } = req.body;
      const disponivel = await reservaService.verificarDisponibilidade(
        areaComumId, 
        data, 
        horarioInicio, 
        horarioFim
      );

      if (!disponivel) {
        return res.status(400).json({ 
          message: "Horário não disponível para reserva" 
        });
      }

      const reserva = await reservaService.create(req.body);
      res.status(201).json(reserva);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar reserva", error: error.message });
    }
  },

  async updateReserva(req, res) {
    const { id } = req.params;
    try {
      // Se houver mudança de horário, verificar disponibilidade
      const { areaComumId, data, horarioInicio, horarioFim } = req.body;
      if (areaComumId && data && horarioInicio && horarioFim) {
        const disponivel = await reservaService.verificarDisponibilidade(
          areaComumId, 
          data, 
          horarioInicio, 
          horarioFim,
          parseInt(id) // Excluir a própria reserva da verificação
        );

        if (!disponivel) {
          return res.status(400).json({ 
            message: "Horário não disponível para reserva" 
          });
        }
      }

      const reserva = await reservaService.update(id, req.body);
      if (!reserva) {
        return res.status(404).json({ message: "Reserva não encontrada" });
      }
      res.status(200).json(reserva);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar reserva", error: error.message });
    }
  },

  async deleteReserva(req, res) {
    const { id } = req.params;
    try {
      const reserva = await reservaService.delete(id);
      if (!reserva) {
        return res.status(404).json({ message: "Reserva não encontrada" });
      }
      res.status(200).json({ message: "Reserva excluída com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir reserva", error: error.message });
    }
  },
};

module.exports = reservaController;
