import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Links from '../img/enlace.png';
import Documents from '../img/documentos.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';
//import MenuIcon from '../img/menu-icon.png'; // Icono para el botón compacto

function UnidadesPromocion() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-cover bg-center">
      
      {/* Navegación Secundaria y Título */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-0">Crear proyección</h2>
        
        {/* Botones normales en pantallas grandes, botón compacto en pantallas pequeñas */}
        <div className="hidden md:flex space-x-4 mr-14">
          <Link to="/links" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Enlaces y bases</p>
          </Link>
          <Link to="/documents" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Documents} alt="Mis documentos" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Mis documentos</p>
          </Link>
          <Link to="/calendar" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Calendar} alt="Calendario" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Calendario</p>
          </Link>
          <Link to="/account" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Account} alt="Mi cuenta" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Mi cuenta</p>
          </Link>
        </div>

        {/* Botón Compacto para pantallas pequeñas */}
        <div className="md:hidden relative">
          <button
            onClick={toggleMenu}
            className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex items-center justify-center"
          >
            <img src={Calendar} alt="Menú" className="w-12 h-12" />
          </button>

          {/* Menú Desplegable */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg">
              <div className="p-4 flex flex-col space-y-4">
                <Link to="/links" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Enlaces y bases</p>
                </Link>
                <Link to="/documents" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Documents} alt="Mis documentos" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Mis documentos</p>
                </Link>
                <Link to="/calendar" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Calendar} alt="Calendario" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Calendario</p>
                </Link>
                <Link to="/account" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Account} alt="Mi cuenta" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Mi cuenta</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="border-t-2 border-black mt-0 mb-8" />

      {/* Contenido Principal */}
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap justify-between">
          {/* Formulario de Actividad */}
          <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-bold text-white mb-4">Actividad</h3>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Nombre de la actividad</label>
              <input type="text" placeholder="Congreso / Simposia" className="w-full p-2 rounded-lg border border-gray-400" />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Establece una fecha proyectada de inicio</label>
              <input type="text" placeholder="DD/MM/YYYY" className="w-full p-2 rounded-lg border border-gray-400" />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Selecciona tu rol de participación</label>
              <select className="w-full p-2 rounded-lg border border-gray-400">
                <option>Expositor</option>
                <option>Asistente</option>
                <option>Organizador</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Alcance</label>
              <select className="w-full p-2 rounded-lg border border-gray-400">
                <option>Nacional</option>
                <option>Internacional</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Tipo de documento que debes presentar</label>
              <input type="text" placeholder="Documento que avale el tipo de evento y el nivel de participación." className="w-full p-2 rounded-lg border border-gray-400" />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">U.P aproximadas a obtener</label>
              <input type="text" placeholder="7" className="w-full p-2 rounded-lg border border-gray-400" />
            </div>
            <button className="bg-blue-800 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 w-full">Agregar</button>
          </div>

          {/* Información Adicional */}
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">Actividades proyectadas:</h3>
              <input type="text" className="w-full p-2 mt-2 rounded-lg border border-gray-400" />
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">U.P acumuladas:</h3>
              <input type="text" className="w-full p-2 mt-2 rounded-lg border border-gray-400" />
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">¿No sabes qué agregar?</h3>
              <p className="text-gray-700">¡Conoce más acerca de las actividades que puedes realizar, qué implican y sus detalles!</p>
              <button className="mt-4 bg-blue-800 text-white px-6 py-3 rounded-2xl hover:bg-blue-600">¿Qué puedo agregar?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnidadesPromocion;
