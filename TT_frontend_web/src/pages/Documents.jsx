import React, { useState } from 'react';
import { FaSearch, FaFilePdf, FaFileImage, FaFileAlt, FaCalendarAlt, FaSyncAlt } from 'react-icons/fa';
import JSZip from 'jszip'; // Importar JSZip
import { saveAs } from 'file-saver'; // Importar FileSaver para descargar el archivo ZIP
import Navigation from './Navigation/Navigation';

function Documents() {
  const [fileData, setFileData] = useState([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState(''); 
  const [dateFilter, setDateFilter] = useState(''); 
  const [showFileTypeDropdown, setShowFileTypeDropdown] = useState(false); 
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Función que cierra todos los dropdowns
  const closeDropdowns = () => {
    setShowFileTypeDropdown(false);
    setShowDateDropdown(false);
  };

  // Función para mostrar/ocultar dropdown de tipo de archivo
  const toggleFileTypeDropdown = () => {
    setShowFileTypeDropdown(!showFileTypeDropdown);
    setShowDateDropdown(false); 
  };

  // Función para mostrar/ocultar dropdown de fechas
  const toggleDateDropdown = () => {
    setShowDateDropdown(!showDateDropdown);
    setShowFileTypeDropdown(false); 
  };

  // Función para filtrar documentos por tipo
  const handleFileTypeFilter = (type) => {
    setFileTypeFilter(type);
    closeDropdowns();
  };

  // Función para filtrar documentos por fecha
  const handleDateFilter = (filter) => {
    setDateFilter(filter);
    closeDropdowns();
  };

  // Función para establecer el estado predeterminado
  const resetFilters = () => {
    setFileTypeFilter('');
    setDateFilter('');
  };

  // filtros de tipo y fecha
  const filteredFileData = fileData.filter(file => {
    if (fileTypeFilter && file.type !== fileTypeFilter) {
      return false;
    }
    if (dateFilter && file.date !== dateFilter) {
      return false;
    }
    return true;
  });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];

    files.forEach((file) => {
      const fileType = file.type;
      const fileSizeInKB = file.size / 1024; // Tamaño de nuestro archivo en kb

      // Función para subir documentos con sus restricciones
      if (fileType === "application/pdf") {
        if (fileSizeInKB <= 2048) {
          validFiles.push({
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(2)} Mb`,
            date: new Date().toLocaleDateString(),
            type: 'pdf',
            file: file, // Añadir archivo original
          });
        } else {
          setErrorMessage("El archivo PDF debe ser de un tamaño máximo de 2MB.");
        }
      } else if (fileType === "image/jpeg" || fileType === "image/jpg") {
        if (fileSizeInKB >= 50 && fileSizeInKB <= 700) {
          validFiles.push({
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} Kb`,
            date: new Date().toLocaleDateString(),
            type: 'image',
            file: file, // Añadir archivo original
          });
        } else {
          setErrorMessage("Las imágenes deben tener un tamaño entre 50KB y 700KB.");
        }
      } else {
        setErrorMessage("Solo se permiten archivos PDF y JPG/JPEG.");
      }
    });

    if (validFiles.length > 0) {
      setFileData([...fileData, ...validFiles]);
      setErrorMessage("");
    }
  };

  // Función para exportar documentos en ZIP
  const handleExportZip = async () => {
    if (fileData.length === 0) {
      setErrorMessage("No hay archivos para exportar.");
      return;
    }

    const zip = new JSZip();

    fileData.forEach((file) => {
      // Agregamos los archivos al zip con su nombre original
      zip.file(file.name, file.file);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "documentos.zip");
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-background-image.png')" }}>
      <Navigation />
      <hr className="border-t-2 border-black my-4" />

      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6 flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar en mis documentos"
              className="w-full pl-10 pr-4 py-2 text-gray-700 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="w-5 h-5 text-gray-400" />
            </span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <div className="relative">
            <button
              className="px-4 py-2 rounded-full border bg-gray-200 hover:bg-blue-500 text-gray-600 hover:text-white shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-2"
              onClick={toggleFileTypeDropdown}
            >
              <FaFileAlt className="w-4 h-4" />
              <span>Tipo</span>
            </button>
            {showFileTypeDropdown && (
              <div className="absolute mt-2 bg-white rounded-lg shadow-lg p-4">
                <button onClick={() => handleFileTypeFilter('pdf')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  PDF
                </button>
                <button onClick={() => handleFileTypeFilter('image')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  JPG/JPEG
                </button>
                <button onClick={closeDropdowns} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                  Cancelar
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="px-4 py-2 rounded-full border bg-gray-200 hover:bg-blue-500 text-gray-600 hover:text-white shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-2"
              onClick={toggleDateDropdown}
            >
              <FaCalendarAlt className="w-4 h-4" />
              <span>Modificado</span>
            </button>
            {showDateDropdown && (
              <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-lg p-4">
                <button onClick={() => handleDateFilter('today')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Hoy</button>
                <button onClick={() => handleDateFilter('this-week')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Últimos 7 días</button>
                <button onClick={() => handleDateFilter('this-month')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Último mes</button>
                <button onClick={() => handleDateFilter('this-year')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Este año</button>
                <button onClick={closeDropdowns} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Cancelar</button>
              </div>
            )}
          </div>


          <button
            className="px-4 py-2 rounded-full border bg-gray-200 hover:bg-blue-500 text-gray-600 hover:text-white shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-2"
            onClick={resetFilters}
          >
            <FaSyncAlt className="w-4 h-4" />
            <span>Predeterminado</span>
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6 flex items-center justify-start">
            <label
              htmlFor="file-upload"
              className="flex items-center space-x-2 cursor-pointer bg-blue-500 text-white border border-blue-500 rounded-full p-2 px-4 shadow-md hover:bg-blue-600 hover:border-blue-600 transition duration-300"
            >
              <span className="text-lg">+</span>
              <span>Nuevo</span>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileUpload}
              accept=".pdf, .jpg, .jpeg"
              className="hidden"
            />
          </div>

          {errorMessage && <div className="mb-4 text-red-500 font-medium">{errorMessage}</div>}

          <div className="grid grid-cols-3 text-left font-bold p-2 border-b-2 border-gray-200 text-gray-600">
            <div>Nombre</div>
            <div>Tamaño</div>
            <div>Subido</div>
          </div>

          {filteredFileData.length === 0 ? (
            <div className="text-center p-4 text-gray-500">No tienes documentos cargados</div>
          ) : (
            filteredFileData.map((file, index) => (
              <div
                key={index}
                onClick={() => setSelectedFileIndex(index)}
                className={`grid grid-cols-3 text-left p-3 cursor-pointer rounded-lg shadow-sm transform transition-all duration-300 ${selectedFileIndex === index ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-blue-100 hover:shadow-md'} hover:shadow-md border-b border-gray-200`}
              >
                <div className="flex items-center space-x-2">
                  {file.type === 'pdf' ? <FaFilePdf className="text-red-500 w-6 h-6" /> : <FaFileImage className="text-blue-500 w-6 h-6" />}
                  <span>{file.name}</span>
                </div>
                <div>{file.size}</div>
                <div>{file.date}</div>
              </div>
            ))
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={handleExportZip} // Añadimos el evento click para exportar ZIP
              className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Exportar ZIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
