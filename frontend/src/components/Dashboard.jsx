import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Calendar from './Calendario';
import CardClima from './CardClima';
import CardMoeda from './CardMoeda';
import Chatbot from './Chatbot';
import ConversorMoedas from './ConversorMoedas';
import GeradorInsight from './GeradorInsight';

function Dashboard() {
  const [data, setData] = useState(null);
  const [erro, setErro] = useState(null);
  const [periodo, setPeriodo] = useState({
    inicio: new Date('2026-01-01'),
    fim: new Date('2026-06-24'),
  });

  const nomeUsuario = localStorage.getItem('userName') || '';

  const formatDate = (date) => date.toISOString().split('T')[0];

  useEffect(() => {
    async function buscarDashboard() {
      try {
        const urlBase = import.meta.env.VITE_API_URL;

        setErro(null);

        const cidade = localStorage.getItem('userCity') || 'São Paulo';

        const moedasSalvas =
          localStorage.getItem('userCurrencies') || 'USD,EUR';
        const moedasArray = moedasSalvas.split(',');

        const fetchMoedasArray = [...new Set([...moedasArray, 'BRL'])];
        const moedasParam = fetchMoedasArray.join(',');

        const dashboardResponse = await axios.get(
          `${urlBase}/api/dashboard?cidade=${encodeURIComponent(cidade)}&moedas=${moedasParam}`,
        );

        const inicio = periodo.inicio
          ? formatDate(periodo.inicio)
          : '2026-01-01';
        const fim = periodo.fim ? formatDate(periodo.fim) : '2026-06-24';

        const historicoResponse = await axios.get(`${urlBase}/api/historico`, {
          params: {
            start: inicio,
            end: fim,
            moedas: moedasParam,
          },
        });

        const dados = dashboardResponse.data;
        const historico = historicoResponse.data;

        const calcularVariacao = (historicoLocal) => {
          if (!historicoLocal || historicoLocal.length < 2) {
            return '+0.00%';
          }
          const valorAtual = historicoLocal[historicoLocal.length - 1].valor;
          const valorInicial = historicoLocal[0].valor;
          if (!valorInicial) return '+0.00%';
          const variacao = ((valorAtual - valorInicial) / valorInicial) * 100;
          if (variacao === 0) return '0.00%';
          if (Math.abs(variacao) > 0 && Math.abs(variacao) < 0.01) {
            return variacao > 0 ? '< +0.01%' : '> -0.01%';
          }
          return `${variacao > 0 ? '+' : ''}${variacao.toFixed(3)}%`;
        };

        const nomesMoedas = {
          USD: 'Dólar',
          EUR: 'Euro',
          GBP: 'Libra Esterlina',
          JPY: 'Iene Japonês',
          AUD: 'Dólar Australiano',
          CAD: 'Dólar Canadense',
          CHF: 'Franco Suíço',
          CNY: 'Yuan Chinês',
        };

        const moedasFormatadas = moedasArray
          .map((codigo, index) => {
            const nome = nomesMoedas[codigo] || codigo;
            let valorAtual;
            let historicoMoeda;

            if (codigo === 'USD') {
              valorAtual = dados.moedas.rates.BRL;
              historicoMoeda = Object.entries(historico.rates).map(
                ([data, valor]) => ({
                  data,
                  valor: Number(valor.BRL.toFixed(2)),
                }),
              );
            } else {
              const taxaMoeda = dados.moedas.rates[codigo] || 1;
              valorAtual = dados.moedas.rates.BRL / taxaMoeda;

              historicoMoeda = Object.entries(historico.rates)
                .map(([data, valor]) => {
                  if (!valor.BRL || !valor[codigo]) return null;
                  return {
                    data,
                    valor: Number((valor.BRL / valor[codigo]).toFixed(2)),
                  };
                })
                .filter(Boolean);
            }

            return {
              id: index + 1,
              nome,
              codigo,
              valor: valorAtual.toFixed(2),
              variacao: calcularVariacao(historicoMoeda),
              historico: historicoMoeda,
            };
          })
          .filter(Boolean);

        const dashboardFormatado = {
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
              pressao: `${dados.clima.main.pressure} hPa`,
              visibilidade: `${(dados.clima.visibility / 1000).toFixed(1)} km`,
              chuva: dados.clima.rain ? `${dados.clima.rain['1h']} mm` : '0 mm',
              nascerDoSol: new Date(
                dados.clima.sys.sunrise * 1000,
              ).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              porDoSol: new Date(
                dados.clima.sys.sunset * 1000,
              ).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              }),
            },
          ],
          moedas: moedasFormatadas,
        };

        setData(dashboardFormatado);
      } catch (error) {
        console.error(error);
        setErro(error.message);
      }
    }

    buscarDashboard();

    const intervalo = setInterval(buscarDashboard, 15 * 60 * 1000);
    return () => clearInterval(intervalo);
  }, [periodo]);

  async function buscarInsightNaAPI() {
    const urlBase = import.meta.env.VITE_API_URL;
    const cidade = localStorage.getItem('userCity') || 'São Paulo';
    const moedas = localStorage.getItem('userCurrencies') || 'USD,EUR';

    const resposta = await axios.get(
      `${urlBase}/api/insight?cidade=${encodeURIComponent(cidade)}&moedas=${moedas}`,
    );
    return resposta.data.insight;
  }

  if (!data) {
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <p className="text-[#c8b7e9] animate-pulse font-medium text-lg">
          Carregando seu painel personalizado...
        </p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="w-full max-w-6xl p-6 bg-red-950/30 text-red-400 rounded-2xl border border-red-900/50">
        Erro ao carregar dados: {erro}
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl flex flex-col gap-10 p-4 md:p-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Olá, <span className="text-[#c8b7e9]">{nomeUsuario}</span>
        </h1>
        <p className="text-sm text-slate-400">
          Aqui está o resumo em tempo real do seu monitoramento personalizado.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        <h2 className="text-lg font-bold text-slate-200">
          🌤️ Clima e Tempo nas Cidades Selecionadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.cidades.map((cidade) => (
            <CardClima key={cidade.id} cidade={cidade} />
          ))}
          <Calendar
            periodoInicial={periodo}
            onRangeChange={(inicio, fim) => setPeriodo({ inicio, fim })}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-4"
      >
        <h2 className="text-lg font-bold text-slate-200">
          💼 Cotações e Tendências de Mercado
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.moedas.map((moeda) => (
            <CardMoeda key={moeda.id} moeda={moeda} periodo={periodo} />
          ))}
        </div>

        <ConversorMoedas />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <GeradorInsight fetchInsight={buscarInsightNaAPI} />
      </motion.div>

      <Chatbot />
    </div>
  );
}

export default Dashboard;
