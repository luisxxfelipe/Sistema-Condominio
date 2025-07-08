const express = require('express');
const avisoController = require('../controllers/avisoController');
const logMiddleware = require('../middlewares/logMiddleware');

const router = express.Router();

// Rotas para avisos
router.get('/', avisoController.getAllAvisos);
router.get('/recentes', avisoController.getAvisosRecentes);
router.get('/:id', avisoController.getAvisoById);
router.post('/', logMiddleware('CRIAR_AVISO'), avisoController.createAviso);
router.put('/:id', logMiddleware('EDITAR_AVISO'), avisoController.updateAviso);
router.delete('/:id', logMiddleware('EXCLUIR_AVISO'), avisoController.deleteAviso);

module.exports = router;
