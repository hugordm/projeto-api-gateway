import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Loader2, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Chatbot() {
  const [aberto, setAberto] = useState(false);
  const [input, setInput] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagens, setMensagens] = useState([
    {
      autor: 'bot',
      texto:
        'Olá! Sou seu assistente inteligente. Pergunte-me qualquer coisa sobre o clima ou as cotações atuais!',
    },
  ]);

  const fimDoChatRef = useRef(null);

  useEffect(() => {
    fimDoChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, aberto]);

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const perguntaDoUsuario = input.trim();
    setInput('');

    setMensagens((prev) => [
      ...prev,
      { autor: 'user', texto: perguntaDoUsuario },
    ]);
    setCarregando(true);

    try {
      const urlBase = import.meta.env.VITE_API_URL;
      const cidade = localStorage.getItem('userCity') || 'São Paulo';
      const moeda = localStorage.getItem('userCurrency') || 'USD';

      const resposta = await axios.post(`${urlBase}/api/chat`, {
        pergunta: perguntaDoUsuario,
        cidade,
        moeda,
      });

      setMensagens((prev) => [
        ...prev,
        { autor: 'bot', texto: resposta.data.resposta },
      ]);
    } catch (error) {
      console.error(error);
      setMensagens((prev) => [
        ...prev,
        {
          autor: 'bot',
          texto: 'Desculpe, tive um problema de conexão ao tentar responder.',
        },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setAberto(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[#c8b7e9] text-slate-900 rounded-full flex items-center justify-center shadow-2xl cursor-pointer z-50 ${aberto ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={28} />
      </motion.button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-87.5 h-125 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2 text-white font-bold">
                <Bot className="text-[#c8b7e9]" />
                Assistente IA
              </div>
              <button
                onClick={() => setAberto(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {mensagens.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed prose prose-invert ${
                    msg.autor === 'user'
                      ? 'bg-[#c8b7e9] text-slate-900 self-end rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 self-start rounded-bl-none'
                  }`}
                >
                  <ReactMarkdown>{msg.texto}</ReactMarkdown>
                </div>
              ))}

              {carregando && (
                <div className="bg-slate-800 text-slate-400 border border-slate-700 self-start rounded-xl rounded-bl-none p-3 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-xs">Digitando...</span>
                </div>
              )}
              <div ref={fimDoChatRef} />
            </div>

            <form
              onSubmit={enviarMensagem}
              className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte algo..."
                disabled={carregando}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#c8b7e9] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || carregando}
                className="bg-[#c8b7e9] text-slate-900 p-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;
