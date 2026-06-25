import { Droplets, Wind } from 'lucide-react';

function CardClima({ cidade }) {
  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between overflow-hidden relative">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#c8b7e9]/10 rounded-full blur-3xl" />

      <div className="flex flex-col z-10 w-full">
        <div className="flex justify-between w-full mb-6">
          <div>
            <h3 className="text-slate-100 font-bold text-xl">{cidade.nome}</h3>
            <p className="text-[#c8b7e9] text-sm font-medium mt-1">
              {cidade.condicao}
            </p>
          </div>
          <div className="text-5xl font-black text-white">{cidade.temp}</div>
        </div>

        <div className="flex gap-6 mt-auto">
          <div className="flex items-center gap-2 text-slate-400">
            <Droplets size={16} className="text-blue-400" />
            <span className="text-sm">{cidade.umidade}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Wind size={16} className="text-slate-300" />
            <span className="text-sm">{cidade.vento}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardClima;
