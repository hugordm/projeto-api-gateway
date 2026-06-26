const moedasDisponiveis = [
  { code: 'USD', name: 'Dólar (USD)' },
  { code: 'EUR', name: 'Euro (EUR)' },
  { code: 'GBP', name: 'Libra (GBP)' },
  { code: 'JPY', name: 'Iene (JPY)' },
  { code: 'AUD', name: 'Dólar Aus. (AUD)' },
  { code: 'CAD', name: 'Dólar Can. (CAD)' },
  { code: 'CHF', name: 'Franco (CHF)' },
  { code: 'CNY', name: 'Yuan (CNY)' },
];

export default function CurrencySelector({
  selectedCurrencies,
  toggleCurrency,
  error,
}) {
  return (
    <div>
      <label className="block text-[11px] sm:text-xs font-bold text-[#1A1A1A] mb-1.5">
        Moedas de interesse (Selecione uma ou mais)
      </label>
      <div className="flex flex-wrap gap-2">
        {moedasDisponiveis.map((m) => (
          <button
            key={m.code}
            type="button"
            onClick={() => toggleCurrency(m.code)}
            className={`cursor-pointer px-2 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-colors border-2 ${
              selectedCurrencies.includes(m.code)
                ? 'bg-[#38263D] text-white border-[#38263D]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-[#C9B6EB]'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>
      {error && (
        <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-500 text-xs font-bold ">
          <span>⚠️</span> Selecione pelo menos uma moeda.
        </div>
      )}
    </div>
  );
}
