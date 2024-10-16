import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilePdf, FaFileImage, FaFileAlt, FaCalendarAlt, FaSyncAlt } from 'react-icons/fa';
import JSZip from 'jszip'; // Importar JSZip
import { saveAs } from 'file-saver'; // Importar FileSaver para descargar el archivo ZIP
import Navigation from './Navigation/Navigation';
import LoadingAnimation from "../components/LoadingAnimation";
import { TbXboxXFilled, TbReplace } from "react-icons/tb";
import LoadingSpinner from '../components/LoadingSpinner';

import { uploadDocument, getDocuments, deleteDocument, replaceDocument } from '../../../api/documents.api';
import { jwtDecode } from 'jwt-decode';

function Documents() {
  const [fileData, setFileData] = useState([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState(''); 
  const [dateFilter, setDateFilter] = useState(''); 
  const [showFileTypeDropdown, setShowFileTypeDropdown] = useState(false); 
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [projectionId, setProjectionId] = useState(''); // Producto

  // Loading state (Pantalla de carga XD)
  const [loading, setLoading] = useState(true);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);  // Pantalla de carga para tareas (crear/editar)

    // Decode JWT once at the start and get the user ID
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          try {
              const decodedToken = jwtDecode(token);
              setAccountId(decodedToken.user_id);
          } catch (error) {
              console.error('Invalid token:', error);
          }
      } else {
          setLoading(false); // Stop loading if no token is found
      }
      setProjectionId('product_6797221c-8597-44b3-9a47-5be922873a52')
    }, []);

  // Llamada al endpoint para obtener los documentos
  useEffect(() => {
    const fetchDocuments = async () => {
      if (accountId) {
        setLoading(true); // Mostrar pantalla de carga
        try {
          const response = await getDocuments(accountId);
          const documents = response.data.map(doc => ({
            id: doc.id,
            name: doc.file_name,
            size: `${(doc.size / 1024 / 1024).toFixed(2)} MB`,
            date: new Date(doc.upload_date).toLocaleDateString(),
            type: doc.file_type === 'application/pdf' ? 'pdf' : 'image',
          }));
          console.log('Documentos obtenidos:', documents);
          setFileData(documents); // Actualizar el estado con los documentos obtenidos
        } catch (error) {
          console.error('Error al obtener los documentos:', error);
          setErrorMessage('Error al cargar los documentos.');
        } finally {
          setLoading(false); // Ocultar pantalla de carga
        }
      }
    };

    fetchDocuments();
  }, [accountId]);

  // Función para eliminar un documento
  const handleDeleteDocument = async (documentId) => {
    try {
      setIsDocumentLoading(true); // Mostrar loading al eliminar
      await deleteDocument(documentId); // Llamada a la API para eliminar el documento
      setFileData(prevData => prevData.filter(file => file.id !== documentId)); // Actualizar el estado para eliminar el archivo
      setIsDocumentLoading(false);
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
      setErrorMessage('Error al eliminar el documento.');
      setIsDocumentLoading(false);
    }
  };

  // Función para reemplazar un documento
  const handleReplaceDocument = async (documentId, event) => {
    console.log('documentId:', documentId); // Depurar el documentId para asegurarse de que no sea undefined
    const newFile = event.target.files[0];
    if (newFile) {
      const formData = new FormData();
      formData.append('file_name', newFile.name);
      formData.append('size', newFile.size);
      formData.append('file', newFile);

      try {
        setIsDocumentLoading(true);
        await replaceDocument(documentId, formData); // Llamada al endpoint de reemplazo
        // Actualizar la lista de archivos con el archivo reemplazado
        setFileData(prevData =>
          prevData.map(file =>
            file.id === documentId
              ? { ...file, name: newFile.name, size: `${(newFile.size / 1024 / 1024).toFixed(2)} MB`, date: new Date().toLocaleDateString() }
              : file
          )
        );
        setErrorMessage('');
      } catch (error) {
        console.error('Error al reemplazar el documento:', error);
        setErrorMessage('Error al reemplazar el documento.');
        setIsDocumentLoading(false);
      } finally {
        setIsDocumentLoading(false);
      }
    }
  };

  // Show loading (Mostrar pantalla de carga)
  if (loading) {
    return <LoadingAnimation />;
  }

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
  
  // Función para manejar la subida de archivos
  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];

    for (const file of files) {
      const fileType = file.type;
      const fileSizeInKB = file.size / 1024;

      if (fileType === "application/pdf") {
        if (fileSizeInKB <= 2048) {
          validFiles.push({
            name: file.name,
            size: file.size,
            type: 'application/pdf',
            file: file,
          });
        } else {
          setErrorMessage("El archivo PDF debe ser de un tamaño máximo de 2MB.");
          continue;
        }
      } else if (fileType === "image/jpeg" || fileType === "image/jpg") {
        if (fileSizeInKB >= 50 && fileSizeInKB <= 700) {
          validFiles.push({
            name: file.name,
            size: file.size,
            type: 'image/jpeg',
            file: file,
          });
        } else {
          setErrorMessage("Las imágenes deben tener un tamaño entre 50KB y 700KB.");
          continue;
        }
      } else {
        setErrorMessage("Solo se permiten archivos PDF y JPG/JPEG.");
        continue;
      }

      // Subir archivo al backend
      const formData = new FormData();
      formData.append('account_id', accountId);
      formData.append('file_name', file.name);
      formData.append('file_type', fileType);
      formData.append('size', file.size);
      formData.append('projection_id', projectionId);
      formData.append('file', file);

      try {
        setIsDocumentLoading(true);
        const response = await uploadDocument(formData);
        console.log('Archivo subido con éxito', response.data);
        setFileData([...fileData, {
          id: response.data.id,
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          date: new Date().toLocaleDateString(),
          type: fileType === 'application/pdf' ? 'pdf' : 'image',
        }]);
        setErrorMessage("");
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        setErrorMessage("Error al subir el archivo.");
      } finally {
        setIsDocumentLoading(false);
      }
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
              <div className="absolute mt-2 bg-white rounded-lg shadow-lg p-4">
                <button onClick={() => handleDateFilter('today')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Hoy
                </button>
                <button onClick={() => handleDateFilter('this-week')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Últimos 7 días
                </button>
                <button onClick={() => handleDateFilter('this-month')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Último mes
                </button>
                <button onClick={() => handleDateFilter('this-year')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Este año
                </button>
                <button onClick={closeDropdowns} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                  Cancelar
                </button>
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

          {/* Encabezados de la tabla */}
          <div className="grid grid-cols-4 text-left font-bold p-2 border-b-2 border-gray-200 text-gray-600">
            <div>Nombre</div>
            <div className="text-center">Tamaño</div>
            <div className="text-center">Subido</div>
            <div className="text-center">Acciones</div> {/* Alineación de la columna de acciones */}
          </div>

          {fileData.length === 0 ? (
            <div className="text-center p-4 text-gray-500">No tienes documentos cargados</div>
          ) : (
            fileData.map((file, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 items-center p-3 rounded-lg shadow-sm transform transition-all duration-300 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md`}
              >
                <div className="flex items-center space-x-2">
                  {file.type === 'pdf' ? <FaFilePdf className="text-red-500 w-6 h-6" /> : <FaFileImage className="text-white w-6 h-6" />}
                  <span className="truncate max-w-xs" title={file.name}>{file.name}</span>
                </div>
                <div className="text-center">{file.size}</div>
                <div className="text-center">{file.date}</div>
                <div className="flex justify-center space-x-3"> {/* Separar los botones con espacio */}
                  <div className="flex flex-col items-center">
                    {/* Botón para eliminar */}
                    <button
                      className="text-red-600 hover:text-red-800 p-1 rounded-full bg-white flex justify-center items-center"
                      onClick={() => handleDeleteDocument(file.id)}
                    >
                      <TbXboxXFilled className="w-6 h-6" />
                    </button>
                    <span className="text-sm text-white">Eliminar</span> {/* Texto debajo del botón */}
                  </div>

                  {/* Botón para reemplazar */}
                  <div className="flex flex-col items-center">
                    {/* Botón para reemplazar */}
                    <label className="text-green-600 hover:text-green-800 p-1 rounded-full bg-white flex justify-center items-center cursor-pointer">
                      <TbReplace className="w-6 h-6" />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => handleReplaceDocument(file.id, e)}
                      />
                    </label>
                    <span className="text-sm text-white">Reemplazar</span> {/* Texto debajo del botón */}
                  </div>
                </div>
              </div>
            ))
          )}
          {isDocumentLoading && <LoadingSpinner />} {/* Mostrar spinner discreto si hay carga */}

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
