import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default CSS, but will soften with Tailwind classes
import Projection from '../img/proyeccion.png';
import Links from '../img/enlace.png';
import CalendarIcon from '../img/calendario.png';
import Account from '../img/miPerfil.png';

const eventsData = [
  { date: new Date(2024, 0, 17), title: 'Publicación y difusión de la convocatoria.', duration: '1 Día hábil' },
  // Add more events here as per your needs
];

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false); // Toggle to show calendar

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const event = eventsData.find((event) => event.date.toDateString() === date.toDateString());
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-cover bg-center">
      {/* Navigation Buttons */}
      <div className="p-4 flex justify-end space-x-4 mr-14">
        <Link
          to="/projection"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Projection} alt="Proyección y seguimiento" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Proyección y seguimiento</p>
        </Link>
        <Link
          to="/links"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Enlaces y bases</p>
        </Link>
        {/* OnClick triggers Calendar visibility */}
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={CalendarIcon} alt="Calendario" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Calendario</p>
        </button>
        <Link
          to="/account"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Account} alt="Mi cuenta" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Mi cuenta</p>
        </Link>
      </div>

      {/* Conditionally render Calendar Component */}
      {showCalendar && (
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md mt-6">
          <h1 className="text-2xl font-bold mb-4">Calendario</h1>
          <div className="flex flex-row space-x-4">
            {/* Calendar Component */}
            <div className="bg-gray-50 shadow-lg rounded-lg p-4">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={({ date, view }) =>
                  eventsData.find((event) => event.date.toDateString() === date.toDateString())
                    ? 'bg-blue-400 text-white rounded-lg'
                    : 'rounded-lg hover:bg-gray-200 transition-colors'
                }
                className="w-full rounded-lg"
              />
            </div>

            {/* Event Details Section */}
            <div className="bg-gray-50 shadow-lg rounded-lg p-4 w-80">
              <h2 className="text-lg font-bold mb-2">{selectedDate.toDateString()}</h2>
              {selectedEvent ? (
                <div>
                  <h3 className="text-xl text-blue-500 font-bold mb-2">{selectedEvent.title}</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Duración:</strong> {selectedEvent.duration}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No hay eventos para esta fecha.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
