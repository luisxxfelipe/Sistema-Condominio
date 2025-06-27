const express = require('express');
const visitanteController = require('../controllers/visitanteController');

const router = express.Router();

// Rotas para visitantes
router.get('/', visitanteController.getAllVisitantes);
router.get('/:id', visitanteController.getVisitanteById);
router.get('/unidade/:unidadeId', visitanteController.getVisitantesByUnidade);
router.post('/', visitanteController.createVisitante);
router.put('/:id', visitanteController.updateVisitante);
router.delete('/:id', visitanteController.deleteVisitante);

module.exports = router;
