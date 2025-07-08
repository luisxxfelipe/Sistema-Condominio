// Configuração de permissões por tipo de perfil
const PERMISSIONS = {
  'admin': {
    name: 'Administrador Geral',
    modules: ['dashboard', 'moradores', 'unidades', 'visitantes', 'reservas', 'areas-comuns', 'boletos', 'avisos', 'usuarios', 'logs'],
    actions: ['create', 'read', 'update', 'delete', 'manage_users', 'manage_db']
  },
  'gerente': {
    name: 'Gerente/Supervisor',
    modules: ['dashboard', 'moradores', 'unidades', 'visitantes', 'reservas', 'areas-comuns', 'boletos', 'avisos'],
    actions: ['create', 'read', 'update', 'delete']
  },
  'escrita': {
    name: 'Operacional - Escrita',
    modules: ['dashboard', 'moradores', 'unidades', 'visitantes', 'reservas', 'boletos'],
    actions: ['create', 'read', 'update']
  },
  'leitura': {
    name: 'Operacional - Leitura',
    modules: ['dashboard', 'moradores', 'unidades', 'boletos', 'avisos'],
    actions: ['read']
  },
  'convidado': {
    name: 'Convidado/Consulta',
    modules: ['dashboard', 'avisos'],
    actions: ['read']
  },
  'auditor': {
    name: 'Manutenção/Auditor',
    modules: ['dashboard', 'logs'],
    actions: ['read', 'audit']
  }
};

const getUserPermissions = (tipoPerfil) => {
  return PERMISSIONS[tipoPerfil] || PERMISSIONS['convidado'];
};

const hasAccess = (userProfile, module) => {
  const permissions = getUserPermissions(userProfile);
  return permissions.modules.includes(module);
};

const canPerformAction = (userProfile, action) => {
  const permissions = getUserPermissions(userProfile);
  return permissions.actions.includes(action);
};

module.exports = {
  PERMISSIONS,
  getUserPermissions,
  hasAccess,
  canPerformAction
};
