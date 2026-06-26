import { useEffect, useState } from 'react';

export function useCalendar(periodoInicial, onRangeChange) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [startDate, setStartDate] = useState(periodoInicial?.inicio || null);
  const [endDate, setEndDate] = useState(periodoInicial?.fim || null);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/calendario?ano=${currentDate.getFullYear()}`,
    )
      .then((r) => r.json())
      .then(setHolidays)
      .catch(console.error);
  }, [currentDate]);

  useEffect(() => {
    const up = () => setIsDragging(false);
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;
    onRangeChange(startDate, endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const previousMonth = () => {
    setDirection(-1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setDirection(1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthName = currentDate.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  const makeDate = (d) => new Date(year, month, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isFuture = (d) => makeDate(d) > today;
  const same = (a, b) => a && b && a.toDateString() === b.toDateString();
  const isHoliday = (d) => {
    const f = makeDate(d).toLocaleDateString('sv-SE');
    return holidays.find((h) => h.date === f);
  };

  const handleMouseDown = (d) => {
    if (isFuture(d)) return;
    const date = makeDate(d);

    if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      return;
    }

    setStartDate(date);
    setEndDate(null);
    setIsDragging(true);
  };

  const handleEnter = (d) => {
    if (!isDragging || isFuture(d)) return;
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

  return {
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
  };
}
