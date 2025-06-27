const express = require('express');
const router = express.Router();
const moradorController = require('../controllers/moradorController');

router.get('/', moradorController.getAllMoradores);
router.get('/cpf/:cpf', moradorController.getMoradorByCpf);
router.get('/unidade/:unidadeId', moradorController.getMoradoresByUnidade);
router.get('/:id', moradorController.getMoradorById);
router.post('/', moradorController.createMorador);
router.put('/:id', moradorController.updateMorador);
router.delete('/:id', moradorController.deleteMorador);

module.exports = router;