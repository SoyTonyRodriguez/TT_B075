import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilePdf, FaFileImage, FaFileAlt, FaCalendarAlt, FaSyncAlt } from 'react-icons/fa';
import JSZip from 'jszip'; // Importar JSZip
import { saveAs } from 'file-saver'; // Importar FileSaver para descargar el archivo ZIP
import Navigation from './Navigation/Navigation';
import LoadingAnimation from "../components/LoadingAnimation";
import { TbXboxXFilled, TbReplace } from "react-icons/tb";
import LoadingSpinner from '../components/LoadingSpinner';
import { uploadDocument, getDocuments, deleteDocument, replaceDocument, getDocument } from '../api/documents.api';
import { getProduct } from '../api/products.api'; // Importa la función que obtiene las proyecciones

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
  const [activity_name, setActivityName] = useState(''); // Nombre de la actividad seleccionada

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState(''); // segun gpt es para buscar

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
        projection: doc.activity || 'Sin proyección', // Obtenemos la proyección
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

  useEffect(() => {
    if (accountId) {
      fetchDocumentsAndProjections();
    }
  }, [accountId]);

  // Función para eliminar un documento
  const handleDeleteDocument = async (documentId) => {
    const confirmDelete = window.confirm("¿Estás seguro que quieres eliminar este documento?");
    if (!confirmDelete) return; 
    

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

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number); // Extraemos día, mes y año
    return new Date(year, month - 1, day); // JavaScript usa meses de 0 a 11
  };
  

  // Ajuste para comparación de fechas
  const isDateInRange = (fileDateString, filter) => {
    const today = new Date(); // Fecha actual
    const fileDate = parseDate(fileDateString); // Convertimos la fecha del documento usando `parseDate`
  
    // Aseguramos que las comparaciones no se vean afectadas por la hora
    today.setHours(0, 0, 0, 0);
    fileDate.setHours(0, 0, 0, 0);
  
    switch (filter) {
      case 'today':
        return fileDate.getTime() === today.getTime();
  
      case 'this-week':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Inicio de la semana (domingo)
        startOfWeek.setHours(0, 0, 0, 0);
        return fileDate >= startOfWeek && fileDate <= today;
  
      case 'this-month':
        return (
          fileDate.getMonth() === today.getMonth() &&
          fileDate.getFullYear() === today.getFullYear()
        );
  
      case 'this-year':
        return fileDate.getFullYear() === today.getFullYear();
  
      default:
        return true; // Si no hay filtro, devolver true
    }
  };
  

  // Filtramos los documentos según tipo y fecha seleccionados
  const filteredFileData = fileData.filter(file => {
    const matchesType = !fileTypeFilter || file.type === fileTypeFilter;
    const matchesDate = !dateFilter || isDateInRange(file.date, dateFilter);
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
  
    return matchesType && matchesDate && matchesSearch;
  });  

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };  
  
  // Función para manejar la subida de archivos
  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];

    // Verifica si se ha seleccionado una proyección
    if (!selectedProjection) {
      setErrorMessage("Por favor selecciona una actividad para poder subir un nuevo documento.");
      return;
    }

    // Encuentra la proyección seleccionada
    const selectedProjectionData = projections.find(
      (projection) => projection.id === selectedProjection
    );
    setActivityName(selectedProjectionData.activity); // Guarda el nombre de la actividad

    if (!selectedProjectionData) {
      setErrorMessage("Proyección no encontrada.");
      return;
    }

    for (const file of files) {
      const fileType = file.type;
      const fileSizeInKB = file.size / 1024;

      const fileBase64 = await convertFileToBase64(file);
      const base64Content = fileBase64.split(",")[1]; // Extrae el contenido Base64 sin el encabezado

      if (fileType === "application/pdf") {
        if (fileSizeInKB <= 2048) {
          validFiles.push({
            name: file.name,
            size: file.size,
            type: "application/pdf",
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
            type: "image/jpeg",
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
      formData.append("account_id", accountId);
      formData.append("file_name", file.name);
      formData.append("file_type", fileType);
      formData.append("size", file.size);
      formData.append("projection_id", selectedProjection); // Proyección seleccionada
      formData.append("activity", selectedProjectionData.activity); // Agrega el campo activity
      formData.append("file", base64Content);

      console.log("formData:", formData);

      try {
        setIsDocumentLoading(true);
        const response = await uploadDocument(formData);
        console.log("Archivo subido con éxito", response.data);

        setErrorMessage("");

        await fetchDocumentsAndProjections(); // Actualizar la lista de documentos
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        setErrorMessage("Error al subir el archivo.");
      } finally {
        setIsDocumentLoading(false);
      }
    }
  };


  // Función para exportar documentos en ZI
  const handleExportZip = async () => {
    if (fileData.length === 0) {
      setErrorMessage("No hay archivos para exportar.");
      return;
    }
  
    const zip = new JSZip();
  
    for (const file of fileData) {
      try {
        // Obtén los datos binarios del archivo desde el backend
        const response = await getDocument(file.id);
        const documentData = response.data.file; // Datos en base64
        const documentBlob = new Blob([Uint8Array.from(atob(documentData), c => c.charCodeAt(0))]);
  
        // Añade el archivo al ZIP
        zip.file(file.name, documentBlob);
      } catch (error) {
        console.error(`Error al obtener el archivo ${file.name}:`, error);
        setErrorMessage(`Error al obtener el archivo ${file.name}.`);
      }
    }
  
    // Generar y descargar el archivo ZIP
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "documentos.zip");
  };

  const toggleFileDetails = (index) => {
    setFileData((prev) =>
      prev.map((file, i) =>
        i === index ? { ...file, showDetails: !file.showDetails } : file
      )
    );
  };  

  return (
    <div className="min-h-screen bg-cover bg-center">
      <Navigation />
      <hr className="border-t-2 border-black my-4" />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6 flex items-center">
          <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar en mis documentos"
            className="w-full pl-10 pr-4 py-2 text-gray-700 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <div className="absolute z-30 mt-2 bg-white rounded-lg shadow-lg p-4">
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
              <div className="absolute z-30 mt-2 bg-white rounded-lg shadow-lg p-4">
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
          <div className="p-2 border-b-2 border-gray-200 text-gray-600">
            {/* Vista para pantallas grandes (md o mayores) */}
            <div className="hidden md:grid md:grid-cols-5 text-left font-bold">
              <div>Nombre</div>
              <div className="text-center">Tamaño</div>
              <div className="text-center">Subido</div>
              <div className="text-center">Actividad</div>
              <div className="text-center">Acciones</div>
            </div>

            {/* Vista para pantallas pequeñas */}
            <div className="flex items-center justify-between md:hidden font-bold">
              <div>Nombre</div>
              <div className="text-right">Detalles</div>
            </div>
          </div>

          {filteredFileData.length === 0 ? (
            <div>No tienes documentos cargados</div>
          ) : (
            filteredFileData.map((file, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg shadow-sm bg-blue-400 hover:bg-blue-500 transition-all relative`}
              >
                {/* Vista para pantallas grandes */}
                <div className="hidden md:grid md:grid-cols-5 md:items-center">
                  {/* Nombre del archivo */}
                  <div className="flex items-center space-x-3">
                    {file.type === 'pdf' ? (
                      <FaFilePdf className="text-red-500 w-6 h-6 flex-shrink-0" />
                    ) : (
                      <FaFileImage className="text-white w-6 h-6 flex-shrink-0" />
                    )}
                    <span
                      className="whitespace-normal break-words text-white font-medium hover:text-yellow-300 cursor-pointer text-left"
                      title={file.name}
                      onClick={() => handleDocumentClick(file.id)}
                      style={{ textDecoration: 'none', maxWidth: '180px', wordWrap: 'break-word' }}
                    >
                      {file.name}
                    </span>
                  </div>

                  {/* Tamaño del archivo */}
                  <div className="text-center text-white">{file.size}</div>

                  {/* Fecha de subida */}
                  <div className="text-center text-white">{file.date}</div>

                  {/* Actividad */}
                  <div className="text-center text-white">{file.projection}</div>

                  {/* Acciones */}
                  <div className="flex items-center justify-center space-x-3">
                    <div className="flex flex-col items-center">
                      <button
                        className="text-red-600 hover:text-red-800 p-1 rounded-full bg-white flex justify-center items-center"
                        onClick={() => handleDeleteDocument(file.id)}
                      >
                        <TbXboxXFilled className="w-6 h-6" />
                      </button>
                      <span className="text-sm text-white">Eliminar</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <label className="text-green-600 hover:text-green-800 p-1 rounded-full bg-white flex justify-center items-center cursor-pointer">
                        <TbReplace className="w-6 h-6" />
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) => handleReplaceDocument(file.id, e)}
                        />
                      </label>
                      <span className="text-sm text-white">Reemplazar</span>
                    </div>
                  </div>
                </div>

                {/* Vista para pantallas pequeñas */}
                <div className="flex items-center justify-between md:hidden">
                  <div className="flex items-center space-x-3">
                    {file.type === 'pdf' ? (
                      <FaFilePdf className="text-red-500 w-6 h-6 flex-shrink-0" />
                    ) : (
                      <FaFileImage className="text-white w-6 h-6 flex-shrink-0" />
                    )}
                    <span
                      className="whitespace-normal break-words text-white font-medium hover:text-yellow-300 cursor-pointer text-left"
                      title={file.name}
                      onClick={() => handleDocumentClick(file.id)}
                      style={{ textDecoration: 'none', maxWidth: '180px', wordWrap: 'break-word' }}
                    >
                      {file.name}
                    </span>
                  </div>
                  {/* Detalles pantallas pequeñas */}
                  <button
                    className="text-white text-2xl font-bold hover:text-yellow-300 transition-transform transform duration-300 hover:scale-125"
                    onClick={() => toggleFileDetails(index)}
                  >
                    &#x2026; 
                  </button>
                </div>

                {/* Detalles para pantallas pequeñas */}
                {file.showDetails && (
                  <div className="md:hidden mt-2 space-y-2 w-full bg-blue-500 p-4 rounded-lg">
                    <div className="text-sm text-white">Tamaño: {file.size}</div>
                    <div className="text-sm text-white">Subido: {file.date}</div>
                    <div className="text-sm text-white">Actividad: {file.projection}</div>
                    <div className="flex space-x-3 mt-2">
                      <button
                        className="text-red-600 hover:text-red-800 p-1 rounded-full bg-white flex justify-center items-center"
                        onClick={() => handleDeleteDocument(file.id)}
                      >
                        <TbXboxXFilled className="w-6 h-6" />
                      </button>
                      <label className="text-green-600 hover:text-green-800 p-1 rounded-full bg-white flex justify-center items-center cursor-pointer">
                        <TbReplace className="w-6 h-6" />
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) => handleReplaceDocument(file.id, e)}
                        />
                      </label>
                    </div>
                  </div>
                )}
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