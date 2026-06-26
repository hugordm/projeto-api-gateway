import { Code2, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.webp';

export default function Navbar({ onFocusForm }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 relative z-50">
      <div className="flex items-center justify-between px-4 py-2 md:px-10 md:py-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-bold text-lg md:text-xl text-[#1A1A1A] shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-10 md:h-14 w-auto object-contain"
          />
        </div>

        <div className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium text-[#4A4A4A]">
          <a
            href="https://github.com/hugordm/projeto-api-gateway"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition-colors flex items-center gap-1.5"
          >
            <Code2 size={18} /> Repositório
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition-colors flex items-center gap-1.5"
          >
            
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onFocusForm}
            className="bg-[#1A1A1A] text-white cursor-pointer px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold hover:bg-[#C9B6EB] hover:text-[#1A1A1A] transition-colors duration-300 whitespace-nowrap"
          >
            Acessar Painel
          </button>

          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="flex lg:hidden text-[#1A1A1A] p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {menuAberto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuAberto && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg flex flex-col p-4 lg:hidden gap-3 animate-fadeIn">
          <a
            href="https://github.com/hugordm/projeto-api-gateway"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuAberto(false)}
            className="text-sm font-semibold text-[#4A4A4A] hover:text-black bg-gray-50 px-4 py-3 rounded-xl flex items-center gap-2.5 transition-colors"
          >
            <Code2 size={18} className="text-gray-500" />
            Ir para o Repositório
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuAberto(false)}
            className="text-sm font-semibold text-[#4A4A4A] hover:text-black bg-gray-50 px-4 py-3 rounded-xl flex items-center gap-2.5 transition-colors"
          >
            <FileText size={18} className="text-gray-500" />
            Ver Documentação
          </a>
        </div>
      )}
    </nav>
  );
}
