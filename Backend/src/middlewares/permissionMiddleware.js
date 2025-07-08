const { hasAccess, canPerformAction } = require('../utils/permissions');

const checkPermission = (requiredModule, requiredAction = 'read') => {
  return (req, res, next) => {
    try {
      const user = req.user; // Assumindo que o usuário está disponível via middleware de auth
      
      if (!user) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      if (!hasAccess(user.tipoPerfil, requiredModule)) {
        return res.status(403).json({ 
          message: 'Acesso negado - Módulo não permitido para seu perfil' 
        });
      }

      if (!canPerformAction(user.tipoPerfil, requiredAction)) {
        return res.status(403).json({ 
          message: 'Acesso negado - Ação não permitida para seu perfil' 
        });
      }

      next();
    } catch (error) {
      console.error('Erro na verificação de permissões:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
};

module.exports = { checkPermission };
