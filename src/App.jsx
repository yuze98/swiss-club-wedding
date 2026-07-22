import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Sec from './pages/Sec';
import SecGate from './pages/SecGate';
import Invitation from './pages/Invitation';
import './index.css';

function ProtectedSec() {
  const unlocked = sessionStorage.getItem('sec_unlocked') === 'true';
  return unlocked ? <Sec /> : <Navigate to="/sec-gate" replace />;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sec-gate" element={<SecGate />} />
        <Route path="/sec" element={<ProtectedSec />} />
        <Route path="/invitation" element={<Invitation />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
