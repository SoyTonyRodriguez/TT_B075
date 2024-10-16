import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilePdf, FaFileImage, FaFileAlt, FaCalendarAlt, FaSyncAlt } from 'react-icons/fa';
import JSZip from 'jszip'; // Importar JSZip
import { saveAs } from 'file-saver'; // Importar FileSaver para descargar el archivo ZIP
import Navigation from './Navigation/Navigation';
import LoadingAnimation from "../components/LoadingAnimation";
import { TbXboxXFilled, TbReplace } from "react-icons/tb";
import LoadingSpinner from '../components/LoadingSpinner';

import { uploadDocument, getDocuments, deleteDocument, replaceDocument, getDocument } from '../../../api/documents.api';
import { getProduct } from '../../../api/products.api'; // Importa la función que obtiene las proyecciones

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
  const [projectionId, setProjectionId] = useState(''); // Proyección seleccionada

  const [projections, setProjections] = useState([]); // Estado para las proyecciones
  const [selectedProjection, setSelectedProjection] = useState(''); // Proyección seleccionada por el usuario

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Guardando los cambios...");
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);

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
    }, []);

  // Obtener tanto los documentos como las proyecciones y hacer el enlace
  useEffect(() => {
    const fetchDocumentsAndProjections = async () => {
      try {
        setLoading(true);
        const [documentsResponse, projectionsResponse] = await Promise.all([
          getDocuments(accountId),
          getProduct(accountId),
        ]);

        const projectionsMap = projectionsResponse.data.reduce((map, projection) => {
          map[projection.id] = projection;
          return map;
        }, {});

        const documents = documentsResponse.data.map(doc => ({
          id: doc.id,
          name: doc.file_name,
          size: `${(doc.size / 1024 / 1024).toFixed(2)} MB`,
          date: new Date(doc.upload_date).toLocaleDateString(),
          type: doc.file_type === 'application/pdf' ? 'pdf' : 'image',
          projection: projectionsMap[doc.projection_id]?.activity || 'Sin proyección', // Obtenemos la proyección
        }));

        setFileData(documents);
        setProjections(projectionsResponse.data);
      } catch (error) {
        console.error('Error al obtener los documentos y proyecciones:', error);
        setErrorMessage('Error al cargar los documentos.');
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchDocumentsAndProjections();
    }
  }, [accountId]);

  // Función para eliminar un documento
  const handleDeleteDocument = async (documentId) => {
    try {
      setLoadingMessage("Eliminando archivo...");
      setIsDocumentLoading(true); // Mostrar loading al eliminar
      await deleteDocument(documentId); // Llamada a la API para eliminar el documento
      setFileData(prevData => prevData.filter(file => file.id !== documentId)); // Actualizar el estado para eliminar el archivo
      setIsDocumentLoading(false);
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
      setErrorMessage('Error al eliminar el documento.');
    } finally {
      setIsDocumentLoading(false);
      setLoadingMessage("Guardando los cambios..."); // Vuelve al mensaje por defecto
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
      formData.append('file_type', newFile.type);  // Asegúrate de que se guarda el tipo de archivo
      formData.append('file', newFile);

      try {
        setIsDocumentLoading(true);
        await replaceDocument(documentId, formData); // Llamada al endpoint de reemplazo

        // Actualizar la lista de archivos con el archivo reemplazado
        setFileData(prevData =>
          prevData.map(file =>
            file.id === documentId
              ? {
                  ...file,
                  name: newFile.name,
                  size: `${(newFile.size / 1024 / 1024).toFixed(2)} MB`,
                  date: new Date().toLocaleDateString(),
                  type: newFile.type === 'application/pdf' ? 'pdf' : 'image', // Actualiza el tipo de archivo
                }
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

  // Función para manejar la visualización de documentos
  const handleDocumentClick = async (documentId) => {
    try {
      setLoadingMessage("Abriendo archivo...");
      setIsDocumentLoading(true);
      const response = await getDocument(documentId);
      const documentData = response.data.file; // archivo binario desde la API
      const documentType = response.data.file_type; // tipo de archivo
      
      setSelectedDocument({ data: documentData, type: documentType });
      setIsModalOpen(true); // Mostrar el modal
    } catch (error) {
      console.error('Error al obtener el documento:', error);
      setErrorMessage('Error al visualizar el documento.');
    } finally {
      setIsDocumentLoading(false);
      setLoadingMessage("Guardando los cambios..."); // Vuelve al mensaje por defecto
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };
  
  // Función para renderizar el contenido del documento
  const renderDocumentContent = () => {
    if (!selectedDocument) return null;
  
    const { data, type } = selectedDocument;
  
    if (type === 'application/pdf') {
      const pdfBlob = new Blob([new Uint8Array(atob(data).split("").map(char => char.charCodeAt(0)))], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      return (
        <iframe src={pdfUrl} width="100%" height="800px" title="PDF Preview"></iframe>
      );
    } else if (type.startsWith('image/')) {
      const imageUrl = `data:${type};base64,${data}`;
      return <img src={imageUrl} alt="Document Preview" className="max-w-full h-auto" />;
    }
  
    return <p>Tipo de archivo no soportado para previsualización.</p>;
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

    // Verifica si se ha seleccionado una proyección
    if (!selectedProjection) {
      setErrorMessage("Por favor selecciona una actividad para poder subir un nuevo documento.");
      return;
    }    

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
      formData.append('projection_id', selectedProjection); // Se envía la proyección seleccionada
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

      <div className="p-6 max-w-6xl mx-auto">
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

        {/* Dropdown para seleccionar una proyección */}
        <div className="mb-4">
          <label htmlFor="projection" className="block text-gray-700 font-bold mb-2">Selecciona una actividad para subir un documento nuevo:</label>
          <select
            id="projection"
            value={selectedProjection}
            onChange={(e) => setSelectedProjection(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecciona una actividad relacionada a un documento</option>
            {projections.map(projection => (
              <option key={projection.id} value={projection.id}>
                {projection.activity} / {projection.function}{/* Mostramos el campo activity */}
              </option>
            ))}
          </select>
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
              className={`flex items-center space-x-2 cursor-pointer p-2 px-4 rounded-full shadow-md transition duration-300 ${
                selectedProjection
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
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
              disabled={!selectedProjection} // Deshabilita el input si no hay proyección seleccionada
            />
          </div>

          {errorMessage && <div className="mb-4 text-red-500 font-medium">{errorMessage}</div>}

          {/* Encabezados de la tabla */}
          <div className="grid grid-cols-5 text-left font-bold p-2 border-b-2 border-gray-200 text-gray-600">
            <div>Nombre</div>
            <div className="text-center">Tamaño</div>
            <div className="text-center">Subido</div>
            <div className="text-center">Actividad</div> {/* Nueva columna para la proyección */}
            <div className="text-center">Acciones</div> {/* Alineación de la columna de acciones */}
          </div>

          {fileData.length === 0 ? (
            <div className="text-center p-4 text-gray-500">No tienes documentos cargados</div>
          ) : (
            fileData.map((file, index) => (
              <div
                key={index}
                className={`grid grid-cols-5 items-center p-3 rounded-lg shadow-sm transform transition-all duration-300 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md`}
              >
                <div className="flex items-center space-x-2">
                  {file.type === 'pdf' ? <FaFilePdf className="text-red-500 w-6 h-6" /> : <FaFileImage className="text-white w-6 h-6" />}
                  <span className="truncate max-w-xs underline cursor-pointer hover:text-yellow-300" title={file.name} onClick={() => handleDocumentClick(file.id)}>
                    {file.name}
                  </span>
                </div>
                <div className="text-center">{file.size}</div>
                <div className="text-center">{file.date}</div>
                <div className="text-center">{file.projection}</div> {/* Mostrar el nombre de la proyección */}
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
          {isDocumentLoading && <LoadingSpinner message={loadingMessage} />} {/* Mostrar spinner discreto si hay carga */}

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
      {/* Modal para mostrar el documento */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-2xl max-w-3xl w-full transform scale-95 transition-transform duration-300 ease-out hover:scale-100 border border-gray-300"
            onClick={(e) => e.stopPropagation()} // Evita que el clic cierre el modal cuando haces clic dentro del mismo
          >
            <button
              className="absolute top-4 right-4 text-red-600 hover:text-red-800 p-1 rounded-full text-2xl font-bold transition-transform duration-200 transform hover:scale-110"
              onClick={closeModal}
            >
              <TbXboxXFilled className="w-6 h-6" />
            </button>
            <div className="mt-6 overflow-auto max-h-[70vh]">
              {renderDocumentContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;
