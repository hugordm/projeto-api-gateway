import { useEffect, useState } from 'react';

export default function Calendar({ periodoInicial, onRangeChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);

  const [startDate, setStartDate] = useState(
    periodoInicial?.inicio || null
  );

  const [endDate, setEndDate] = useState(
    periodoInicial?.fim || null
  );
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/calendario?ano=${currentDate.getFullYear()}`)
      .then((r) => r.json())
      .then(setHolidays)
      .catch(console.error);
  }, [currentDate]);

  useEffect(() => {
    const up = () => setIsDragging(false);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    onRangeChange(startDate, endDate);
  }, [startDate, endDate]);

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const makeDate = (d) => new Date(year, month, d);

  const same = (a, b) => a && b && a.toDateString() === b.toDateString();

  const isHoliday = (d) => {
    const f = makeDate(d).toLocaleDateString("sv-SE");
    return holidays.find(h => h.date === f);
  };

  const handleMouseDown = (d) => {
    const date = makeDate(d);
    if (startDate && !endDate) {
      if (date < startDate) { setEndDate(startDate); setStartDate(date); }
      else setEndDate(date);
      return;
    }
    setStartDate(date);
    setEndDate(null);
    setIsDragging(true);
  };

  const handleEnter = (d) => {
    if (!isDragging) return;
    setEndDate(makeDate(d));
  };

  const inRange = (d) => {
    if (!startDate || !endDate) return false;
    const date = makeDate(d);
    const min = startDate < endDate ? startDate : endDate;
    const max = startDate < endDate ? endDate : startDate;
    return date >= min && date <= max;
  };

  const isStart = (d) => same(makeDate(d), startDate);
  const isEnd = (d) => same(makeDate(d), endDate);

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  while (days.length < 42) days.push(null);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="w-full rounded-2xl bg-slate-800 border border-slate-700 p-4 shadow-lg text-slate-200">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold capitalize">📅 {monthName}</h2>
        <div className="flex gap-1">
          <button onClick={previousMonth} className="px-2 py-1 rounded hover:bg-slate-700">←</button>
          <button onClick={nextMonth} className="px-2 py-1 rounded hover:bg-slate-700">→</button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-slate-400 mb-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => <span key={d}>{d}</span>)}
      </div>

      <div className="grid grid-cols-7 gap-1 select-none">
        {days.map((day, i) => {
          if (!day) return <div key={i} className="h-10"></div>;
          const holiday = isHoliday(day);
          return (
            <button
              key={i}
              title={holiday?.name || ""}
              onMouseDown={() => handleMouseDown(day)}
              onMouseEnter={() => handleEnter(day)}
              onMouseUp={() => setIsDragging(false)}
              className={`
    relative h-11 w-full flex items-center justify-center
    transition-all duration-200

    ${inRange(day)
                  ? "bg-blue-200 text-slate-900"
                  : "text-slate-200 hover:bg-slate-700"
                }

    ${isStart(day)
                  ? "bg-indigo-600 text-white rounded-l-full shadow-md z-10"
                  : ""
                }

    ${isEnd(day)
                  ? "bg-indigo-600 text-white rounded-r-full shadow-md z-10"
                  : ""
                }

    ${isStart(day) && isEnd(day)
                  ? "rounded-full"
                  : ""
                }

    ${holiday && !inRange(day)
                  ? "border border-red-400 text-red-400"
                  : ""
                }
  `}
            >
              {day}
            </button>
          )
        })}
      </div>

      <div className="mt-4 border-t border-slate-700 pt-3 text-sm">
        <p>Início: {startDate ? startDate.toLocaleDateString("pt-BR") : "-"}</p>
        <p>Fim: {endDate ? endDate.toLocaleDateString("pt-BR") : "-"}</p>
      </div>
    </div>);
}
