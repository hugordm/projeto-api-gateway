import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

function CardMoeda({ moeda }) {
  const dadosGrafico = moeda.historico.map((valor, index) => ({
    dia: `Dia ${index + 1}`,
    valor: valor,
  }));

  const ehPositivo = moeda.variacao.startsWith('+');

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-slate-100 font-bold text-xl">
            {moeda.nome}{' '}
            <span className="text-slate-500 text-sm">({moeda.codigo})</span>
          </h3>
          <p className="text-3xl font-black text-white mt-1">
            R$ {moeda.valor}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${ehPositivo ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}
        >
          {moeda.variacao}
        </span>
      </div>

      <div className="h-32 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dadosGrafico}>
            <YAxis domain={['dataMin', 'dataMax']} hide />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              itemStyle={{ color: '#c8b7e9' }}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke={ehPositivo ? '#10b981' : '#f43f5e'}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#c8b7e9' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CardMoeda;
