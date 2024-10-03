import React from 'react';
import { Link } from 'react-router-dom';
import Projection from '../img/proyeccion.png';
import Links from '../img/enlace.png';
import Documents from '../img/documentos.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';

function InfoProjection({ userName }) {
  return (
    <main>
    <div className="p-4 flex justify-end space-x-4 mr-14">
    <Link to="/projection" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
        <img src={Projection} alt="Proyección y seguimiento" className="w-12 h-12 mb-2" />
        <p className="text-sm font-semibold">Proyección y seguimiento</p>
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

<div className='"w-1/3 flex flex-col items-center'>
  Dura
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Columna 1 */}
  <div className="p-4">
    <h3 className="text-2xl font-bold mb-4">Columna 1</h3>
    <ul className="list-disc ml-4">
      <li>Punto de la columna 1</li>
      <li>Punto de la columna 1</li>
      <li>Punto de la columna 1</li>
      <li>Punto de la columna 1</li>
    </ul>
  </div>

  {/* Columna 2 */}
  <div className="p-4">
    <h3 className="text-2xl font-bold mb-4">Columna 2</h3>
    <ul className="list-disc ml-4">
      <li>Punto de la columna 2</li>
      <li>Punto de la columna 2</li>
      <li>Punto de la columna 2</li>
      <li>Punto de la columna 2</li>
    </ul>
  </div>
</div>
</div>

</main>
  );
}

export default InfoProjection;
