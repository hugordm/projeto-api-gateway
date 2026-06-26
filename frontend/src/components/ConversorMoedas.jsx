import { useCurrencyConverter } from '../hooks/useCurrencyConverter';
import { getCurrencyFlag } from '../utils/currencies';
import CurrencySelect from './CurrencySelect';

export default function ConversorMoedas() {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    convertedAmount,
    rate,
    loading,
    error,
    convertCurrency,
    handleSwap,
  } = useCurrencyConverter();

  return (
    <div className="w-full flex justify-center">
      <div className="w-full bg-[#111827] border border-[#243047] rounded-3xl shadow-xl p-6 text-white">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Conversor de Moedas</h1>
          <p className="text-sm text-[#8fa3c7] mt-1">Cotação em tempo real</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#9fb2d1] mb-2">
              Valor
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-[#35d399] font-bold">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#151f35] border border-[#263552] rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-[#7182a3] focus:outline-none focus:ring-2 focus:ring-[#20c997]"
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <CurrencySelect
              label="DE"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            />

            <button
              onClick={handleSwap}
              className="w-11 h-11 rounded-full border border-[#20c997] text-[#20c997] flex items-center justify-center hover:bg-[#20c997]/10 transition cursor-pointer"
            >
              ⇄
            </button>

            <CurrencySelect
              label="PARA"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            />
          </div>

          <button
            onClick={convertCurrency}
            disabled={loading}
            className="w-full mt-3 py-3 rounded-xl font-bold text-[#04110d] bg-linear-to-r from-[#20c997] to-[#16a34a] hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? '🔄 Convertendo...' : '↻  Converter'}
          </button>

          {error ? (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
              ❌ {error}
            </div>
          ) : (
            convertedAmount && (
              <div className="mt-5 bg-[#0f2230] border border-[#164e45] rounded-2xl p-5">
                <p className="text-[#20c997] text-sm font-bold uppercase">
                  Conversão
                </p>
                <p className="mt-4 text-[#b7c7e6] text-lg">
                  {getCurrencyFlag(fromCurrency)}{' '}
                  {parseFloat(amount).toFixed(2)} {fromCurrency}
                </p>
                <p className="text-4xl font-bold text-[#20c997] mt-2">
                  {getCurrencyFlag(toCurrency)} {convertedAmount} {toCurrency}
                </p>
                <div className="border-t border-[#243047] mt-5 pt-4 text-sm text-[#9fb2d1]">
                  <span className="text-[#20c997] font-semibold">
                    Taxa de câmbio
                  </span>
                  <br />1 {fromCurrency} = {rate} {toCurrency}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
