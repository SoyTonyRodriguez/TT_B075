import React from 'react';
import { Link } from 'react-router-dom';
import { IoLinkOutline, IoMegaphoneOutline, IoPeopleOutline, IoPersonOutline, IoHomeOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import promoImage from '../img/ipn-main.webp'
import Main_1 from '../img/Main_1.jpg';
import Main_2 from '../img/descriptiva.jpg';
import convo_2 from '../img/convo_2.jpg';
import Main_3 from '../img/main_3.jpg';

function MainContent() {
  // Verifica si el token JWT está en el almacenamiento local
  const isAuthenticated = !!localStorage.getItem('token');

  const iconVariants = {
    hover: { scale: 1, rotate: 5, color: "#ADD8E6" }, 
    tap: { scale: 0.9, opacity: 1 }, 
  };

  return (
    <main className="min-h-screen bg-cover bg-center">
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">Bienvenido</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
      
      <Link to="/links">
        <motion.div
          className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 flex flex-col items-center justify-center"
          whileHover="hover"
          whileTap="tap"
          variants={iconVariants}
        >
          <IoLinkOutline className="mb-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
          <p className="text-center text-sm md:text-md lg:text-lg font-semibold">Enlaces oficiales</p>
        </motion.div>
      </Link>
      
      <Link to="/Convocatoria">
        <motion.div
          className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 flex flex-col items-center justify-center"
          whileHover="hover"
          whileTap="tap"
          variants={iconVariants}
        >
          <IoMegaphoneOutline className="mb-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
          <p className="text-center text-sm md:text-md lg:text-lg font-semibold">Convocatoria</p>
        </motion.div>
      </Link>
      
      <Link to="/Nosotros">
        <motion.div
          className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 flex flex-col items-center justify-center"
          whileHover="hover"
          whileTap="tap"
          variants={iconVariants}
        >
          <IoPeopleOutline className="mb-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
          <p className="text-center text-sm md:text-md lg:text-lg font-semibold">Nuestro Proyecto</p>
        </motion.div>
      </Link>
      
      {isAuthenticated ? (
        <Link to="/Home">
          <motion.div
            className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 flex flex-col items-center justify-center"
            whileHover="hover"
            whileTap="tap"
            variants={iconVariants}
          >
            <IoHomeOutline className="mb-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
            <p className="text-center text-sm md:text-md lg:text-lg font-semibold">Inicio</p>
          </motion.div>
        </Link>
      ) : (
        <Link to="/Login">
          <motion.div
            className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 flex flex-col items-center justify-center"
            whileHover="hover"
            whileTap="tap"
            variants={iconVariants}
          >
            <IoPersonOutline className="mb-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
            <p className="text-center text-sm md:text-md lg:text-lg font-semibold">Iniciar sesión</p>
          </motion.div>
        </Link>
      )}
    </div>

        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-2/3 mb-8">
            <img src={promoImage} alt="Promoción docente" className="w-3/4 mx-auto h-auto mb-4 rounded-lg shadow-lg" />
            <h2 className="text-3xl font-bold text-center mb-4 ml-8">Promoción docente en el Instituto Politécnico Nacional</h2>
            <p className="text-lg mt-4 text-black text-justify w-3/4 mx-auto">
              El Instituto Politécnico Nacional (IPN) tiene un sistema de promoción para su personal académico y de apoyo que reconoce y recompensa la excelencia en desempeño y trayectoria, especialmente en áreas académicas y de investigación. 
              Este proceso se rige por normativas internas y acuerdos de la Comisión Central Mixta Paritaria de Promoción Docente.
            </p>
            <p className="text-lg mt-4 text-black text-justify w-3/4 mx-auto">
              Para ascender, los empleados deben acumular Unidades de Promoción, logradas a través de la enseñanza, investigación, actividades de extensión o logros académicos, conforme a los estándares y puntos definidos por el 
              Reglamento Interno de las Condiciones Interiores de Trabajo del Personal Académico (RCITAIPN), artículos y anexos del Reglamento de Promoción Docente (RPDIPN) y los acuerdos suscritos por la Comisión Central Mixta Paritaria de Promoción Docente (CCMPPD).
            </p>
            <div  className="mt-8 mb-8">
            <img src={convo_2} alt="Promoción docente" className="w-3/4 mx-auto h-auto mb-4 rounded-lg shadow-lg" />
            <h2 className="text-3xl font-bold text-center mb-4 ml-8">Promoción docente en el Instituto Politécnico Nacional</h2>
            <p className="text-lg mt-4 text-black text-justify w-3/4 mx-auto">
              El Instituto Politécnico Nacional (IPN) tiene un sistema de promoción para su personal académico y de apoyo que reconoce y recompensa la excelencia en desempeño y trayectoria, especialmente en áreas académicas y de investigación. 
              Este proceso se rige por normativas internas y acuerdos de la Comisión Central Mixta Paritaria de Promoción Docente.
            </p>
            <p className="text-lg mt-4 text-black text-justify w-3/4 mx-auto">
            La Promoción Docente en el Instituto Politécnico Nacional (IPN) nace como parte de su compromiso por impulsar el desarrollo académico y reconocer el esfuerzo de su personal. Desde su 
            creación, el IPN ha tenido como objetivo principal la excelencia educativa y la mejora continua de sus docentes. A finales del siglo XX, con la creciente demanda de calidad en la 
            educación superior, el IPN implementó un proceso formal para que los docentes pudieran ascender en su carrera mediante el reconocimiento de sus méritos en docencia, investigación y 
            formación académica. Este proceso fue diseñado para asegurar que los profesores más dedicados y capacitados tuvieran la oportunidad de crecer profesionalmente, fortaleciendo así la 
            calidad educativa del instituto. Con el tiempo, la promoción docente se ha convertido en un pilar fundamental del IPN, garantizando que los esfuerzos y logros de los académicos sean 
            justamente valorados y recompensados, beneficiando tanto a los docentes como a los estudiantes.
            </p>
            </div>
          </div>
          
          <aside className="w-full md:w-1/3 pl-0 md:pl-8">
            <img src={Main_1} alt="¿Qué es este sitio?" className="mb-4 rounded-lg shadow-lg" />
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Sobre este sistema</h3>
              <hr className="border-t border-black mb-4" />
              <p>
                Este sitio junto con su versión móvil tienen el propósito de guiar y asistir a los docentes
                en su proceso de promoción académica con funciones y acceso a la información de una manera más cómoda y visual.
              </p>
            </div>
            <img src={Main_2} alt="¿Qué pongo?" className="mb-4 rounded-lg shadow-lg" />
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-bold mb-2">¡Da el siguiente paso en tu carrera!</h3>
              <hr className='border-t border-black mb-4'/>
              <p>
              La Promoción Docente en el IPN es tu oportunidad para brillar. Cada clase que impartes, cada investigación que desarrollas, te acerca más a nuevas metas. ¡Es momento de reconocer tu esfuerzo y 
              avanzar en tu camino profesional! No solo creces tú, crecemos todos. Tu dedicación merece ser recompensada. ¡Participa y sigue construyendo el futuro!</p>
            </div>
            <a href="https://www.dsapp.ipn.mx/dsi/" target="_blank" rel="noopener noreferrer">
              <img src={Main_3} alt="¿Qué pongo?" className="mb-4 rounded-lg shadow-lg w-auto h-auto" />
            </a>
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Visita la plataforma oficial</h3>
              <hr className='border-t border-black mb-4'/>
              <p>
              ¡Visita el siguiente vínculo para acceder a la plataforma que actualmente es utilizada por los docentes para que puedas comparar y brindarnos tu opinión y soporte acerca del desempeño
              de nuestro sistema y seguir mejorando!
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
