import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// componente que centraliza o mapa quando a cidade muda
function CentralizarMapa({ lat, lon }) {
  const map = useMap();
  if (lat && lon) {
    map.setView([lat, lon], 10);
  }
  return null;
}

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [isLoading, setIsLoading] = useState(false);
  const [coordenadas, setCoordenadas] = useState(null);

  const nameInputRef = useRef(null);

  // busca as coordenadas da cidade quando o usuário termina de digitar
  const buscarCoordenadas = async (nomeCidade) => {
    if (!nomeCidade || nomeCidade.length < 3) return;
    try {
      const resposta = await fetch(
        `http://localhost:8000/api/geocoding?cidade=${encodeURIComponent(nomeCidade)}`
      );
      const dados = await resposta.json();
      if (dados.lat && dados.lon) {
        setCoordenadas({ lat: dados.lat, lon: dados.lon });
      }
    } catch (erro) {
      console.log('Erro ao buscar coordenadas:', erro);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('userName', name);
      localStorage.setItem('userCity', city);
      localStorage.setItem('userCurrency', currency);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro:', error);
      alert('Houve um problema. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white font-sans text-[#1A1A1A] flex flex-col">
      <Navbar onFocusForm={() => nameInputRef.current?.focus()} />

      <main className="flex-1 flex items-center justify-center w-full px-6 md:px-12 lg:px-16 py-8">
        <div className="w-full max-w-384 flex flex-col xl:flex-row items-stretch justify-center gap-6">

          {/* Mapa */}
          <div className="w-full xl:w-[65%] border-[3px] border-[#1A1A1A] rounded-4xl overflow-hidden shadow-sm" style={{ minHeight: '400px' }}>
            <MapContainer
              center={coordenadas ? [coordenadas.lat, coordenadas.lon] : [-15, -50]}
              zoom={coordenadas ? 10 : 4}
              style={{ height: '100%', minHeight: '400px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
              />
              {coordenadas && (
                <>
                  <CentralizarMapa lat={coordenadas.lat} lon={coordenadas.lon} />
                  <Marker position={[coordenadas.lat, coordenadas.lon]} />
                </>
              )}
            </MapContainer>
          </div>

          {/* Formulário */}
          <div className="w-full xl:w-[35%] bg-white border-[3px] border-[#1A1A1A] rounded-4xl p-6 lg:p-8 flex flex-col justify-center relative shadow-[4px_4px_0px_#1A1A1A]">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-extrabold text-[#1A1A1A] mb-1 tracking-tight">
                Quase lá!
              </h2>
              <p className="text-gray-500 text-xs font-medium leading-snug">
                Personalize a sua experiência no painel para começarmos.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Como quer ser chamado?
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João"
                  className="w-full border-2 border-gray-200 rounded-lg p-2.5 focus:border-[#38263D] focus:ring-2 focus:ring-[#C9B6EB] outline-none transition-colors font-medium text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Sua cidade atual
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    buscarCoordenadas(e.target.value);
                  }}
                  placeholder="Ex: Recife"
                  className="w-full border-2 border-gray-200 rounded-lg p-2.5 focus:border-[#38263D] outline-none transition-colors font-medium text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Moeda de interesse
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-2.5 focus:border-[#38263D] outline-none transition-colors font-medium text-sm bg-white"
                >
                  <option value="USD">Dólar Americano (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1A1A1A] text-white hover:bg-[#C9B6EB] hover:text-[#1A1A1A] font-bold py-3 rounded-lg transition-colors duration-300 mt-4 shadow-md text-sm flex justify-center items-center h-11.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Acessando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}