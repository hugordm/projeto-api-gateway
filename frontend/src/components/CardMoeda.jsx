import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function CardMoeda({ moeda, periodo }) {
  const dadosGrafico =
    moeda.historico?.map((item) => ({
      dia: item.data,
      valor: Number(item.valor),
    })) || [];

  const ehPositivo = moeda.variacao?.startsWith('+');
  const corGrafico = ehPositivo ? '#10b981' : '#f43f5e';

  const formatarPeriodo = (inicio, fim) => {
    if (!inicio || !fim) return '';

    const mesmoMes =
      inicio.getMonth() === fim.getMonth() &&
      inicio.getFullYear() === fim.getFullYear();

    if (mesmoMes) {
      return `${inicio.getDate()}–${fim.getDate()} de ${inicio.toLocaleDateString(
        'pt-BR',
        { month: 'long' }
      )} de ${inicio.getFullYear()}`;
    }

    return `${inicio.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
    })} – ${fim.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors p-6 rounded-2xl flex flex-col gap-4 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-slate-100 font-bold text-xl flex items-center gap-2">
            {moeda.nome}

            <span className="text-slate-500 text-sm font-normal bg-slate-800 px-2 py-0.5 rounded-md">
              {moeda.codigo}
            </span>
          </h3>

          <p className="text-3xl font-black text-white mt-1">
            R$ {Number(moeda.valor).toFixed(2)}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            {formatarPeriodo(periodo.inicio, periodo.fim)}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${ehPositivo
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-rose-500/10 text-rose-400'
            }`}
        >
          {moeda.variacao}
        </span>
      </div>

      <div className="h-32 w-full mt-2">
        {dadosGrafico.length > 1 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dadosGrafico}>
              <XAxis
                dataKey="dia"
                tickFormatter={(data) => {
                  const [ano, mes, dia] = data.split('-');
                  return `${dia}/${mes}`;
                }}
                tick={{
                  fill: '#94a3b8',
                  fontSize: 12,
                }}
              />

              <YAxis hide domain={['dataMin', 'dataMax']} />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                labelFormatter={(data) => {
                  return new Date(data).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  });
                }}
              />

              <Area
                type="monotone"
                dataKey="valor"
                stroke={corGrafico}
                fill={corGrafico}
                fillOpacity={0.2}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm bg-slate-800/30 rounded-lg">
            Histórico indisponível
          </div>
        )}
      </div>
    </div>
  );
}

export default CardMoeda;
