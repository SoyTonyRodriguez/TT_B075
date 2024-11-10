import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { IoLinkOutline, IoCloseCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation/Navigation'; 

function Links() {
  const [hoveredButton, setHoveredButton] = useState(null); 
  const [pdfUrl, setPdfUrl] = useState(''); 
  const [isOpen, setIsOpen] = useState(false);

  const pdfLinks = {
    convocatoria: '/pdfs/Convocatoria.pdf',
    reglamento: '/pdfs/Reglamento.pdf',
    cronograma: '/pdfs/Cronograma.pdf',
    valoracionactividades: '/pdfs/Valoracion.pdf',
    gaceta: '/pdfs/Gaceta.pdf',
  };

  // Abre el modal con el PDF
  const openPdf = (url) => {
    setPdfUrl(url);
    setIsOpen(true);
  };

  // Cierra el modal
  const closeModal = () => {
    setIsOpen(false);
    setPdfUrl('');
  };

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
      case 'gaceta':
        return "Acuerdo: Mediante los cuales se reforman, adicionan y derogan diversos artículos y anexos del Reglamento de Promoción Docente, Anexo III del Reglamento de las Condiciones Interiores de Trabajo del Personal Académico del IPN.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative">
      <Navigation />
      <hr className="border-t-2 border-black my-4" />

      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {Object.keys(pdfLinks).map((key) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05, boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <button
                onClick={() => openPdf(pdfLinks[key])}
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
                className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center"
              >
                <IoLinkOutline className="mb-4 w-20 h-20" />
                <p className="text-center text-lg font-semibold">
                  {key === 'convocatoria' && 'Convocatoria 2024'}
                  {key === 'reglamento' && 'Reglamento de Promoción Docente'}
                  {key === 'cronograma' && 'Cronograma del Proceso 2024'}
                  {key === 'valoracionactividades' && 'Valoración de Actividades (100 U.P.)'}
                  {key === 'gaceta' && 'Gaceta Politécnica No. 1511'}
                </p>
              </button>
            </motion.div>
          ))}
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

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white w-11/12 md:w-3/4 lg:w-2/3 h-5/6 p-4 rounded-lg shadow-lg relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-3xl transition-transform transform hover:rotate-90 hover:scale-110"
                >
                  <IoCloseCircleOutline />
                </button>
                
                <div className="w-full h-full overflow-auto">
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full rounded-lg shadow-inner border"
                    frameBorder="0"
                    title="PDF Viewer"
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Links;