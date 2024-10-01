import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation/Navigation'; 

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
      {/* navegación fija */}
      <Navigation />

      <hr className="border-t-2 border-black my-4" />

      {/* Document Section */}
      <div className="p-4">

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
