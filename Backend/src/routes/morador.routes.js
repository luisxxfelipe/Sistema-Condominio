const express = require('express');
const router = express.Router();
const moradorController = require('../controllers/moradorController');
const logMiddleware = require('../middlewares/logMiddleware');

router.get('/', moradorController.getAllMoradores);
router.get('/cpf/:cpf', moradorController.getMoradorByCpf);
router.get('/unidade/:unidadeId', moradorController.getMoradoresByUnidade);
router.get('/:id', moradorController.getMoradorById);
router.post('/', logMiddleware('CRIAR_MORADOR'), moradorController.createMorador);
router.put('/:id', logMiddleware('EDITAR_MORADOR'), moradorController.updateMorador);
router.delete('/:id', logMiddleware('EXCLUIR_MORADOR'), moradorController.deleteMorador);

module.exports = router;