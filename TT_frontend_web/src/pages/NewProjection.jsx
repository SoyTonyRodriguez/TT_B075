import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Links from '../img/enlace.png';
import Documents from '../img/documentos.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';
import PromotionIcon from '../img/estrella.png';  
import DegreeIcon from '../img/alumno.png';  
import MenuIcon from '../img/menu-icon.png'; // Icono para el botón compacto

function NewProjection() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="min-h-screen bg-cover bg-center">
          
          {/* Navegación Secundaria */}
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-0">Crear proyección</h2>

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
            <div className="grid grid-cols-1 gap-6">
              {/* Por unidades de promoción */}
              <div className="flex items-center justify-between bg-black bg-opacity-40 p-6 rounded-lg shadow-lg">
                <div className="flex-1 mr-4">
                  <p className="text-lg text-white leading-relaxed text-center justify-center">
                    En el Instituto Politécnico Nacional (IPN), las Unidades de Promoción (U.P.) son un sistema de reconocimiento al desempeño docente. Se otorgan a los profesores por realizar actividades que van más allá de sus obligaciones básicas.
                  </p>
                </div>
                <Link to="/unidades-promocion" className="bg-blue-500 text-white p-10 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
                  <img src={PromotionIcon} alt="Por unidades de promoción" className="mb-2 w-24 h-24" />
                  <p className="text-center text-lg font-semibold">Por unidades de promoción</p>
                </Link>
              </div>
    
              {/* Por obtención de grado académico */}
              <div className="flex items-center justify-between bg-black bg-opacity-40 p-6 rounded-lg shadow-lg">
                <div className="flex-1 mr-4">
                  <p className="text-lg text-white leading-relaxed text-center justify-center">
                    La obtención del grado de maestro o doctor concede al académico la promoción al nivel inmediato superior. Cuando el académico no se haya promovido en cuatro o más años y al solicitar la promoción presente los grados de maestría y doctorado, podrá ascender dos niveles.
                  </p>
                </div>
                <Link to="/promocion-grado" className="bg-blue-500 text-white p-10 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
                  <img src={DegreeIcon} alt="Por obtención de grado académico" className="mb-2 w-24 h-24" />
                  <p className="text-center text-lg font-semibold">Por obtención de grado académico</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default NewProjection;

