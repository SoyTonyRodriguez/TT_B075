import React from 'react';
import { Link } from 'react-router-dom';
import promoImage from '../img/ipn-main.webp';
import enlace from '../img/enlace.png';
import Main_1 from '../img/Main_1.jpg';
import Main_2 from '../img/descriptiva.jpg';
import Convocatoria from '../img/megafono.png';
import Nosotros from '../img/proyecto.png';
import login from '../img/miPerfil.png';

function MainContent() {
  return (
    <main className="min-h-screen bg-cover bg-center">
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">BIENVENIDO</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 flex flex-col items-center justify-center">
            <img src={enlace} alt="Enlaces oficiales" className="mb-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
            <p className="text-center text-sm md:text-md lg:text-lg font-semibold">Enlaces oficiales</p>
          </div>
          
          <a href="https://www.ipn.mx/assets/files/cics-sto/docs/servicios/ch/2024/Convocatoria-Promocion-Docente-2024.pdf" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 flex flex-col items-center justify-center">
            <img src={Convocatoria} alt="Convocatoria" className="mb-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
            <p className="text-center text-sm md:text-md lg:text-lg font-semibold">Convocatoria</p>
          </a>
          
          <Link to="/Nosotros" className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 flex flex-col items-center justify-center">
            <img src={Nosotros} alt="Nosotros" className="mb-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
            <p className="text-center text-sm md:text-md lg:text-lg font-semibold">Nuestro Proyecto</p>
          </Link>
          
          <Link to="/Login" className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 flex flex-col items-center justify-center">
            <img src={login} alt="Inicio de sesión en el sitio" className="mb-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
            <p className="text-center text-sm md:text-md lg:text-lg font-semibold">Iniciar sesión</p>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-2/3 mb-8">
            <img src={promoImage} alt="Promoción docente" className="w-3/4 mx-auto h-auto mb-4 rounded-lg shadow-lg" />
            <h2 className="text-3xl font-bold text-center mb-4">Promoción docente en el Instituto Politécnico Nacional</h2>
            <p className="text-lg mt-4 text-gray-700 text-justify w-3/4 mx-auto">
              El Instituto Politécnico Nacional (IPN) tiene un sistema de promoción para su personal académico y de apoyo que reconoce y recompensa la excelencia en desempeño y trayectoria, especialmente en áreas académicas y de investigación. 
              Este proceso se rige por normativas internas y acuerdos de la Comisión Central Mixta Paritaria de Promoción Docente.
            </p>
            <p className="text-lg mt-4 text-gray-700 text-justify w-3/4 mx-auto">
              Para ascender, los empleados deben acumular Unidades de Promoción, logradas a través de la enseñanza, investigación, actividades de extensión o logros académicos, conforme a los estándares y puntos definidos por el 
              Reglamento Interno de las Condiciones Interiores de Trabajo del Personal Académico (RCITAIPN), artículos y anexos del Reglamento de Promoción Docente (RPDIPN) y los acuerdos suscritos por la Comisión Central Mixta Paritaria de Promoción Docente (CCMPPD).
            </p>
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
              <p>Aqui vamos a poner otra tonteria para que ocupe espacio.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
