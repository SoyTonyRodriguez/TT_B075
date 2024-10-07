import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoCreateOutline, IoGlassesOutline, IoHelpCircleOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import Navigation from './Navigation/Navigation'; 

function ProyeccionSeguimiento() {
  const [hoveredButton, setHoveredButton] = useState(null); 

  const handleMouseEnter = (button) => {
    setHoveredButton(button); 
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const renderDescription = () => {
    switch (hoveredButton) {
      case 'crear':
        return "Inicia una proyección en cualquiera de las dos modalidades disponibles. Elige entre una proyección por unidades de promoción o por obtención de grado académico según tus necesidades y preferencias. Además, puedes gestionar varias proyecciones simultáneamente, facilitando el seguimiento de diferentes objetivos.";
      case 'ver':
        return "Ve todos los detalles de tu proyección actual y consulta el progreso de tus objetivos. Ajusta tus tareas en el tablero según tus avances y mantente al tanto de tus plazos importantes gracias a las alertas automáticas. Esta herramienta te permite tener control total sobre el estado de tu proyección en cualquier momento.";
      case 'guia':
        return "¿No sabes cómo iniciar una proyección? Consulta nuestra guía para obtener instrucciones detalladas. Sigue a detalle la explicación que tenemos que te ayudarán a comenzar, los cuáles te explican paso a paso cómo usar cada función. Además, encontrarás consejos útiles para aprovechar al máximo las herramientas de proyección y seguimiento.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative">
      {/* Navegación fija */}
      <Navigation />

      <hr className="border-t-2 border-black my-4" />

      {/* Contenido Principal */}
      <div className="container mx-auto mt-8">
        <div className="flex justify-center space-x-8">
          <motion.div
            whileHover={{ scale: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)" }} // Animación al hover
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="/new-projection"
              onMouseEnter={() => handleMouseEnter('crear')}
              onMouseLeave={handleMouseLeave}
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center"
            >
              <IoCreateOutline className="mb-4 w-20 h-20" />
              <p className="text-center text-lg font-semibold">Crear proyección</p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)" }} // Animación al hover
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="/KanbanBoard"
              onMouseEnter={() => handleMouseEnter('ver')}
              onMouseLeave={handleMouseLeave}
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center"
            >
              <IoGlassesOutline className="mb-4 w-20 h-20" />
              <p className="text-center text-lg font-semibold">Ver mi proyección</p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)" }} // Animación al hover
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="/Guia"
              onMouseEnter={() => handleMouseEnter('guia')}
              onMouseLeave={handleMouseLeave}
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center"
            >
              <IoHelpCircleOutline className="mb-4 w-20 h-20" />
              <p className="text-center text-lg font-semibold">Guía</p>
            </Link>
          </motion.div>
        </div>

        {/* Descripción de cada función */}
        {hoveredButton && (
          <motion.div
            className="mt-4 text-center text-white bg-black bg-opacity-70 p-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }}    // Empieza invisible y desplazado
            animate={{ opacity: 1, y: 0 }}     // Aparece y se posiciona
            exit={{ opacity: 0, y: 20 }}       // Desaparece y se desplaza hacia abajo
            transition={{ duration: 0.4 }}     // Duración de la animación
          >
            <p className="text-lg">{renderDescription()}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ProyeccionSeguimiento;