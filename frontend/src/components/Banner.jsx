function Banner({ insight }) {
  if (!insight) return null;

  return (
    <div className="bg-linear-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-lg">
      <h2 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
        💡 Insight da IA
      </h2>
      <p className="text-indigo-800 leading-relaxed text-sm md:text-base">
        {insight} AAA
      </p>
    </div>
  );
}

export default Banner;
