const express = require('express');
const prestadorServicoController = require('../controllers/prestadorServicoController');
const logMiddleware = require('../middlewares/logMiddleware');

const router = express.Router();

// Rotas para prestadores de serviço
router.get('/', prestadorServicoController.getAllPrestadores);
router.get('/ativos', prestadorServicoController.getPrestadoresAtivos);
router.get('/:id', prestadorServicoController.getPrestadorById);
router.post('/', logMiddleware('CRIAR_PRESTADOR'), prestadorServicoController.createPrestador);
router.put('/:id', logMiddleware('EDITAR_PRESTADOR'), prestadorServicoController.updatePrestador);
router.patch('/:id/saida', logMiddleware('REGISTRAR_SAIDA_PRESTADOR'), prestadorServicoController.registrarSaida);
router.delete('/:id', logMiddleware('EXCLUIR_PRESTADOR'), prestadorServicoController.deletePrestador);

module.exports = router;
