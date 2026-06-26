import {
  Cloud,
  CloudRain,
  Droplets,
  Sun,
  Thermometer,
  Wind,
} from 'lucide-react';

function CardClima({ cidade }) {
  const getIconeClima = (condicao) => {
    const desc = condicao.toLowerCase();
    if (desc.includes('chuva') || desc.includes('rain'))
      return <CloudRain size={40} className="text-blue-400" />;
    if (desc.includes('nublado') || desc.includes('cloud'))
      return <Cloud size={40} className="text-slate-300" />;
    return <Sun size={40} className="text-yellow-400" />;
  };

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-slate-500 transition-all p-6 rounded-2xl flex items-center justify-between overflow-hidden relative shadow-lg">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="flex flex-col z-10 w-full gap-4">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="text-slate-100 font-bold text-xl">{cidade.nome}</h3>
            <p className="text-slate-400 text-sm font-medium mt-1 capitalize">
              {cidade.condicao}
            </p>
          </div>
          {getIconeClima(cidade.condicao)}
        </div>

        <div className="text-5xl font-black text-white my-2">{cidade.temp}</div>

        <div className="flex gap-4 mt-auto pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2 text-slate-300">
            <Droplets size={16} className="text-blue-400" />
            <span className="text-sm font-medium">{cidade.umidade}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Wind size={16} className="text-slate-400" />
            <span className="text-sm font-medium">{cidade.vento}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Thermometer size={14} className="text-rose-400" />
            <span className="text-xs font-medium">{cidade.minMax}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardClima;
