import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgBanner from '../assets/imagemHome.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [currency, setCurrency] = useState('BRL');
  const [isLoading, setIsLoading] = useState(false);

  const nameInputRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // TODO (Back-end):
      // 1. Chamar as API's de moeda e cidade

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Salvando os dados no localstorage
      localStorage.setItem('userName', name);
      localStorage.setItem('userCity', city);
      localStorage.setItem('userCurrency', currency);

      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao processar os dados:', error);
      alert('Houve um problema ao processar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white font-sans text-[#1A1A1A] flex flex-col">
      <Navbar onFocusForm={() => nameInputRef.current?.focus()} />

      <main className="flex-1 flex items-center justify-center w-full px-6 md:px-12 lg:px-16 py-8">
        <div className="w-full max-w-384 flex flex-col xl:flex-row items-stretch justify-center gap-6">
          {/* Card Principal */}
          <div className="w-full xl:w-[65%] bg-[#FDFCF6] border-[3px] border-[#1A1A1A] rounded-4xl flex flex-col overflow-hidden shadow-sm">
            <div className="flex-1 mx-2 mt-2 mb-1 bg-[#C9B6EB] rounded-3xl p-5 lg:px-8 lg:py-6 flex flex-col lg:flex-row items-center relative overflow-hidden">
              <div className="w-full lg:w-[55%] space-y-4 z-10 flex flex-col justify-center h-full">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.2rem] xl:text-[2.5rem] font-extrabold text-[#1A1A1A] leading-[1.1] uppercase tracking-tight">
                  Dados reais
                  <br />
                  Resumos ágeis
                  <br />
                  Simplicidade total
                </h1>

                <p className="text-[#3A3A3A] text-sm leading-snug font-medium">
                  Tudo o que você precisa saber, centralizado em um único painel
                  intuitivo. Monitore em tempo real as variações do mercado
                  financeiro, acompanhe as condições climáticas da sua região e
                  mantenha-se informado com as principais notícias globais.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() =>
                      window.open(
                        'https://github.com/hugordm/projeto-api-gateway',
                        '_blank',
                        'noopener,noreferrer',
                      )
                    }
                    className="bg-transparent border-2 border-[#38263D]/30 text-[#38263D] px-5 py-1.5 rounded-full text-sm font-bold hover:bg-white/20 transition-colors"
                  >
                    Ver Repositório
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-[45%] mt-4 lg:mt-0 flex justify-end items-center h-full">
                <img
                  src={imgBanner}
                  alt="Ilustração de Destaque"
                  className="w-full h-auto max-h-45 lg:max-h-57.5 object-contain mix-blend-multiply opacity-90 scale-110 lg:scale-125 lg:origin-right translate-x-6 lg:translate-x-12"
                />
              </div>
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-[#1A1A1A] font-bold text-xs lg:text-sm w-full shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-lg leading-none">·</span> Dados em Tempo
                Real
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg leading-none">·</span> Insights
                Instantâneos
              </div>
              <div className="flex items-center gap-1.5 md:flex">
                <span className="text-lg leading-none">·</span> Organização
                Inteligente
              </div>
            </div>
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
                  onChange={(e) => setCity(e.target.value)}
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
                  <option value="BRL">Real Brasileiro (BRL)</option>
                  <option value="USD">Dólar Americano (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1A1A1A] text-white hover:bg-[#C9B6EB] hover:text-[#1A1A1A] font-bold py-3 rounded-lg transition-colors duration-300 mt-4 shadow-md text-sm flex justify-center items-center h-11.5 disabled:opacity-70 disabled:cursor-not-allowed"
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
