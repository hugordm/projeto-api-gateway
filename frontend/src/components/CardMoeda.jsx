function CardMoeda({ dolar }) {
  return (
    <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 flex flex-col gap-2 transition-all hover:shadow-md hover:-translate-y-1">
      <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">
        Cotação
      </p>
      <div className="flex justify-between items-end mt-2">
        <span className="text-slate-700 text-lg">Dólar (USD)</span>
        <span className="text-3xl font-bold text-emerald-600">
          {dolar ? `R$ ${dolar}` : '--'}
        </span>
      </div>
    </div>
  );
}

export default CardMoeda;
