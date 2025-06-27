const express = require('express');
const avisoController = require('../controllers/avisoController');

const router = express.Router();

// Rotas para avisos
router.get('/', avisoController.getAllAvisos);
router.get('/recentes', avisoController.getAvisosRecentes);
router.get('/:id', avisoController.getAvisoById);
router.post('/', avisoController.createAviso);
router.put('/:id', avisoController.updateAviso);
router.delete('/:id', avisoController.deleteAviso);

module.exports = router;
