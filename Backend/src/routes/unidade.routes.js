const express = require('express');
const router = express.Router();
const unidadeController = require('../controllers/unidadeController');


router.get('/', unidadeController.getAllUnidades);
router.get('/:id', unidadeController.getUnidadeById);
router.post('/criar', unidadeController.createUnidade);
router.put('/atualizar/:id', unidadeController.updateUnidade);
router.delete('/excluir/:id', unidadeController.deleteUnidade);

module.exports = router;