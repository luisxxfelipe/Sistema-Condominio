import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/Login/index.jsx'
import CadastroPage from '../pages/Cadastro/index.jsx'
import Dashboard from '../pages/Dashboard/index.jsx'
import Moradores from '../pages/Moradores/index.jsx'
import Unidades from '../pages/Unidades/index.jsx'
import Visitantes from '../pages/Visitantes/index.jsx'
import Reservas from '../pages/Reservas/index.jsx'
import Boletos from '../pages/Boletos/index.jsx'
import Avisos from '../pages/Avisos/index.jsx'
import Usuarios from '../pages/Usuarios/index.jsx'
import AreasComuns from '../pages/AreasComuns/index.jsx'
import { MainLayout } from '../components/layout/MainLayout'

// Componente para rotas protegidas
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  return <MainLayout>{children}</MainLayout>
}

export default function Rotas() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      
      {/* Rotas protegidas */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/moradores" element={
        <ProtectedRoute>
          <Moradores />
        </ProtectedRoute>
      } />
      <Route path="/unidades" element={
        <ProtectedRoute>
          <Unidades />
        </ProtectedRoute>
      } />
      <Route path="/visitantes" element={
        <ProtectedRoute>
          <Visitantes />
        </ProtectedRoute>
      } />
      <Route path="/reservas" element={
        <ProtectedRoute>
          <Reservas />
        </ProtectedRoute>
      } />
      <Route path="/areas-comuns" element={
        <ProtectedRoute>
          <AreasComuns />
        </ProtectedRoute>
      } />
      <Route path="/boletos" element={
        <ProtectedRoute>
          <Boletos />
        </ProtectedRoute>
      } />
      <Route path="/avisos" element={
        <ProtectedRoute>
          <Avisos />
        </ProtectedRoute>
      } />
      <Route path="/usuarios" element={
        <ProtectedRoute>
          <Usuarios />
        </ProtectedRoute>
      } />
      
      {/* Redirecionamentos */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

