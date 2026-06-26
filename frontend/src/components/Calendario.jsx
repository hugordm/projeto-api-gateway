import { AnimatePresence, motion } from 'framer-motion';
import { useCalendar } from '../hooks/useCalendar';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

export default function Calendario({ periodoInicial, onRangeChange }) {
  const {
    currentDate,
    direction,
    monthName,
    days,
    startDate,
    endDate,
    previousMonth,
    nextMonth,
    isFuture,
    isHoliday,
    handleMouseDown,
    handleEnter,
    setIsDragging,
    inRange,
    isStart,
    isEnd,
  } = useCalendar(periodoInicial, onRangeChange);

  return (
    <div className="w-full rounded-2xl bg-slate-800 border border-slate-700 p-4 shadow-lg text-slate-200 overflow-hidden">
      <div className="mb-4 flex justify-between items-center relative z-10">
        <h2 className="text-lg font-bold capitalize">📅 {monthName}</h2>
        <div className="flex gap-1">
          <button
            onClick={previousMonth}
            className="px-2 py-1 rounded hover:bg-slate-700 transition-colors cursor-pointer"
          >
            ←
          </button>
          <button
            onClick={nextMonth}
            className="px-2 py-1 rounded hover:bg-slate-700 transition-colors cursor-pointer"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-slate-400 mb-2 relative z-10">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="relative min-h-70">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentDate.toISOString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="grid grid-cols-7 gap-1 select-none absolute w-full"
          >
            {days.map((day, i) => {
              if (!day) return <div key={i} className="h-10"></div>;

              const holiday = isHoliday(day);
              const future = isFuture(day);

              return (
                <button
                  key={i}
                  title={holiday?.name || ''}
                  disabled={future}
                  onMouseDown={() => handleMouseDown(day)}
                  onMouseEnter={() => handleEnter(day)}
                  onMouseUp={() => setIsDragging(false)}
                  className={`
                    relative h-11 w-full flex items-center justify-center
                    transition-all duration-200
                    ${future ? 'opacity-40 text-slate-500 cursor-not-allowed' : inRange(day) ? 'bg-blue-200 text-slate-900' : 'text-slate-200 hover:bg-slate-700 cursor-pointer'}
                    ${isStart(day) ? 'bg-indigo-600 text-white rounded-l-full shadow-md z-10' : ''}
                    ${isEnd(day) ? 'bg-indigo-600 text-white rounded-r-full shadow-md z-10' : ''}
                    ${isStart(day) && isEnd(day) ? 'rounded-full' : ''}
                    ${holiday && !inRange(day) && !future ? 'border border-red-400 text-red-400' : ''}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 border-t border-slate-700 pt-3 text-sm relative z-10">
        <p>Início: {startDate ? startDate.toLocaleDateString('pt-BR') : '-'}</p>
        <p>Fim: {endDate ? endDate.toLocaleDateString('pt-BR') : '-'}</p>
      </div>
    </div>
  );
}
