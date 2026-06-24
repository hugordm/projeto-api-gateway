import { useState } from 'react';
import Banner from './Banner';
import CardClima from './CardClima';
import CardMoeda from './CardMoeda';
import Calendar from './Calendario';

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


  const [showCalendar, setShowCalendar] = useState(false);


  return (
    <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-6">
      <Banner insight={data.insight} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardClima cidade={data.cidade} temp={data.temp} />

        <CardMoeda dolar={data.dolar} />

        <div>
          <button onClick={() => setShowCalendar(!showCalendar)}
            className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300">
            {showCalendar ? "Esconder calendário" : "Mostrar calendário"}
          </button>

          <div className={`overflow-hidden transition-all duration-300
          ${showCalendar ? "max-h-125" : "max-h-0"}`}>
            <Calendar />
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
