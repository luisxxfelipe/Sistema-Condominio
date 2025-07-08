import { useState, useEffect, useContext, createContext } from 'react';
import authService from '../services/authService';
import AccessDenied from '../components/common/AccessDenied';

const PermissionContext = createContext();

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};

export const PermissionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    const usuarioLogado = authService.getUsuarioLogado();
    if (usuarioLogado) {
      setUser(usuarioLogado);
      setPermissions(usuarioLogado.permissoes);
    }
  }, []);

  const hasAccess = (module) => {
    if (!permissions) return false;
    return permissions.modules.includes(module);
  };

  const canPerformAction = (action) => {
    if (!permissions) return false;
    return permissions.actions.includes(action);
  };

  const updateUser = (userData) => {
    setUser(userData);
    setPermissions(userData.permissoes);
  };

  const value = {
    user,
    permissions,
    hasAccess,
    canPerformAction,
    updateUser
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

// HOC para proteger componentes baseado em permissões
export const withPermission = (WrappedComponent, requiredModule, requiredAction = 'read') => {
  return (props) => {
    const { hasAccess, canPerformAction } = usePermissions();
    
    if (!hasAccess(requiredModule) || !canPerformAction(requiredAction)) {
      return <AccessDenied message={`Você não tem permissão para acessar ${requiredModule}.`} />;
    }
    
    return <WrappedComponent {...props} />;
  };
};
