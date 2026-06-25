import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Mapa from './components/Mapa'; // importa o Mapa

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-8 font-sans">
              <Dashboard />
            </div>
          }
        />

        <Route path="/mapa" element={<Mapa />} /> {/* rota do mapa */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;