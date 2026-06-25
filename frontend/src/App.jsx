import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';


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
      </Routes>
    </BrowserRouter>
  );
}

export default App;