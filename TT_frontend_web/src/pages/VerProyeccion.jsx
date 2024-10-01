import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// Importa los componentes del tablero Kanban
import Board from '../components/Board';

function VerProyeccion() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-cover bg-center">
      
      {/* Navegación Secundaria */}
      <div className="p-4 flex justify-between items-center">
        {/* Título y Menú Secundario */}
        <h2 className="text-2xl md:text-3xl font-bold mb-0">Mi proyección</h2>

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

      {/* Tablero Kanban */}
      <div className="p-4">
        <Board />
      </div>
    </div>
  );
}

export default VerProyeccion;
