const express = require('express');
const areaComumController = require('../controllers/areaComumController');
const logMiddleware = require('../middlewares/logMiddleware');

const router = express.Router();

// Rotas para áreas comuns
router.get('/', areaComumController.getAllAreasComuns);
router.get('/disponiveis', areaComumController.getAreasDisponiveis);
router.get('/:id', areaComumController.getAreaComumById);
router.post('/', logMiddleware('CRIAR_AREA_COMUM'), areaComumController.createAreaComum);
router.put('/:id', logMiddleware('EDITAR_AREA_COMUM'), areaComumController.updateAreaComum);
router.delete('/:id', logMiddleware('EXCLUIR_AREA_COMUM'), areaComumController.deleteAreaComum);

module.exports = router;
