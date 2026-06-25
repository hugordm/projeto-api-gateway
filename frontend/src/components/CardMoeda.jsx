import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

function CardMoeda({ moeda }) {
  const dadosGrafico = moeda.historico.slice(-15).map((item) => ({
    dia: item.data,
    valor: item.valor,
  }));

  const ehPositivo = moeda.variacao?.startsWith('+');
  const corGrafico = ehPositivo ? '#10b981' : '#f43f5e';

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
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
            ehPositivo
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {moeda.variacao}
        </span>
      </div>

      <div className="h-32 w-full mt-2 cursor-crosshair">
        {dadosGrafico.length > 1 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dadosGrafico}>
              <defs>
                <linearGradient
                  id={`colorValor${moeda.codigo}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={corGrafico} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={corGrafico} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={['dataMin', 'dataMax']} hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                itemStyle={{ color: corGrafico, fontWeight: 'bold' }}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Cotação']}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke={corGrafico}
                fillOpacity={1}
                fill={`url(#colorValor${moeda.codigo})`}
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
