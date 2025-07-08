const express = require('express');
const boletoController = require('../controllers/boletoController');
const logMiddleware = require('../middlewares/logMiddleware');

const router = express.Router();

// Rotas para boletos
router.get('/', boletoController.getAllBoletos);
router.get('/pendentes', boletoController.getBoletosPendentes);
router.get('/:id', boletoController.getBoletoById);
router.get('/unidade/:unidadeId', boletoController.getBoletosByUnidade);
router.post('/', logMiddleware('CRIAR_BOLETO'), boletoController.createBoleto);
router.post('/gerar-mes', logMiddleware('GERAR_BOLETOS_MES'), boletoController.gerarBoletosDoMes);
router.put('/:id', logMiddleware('EDITAR_BOLETO'), boletoController.updateBoleto);
router.patch('/:id/pagar', logMiddleware('MARCAR_BOLETO_PAGO'), boletoController.marcarComoPago);
router.delete('/:id', logMiddleware('EXCLUIR_BOLETO'), boletoController.deleteBoleto);

module.exports = router;
