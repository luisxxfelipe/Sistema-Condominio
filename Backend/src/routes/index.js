const express = require('express');
const router = express.Router();

// Importar todas as rotas
const moradorRoutes = require('./morador.routes');
const unidadeRoutes = require('./unidade.routes');
const usuarioRoutes = require('./usuario.routes');
const authRoutes = require('./auth.routes');
const visitanteRoutes = require('./visitante.routes');
const prestadorServicoRoutes = require('./prestadorServico.routes');
const boletoRoutes = require('./boleto.routes');
const reservaRoutes = require('./reserva.routes');
const areaComumRoutes = require('./areaComum.routes');
const avisoRoutes = require('./aviso.routes');
const logRoutes = require('./log.routes');
const relatorioRoutes = require('./relatorio.routes');

router.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Bem-vindo à API do Sistema de Gestão de Condomínios',
    version: '1.0.0',
    endpoints: {
      auth: '/auth',
      usuarios: '/usuarios',
      moradores: '/moradores',
      unidades: '/unidades',
      visitantes: '/visitantes',
      prestadores: '/prestadores-servico',
      boletos: '/boletos',
      reservas: '/reservas',
      areasComuns: '/areas-comuns',
      avisos: '/avisos',
      logs: '/logs',
      relatorios: '/relatorios'
    }
  });
});

// Configurar todas as rotas
router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/moradores', moradorRoutes);
router.use('/unidades', unidadeRoutes);
router.use('/visitantes', visitanteRoutes);
router.use('/prestadores-servico', prestadorServicoRoutes);
router.use('/boletos', boletoRoutes);
router.use('/reservas', reservaRoutes);
router.use('/areas-comuns', areaComumRoutes);
router.use('/avisos', avisoRoutes);
router.use('/logs', logRoutes);
router.use('/relatorios', relatorioRoutes);

module.exports = router;
