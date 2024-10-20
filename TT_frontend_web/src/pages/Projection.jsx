import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoCreateOutline, IoGlassesOutline, IoHelpCircleOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import Navigation from './Navigation/Navigation'; 
import { jwtDecode } from "jwt-decode";


function ProyeccionSeguimiento() {
  // Get user ID from the token
  const [userId, setUserId] = useState(null);

  const [hoveredButton, setHoveredButton] = useState(null); 


    // Store data account
  const [projection_id, setProjectionId] = useState('');
  const [projectionExists, setProjectionExists] = useState(false); // Estado para saber si existe una proyección

  // Loading state
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Verify if the userName is stored in the localStorage
    const storedAccountData = localStorage.getItem('accountDetails');

    // If the account is stored, set data and skip loading animation
    if (storedAccountData) {
      const { projection_id } = JSON.parse(storedAccountData);
      setProjectionId(projection_id);
      setLoading(false);
      console.log('Account details loaded from localStorage' + storedAccountData);
    } else {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.user_id);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }
  }, []);

  useEffect(() => {
    const storedProjectionData = localStorage.getItem('projectionDetails');
    
    if (storedProjectionData) {
      const projectionData = JSON.parse(storedProjectionData);
      setProjectionExists(Object.keys(projectionData).length > 0); // Verifica si la proyección no está vacía
    }
    
    setLoading(false);
  }, []);

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
        return projectionExists 
        ? "Ve todos los detalles de tu proyección actual y consulta el progreso de tus objetivos. Ajusta tus tareas en el tablero según tus avances y mantente al tanto de tus plazos importantes gracias a las alertas automáticas. Esta herramienta te permite tener control total sobre el estado de tu proyección en cualquier momento."
        : "Aún no tienes una proyección activa. Crea una proyección para comenzar a planificar tus objetivos y tareas. Una vez que hayas creado tu proyección, podrás verla aquí y comenzar a gestionar tus tareas de manera eficiente.";
      case 'guia':
        return "¿No sabes cómo iniciar una proyección? Consulta nuestra guía para obtener instrucciones detalladas. Sigue a detalle la explicación que tenemos que te ayudarán a comenzar, los cuáles te explican paso a paso cómo usar cada función. Además, encontrarás consejos útiles para aprovechar al máximo las herramientas de proyección y seguimiento.";
      default:
        return "";
    }
  };

  const handleRedirectCreate = () => {
    // Redirect to the create projection
    if (projection_id === '') {
      return '/Projection-first';
    } else {
      return '/new-projection';
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
              to={handleRedirectCreate()}
              onMouseEnter={() => handleMouseEnter('crear')}
              onMouseLeave={handleMouseLeave}
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center"
            >
              <IoCreateOutline className="mb-4 w-20 h-20" />
              <p className="text-center text-lg font-semibold">Crear proyección</p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: projectionExists ? 1 : 1, boxShadow: projectionExists ? "0px 0px 15px rgba(0, 0, 0, 0.2)" : "none" }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`${projectionExists ? "" : "opacity-50 cursor-not-allowed"}`} // Cambia la apariencia si está deshabilitado
          >
            <Link
              to={projectionExists ? "/KanbanBoard" : ""}
              onMouseEnter={() => handleMouseEnter('ver')}
              onMouseLeave={handleMouseLeave}
              className={`bg-blue-500 text-white p-8 rounded-lg shadow-lg transition-transform transform w-56 h-56 flex flex-col items-center justify-center ${projectionExists ? "hover:bg-blue-600 hover:scale-105" : ""}`}
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