import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Projection from '../img/proyeccion.png';
import Links from '../img/enlace.png';
import Documents from '../img/documentos.png';
import Account from '../img/miPerfil.png';
import MenuIcon from '../img/menu-icon.png';
import { format, startOfMonth, startOfWeek, addDays, setMonth, setYear, addMonths, subMonths, isSameDay, isSameMonth, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import {getAllDates} from '../../../api/calendar_dates.api';

const CalendarWithDetails = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activities, setActivities] = useState([]);
  const [activityDetails, setActivityDetails] = useState(null);

  // Fetch activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      const response = await getAllDates();
      setActivities(response.data); // Asegúrate de que la respuesta sea el array de actividades
    };

    fetchActivities();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Función para ajustar la fecha a la zona horaria local
  const adjustToLocaleDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000); // Ajusta el tiempo a la zona local
  };

  // Nueva función para verificar si una fecha está dentro del rango de una actividad
  const isWithinActivityRange = (day, activity) => {
    const start = adjustToLocaleDate(activity.start_date);
    const end = adjustToLocaleDate(activity.end_date);
    return day >= start && day <= end;
  };

  const onDateClick = (day) => {
    setSelectedDate(day);

    // Encuentra actividades que coincidan con el día seleccionado dentro del rango
    const activityOnSelectedDate = activities.find(activity =>
      isWithinActivityRange(day, activity)
    );
    
    setActivityDetails(activityOnSelectedDate || null);
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value);
    setCurrentMonth(setMonth(currentMonth, newMonth));
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    setCurrentMonth(setYear(currentMonth, newYear));
  };

  const renderHeader = () => {
    const months = Array.from({ length: 12 }, (e, i) => {
      return format(setMonth(new Date(), i), 'MMMM', { locale: es });
    });

    const years = Array.from({ length: 21 }, (e, i) => {
      return new Date().getFullYear() - 10 + i;
    });

    return (
      <div className="flex justify-between items-center py-2 mb-4">
        <div className="flex items-center">
          <select
            value={format(currentMonth, 'M') - 1}
            onChange={handleMonthChange}
            className="border rounded p-2 mr-2"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={format(currentMonth, 'yyyy')}
            onChange={handleYearChange}
            className="border rounded p-2"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          <button onClick={prevMonth} className="text-gray-600 mx-2">&lt;</button>
          <button onClick={nextMonth} className="text-gray-600 mx-2">&gt;</button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEE";
    let startDate = startOfWeek(currentMonth, { locale: es });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-semibold py-2" key={i}>
          {format(addDays(startDate, i), dateFormat, { locale: es }).substring(0, 2)}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { locale: es });
    const endDate = addDays(startDate, 41);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
  
    // Función para verificar si un día está dentro del rango de una actividad
    const isWithinActivityRange = (day, activity) => {
      const start = adjustToLocaleDate(activity.start_date);
      const end = adjustToLocaleDate(activity.end_date);
      return day >= start && day <= end;
    };
  
    // Función para verificar si es el día de inicio de la actividad
    const isActivityStartDay = (day, activity) => {
      const start = adjustToLocaleDate(activity.start_date);
      return isSameDay(day, start); // Verifica si el día es el inicio de la actividad
    };
  
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isSelected = isSameDay(day, selectedDate);
  
        // Verificar si es sábado o domingo
        const isWeekend = day.getDay() === 0 || day.getDay() === 6;
  
        // Verificar si el día está dentro del rango de alguna actividad
        const activityOnDay = !isWeekend && activities.find(activity =>
          isWithinActivityRange(day, activity)
        );
  
        // Verificar si es el día de inicio de la actividad
        const isStartDay = activityOnDay && isActivityStartDay(day, activityOnDay);
  
        days.push(
          <div
            className={`p-2 text-center border ${!isSameMonth(day, monthStart)
              ? "text-gray-400"
              : isSelected
                ? "bg-orange-500 text-white"
                : isStartDay
                  ? "bg-green-500 text-white" // Resaltar el inicio de la actividad
                  : activityOnDay
                    ? "bg-green-200" // Sombreado para los días de duración
                    : "text-black"}`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="inline-block w-8 h-8 leading-8">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }
  
    return <div>{rows}</div>;
  };

  const renderSelectedDateDetails = () => {
    if (!selectedDate) return <p className="text-center">Haz clic sobre alguna fecha en específico para más detalles</p>;

    if (!activityDetails) {
      return <p className="text-center">No hay actividades en esta fecha.</p>;
    }

    return (
      <div className="flex flex-col h-full p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center mb-4">
          <div className="bg-orange-500 h-12 w-2 mr-4"></div>
          <h3 className="text-xl font-bold">{format(selectedDate, 'd ')}de {format(selectedDate, 'MMMM yyyy', { locale: es })}</h3>
        </div>
        <p><strong>Actividad:</strong> {activityDetails.activity}</p>
        <p className="mt-2"><strong>Período:</strong> 
          {format(adjustToLocaleDate(activityDetails.start_date), 'd MMM yyyy', { locale: es })} - 
          {format(adjustToLocaleDate(activityDetails.end_date), 'd MMM yyyy', { locale: es })}
        </p>
        <p className="mt-2"><strong>Responsables:</strong> {activityDetails.responsible}</p>
        <p className="mt-2"><strong>Duración:</strong> {activityDetails.duration} días (Días hábiles)</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-8">
      {/* Navegación Secundaria */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-0">Calendario</h2>

        {/* Botones normales en pantallas grandes, botón compacto en pantallas pequeñas */}
        <div className="hidden md:flex space-x-4">
          <Link to="/projection" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Projection} alt="Proyección y seguimiento" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Proyección y seguimiento</p>
          </Link>
          <Link to="/links" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Enlaces y bases</p>
          </Link>
          <Link to="/documents" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Documents} alt="Mis documentos" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Mis documentos</p>
          </Link>
          <Link to="/account" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Account} alt="Mi cuenta" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Mi cuenta</p>
          </Link>
        </div>
      </div>

      {/* Botón Compacto para pantallas pequeñas */}
      <div className="md:hidden relative">
        <button
          onClick={toggleMenu}
          className="text-white p-4 transition-transform transform hover:scale-125 w-30 h-30 flex items-center justify-center"
        >
          <img src={MenuIcon} alt="Menú" className="w-10 h-10" />
        </button>

      {/* Menú Desplegable */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg">
          <div className="p-4 flex flex-col space-y-4">
            <Link to="/projection" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
              <img src={Projection} alt="Proyección y seguimiento" className="w-12 h-12 mb-2" />
              <p className="text-sm font-semibold">Proyección y seguimiento</p>
            </Link>
            <Link to="/links" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
              <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
              <p className="text-sm font-semibold">Enlaces y bases</p>
            </Link>
            <Link to="/documents" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
              <img src={Documents} alt="Mis documentos" className="w-12 h-12 mb-2" />
              <p className="text-sm font-semibold">Mis documentos</p>
            </Link>
            <Link to="/account" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
              <img src={Account} alt="Mi cuenta" className="w-12 h-12 mb-2" />
              <p className="text-sm font-semibold">Mi cuenta</p>
            </Link>
          </div>
        </div>
      )}
      </div>
      

      {/* Línea de separación */}
      <hr className="border-t-2 border-black my-4" />

      {/* Contenido del Calendario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 shadow rounded-lg">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          {renderSelectedDateDetails()}
        </div>
      </div>
    </div>
  );
};

export default CalendarWithDetails;
