const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/criar', usuarioController.createUsuario);
router.put('/atualizar/:id', usuarioController.updateUsuario);
router.delete('/excluir/:id', usuarioController.deleteUsuario);

module.exports = router;