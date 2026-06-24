import { useState } from 'react';
import CardClima from './CardClima';
import CardMoeda from './CardMoeda';
import GeradorInsight from './GeradorInsight';

const dadosFicticios = {
  insight:
    'O cenário econômico atual mostra uma valorização sutil do Dólar e do Euro frente ao Real devido à volatilidade externa. Para as cidades selecionadas, o clima permanece estável com queda gradual de temperatura ao anoitecer, característico da estação atual. Recomenda-se cautela em operações cambiais de curto prazo.',
  cidades: [
    {
      id: 1,
      nome: 'São Paulo, BR',
      temp: '26°C',
      condicao: 'Ensolarado',
      umidade: '65%',
      vento: '14 km/h',
      estacao: 'Outono',
    },
    {
      id: 2,
      nome: 'Recife, BR',
      temp: '30°C',
      condicao: 'Parcialmente Nublado',
      umidade: '78%',
      vento: '22 km/h',
      estacao: 'Outono',
    },
  ],
  moedas: [
    {
      id: 1,
      nome: 'Dólar',
      codigo: 'USD',
      valor: '5.42',
      variacao: '+0.45%',
      historico: [5.38, 5.4, 5.39, 5.41, 5.42],
    },
    {
      id: 2,
      nome: 'Euro',
      codigo: 'EUR',
      valor: '5.85',
      variacao: '-0.12%',
      historico: [5.9, 5.88, 5.89, 5.86, 5.85],
    },
  ],
};

function Dashboard() {
  const [data, setData] = useState(dadosFicticios);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const nomeUsuario = localStorage.getItem('userName') || data.usuario;

  /* useEffect(() => {
    async function buscarDashboard() {
      try {
        setLoading(true);
        const response = await axios.get('/api/dashboard');
        const result = response.data;

        setData(result);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    buscarDashboard();
  }, []); */

  if (loading) {
    return (
      <div className="w-full max-w-6xl bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex justify-center items-center min-h-100">
        <p className="text-slate-500 animate-pulse font-medium">
          Carregando seu painel personalizado...
        </p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-5 bg-red-50 text-red-600 rounded-2xl border border-red-100 w-full max-w-6xl shadow-sm">
        <p className="font-medium">Erro ao carregar dados: {erro}</p>
      </div>
    );
  }

  if (!data) return null;


  return (
    <div className="w-full max-w-6xl flex flex-col gap-10 p-4 md:p-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Olá, <span className="text-[#c8b7e9]">{nomeUsuario}</span>!
        </h1>
        <p className="text-sm text-slate-400">
          Aqui está o resumo em tempo real do seu monitoramento personalizado.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
          🌤️ Clima e Tempo nas Cidades Selecionadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.cidades.map((cidade) => (
            <CardClima key={cidade.id} cidade={cidade} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
          💼 Cotações e Tendências de Mercado
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.moedas.map((moeda) => (
            <CardMoeda key={moeda.id} moeda={moeda} />
          ))}
        </div>
      </div>

      <GeradorInsight textoIA={data.insight} />
    </div>
  );
}

export default Dashboard;
