import axios from 'axios';
import { useEffect, useState } from 'react';

import Calendar from './Calendario';
import CardClima from './CardClima';
import CardMoeda from './CardMoeda';
import GeradorInsight from './GeradorInsight';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const nomeUsuario = localStorage.getItem('userName') || '';

  useEffect(() => {
    async function buscarDashboard() {
      try {
        setLoading(true);

        const cidade = localStorage.getItem('userCity') || 'São Paulo';

        // Busca dados atuais
        const moeda = localStorage.getItem('userCurrency') || 'USD';

        const dashboardResponse = await axios.get(
          `http://localhost:8000/api/dashboard?cidade=${encodeURIComponent(cidade)}&moeda=${moeda}`,
        );

        // Busca histórico das moedas
        const historicoResponse = await axios.get(
          'http://localhost:8000/api/historico',
        );

        const dados = dashboardResponse.data;
        const historico = historicoResponse.data;

        const calcularVariacao = (valores) => {
          if (valores.length < 2) return '+0.00%';
          const hoje = valores[valores.length - 1].valor;
          const ontem = valores[valores.length - 2].valor;
          const variacao = ((hoje - ontem) / ontem) * 100;
          return `${variacao > 0 ? '+' : ''}${variacao.toFixed(2)}%`;
        };

        const historicoUSD = Object.entries(historico.rates).map(
          ([data, v]) => ({ data, valor: v.BRL }),
        );
        const historicoEUR = Object.entries(historico.rates).map(
          ([data, v]) => ({ data, valor: v.BRL / (v.EUR || 1) }),
        );

        const dashboardFormatado = {
          insight: dados.insight,
          cidades: [
            {
              id: 1,
              nome: dados.clima.name,
              temp: `${Math.round(dados.clima.main.temp)}°C`,
              sensacao: `${Math.round(dados.clima.main.feels_like)}°C`,
              minMax: `${Math.round(dados.clima.main.temp_min)}°C / ${Math.round(dados.clima.main.temp_max)}°C`,
              condicao: dados.clima.weather[0].description,
              umidade: `${dados.clima.main.humidity}%`,
              vento: `${dados.clima.wind.speed} km/h`,
              estacao: 'Atual',
            },
          ],
          moedas: [
            {
              id: 1,
              nome: 'Dólar',
              codigo: 'USD',
              valor: dados.moedas.rates.BRL.toFixed(2),
              variacao: calcularVariacao(historicoUSD),
              historico: historicoUSD,
            },
            {
              id: 2,
              nome: 'Euro',
              codigo: 'EUR',
              valor: (
                dados.moedas.rates.BRL / (dados.moedas.rates.EUR || 1)
              ).toFixed(2),
              variacao: calcularVariacao(historicoEUR),
              historico: historicoEUR,
            },
          ],
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
    const intervalo = setInterval(
      () => {
        buscarDashboard();
      },
      15 * 60 * 1000,
    );

    return () => clearInterval(intervalo);
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col justify-center items-center min-h-100">
        <svg
          className="animate-spin h-12 w-12 text-[#c8b7e9] mb-4"
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

        <p className="text-[#c8b7e9] animate-pulse font-medium text-lg">
          Carregando seu painel personalizado...
        </p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="w-full max-w-6xl p-6 bg-red-950/30 text-red-400 rounded-2xl border border-red-900/50 shadow-sm flex items-center justify-center min-h-50">
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl">⚠️</span>
          <p className="font-medium text-lg">Erro ao carregar dados: {erro}</p>
        </div>
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

          <Calendar />
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
