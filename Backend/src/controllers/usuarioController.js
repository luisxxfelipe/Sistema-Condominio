const usuarioService = require("../services/usuarioService");
const bcrypt = require('bcryptjs');

const usuarioController = {
  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await usuarioService.getAll();
      res.status(200).json(usuarios || []);
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
      const { nome, login, senha, tipoPerfil } = req.body;
      
      // Validar campos obrigatórios
      if (!nome) {
        return res.status(400).json({ 
          message: "Nome é obrigatório" 
        });
      }
      
      if (!login) {
        return res.status(400).json({ 
          message: "Login é obrigatório" 
        });
      }
      
      if (!senha) {
        return res.status(400).json({ 
          message: "Senha é obrigatória" 
        });
      }
      
      if (!tipoPerfil) {
        return res.status(400).json({ 
          message: "Tipo de perfil é obrigatório" 
        });
      }
      
      // Validar tipo de perfil
      const tiposPermitidos = ['convidado', 'leitura', 'escrita', 'gerente', 'admin', 'auditor'];
      if (!tiposPermitidos.includes(tipoPerfil)) {
        return res.status(400).json({ 
          message: "Tipo de perfil inválido. Valores aceitos: " + tiposPermitidos.join(', ')
        });
      }

      // Criptografar a senha
      const senhaHash = await bcrypt.hash(senha, 10);
      
      // Preparar dados com senha criptografada
      const dadosUsuario = {
        nome,
        login,
        senhaHash,
        tipoPerfil
      };

      const usuario = await usuarioService.create(dadosUsuario);
      
      // Remover senhaHash da resposta
      const { senhaHash: _, ...usuarioSemSenha } = usuario;
      
      res.status(201).json(usuarioSemSenha);
    } catch (error) {
      // Tratar erro de login duplicado
      if (error.code === 'P2002' && error.meta?.target?.includes('login')) {
        return res.status(400).json({ 
          message: "Este login já está sendo utilizado por outro usuário" 
        });
      }
      
      res
        .status(500)
        .json({ message: "Erro ao criar usuário", error: error.message });
    }
  },

  updateUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const { nome, login, senha, tipoPerfil } = req.body;
      
      // Validar campos obrigatórios
      if (!nome) {
        return res.status(400).json({ 
          message: "Nome é obrigatório" 
        });
      }
      
      if (!login) {
        return res.status(400).json({ 
          message: "Login é obrigatório" 
        });
      }
      
      if (!tipoPerfil) {
        return res.status(400).json({ 
          message: "Tipo de perfil é obrigatório" 
        });
      }
      
      // Validar tipo de perfil
      const tiposPermitidos = ['convidado', 'leitura', 'escrita', 'gerente', 'admin', 'auditor'];
      if (!tiposPermitidos.includes(tipoPerfil)) {
        return res.status(400).json({ 
          message: "Tipo de perfil inválido. Valores aceitos: " + tiposPermitidos.join(', ')
        });
      }
      
      // Preparar dados para atualização
      const dadosUsuario = {
        nome,
        login,
        tipoPerfil
      };

      // Se uma nova senha foi fornecida, criptografá-la
      if (senha) {
        dadosUsuario.senhaHash = await bcrypt.hash(senha, 10);
      }

      const usuario = await usuarioService.update(id, dadosUsuario);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      
      // Remover senhaHash da resposta
      const { senhaHash: _, ...usuarioSemSenha } = usuario;
      
      res.status(200).json(usuarioSemSenha);
    } catch (error) {
      // Tratar erro de login duplicado
      if (error.code === 'P2002' && error.meta?.target?.includes('login')) {
        return res.status(400).json({ 
          message: "Este login já está sendo utilizado por outro usuário" 
        });
      }
      
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
