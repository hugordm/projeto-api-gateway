import { currencies } from '../utils/currencies';

export default function CurrencySelect({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#9fb2d1] block mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-[#151f35] border border-[#263552] rounded-xl px-3 py-3 text-white focus:outline-none cursor-pointer"
      >
        {currencies.map((currency) => (
          <option
            key={currency.code}
            value={currency.code}
            className="bg-[#111827]"
          >
            {currency.flag} {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
}
