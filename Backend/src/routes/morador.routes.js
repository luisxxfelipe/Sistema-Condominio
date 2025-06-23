const express = require('express');
const router = express.Router();
const moradorController = require('../controllers/moradorController');

router.get('/', moradorController.getAllMoradores);
router.get('/:id', moradorController.getMoradorById);
router.post('/criar', moradorController.createMorador);
router.put('/atualizar/:id', moradorController.updateMorador);
router.delete('/excluir/:id', moradorController.deleteMorador);


module.exports = router;