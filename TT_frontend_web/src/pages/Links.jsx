import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { IoLinkOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import Navigation from './Navigation/Navigation'; 

function Links() {
  const [hoveredButton, setHoveredButton] = useState(null); 

  const handleMouseEnter = (button) => {
    setHoveredButton(button); 
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const renderDescription = () => {
    switch (hoveredButton) {
      case 'convocatoria':
        return "La convocatoria para la promoción docente del Instituto Politécnico Nacional (IPN) 2024 está dirigida a todo el personal académico que cumpla con los requisitos de acumulación de 100 Unidades de Promoción (U.P.) o la obtención de grado académico. Esta convocatoria detalla los plazos, formatos, y criterios que deben cumplir los docentes para optar por su promoción en distintas categorías académicas.";
      case 'reglamento':
        return "El Reglamento de Promoción Docente del IPN establece los procedimientos y requisitos para que el personal académico pueda acceder a una promoción por acumulación de U.P. o por obtención de grado académico. Define las funciones en las áreas de docencia, investigación, superación académica y actividades complementarias. Además, describe el proceso a seguir para solicitar reconsideraciones en caso de no ser promovido.";
      case 'cronograma':
        return "El cronograma de la promoción docente 2024 establece las fechas clave para la recepción de solicitudes, revisión de documentos, publicación de resultados y plazos para solicitar reconsideraciones. La Dirección de Capital Humano se encarga de coordinar el cumplimiento de estos plazos a lo largo del proceso anual.";
      case 'valoracionactividades':
        return "El proceso de Promoción por acumulación de 100 Unidades de Promoción (U.P.) en el Instituto Politécnico Nacional (IPN) está diseñado para valorar una amplia variedad de actividades que el personal docente realiza en su labor académica. Estas actividades se dividen en varias áreas clave, cada una con una puntuación específica que contribuye a la acumulación de las 100 U.P. necesarias para la promoción.";
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
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <motion.div
            whileHover={{ scale: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)" }} 
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="/new-projection"
              onMouseEnter={() => handleMouseEnter('convocatoria')}
              onMouseLeave={handleMouseLeave}
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center"
            >
              <IoLinkOutline className="mb-4 w-20 h-20" />
              <p className="text-center text-lg font-semibold">Convocatoria 2024</p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)" }} 
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="#"
              onMouseEnter={() => handleMouseEnter('reglamento')}
              onMouseLeave={handleMouseLeave}
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center"
            >
              <IoLinkOutline className="mb-4 w-20 h-20" />
              <p className="text-center text-lg font-semibold">Reglamento promoción</p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="#"
              onMouseEnter={() => handleMouseEnter('cronograma')}
              onMouseLeave={handleMouseLeave}
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center"
            >
              <IoLinkOutline className="mb-4 w-20 h-20" />
              <p className="text-center text-lg font-semibold">Cronograma 2024</p>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)" }} 
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="#"
              onMouseEnter={() => handleMouseEnter('valoracionactividades')}
              onMouseLeave={handleMouseLeave}
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center"
            >
              <IoLinkOutline className="mb-4 w-20 h-20" />
              <p className="text-center text-lg font-semibold">Valoración de actividades 100 U.P.</p>
            </Link>
          </motion.div>
        </div>

        {hoveredButton && (
          <motion.div
            className="mt-4 text-center text-white bg-black bg-opacity-70 p-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}   
            exit={{ opacity: 0, y: 20 }}     
            transition={{ duration: 0.4 }} 
          >
            <p className="text-lg">{renderDescription()}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Links;
