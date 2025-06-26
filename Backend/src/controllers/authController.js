const authService = require("../services/authService");

const authController = {
  login: async (req, res) => {
    try {
      const { login, senha } = req.body;

      // Validação básica
      if (!login || !senha) {
        return res.status(400).json({ 
          message: "Login e senha são obrigatórios" 
        });
      }

      const resultado = await authService.login(login, senha);

      if (!resultado.sucesso) {
        return res.status(401).json({ 
          message: resultado.message 
        });
      }

      res.status(200).json({
        message: "Login realizado com sucesso",
        usuario: resultado.usuario
      });

    } catch (error) {
      res.status(500).json({ 
        message: "Erro interno do servidor", 
        error: error.message 
      });
    }
  },

  register: async (req, res) => {
    try {
      const { nome, login, senha, tipoPerfil } = req.body;

      // Validação básica
      if (!nome || !login || !senha) {
        return res.status(400).json({ 
          message: "Nome, login e senha são obrigatórios" 
        });
      }

      const resultado = await authService.register(nome, login, senha, tipoPerfil);

      if (!resultado.sucesso) {
        return res.status(400).json({ 
          message: resultado.message 
        });
      }

      res.status(201).json({
        message: "Usuário criado com sucesso",
        usuario: resultado.usuario
      });

    } catch (error) {
      res.status(500).json({ 
        message: "Erro interno do servidor", 
        error: error.message 
      });
    }
  }
};

module.exports = authController;
