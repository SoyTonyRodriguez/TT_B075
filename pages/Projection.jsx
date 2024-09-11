import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Guia from '../img/guia.png';
import Links from '../img/enlace.png';
import Documents from '../img/documentos.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';
import CrearProyeccion from '../img/editardocumento.png';
import VerProyeccion from '../img/binoculares.png';
import MenuIcon from '../img/menu-icon.png'; // Icono para el botón compacto

function ProyeccionSeguimiento() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-cover bg-center">
      
      {/* Navegación Secundaria */}
      <div className="p-4 flex justify-between items-center">
        {/* Título y Menú Secundario */}
        <h2 className="text-2xl md:text-3xl font-bold mb-0">Proyección y seguimiento</h2>

        {/* Botones normales en pantallas grandes, botón compacto en pantallas pequeñas */}
        <div className="hidden md:flex space-x-4">
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
            className="text-white p-4 transition-transform transform hover:scale-125 w-30 h-30 flex items-center justify-center"
          >
            <img src={MenuIcon} alt="Menú" className="w-10 h-10" />
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

      {/* Línea de separación */}
      <hr className="border-t-2 border-black my-4" />

      {/* Contenido Principal */}
      <div className="container mx-auto mt-8">
        <div className="flex justify-center space-x-8">
          <Link to="/new-projection" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
            <img src={CrearProyeccion} alt="Crear proyección" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Crear proyección</p>
          </Link>
          <Link to="/observe-projection" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
            <img src={VerProyeccion} alt="Ver mi proyección" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Ver mi proyección</p>
          </Link>
          <Link to="/guide" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
            <img src={Guia} alt="Guía" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Guía</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProyeccionSeguimiento;
