const logService = require('../services/logService');

// Middleware para registrar automaticamente logs de transações
const logMiddleware = (action) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Registrar log apenas para operações que modificam dados (POST, PUT, DELETE, PATCH)
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
        // Verificar se a resposta foi bem-sucedida (status 200-299)
        const statusCode = res.statusCode;
        if (statusCode >= 200 && statusCode < 300) {
          const usuario = req.user ? req.user.nome : 'Sistema';
          const usuarioId = req.user ? req.user.id : null;
          const sql = `${req.method} ${req.originalUrl} - ${action}`;
          
          // Registrar o log de forma assíncrona
          logService.registrarTransacao(usuario, action || req.method, sql, usuarioId)
            .catch(error => console.error('Erro ao registrar log:', error));
        }
      }
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

module.exports = logMiddleware;
