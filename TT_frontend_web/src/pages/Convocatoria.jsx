import React from 'react';
import { Link } from 'react-router-dom';
import convo_1 from '../img/convo_1.webp';
import convo_2 from '../img/covo_calendar.png';
import convo_3 from '../img/convo_requisito.png';
import Navigation from './Navigation/Navigation'; 
import { format, startOfMonth, startOfWeek, addDays, setMonth, setYear, addMonths, subMonths, isSameDay, isSameMonth, parseISO } from 'date-fns';

function Convocatoria() {
  return (
    <div className="min-h-screen bg-cover bg-center">
      {/* navegación fija */}
      <Navigation />

      <hr className="border-t-2 border-black my-4" />

      {/* Contenido de la Convocatoria */}
      <div className='flex flex-wrap justify-center px-4'>
        <div className='w-full md:w-2/3 mb-8'>
          {/* Título de la Convocatoria */}

          {/* Descripción General */}
          <div className="flex items-center">
            <p className="text-xl mt-4 text-gray-800 text-justify w-2/3 mx-auto">
              La Promoción Docente busca reconocer y premiar el esfuerzo de los docentes del IPN. Su objetivo es ayudarte a crecer profesionalmente, avanzando en tu carrera académica, y mejorar la calidad educativa a través de la actualización constante y la innovación en tu enseñanza. En pocas palabras, es una oportunidad para desarrollarte y ser valorado por tus contribuciones al instituto.
            </p>
            <img src={convo_1} alt="Imagen que hace referencia a la documentación" className="ml-8 w-80 h-auto rounded-lg"/>
          </div>

          {/* Subtítulo */}
          <p className='text-center text-2xl text-gray-800 mt-8'>
            Si es tu primer contacto con este proceso, estos son los puntos más importantes que debes de tomar en cuenta:
          </p>

          {/* Información Adicional */}
          <div className='space-y-8 mt-8 flex items-center space-x-8'>
            <img src={convo_2} alt="Imagen que hace referencia a la documentación" className="w-48 h-auto rounded"/>
            <p className='text-2xl'>
              La Dirección General del IPN emite la convocatoria de promoción cada año antes del primer día hábil de enero
            </p>
          </div>

          {/* Requisitos Generales */}
          <div className='space-y-8 mt-8 flex items-center space-x-8 justify-between'>
            <p className='text-2xl font-bold'>
              Requisitos generales:
            </p>
            <ul className='text-2xl space-y-4 list-disc list-inside'>
              <li>Tener una plaza en propiedad.</li>
              <li>Haber laborado al menos dos años en la categoría actual.</li>
              <li>Cumplir con la carga académica establecida.</li>
            </ul>
            <img src={convo_3} alt="Imagen que hace referencia a la documentación" className="w-48 h-auto rounded"/>
          </div>

          {/* Proceso de Revisión y Evaluación */}
          <div className="space-y-8 mt-8">
            <h3 className="text-2xl font-bold">Proceso de Revisión y Evaluación:</h3>
            <p className="text-xl">
              Las comisiones de promoción revisan las solicitudes para verificar que cumplan con los requisitos. Los jurados calificadores evalúan los méritos académicos y emiten dictámenes.
            </p>
          </div>

          {/* Publicación de Resultados */}
          <div className="space-y-8 mt-8">
            <h3 className="text-2xl font-bold">Publicación de Resultados:</h3>
            <p className="text-xl">
              Los resultados se publican en el centro de adscripción del docente, conforme al cronograma establecido.
            </p>
          </div>

          {/* Recurso de Reconsideración */}
          <div className="space-y-8 mt-8">
            <h3 className="text-2xl font-bold">Recurso de Reconsideración:</h3>
            <p className="text-xl">
              Los docentes que no estén de acuerdo con el dictamen pueden presentar un recurso de reconsideración.
            </p>
          </div>

          {/* Cuerpos Colegiados */}
          <div className="space-y-8 mt-8">
            <h3 className="text-2xl font-bold">Cuerpos Colegiados:</h3>
            <p className="text-xl">
              La promoción docente está supervisada por diversas comisiones que incluyen representantes de diferentes áreas del IPN, asegurando un proceso justo y transparente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Convocatoria;
