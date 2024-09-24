import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Projection from '../img/proyeccion.png';
import Documents from '../img/documentos.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';

function CreateProjection() {
  const [activityName, setActivityName] = useState('');
  const [priority, setPriority] = useState('Media');
  const [uipValue, setUipValue] = useState(7);

  const handleActivityChange = (e) => setActivityName(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleUipChange = (e) => setUipValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Proyección agregada:', { activityName, priority, uipValue });
  };

  return (
    <div>
    {/* Navegación Secundaria */}
    <div className="min-h-screen bg-cover bg-center">
      {/* Navegación Secundaria */}
      <div className="p-4 flex justify-end space-x-4 mr-14">
        <Link
          to="/projection"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Projection} alt="Proyección y seguimiento" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Proyección y seguimiento</p>
        </Link>
        <Link
          to="/documents"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Documents} alt="Mis documentos" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Mis documentos</p>
        </Link>
        <Link
          to="/calendar"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Calendar} alt="Calendario" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Calendario</p>
        </Link>
        <Link
          to="/account"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Account} alt="Mi cuenta" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Mi cuenta</p>
        </Link>
      </div>

      {/* Main Content */}
        <h1 className="text-3xl font-bold text-center mb-6 text-black">¿Crear proyección?</h1>

        {/* Instructional Text Section */}
        <div className="max-w-4xl mx-auto text-center text-black">
          <p className="text-2xl mb-6 leading-relaxed">
            Crear una proyección te permitirá establecer y controlar todas aquellas actividades que te propongas cumplir en un
            periodo de 2 años, tomando en cuenta todas las condiciones que aquí condensamos de una manera más ligera y directa,
            así como la disposición del calendario de la convocatoria para que no olvides ninguna fecha.
          </p>
          <p className="text-2xl mb-6 leading-relaxed">
            Para crear una proyección, luego de hacer clic sobre la opción con el mismo nombre podrás disponer de las actividades
            disponibles para acumular puntos. Con opciones para crear, asignar descripción y prioridad, así como una fecha
            aproximada para su cumplimiento ¡Podrás mantener un panorama completo sobre tus propósitos y progreso!
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-6 space-y-8">
          {/* Activity Name */}
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">Nombre de la actividad</label>
              <select
                value={activityName}
                onChange={handleActivityChange}
                className="w-full p-2 border rounded-lg bg-gray-50"
              >
                <option value="" disabled>Selecciona una actividad</option>
                <option value="Actividad 1">Actividad 1</option>
                <option value="Actividad 2">Actividad 2</option>
                <option value="Actividad 3">Actividad 3</option>
              </select>
            </div>
            <p className="ml-6 text-gray-600 leading-relaxed">
              Dentro de la creación de proyección se encuentra este cuadro en el cual puedes seleccionar la actividad que vas a agregar
              a tu proyección.
            </p>
          </div>

          {/* Priority */}
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">Prioridad</label>
              <select
                value={priority}
                onChange={handlePriorityChange}
                className="w-full p-2 border rounded-lg bg-gray-50"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            <p className="ml-6 text-gray-600 leading-relaxed">
              La prioridad que selecciones para cada actividad le dará una idea de la importancia que esta tenga para tu proceso.
            </p>
          </div>

          {/* UIP Approximate */}
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">UIP aproximadas a obtener</label>
              <input
                type="number"
                value={uipValue}
                onChange={handleUipChange}
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>
            <p className="ml-6 text-gray-600 leading-relaxed">
              Una vez terminada la configuración de tu actividad, podrás ver el aproximado de unidades de promoción.
            </p>
          </div>

          {/* Add Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Closing Instructional Text */}
        <div className="max-w-3xl mx-auto mt-8 text-center text-white">
          <p className="text-lg leading-relaxed">
            Conforme creas y agregas tareas podrás visualizar a un lado de la pantalla la cantidad de actividades que te has
            propuesto y el acumulado de unidades de promoción.
          </p>
        </div>
      </div>
      </div>
  );
}

export default CreateProjection;
