// Constantes para actions de permissões
export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE_USERS: 'manage_users',
  MANAGE_DB: 'manage_db',
  AUDIT: 'audit'
};

// Constantes para módulos
export const MODULES = {
  DASHBOARD: 'dashboard',
  MORADORES: 'moradores',
  UNIDADES: 'unidades',
  VISITANTES: 'visitantes',
  RESERVAS: 'reservas',
  AREAS_COMUNS: 'areas-comuns',
  BOLETOS: 'boletos',
  AVISOS: 'avisos',
  USUARIOS: 'usuarios',
  LOGS: 'logs'
};

// Helper function para verificar se um perfil permite apenas leitura
export const isReadOnlyProfile = (tipoPerfil) => {
  return ['leitura', 'convidado', 'auditor'].includes(tipoPerfil);
};

// Helper function para verificar se um perfil não permite delete
export const cannotDelete = (tipoPerfil) => {
  return ['escrita', 'leitura', 'convidado', 'auditor'].includes(tipoPerfil);
};
