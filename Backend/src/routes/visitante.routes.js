const express = require('express');
const visitanteController = require('../controllers/visitanteController');
const logMiddleware = require('../middlewares/logMiddleware');

const router = express.Router();

// Rotas para visitantes
router.get('/', visitanteController.getAllVisitantes);
router.get('/:id', visitanteController.getVisitanteById);
router.get('/unidade/:unidadeId', visitanteController.getVisitantesByUnidade);
router.post('/', logMiddleware('CRIAR_VISITANTE'), visitanteController.createVisitante);
router.put('/:id', logMiddleware('EDITAR_VISITANTE'), visitanteController.updateVisitante);
router.delete('/:id', logMiddleware('EXCLUIR_VISITANTE'), visitanteController.deleteVisitante);

module.exports = router;
