import React, { useState, useEffect } from 'react';
import { format, startOfMonth, startOfWeek, addDays, setMonth, setYear, addMonths, subMonths, isSameDay, isSameMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import Navigation from './Navigation/Navigation';  
import { getAllDates } from '../api/calendar_dates.api';
import LoadingAnimation from '../components/LoadingAnimation';

const CalendarWithDetails = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [activityDetails, setActivityDetails] = useState(null);
  const [loading, setLoading] = useState(true);



  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 2;
  const maxYear = currentYear + 2;

  // Fechas de inicio y final de la convocatoria
  const inicioConvocatoria = new Date(`${currentYear}-01-18`); //Aqui tambien pasa un bug :((
  const finalConvocatoria = new Date(`${currentYear}-05-31`); //Aqui tambien JAJAJAJAJA

  // Fetch activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getAllDates();
        setActivities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Show loading (Mostrar pantalla de carga)
  if (loading) {
      return <LoadingSpinner />;
  }


  // Función para ajustar la fecha a la zona horaria local
  const adjustToLocaleDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000); 
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
    if (newYear >= minYear && newYear <= maxYear) {
      setCurrentMonth(setYear(currentMonth, newYear));
    }
  };

  const goToStart = () => {
    setSelectedDate(inicioConvocatoria);
    setCurrentMonth(inicioConvocatoria);
  };

  const goToEnd = () => {
    setSelectedDate(finalConvocatoria);
    setCurrentMonth(finalConvocatoria);
  };

  const renderHeader = () => {
    const months = Array.from({ length: 12 }, (e, i) => {
      return format(setMonth(new Date(), i), 'MMMM', { locale: es });
    });

    const years = Array.from({ length: 5 }, (e, i) => {
      return minYear + i;
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
    const endDate = addDays(startDate, 41); // 6 semanas en vista
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
        const isToday = isSameDay(day, new Date()); // Nuevo: verificar si es hoy
  
        const isWeekend = day.getDay() === 0 || day.getDay() === 6;
        const activityOnDay = !isWeekend && activities.find(activity =>
          isWithinActivityRange(day, activity)
        );
  
        // Clases aplicadas sin alterar el diseño original
        let cellClass = "p-2 text-center border ";
        if (!isSameMonth(day, monthStart)) {
          cellClass += "text-gray-400 "; // Días de otros meses
        } else if (isSelected) {
          cellClass += "bg-orange-500 text-white "; // Día seleccionado
        } else if (activityOnDay) {
          cellClass += "bg-green-200 "; // Día con actividad
        } else {
          cellClass += "text-black "; // Días normales
        }
  
        // Nuevo: Añadir borde solo si es el día actual
        if (isToday) {
          cellClass += "border-blue-500 ";
        }
  
        days.push(
          <div
            className={cellClass}
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
    <div className="min-h-screen bg-cover bg-center pb-12">
      <Navigation />

      <hr className="border-t-2 border-black my-4" />

      {/* Botones de Inicio y Final */}
      <div className="flex justify-center space-x-6 mb-4">
        <button
          onClick={goToStart}
          className="bg-blue-600 text-white py-2 px-6 rounded transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:bg-blue-700"
        >
          Inicio
        </button>
        <button
          onClick={goToEnd}
          className="bg-blue-600 text-white py-2 px-6 rounded transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:bg-blue-700"
        >
          Final
        </button>
      </div>

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