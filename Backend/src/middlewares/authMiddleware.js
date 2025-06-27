// Middleware de autorização baseado nos perfis definidos no trabalho
const authMiddleware = {
  // Administrador Geral - Acesso total
  adminGeral: (req, res, next) => {
    if (!req.user || req.user.tipoPerfil !== 'admin') {
      return res.status(403).json({ 
        message: 'Acesso negado. Apenas administradores gerais têm acesso.' 
      });
    }
    next();
  },

  // Gerente/Supervisor - CRUD completo em dados, sem permissão para objetos do BD
  gerente: (req, res, next) => {
    if (!req.user || !['admin', 'gerente'].includes(req.user.tipoPerfil)) {
      return res.status(403).json({ 
        message: 'Acesso negado. Permissão de gerente necessária.' 
      });
    }
    next();
  },

  // Operacional Escrita - Insert, Read, Update sem Delete
  operacionalEscrita: (req, res, next) => {
    if (!req.user || !['admin', 'gerente', 'escrita'].includes(req.user.tipoPerfil)) {
      return res.status(403).json({ 
        message: 'Acesso negado. Permissão operacional necessária.' 
      });
    }
    
    // Bloquear operações DELETE para usuários de escrita
    if (req.method === 'DELETE' && req.user.tipoPerfil === 'escrita') {
      return res.status(403).json({ 
        message: 'Acesso negado. Usuários operacionais não podem excluir dados.' 
      });
    }
    
    next();
  },

  // Operacional Leitura - Apenas leitura
  operacionalLeitura: (req, res, next) => {
    if (!req.user || !['admin', 'gerente', 'escrita', 'leitura'].includes(req.user.tipoPerfil)) {
      return res.status(403).json({ 
        message: 'Acesso negado. Login necessário.' 
      });
    }
    
    // Bloquear operações que modificam dados para usuários de leitura
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method) && req.user.tipoPerfil === 'leitura') {
      return res.status(403).json({ 
        message: 'Acesso negado. Usuários de leitura não podem modificar dados.' 
      });
    }
    
    next();
  },

  // Convidado/Consulta - Apenas views
  convidado: (req, res, next) => {
    if (!req.user || !['admin', 'gerente', 'escrita', 'leitura', 'convidado'].includes(req.user.tipoPerfil)) {
      return res.status(403).json({ 
        message: 'Acesso negado. Login necessário.' 
      });
    }
    
    // Convidados só podem acessar relatórios/views específicas
    if (req.user.tipoPerfil === 'convidado') {
      const rotasPermitidas = ['/relatorios', '/avisos'];
      const rotaPermitida = rotasPermitidas.some(rota => req.originalUrl.includes(rota));
      
      if (!rotaPermitida || ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
        return res.status(403).json({ 
          message: 'Acesso negado. Convidados têm acesso limitado.' 
        });
      }
    }
    
    next();
  },

  // Manutenção/Auditor - Logs e procedures específicas
  auditor: (req, res, next) => {
    if (!req.user || !['admin', 'auditor'].includes(req.user.tipoPerfil)) {
      return res.status(403).json({ 
        message: 'Acesso negado. Permissão de auditoria necessária.' 
      });
    }
    
    // Auditores só podem acessar logs e relatórios
    if (req.user.tipoPerfil === 'auditor') {
      const rotasPermitidas = ['/logs', '/relatorios'];
      const rotaPermitida = rotasPermitidas.some(rota => req.originalUrl.includes(rota));
      
      if (!rotaPermitida) {
        return res.status(403).json({ 
          message: 'Acesso negado. Auditores têm acesso apenas a logs e relatórios.' 
        });
      }
    }
    
    next();
  },

  // Middleware genérico que verifica se o usuário está autenticado
  autenticado: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Acesso negado. Autenticação necessária.' 
      });
    }
    next();
  }
};

module.exports = authMiddleware;
