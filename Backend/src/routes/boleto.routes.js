const express = require('express');
const boletoController = require('../controllers/boletoController');

const router = express.Router();

// Rotas para boletos
router.get('/', boletoController.getAllBoletos);
router.get('/pendentes', boletoController.getBoletosPendentes);
router.get('/:id', boletoController.getBoletoById);
router.get('/unidade/:unidadeId', boletoController.getBoletosByUnidade);
router.post('/', boletoController.createBoleto);
router.post('/gerar-mes', boletoController.gerarBoletosDoMes);
router.put('/:id', boletoController.updateBoleto);
router.patch('/:id/pagar', boletoController.marcarComoPago);
router.delete('/:id', boletoController.deleteBoleto);

module.exports = router;
