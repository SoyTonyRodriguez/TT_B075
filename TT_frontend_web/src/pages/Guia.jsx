import React from 'react';
import { Link } from 'react-router-dom';
import Projection from '../img/proyeccion.png';
import Links from '../img/enlace.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';

function Convocatoria() {
  return (
    <div className="min-h-screen bg-cover bg-center">
      <div className="p-4 flex justify-end space-x-4 mr-14">
        <Link to="/projection" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
          <img src={Projection} alt="Proyección y seguimiento" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Proyección y seguimiento</p>
        </Link>
        <Link to="/links" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
          <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Enlaces y bases</p>
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
    
    <div className=' text-black-500 text-6xl mt-4 mx-4 w-2/3 underline'>
        ¿Crear proyección?
    </div>
    <div className='flex items-center justify-between bg-black bg-opacity-10 p-6 rounded-lg shadow-lg md:w-2/3 mt-8'>
        <p className='text-2xl leading-relaxed text-center justify-center mt-7'>
        Crear una proyección te permitirá establecer y controlar todas aquellas actividades que te propones cumplir en un 
        período de 2 años, tomando en cuenta todas las condiciones que aquí condensamos de una manera más ligera y directa, 
        así como la disposición del calendario de la convocatoria para que no olvides ninguna fecha. 
        </p>
    </div>
    <div className='flex items-center justify-between bg-black bg-opacity-10 p-6 rounded-lg shadow-lg mt-8 md:w-2/3'>
        <p className='text-2xl leading-relaxed text-center justify-center mt-6'>
        Para crear una proyección, luego de hacer clic sobre la opción con el mismo nombre podrás disponer de las actividades 
        disponibles para acumular puntos.Con opciones para crear, asignar descripción y prioridad, así como una fecha aproximada 
        para su cumplimiento ¡Podrás mantener un panorama completo sobre tus propósitos y progreso!
        </p>
    </div>
    <div className='w-full md:w-1/3 mb-8 mt-8'>
    <aside>
        <img src="" alt="" />
    </aside>
        <aside className='text-xl text-right mt-5'>
            Dentro de la creación de proyección se encuentra este cuadro en el cuál puedes seleccionar la actividad que vas a agregar
            a tu proyección, una vez seleccionada, debajo de ella se desplegarán lo datos necesarios de acuerdo al tipo de actividad.
        </aside>
    </div>
    </div>
  );
}

export default Convocatoria;

