const express = require('express');
const relatorioController = require('../controllers/relatorioController');

const router = express.Router();

// Rotas para relatórios
router.get('/ocupacao', relatorioController.getRelatorioOcupacao);
router.get('/financeiro', relatorioController.getRelatorioFinanceiro);
router.get('/reservas', relatorioController.getRelatorioReservas);
router.get('/visitantes', relatorioController.getRelatorioVisitantes);
router.get('/prestadores', relatorioController.getRelatorioPrestadores);
router.get('/dashboard', relatorioController.getDashboardResumo);
router.get('/inadimplencia', relatorioController.getRelatorioInadimplencia);

module.exports = router;
