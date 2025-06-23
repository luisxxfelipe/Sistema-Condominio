const usuarioService = require("../services/usuarioService");

const usuarioController = {
  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await usuarioService.getAll();
      if (!usuarios || usuarios.length === 0) {
        return res.status(404).json({ message: "Nenhum usuário encontrado" });
      }
      res.status(200).json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar usuários", error: error.message });
    }
  },

  getUsuarioById: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.getById(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar usuário", error: error.message });
    }
  },

  createUsuario: async (req, res) => {
    try {
      const usuario = await usuarioService.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar usuário", error: error.message });
    }
  },

  updateUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.update(id, req.body);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar usuário", error: error.message });
    }
  },

  deleteUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.delete(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir usuário", error: error.message });
    }
  },
};

module.exports = usuarioController;
