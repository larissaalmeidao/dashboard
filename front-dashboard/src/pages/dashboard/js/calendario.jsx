import React, { useState, useEffect } from "react";
import "../css/calendario.css"; // Importa estilos se você tiver

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const Calendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [days, setDays] = useState([]);

  useEffect(() => {
    renderCalendar();
  }, [month, year]);

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    const newDays = [];

    // Dias do mês anterior
    for (let i = firstDayOfMonth; i > 0; i--) {
      newDays.push({ day: lastDateOfPrevMonth - i + 1, inactive: true });
    }

    // Dias do mês atual
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();
      newDays.push({ day: i, today: isToday });
    }

    // Dias do próximo mês
    for (let i = lastDayOfMonth; i < 6; i++) {
      newDays.push({ day: i - lastDayOfMonth + 1, inactive: true });
    }

    setDays(newDays);
  };

  const handlePrevNext = (direction) => {
    const newDate = new Date(year, direction === "prev" ? month - 1 : month + 1);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth());
  };

  return (
    <div className="calendar">
      <div className="header">
        <span className="icons" onClick={() => handlePrevNext("prev")}> &lt;</span>
        <span className="data-atual">{months[month]} {year}</span>
        <span className="icons" onClick={() => handlePrevNext("next")}>&gt; </span>
      </div>
      <ul className="weeks">
        <li>Dom</li><li>Seg</li><li>Ter</li><li>Qua</li><li>Qui</li><li>Sex</li><li>Sab</li>
      </ul>
      <ul className="dias">
        {days.map((item, index) => (
          <li
            key={index}
            className={`${item.inactive ? "inactive" : ""} ${item.today ? "active" : ""}`}
          >
            {item.day}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;