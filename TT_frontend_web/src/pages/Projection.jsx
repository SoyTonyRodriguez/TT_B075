import React from 'react';
import { Link } from 'react-router-dom';
import Guia from '../img/guia.png';
import Links from '../img/enlace.png';
import Documents from '../img/documentos.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';
import CrearProyeccion from '../img/editardocumento.png';
import VerProyeccion from '../img/binoculares.png';

function ProyeccionSeguimiento() {
  return (
    <div className="min-h-screen bg-cover bg-center">
      
      {/* Navegación Secundaria */}
      <div className="p-4 flex justify-end space-x-4 mr-14">
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

      {/* Contenido Principal */}
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-2 text-left">Proyección y seguimiento</h2>
        <hr className="border-t-2 border-black mb-8" />
        <div className="flex justify-center space-x-8">
          <Link to="/new-projection" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
            <img src={CrearProyeccion} alt="Crear proyección" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Crear proyección</p>
          </Link>

          <Link to="/KanbanBoard" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
            <img src={VerProyeccion} alt="Ver mi proyección" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Ver mi proyección</p>
            </Link>
          
          <div>
          <Link to ="/Guia" className='bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center'>
            <img src={Guia} alt="Guía" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Guía</p>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProyeccionSeguimiento;
