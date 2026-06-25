import { useEffect, useState } from 'react';
import axios from 'axios';

import CardClima from './CardClima';
import CardMoeda from './CardMoeda';
import GeradorInsight from './GeradorInsight';
import Calendar from './Calendario';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const nomeUsuario = localStorage.getItem('userName') || '';

  useEffect(() => {
    async function buscarDashboard() {
      try {
        setLoading(true);

        const cidade =
          localStorage.getItem('userCity') || 'São Paulo';

        // Busca dados atuais
        const dashboardResponse = await axios.get(
          `http://localhost:8000/api/dashboard?cidade=${encodeURIComponent(cidade)}`
        );

        // Busca histórico das moedas
        const historicoResponse = await axios.get(
          'http://localhost:8000/api/historico'
        );

        const dados = dashboardResponse.data;
        const historico = historicoResponse.data;


        const dashboardFormatado = {
          insight: dados.insight,

          cidades: [
            {
              id: 1,
              nome: dados.clima.name,
              temp: `${dados.clima.main.temp}°C`,
              condicao: dados.clima.weather[0].description,
              umidade: `${dados.clima.main.humidity}%`,
              vento: `${dados.clima.wind.speed} km/h`,
              estacao: 'Atual'
            }
          ],


          moedas: [
            {
              id: 1,
              nome: 'Dólar',
              codigo: 'USD',
              valor: dados.moedas.rates.BRL.toFixed(2),
              variacao: '+0%',

              historico: Object.entries(historico.rates).map(
                ([data, valor]) => ({
                  data,
                  valor: valor.BRL
                })
              )
            },


            {
              id: 2,
              nome: 'Euro',
              codigo: 'EUR',

              // converte USD/EUR para EUR/BRL
              valor: (
                dados.moedas.rates.BRL /
                dados.moedas.rates.EUR
              ).toFixed(2),

              variacao: '+0%',

              historico: Object.entries(historico.rates).map(
                ([data, valor]) => ({
                  data,
                  valor: valor.BRL / valor.EUR
                })
              )
            }
          ]
        };


        setData(dashboardFormatado);

      } catch (error) {
        console.error(error);
        setErro(error.message);

      } finally {
        setLoading(false);
      }
    }


    buscarDashboard();

  }, []);



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
        <p className="font-medium">
          Erro ao carregar dados: {erro}
        </p>
      </div>
    );
  }


  if (!data) return null;


  return (
    <div className="w-full max-w-6xl flex flex-col gap-10 p-4 md:p-0">

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Olá,{' '}
          <span className="text-[#c8b7e9]">
            {nomeUsuario}
          </span>
          !
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
            <CardClima
              key={cidade.id}
              cidade={cidade}
            />
          ))}

          <Calendar />

        </div>



      </div>




      <div className="flex flex-col gap-4">

        <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
          💼 Cotações e Tendências de Mercado
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {data.moedas.map((moeda) => (
            <CardMoeda
              key={moeda.id}
              moeda={moeda}
            />
          ))}

        </div>

      </div>



      <GeradorInsight
        textoIA={data.insight}
      />

    </div>
  );
}

export default Dashboard;
