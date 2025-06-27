const express = require('express');
const areaComumController = require('../controllers/areaComumController');

const router = express.Router();

// Rotas para áreas comuns
router.get('/', areaComumController.getAllAreasComuns);
router.get('/disponiveis', areaComumController.getAreasDisponiveis);
router.get('/:id', areaComumController.getAreaComumById);
router.post('/', areaComumController.createAreaComum);
router.put('/:id', areaComumController.updateAreaComum);
router.delete('/:id', areaComumController.deleteAreaComum);

module.exports = router;
