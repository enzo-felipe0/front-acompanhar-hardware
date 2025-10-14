import { Routes, Route, Navigate } from 'react-router';
import Home from './Pages/Home';
import EditarPeca from './Pages/EditarPeca';
import NovaPeca from './Pages/NovaPeca';
import Login from './Pages/Login';
import Registrar from './Pages/Registrar';
import { estaAutenticado } from './services/auth';

// Componente para rotas protegidas
function RotaProtegida({ children }: { children: React.ReactNode }) {
  return estaAutenticado() ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />
      
      <Route path="/" element={<RotaProtegida><Home /></RotaProtegida>} />
      <Route path="/nova" element={<RotaProtegida><NovaPeca /></RotaProtegida>} />
      <Route path="/editar/:id" element={<RotaProtegida><EditarPeca /></RotaProtegida>} />
    </Routes>
  );
}

export default App;
