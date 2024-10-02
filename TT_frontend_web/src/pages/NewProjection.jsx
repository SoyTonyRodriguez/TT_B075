import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoStarOutline, IoSchoolOutline } from "react-icons/io5";
import Navigation from './Navigation/Navigation'; 

function NewProjection() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="min-h-screen bg-cover bg-center">
          
          {/* navegación fija */}
          <Navigation />

          <hr className="border-t-2 border-black my-4" />
    
          {/* Contenido Principal */}
          <div className="container mx-auto mt-8 mb-8">
            <div className="grid grid-cols-1 gap-6">
              {/* Por unidades de promoción */}
              <div className="flex items-center justify-between bg-black bg-opacity-40 p-6 rounded-lg shadow-lg">
                <div className="flex-1 mr-4">
                  <p className="text-lg text-white leading-relaxed text-center justify-center">
                    En el Instituto Politécnico Nacional (IPN), las Unidades de Promoción (U.P.) son un sistema de reconocimiento al desempeño docente. Se otorgan a los profesores por realizar actividades que van más allá de sus obligaciones básicas.
                  </p>
                </div>
                <Link to="/unidades-promocion" className="bg-blue-500 text-white p-10 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
                  <IoStarOutline className="mb-2 w-24 h-24" /> {/* Icono Unidades de Promoción */}
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
                  <IoSchoolOutline className="mb-2 w-24 h-24" /> {/* Icono Grado Académico */}
                  <p className="text-center text-lg font-semibold">Por obtención de grado académico</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default NewProjection;

