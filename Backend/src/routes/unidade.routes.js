const express = require('express');
const router = express.Router();
const unidadeController = require('../controllers/unidadeController');
const logMiddleware = require('../middlewares/logMiddleware');

router.get('/', unidadeController.getAllUnidades);
router.get('/:id', unidadeController.getUnidadeById);
router.post('/criar', logMiddleware('CRIAR_UNIDADE'), unidadeController.createUnidade);
router.put('/atualizar/:id', logMiddleware('EDITAR_UNIDADE'), unidadeController.updateUnidade);
router.delete('/excluir/:id', logMiddleware('EXCLUIR_UNIDADE'), unidadeController.deleteUnidade);

module.exports = router;