const express = require('express');
const router = express.Router();

const moradorRoutes = require('./morador.routes');
const unidadeRoutes = require('./unidade.routes');
const usuarioRoutes = require('./usuario.routes');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem-vindo à API do Condomínio' });
});

router.use('/usuarios', usuarioRoutes);
router.use('/moradores', moradorRoutes);
router.use('/unidades', unidadeRoutes);

module.exports = router;
