const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const logMiddleware = require('../middlewares/logMiddleware');

router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/criar', logMiddleware('CRIAR_USUARIO'), usuarioController.createUsuario);
router.put('/atualizar/:id', logMiddleware('EDITAR_USUARIO'), usuarioController.updateUsuario);
router.delete('/excluir/:id', logMiddleware('EXCLUIR_USUARIO'), usuarioController.deleteUsuario);

module.exports = router;