import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useRef, useState } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import imgBanner from '../assets/imagemHome.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function CentralizarMapa({ lat, lon }) {
  const map = useMap();
  if (lat && lon) {
    map.setView([lat, lon], 10);
  }
  return null;
}

function CliqueNoMapa({ onCidade }) {
  const urlBase = import.meta.env.VITE_API_URL;

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const resposta = await fetch(
          `${urlBase}/api/reverseGeocoding?lat=${lat}&lon=${lng}`,
        );
        const dados = await resposta.json();
        if (dados.name) {
          onCidade(dados.name, lat, lng);
        }
      } catch (erro) {
        console.log('Erro ao buscar cidade:', erro);
      }
    },
  });
  return null;
}

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [coordenadas, setCoordenadas] = useState(null);
  const [currencyError, setCurrencyError] = useState(false);

  const [selectedCurrencies, setSelectedCurrencies] = useState(['USD', 'EUR']);

  const nameInputRef = useRef(null);

  const moedasDisponiveis = [
    { code: 'USD', name: 'Dólar (USD)' },
    { code: 'EUR', name: 'Euro (EUR)' },
    { code: 'GBP', name: 'Libra (GBP)' },
    { code: 'JPY', name: 'Iene (JPY)' },
    { code: 'AUD', name: 'Dólar Aus. (AUD)' },
    { code: 'CAD', name: 'Dólar Can. (CAD)' },
    { code: 'CHF', name: 'Franco (CHF)' },
    { code: 'CNY', name: 'Yuan (CNY)' },
  ];

  const toggleCurrency = (code) => {
    setSelectedCurrencies((prev) => {
      const newSelection = prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code];

      if (newSelection.length > 0) {
        setCurrencyError(false);
      }

      return newSelection;
    });
  };

  const buscarCoordenadas = async (nomeCidade) => {
    if (!nomeCidade || nomeCidade.length < 3) return;
    try {
      const urlBase = import.meta.env.VITE_API_URL;
      const resposta = await fetch(
        `${urlBase}/api/geocoding?cidade=${encodeURIComponent(nomeCidade)}`,
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

    if (selectedCurrencies.length === 0) {
      setCurrencyError(true);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('userName', name);
      localStorage.setItem('userCity', city);
      localStorage.setItem('userCurrencies', selectedCurrencies.join(','));
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro:', error);
      alert('Houve um problema. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-dvh lg:h-dvh lg:overflow-hidden bg-white font-sans text-[#1A1A1A] flex flex-col">
      <Navbar onFocusForm={() => nameInputRef.current?.focus()} />

      <main className="w-full flex-1 overflow-y-auto flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-3 md:py-4">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-6">
          <div className="w-full lg:w-[62%] bg-[#FDFCF6] border-[3px] border-[#1A1A1A] rounded-3xl lg:rounded-4xl flex flex-col overflow-hidden shadow-sm">
            <div className="flex-1 mx-2 mt-2 mb-1 bg-[#C9B6EB] rounded-2xl lg:rounded-3xl p-5 lg:px-8 lg:py-6 flex flex-col sm:flex-row lg:flex-row items-center relative overflow-hidden gap-4">
              <div className="w-full sm:w-[60%] lg:w-[55%] space-y-3 lg:space-y-4 z-10 flex flex-col justify-center h-full">
                <h1 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] xl:text-[2.5rem] font-extrabold text-[#1A1A1A] leading-[1.1] uppercase tracking-tight">
                  Dados reais
                  <br />
                  Resumos ágeis
                  <br />
                  Simplicidade total
                </h1>

                <p className="text-[#3A3A3A] text-xs sm:text-sm leading-snug font-medium">
                  Tudo o que você precisa saber, centralizado em um único painel
                  intuitivo. Monitore em tempo real as variações do mercado
                  financeiro, acompanhe as condições climáticas da sua região e
                  mantenha-se informado com as principais notícias globais.
                </p>

                <div className="pt-1">
                  <button
                    onClick={() =>
                      window.open(
                        'https://github.com/hugordm/projeto-api-gateway',
                        '_blank',
                        'noopener,noreferrer',
                      )
                    }
                    className="bg-transparent cursor-pointer border-2 border-[#38263D]/30 text-[#38263D] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-white/20 transition-colors"
                  >
                    Ver Repositório
                  </button>
                </div>
              </div>

              <div className="w-full sm:w-[40%] lg:w-[45%] flex justify-end items-center h-full">
                <img
                  src={imgBanner}
                  alt="Ilustração de Destaque"
                  className="w-full h-auto max-h-40 sm:max-h-48 lg:max-h-none object-contain mix-blend-multiply opacity-90 scale-105 sm:scale-110 lg:scale-125 lg:origin-right translate-x-0 sm:translate-x-4 lg:translate-x-12"
                />
              </div>
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1 py-3 px-2 text-[#1A1A1A] font-bold text-[10px] sm:text-xs lg:text-sm w-full shrink-0 border-t-2 border-[#1A1A1A]/10 lg:border-t-0">
              <div className="flex items-center gap-1">
                <span className="text-lg leading-none">·</span> Dados em Tempo
                Real
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg leading-none">·</span> Insights
                Instantâneos
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg leading-none">·</span> Organização
                Inteligente
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[38%] bg-white border-[3px] border-[#1A1A1A] rounded-3xl lg:rounded-4xl p-5 sm:p-6 lg:p-8 flex flex-col justify-center relative shadow-[4px_4px_0px_#1A1A1A]">
            <div className="mb-3 lg:mb-4">
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1A1A1A] mb-1 tracking-tight">
                Quase lá!
              </h2>
              <p className="text-gray-500 text-[11px] sm:text-xs font-medium leading-snug">
                Personalize a sua experiência no painel para começarmos.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-2 sm:space-y-3">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#1A1A1A] mb-1">
                  Como quer ser chamado?
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João"
                  className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-[#38263D] focus:ring-2 focus:ring-[#C9B6EB] outline-none transition-colors font-medium text-xs sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#1A1A1A] mb-1">
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
                  className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-[#38263D] outline-none transition-colors font-medium text-xs sm:text-sm"
                  required
                />

                <div className="h-24 sm:h-28 md:h-32 w-full rounded-lg mt-2 overflow-hidden border border-gray-200 isolation-blur relative z-0">
                  <MapContainer
                    center={
                      coordenadas
                        ? [coordenadas.lat, coordenadas.lon]
                        : [-15, -50]
                    }
                    zoom={coordenadas ? 10 : 4}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                    />
                    {coordenadas && (
                      <>
                        <CentralizarMapa
                          lat={coordenadas.lat}
                          lon={coordenadas.lon}
                        />
                        <Marker position={[coordenadas.lat, coordenadas.lon]} />
                      </>
                    )}
                    <CliqueNoMapa
                      onCidade={(nome, lat, lng) => {
                        setCity(nome);
                        setCoordenadas({ lat, lon: lng });
                      }}
                    />
                  </MapContainer>
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Moedas de interesse (Selecione uma ou mais)
                </label>
                <div className="flex flex-wrap gap-2">
                  {moedasDisponiveis.map((m) => (
                    <button
                      key={m.code}
                      type="button"
                      onClick={() => toggleCurrency(m.code)}
                      className={`cursor-pointer px-2 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-colors border-2 ${
                        selectedCurrencies.includes(m.code)
                          ? 'bg-[#38263D] text-white border-[#38263D]'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-[#C9B6EB]'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
                {currencyError && (
                  <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-500 text-xs font-bold ">
                    <span>⚠️</span> Selecione pelo menos uma moeda.
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1A1A1A] cursor-pointer text-white hover:bg-[#C9B6EB] hover:text-[#1A1A1A] font-bold py-2.5 rounded-lg transition-colors duration-300 mt-2 shadow-md text-xs sm:text-sm flex justify-center items-center h-10 sm:h-11 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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
