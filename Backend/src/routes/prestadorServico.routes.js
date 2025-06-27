const express = require('express');
const prestadorServicoController = require('../controllers/prestadorServicoController');

const router = express.Router();

// Rotas para prestadores de serviço
router.get('/', prestadorServicoController.getAllPrestadores);
router.get('/ativos', prestadorServicoController.getPrestadoresAtivos);
router.get('/:id', prestadorServicoController.getPrestadorById);
router.post('/', prestadorServicoController.createPrestador);
router.put('/:id', prestadorServicoController.updatePrestador);
router.patch('/:id/saida', prestadorServicoController.registrarSaida);
router.delete('/:id', prestadorServicoController.deletePrestador);

module.exports = router;
