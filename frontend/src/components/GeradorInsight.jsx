import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

function GeradorInsight({ fetchInsight }) {
  const [status, setStatus] = useState('idle');
  const [textoExibido, setTextoExibido] = useState('');

  const [textoIA, setTextoIA] = useState('');

  const gerarInsight = async () => {
    setStatus('loading');
    try {
      const insightRecebido = await fetchInsight();
      setTextoIA(insightRecebido);
      setStatus('typing');
    } catch (error) {
      console.error(error);
      setTextoIA(
        'Não foi possível gerar a análise no momento. Tente novamente mais tarde.',
      );
      setStatus('typing');
    }
  };

  useEffect(() => {
    if (status === 'typing') {
      let i = 0;
      const interval = setInterval(() => {
        setTextoExibido(textoIA.slice(0, i + 1));
        i++;
        if (i === textoIA.length) {
          clearInterval(interval);
          setStatus('done');
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [status, textoIA]);

  return (
    <div className="w-full mt-8 flex flex-col items-center gap-6">
      {status === 'idle' && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={gerarInsight}
          className="bg-black text-white cursor-pointer px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-lg hover:shadow-[#c8b7e9]/20 transition-shadow border border-slate-800"
        >
          <Sparkles className="text-[#c8b7e9]" />
          Gerar insight de IA sobre os dados
        </motion.button>
      )}

      {status === 'loading' && (
        <div className="flex flex-col items-center gap-4 text-slate-400">
          <Loader2 className="animate-spin w-10 h-10 text-[#c8b7e9]" />
          <p className="animate-pulse">
            Analisando histórico e tendências usando IA...
          </p>
        </div>
      )}

      {(status === 'typing' || status === 'done') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-[#1e1a29] border border-[#c8b7e9]/30 rounded-2xl p-8 relative shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#c8b7e9] to-transparent opacity-50" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#c8b7e9] font-bold flex items-center gap-2">
              <Sparkles size={20} /> Análise Inteligente Claude 3
            </h3>
            {status === 'done' && (
              <button
                onClick={() => {
                  setStatus('idle');
                  setTextoExibido('');
                }}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Gerar novamente
              </button>
            )}
          </div>

          <p className="text-slate-300 leading-relaxed text-lg font-mono">
            {textoExibido}
            {status === 'typing' && (
              <span className="animate-pulse border-r-2 border-[#c8b7e9] ml-1" />
            )}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default GeradorInsight;
