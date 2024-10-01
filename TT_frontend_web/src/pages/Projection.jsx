import React from 'react';
import { Link } from 'react-router-dom';
import { IoCreateOutline, IoGlassesOutline, IoHelpCircleOutline } from "react-icons/io5";
import Navigation from './Navigation/Navigation'; 

function ProyeccionSeguimiento() {
  return (
    <div className="min-h-screen bg-cover bg-center">
      {/* navegación fija */}
      <Navigation />

      <hr className="border-t-2 border-black my-4" />

      {/* Contenido Principal */}
      <div className="container mx-auto mt-8">
        <div className="flex justify-center space-x-8">
          <Link to="/new-projection" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
            <IoCreateOutline className="mb-4 w-20 h-20" /> 
            <p className="text-center text-lg font-semibold">Crear proyección</p>
          </Link>

          <Link to="/KanbanBoard" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
            <IoGlassesOutline className="mb-4 w-20 h-20" /> 
            <p className="text-center text-lg font-semibold">Ver mi proyección</p>
          </Link>
          
          <div>
            <Link to="/Guia" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-56 h-56 flex flex-col items-center justify-center">
              <IoHelpCircleOutline className="mb-4 w-20 h-20" /> 
              <p className="text-center text-lg font-semibold">Guía</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProyeccionSeguimiento;

