const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

// Rotas para logs (apenas para usuários com permissão de auditoria)
router.get('/', logController.getAllLogs);
router.get('/periodo', logController.getLogsPorPeriodo);
router.get('/usuario/:usuarioId', logController.getLogsByUsuario);
router.get('/acao/:acao', logController.getLogsPorAcao);
router.get('/:id', logController.getLogById);
router.post('/', logController.createLog);
router.delete('/:id', logController.deleteLog);
router.delete('/limpar/antigos', logController.limparLogsAntigos);

module.exports = router;
