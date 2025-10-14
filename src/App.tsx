import { Routes, Route } from 'react-router';
import Home from './Pages/Home';
import EditarPeca from './Pages/EditarPeca';
import NovaPeca from './Pages/NovaPeca';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nova" element={<NovaPeca />} />
      <Route path="/editar/:id" element={<EditarPeca />} />
    </Routes>
  );
}

export default App;
