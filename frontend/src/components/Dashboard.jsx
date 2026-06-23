import { useState } from 'react';
import Banner from './Banner';
import CardClima from './CardClima';
import CardMoeda from './CardMoeda';

const dadosFicticios = {
  insight:
    'O dólar apresentou uma valorização sutil frente ao real nesta manhã devido ao cenário externo. Paralelamente, a previsão do tempo para a sua região indica estabilidade com ventos moderados. Cenário ideal para negociações de commodities.',
  cidade: 'São Paulo, BR',
  temp: '26°C',
  dolar: '5.42',
};

function Dashboard() {
  const [data, setData] = useState(dadosFicticios);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

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
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex justify-center items-center min-h-75">
        <p>Carregando...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 w-full max-w-4xl">
        <p>{erro}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-6">
      <Banner insight={data.insight} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardClima cidade={data.cidade} temp={data.temp} />

        <CardMoeda dolar={data.dolar} />
      </div>
    </div>
  );
}

export default Dashboard;
