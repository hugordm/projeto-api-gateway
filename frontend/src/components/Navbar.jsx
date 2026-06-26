import logo from '../assets/logo.webp';

export default function Navbar({ onFocusForm }) {
  return (
    <nav className="flex items-center justify-between px-6 py-2 md:px-10 md:py-3 w-full bg-white border-b border-gray-100">
      <div className="flex items-center gap-2 font-bold text-lg md:text-xl text-[#1A1A1A]">
        <img
          src={logo}
          alt="Logo"
          className="h-12 md:h-14 w-auto object-contain"
        />
      </div>

      <div className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium text-[#4A4A4A]">
        <a
          href="https://github.com/hugordm/projeto-api-gateway"
          target="_blank"
          rel="noreferrer"
          className="hover:text-black transition-colors"
        >
          Repositório
        </a>
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="hover:text-black transition-colors"
        >
          Documentação
        </a>
      </div>

      <button
        onClick={onFocusForm}
        className="bg-[#1A1A1A] text-white cursor-pointer px-5 py-2 md:py-2.5 rounded-xl text-sm font-bold hover:bg-[#C9B6EB] hover:text-[#1A1A1A] transition-colors duration-300 whitespace-nowrap"
      >
        Acessar Painel
      </button>
    </nav>
  );
}
