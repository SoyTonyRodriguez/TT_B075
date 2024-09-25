import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Projection from '../img/proyeccion.png';
import Links from '../img/enlace.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';

const fileData = [
  {
    name: 'Constancia-DEMS',
    size: '125 KB',
    date: '26/11/2025',
  },
  {
    name: 'Acta_Eleccion1',
    size: '1.5 Mb',
    date: '15/04/2024',
  },
];

function Documents() {
  const [selectedFileIndex, setSelectedFileIndex] = useState(null); // Track the selected file index

  const handleFileClick = (index) => {
    setSelectedFileIndex(index); // Set the clicked file as selected
  };

  return (
    <div className="min-h-screen bg-cover bg-center">
      {/* Navigation Bar */}
      <div className="p-4 flex justify-end space-x-4 mr-14">
        <Link
          to="/projection"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Projection} alt="Proyección y seguimiento" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Proyección y seguimiento</p>
        </Link>
        <Link
          to="/links"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Enlaces y bases</p>
        </Link>
        <Link
          to="/calendar"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Calendar} alt="Calendario" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Calendario</p>
        </Link>
        <Link
          to="/account"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Account} alt="Mi cuenta" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Mi cuenta</p>
        </Link>
      </div>

      {/* Document Section */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Mis documentos</h2>

        {/* File Table */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center mb-4">
            <select className="border p-2 rounded-lg mr-4">
              <option value="archivos">Archivos</option>
              {/* Add more filter options here */}
            </select>
            <input
              type="text"
              placeholder="Buscar..."
              className="border p-2 rounded-lg w-full"
            />
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-3 text-left font-bold p-2 border-b-2 border-gray-200">
            <div>Nombre</div>
            <div>Tamaño</div>
            <div>Subido</div>
          </div>

          {/* File List */}
          {fileData.map((file, index) => (
            <div
              key={index}
              onClick={() => handleFileClick(index)} // Handle file click
              className={`grid grid-cols-3 text-left p-2 cursor-pointer ${
                selectedFileIndex === index ? 'bg-orange-300' : index % 2 === 0 ? 'bg-orange-100' : ''
              }`}
            >
              <div>{file.name}</div>
              <div>{file.size}</div>
              <div>{file.date}</div>
            </div>
          ))}

          {/* Export Button */}
          <div className="flex justify-end mt-4">
            <button className="bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600">
              Exportar ZIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
