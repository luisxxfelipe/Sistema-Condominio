const express = require('express');
const reservaController = require('../controllers/reservaController');

const router = express.Router();

// Rotas para reservas
router.get('/', reservaController.getAllReservas);
router.get('/verificar-disponibilidade', reservaController.verificarDisponibilidade);
router.get('/periodo', reservaController.getReservasPorPeriodo);
router.get('/:id', reservaController.getReservaById);
router.get('/unidade/:unidadeId', reservaController.getReservasByUnidade);
router.get('/area/:areaComumId', reservaController.getReservasByAreaComum);
router.post('/', reservaController.createReserva);
router.put('/:id', reservaController.updateReserva);
router.delete('/:id', reservaController.deleteReserva);

module.exports = router;
