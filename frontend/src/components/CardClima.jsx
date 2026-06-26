import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  Cloud,
  CloudRain,
  Droplets,
  Eye,
  Gauge,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Umbrella,
  Wind,
} from 'lucide-react';
import { useState } from 'react';

function CardClima({ cidade }) {
  const [expandido, setExpandido] = useState(false);

  const getIconeClima = (condicao) => {
    const desc = condicao.toLowerCase();
    if (desc.includes('chuva') || desc.includes('rain'))
      return <CloudRain size={48} className="text-blue-400 drop-shadow-md" />;
    if (desc.includes('nublado') || desc.includes('cloud'))
      return <Cloud size={48} className="text-slate-300 drop-shadow-md" />;
    return <Sun size={48} className="text-yellow-400 drop-shadow-md" />;
  };

  return (
    <motion.div
      layout
      className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-slate-500 transition-colors p-6 rounded-2xl flex flex-col overflow-hidden relative shadow-lg cursor-pointer"
      onClick={() => setExpandido(!expandido)}
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col z-10 w-full gap-4">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="text-slate-100 font-bold text-xl flex items-center gap-2">
              {cidade.nome}
            </h3>
            <p className="text-slate-400 text-sm font-medium mt-1 capitalize">
              {cidade.condicao}
            </p>
          </div>
          {getIconeClima(cidade.condicao)}
        </div>

        <div className="flex items-end justify-between">
          <div className="text-5xl font-black text-white">{cidade.temp}</div>

          <motion.div
            animate={{ rotate: expandido ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-400"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-4 mt-2 pt-4 border-t border-slate-700/50">
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

      <AnimatePresence>
        {expandido && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="z-10 w-full"
          >
            <div className="grid grid-cols-2 gap-4 pt-6 mt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-3 text-slate-400">
                <Gauge size={16} className="text-[#c8b7e9]" />
                <div className="flex flex-col">
                  <span className="text-xs">Pressão</span>
                  <span className="text-sm font-medium text-slate-200">
                    {cidade.pressao}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Eye size={16} className="text-[#c8b7e9]" />
                <div className="flex flex-col">
                  <span className="text-xs">Visibilidade</span>
                  <span className="text-sm font-medium text-slate-200">
                    {cidade.visibilidade}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Sunrise size={16} className="text-amber-400" />
                <div className="flex flex-col">
                  <span className="text-xs">Nascer do Sol</span>
                  <span className="text-sm font-medium text-slate-200">
                    {cidade.nascerDoSol}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Sunset size={16} className="text-orange-500" />
                <div className="flex flex-col">
                  <span className="text-xs">Pôr do Sol</span>
                  <span className="text-sm font-medium text-slate-200">
                    {cidade.porDoSol}
                  </span>
                </div>
              </div>

              {cidade.chuva !== '0 mm' && (
                <div className="flex items-center gap-3 text-slate-400 col-span-2">
                  <Umbrella size={16} className="text-blue-400" />
                  <div className="flex flex-col">
                    <span className="text-xs">
                      Volume de Chuva (Última hora)
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      {cidade.chuva}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CardClima;
