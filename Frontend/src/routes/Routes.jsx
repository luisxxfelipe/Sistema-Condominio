import { Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from '../pages/Login/index.jsx';
import CadastroPage from '../pages/Cadastro/index.jsx';

export default function Rotas(){
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

