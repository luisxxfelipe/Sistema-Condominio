const boletoService = require("../services/boletoService");

const boletoController = {
  async getAllBoletos(req, res) {
    try {
      const boletos = await boletoService.getAll();
      res.status(200).json(boletos || []);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar boletos", error: error.message });
    }
  },

  async getBoletoById(req, res) {
    const { id } = req.params;
    try {
      const boleto = await boletoService.getById(id);
      if (!boleto) {
        return res.status(404).json({ message: "Boleto não encontrado" });
      }
      res.status(200).json(boleto);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar boleto", error: error.message });
    }
  },

  async getBoletosByUnidade(req, res) {
    const { unidadeId } = req.params;
    try {
      const boletos = await boletoService.getByUnidade(unidadeId);
      res.status(200).json(boletos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar boletos da unidade", error: error.message });
    }
  },

  async getBoletosPendentes(req, res) {
    try {
      const boletos = await boletoService.getPendentes();
      res.status(200).json(boletos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar boletos pendentes", error: error.message });
    }
  },

  async createBoleto(req, res) {
    try {
      const boleto = await boletoService.create(req.body);
      res.status(201).json(boleto);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar boleto", error: error.message });
    }
  },

  async updateBoleto(req, res) {
    const { id } = req.params;
    try {
      const boleto = await boletoService.update(id, req.body);
      if (!boleto) {
        return res.status(404).json({ message: "Boleto não encontrado" });
      }
      res.status(200).json(boleto);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar boleto", error: error.message });
    }
  },

  async marcarComoPago(req, res) {
    const { id } = req.params;
    try {
      const boleto = await boletoService.marcarComoPago(id);
      if (!boleto) {
        return res.status(404).json({ message: "Boleto não encontrado" });
      }
      res.status(200).json(boleto);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao marcar boleto como pago", error: error.message });
    }
  },

  async gerarBoletosDoMes(req, res) {
    const { mesRef, valor } = req.body;
    try {
      const boletos = await boletoService.gerarBoletosParaTodasUnidades(mesRef, valor);
      res.status(201).json({
        message: `${boletos.length} boletos gerados para o mês ${mesRef}`,
        boletos
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao gerar boletos do mês", error: error.message });
    }
  },

  async deleteBoleto(req, res) {
    const { id } = req.params;
    try {
      const boleto = await boletoService.delete(id);
      if (!boleto) {
        return res.status(404).json({ message: "Boleto não encontrado" });
      }
      res.status(200).json({ message: "Boleto excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir boleto", error: error.message });
    }
  },
};

module.exports = boletoController;
