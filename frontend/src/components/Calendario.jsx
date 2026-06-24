import { useState, useEffect } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    fetch(
      `https://brasilapi.com.br/api/feriados/v1/${currentDate.getFullYear()}`
    )
      .then((res) => res.json())
      .then((data) => setHolidays(data))
      .catch((err) => console.error(err));
  }, [currentDate]);

  const previousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const monthName = currentDate.toLocaleDateString(
    "pt-BR",
    {
      month: "long",
      year: "numeric",
    }
  );

  const isHoliday = (day) => {
    const date = new Date(year, month, day);

    const formatted = date.toLocaleDateString("sv-SE");

    return holidays.find(
      (holiday) => holiday.date === formatted
    );
  };

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  while (days.length < 42) {
    days.push(null);
  }

  return (
    <div
      className="
        w-full
        rounded-2xl
        bg-slate-800
        border
        border-slate-700
        p-4
        shadow-lg
        text-slate-200
      "
    >

      {/* Cabeçalho */}
      <div className="mb-4 flex items-center justify-between">

        <h2 className="
          text-lg
          font-bold
          capitalize
        ">
          📅 {monthName}
        </h2>

        <div className="flex gap-1">

          <button
            onClick={previousMonth}
            className="
              rounded-lg
              px-2
              py-1
              text-slate-400
              hover:bg-slate-700
              hover:text-white
              transition
            "
          >
            ←
          </button>

          <button
            onClick={nextMonth}
            className="
              rounded-lg
              px-2
              py-1
              text-slate-400
              hover:bg-slate-700
              hover:text-white
              transition
            "
          >
            →
          </button>

        </div>

      </div>


      {/* Dias da semana */}
      <div
        className="
          mb-3
          grid
          grid-cols-7
          text-center
          text-xs
          font-medium
          text-slate-400
        "
      >
        <span>Dom</span>
        <span>Seg</span>
        <span>Ter</span>
        <span>Qua</span>
        <span>Qui</span>
        <span>Sex</span>
        <span>Sáb</span>
      </div>


      {/* Dias */}
      <div className="grid grid-cols-7 gap-y-2">

        {days.map((day, index) => {

          if (!day) {
            return <div key={index}></div>;
          }

          const holiday = isHoliday(day);

          return (

            <button
              key={index}
              title={holiday?.name || ""}
              onClick={() => setSelectedDay(day)}

              className={`
                mx-auto
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                text-sm
                transition

                ${
                  selectedDay === day
                    ? "bg-blue-500 text-white font-bold shadow-md"
                    : ""
                }

                ${
                  holiday && selectedDay !== day
                    ? "border border-red-400 text-red-400"
                    : ""
                }

                ${
                  !holiday && selectedDay !== day
                    ? "text-slate-300 hover:bg-slate-700"
                    : ""
                }
              `}
            >
              {day}
            </button>

          );
        })}

      </div>


      {/* Informações */}
      <div
        className="
          mt-5
          border-t
          border-slate-700
          pt-3
          text-sm
          text-slate-400
        "
      >

        <p>
          📌 Data selecionada:
          <strong className="text-slate-200">
            {" "}
            {selectedDay}
          </strong>
        </p>


        {isHoliday(selectedDay) && (
          <p className="
            mt-2
            text-red-400
          ">
            🎉 {isHoliday(selectedDay).name}
          </p>
        )}

      </div>

    </div>
  );
}


