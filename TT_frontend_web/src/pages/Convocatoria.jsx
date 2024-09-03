import React from 'react';
import { Link } from 'react-router-dom';
import Projection from '../img/proyeccion.png';
import Links from '../img/enlace.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';
import convo_1 from '../img/convo_1.webp';
import convo_2 from '../img/covo_calendar.png';
import convo_3 from '../img/convo_requisito.png';


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

  <div className='flex flex-wrap justify-center'>
    <div className='w-full md:w-2/3 mb-8'>
      <div className=' text-black-500 text-6xl mt-4 mx-4 w-2/3'>
        ¿En qué consiste la convocatoria?
      </div>
      <div class="flex items-center">
        <p class="text-xl mt-4 text-gray-800 text-justify w-2/3 mx-auto">La Promoción Docente busca reconocer y premiar el esfuerzo de los docentes del IPN. Su objetivo es ayudarte a crecer 
        profesionalmente, avanzando en tu carrera académica, y mejorar la calidad educativa a través de la actualización constante y la innovación en tu enseñanza. En pocas palabras, es una 
        oportunidad para desarrollarte y ser valorado por tus contribuciones al instituto.</p>
        <img src={convo_1} alt="Imagen que hace referencia a la documentación" className="ml-8 w-80 h-auto rounded-lg"/>
      </div>
      <p className='text-center text-2xl text-gray-800 mt-8'>
       Si es tu primer contacto con este proceso, estos son los puntos más importantes que debes de tomar en cuenta:
      </p>

    <div className='space-y-8 mt-8 flex items-center space-x-8'>
      <img src={convo_2} alt="Imagen que hace referencia a la documentación" className="w-48 h-auto rounded"/>
      <p className='text-2xl'>
        La Dirección General del IPN emite la convocatoria de promoción cada año antes del primer día hábil de enero
      </p>
    </div>
    <div className='space-y-8 mt-8 flex items-center space-x-8 justify-between'>
      <p className='text-2xl font-bold'>
        Requisitos generales:
        </p>
      <ul className='text-2xl space-y-4 list-disc list-inside'>
        <li>Tener una plaza en propiedad.</li>
        <li> Haber laborado al menos dos años en la categoría actual.</li>
        <li>Cumplir con la carga académica establecida .</li>
      </ul>
      <img src={convo_3} alt="Imagen que hace referencia a la documentación" className="w-48 h-auto rounded"/>
    </div>
     </div>
    </div>
  </div>
  );
}

export default Convocatoria;

