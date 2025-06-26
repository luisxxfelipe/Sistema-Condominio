const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const authService = {
  async login(login, senha) {
    try {
      // Buscar usuário pelo login
      const usuario = await prisma.usuario.findUnique({
        where: { login: login },
        select: {
          id: true,
          nome: true,
          login: true,
          senhaHash: true,
          tipoPerfil: true
        }
      });

      // Verificar se usuário existe
      if (!usuario) {
        return {
          sucesso: false,
          message: "Usuário não encontrado"
        };
      }

      // Verificar senha
      const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
      
      if (!senhaValida) {
        return {
          sucesso: false,
          message: "Senha incorreta"
        };
      }

      // Remover senha do retorno
      const { senhaHash, ...usuarioSemSenha } = usuario;

      return {
        sucesso: true,
        usuario: usuarioSemSenha
      };

    } catch (error) {
      console.error('Erro no login:', error);
      return {
        sucesso: false,
        message: "Erro interno do servidor"
      };
    }
  },

  async register(nome, login, senha, tipoPerfil = 'usuario') {
    try {
      // Verificar se usuário já existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { login: login }
      });

      if (usuarioExistente) {
        return {
          sucesso: false,
          message: "Usuário já existe com este login"
        };
      }

      // Criptografar senha
      const senhaHash = await bcrypt.hash(senha, 10);

      // Criar usuário
      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          login,
          senhaHash,
          tipoPerfil
        },
        select: {
          id: true,
          nome: true,
          login: true,
          tipoPerfil: true
        }
      });

      return {
        sucesso: true,
        usuario: novoUsuario
      };

    } catch (error) {
      console.error('Erro no registro:', error);
      return {
        sucesso: false,
        message: "Erro interno do servidor"
      };
    }
  }
};

module.exports = authService;
