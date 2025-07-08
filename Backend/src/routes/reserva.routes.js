const express = require('express');
const reservaController = require('../controllers/reservaController');
const logMiddleware = require('../middlewares/logMiddleware');

const router = express.Router();

// Rotas para reservas
router.get('/', reservaController.getAllReservas);
router.get('/verificar-disponibilidade', reservaController.verificarDisponibilidade);
router.get('/periodo', reservaController.getReservasPorPeriodo);
router.get('/:id', reservaController.getReservaById);
router.get('/unidade/:unidadeId', reservaController.getReservasByUnidade);
router.get('/area/:areaComumId', reservaController.getReservasByAreaComum);
router.post('/', logMiddleware('CRIAR_RESERVA'), reservaController.createReserva);
router.put('/:id', logMiddleware('EDITAR_RESERVA'), reservaController.updateReserva);
router.delete('/:id', logMiddleware('EXCLUIR_RESERVA'), reservaController.deleteReserva);

module.exports = router;
