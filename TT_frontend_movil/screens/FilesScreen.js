import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground, Image, Platform, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'; 
import * as MediaLibrary from 'expo-media-library'; // Importa MediaLibrary para permisos de archivos
import tw from 'twrnc'; 
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

import Toast from 'react-native-toast-message'; 
import LoadingScreen from './LoadingScreen'; // Pantalla de carga
import CustomToast from '../components/CustomToast'; // Toast personalizado

import { AuthContext } from '../components/AuthContext'; // Contexto de autenticación (Pasar token entre pantallas)
import { getDocuments, getDocument, uploadDocument, deleteDocument, replaceDocument } from '../api/documents.api'; // Endpoints de documentos
import { getProduct } from '../api/products.api'; // Endpoints de productos

const Documents = () => {
  const [fileData, setFileData] = useState([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showFileTypeDropdown, setShowFileTypeDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [projections, setProjections] = useState([]); // Estado para las proyecciones
  const [selectedProjection, setSelectedProjection] = useState(''); // Proyección seleccionada
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
  const [filteredFileData, setFilteredFileData] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [isProjectionModalOpen, setIsProjectionModalOpen] = useState(false); // Estado del modal de proyecciones
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false); // Modal para opciones de documento
  const [selectedDocumentId, setSelectedDocumentId] = useState(null); // ID del documento seleccionado

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(false); // Estado de carga del documento

  const [loading, setLoading] = useState(true); // Estado de carga inicial
  const [loadingMessage, setLoadingMessage] = useState(""); // Mensaje para LoadingScreen

  const { userId, token } = useContext(AuthContext); // Accede al token y userId del contexto

  // Obtener documentos desde la API
  // Obtener documentos y proyecciones desde la API
  const fetchDocumentsAndProjections = async () => {
    try {
      setLoadingMessage("Cargando documentos ...");
      setLoading(true); 
  
      const [documentsResponse, projectionsResponse] = await Promise.all([
        getDocuments(userId), // Llamada a la API de documentos
        getProduct(userId), // Llamada a la API de proyecciones
      ]);
  
      // Crear un mapa de proyecciones por ID para referencia rápida
      const projectionsMap = projectionsResponse.data.reduce((map, projection) => {
        map[projection.id] = projection;
        return map;
      }, {});
  
      // Formatear los documentos con la proyección correspondiente
      const documents = documentsResponse.data.map((doc) => ({
        id: doc.id,
        name: doc.file_name,
        size: `${(doc.size / 1024 / 1024).toFixed(2)} MB`,
        date: new Date(doc.upload_date).toLocaleDateString(),
        type: doc.file_type === 'application/pdf' ? 'pdf' : 'image',
        projection: projectionsMap[doc.projection_id]?.activity || 'Sin proyección',
      }));
  
      setFileData(documents);
      setFilteredFileData(documents);
      setProjections(projectionsResponse.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error al obtener documentos y proyecciones:', error);
      setErrorMessage('No se pudieron cargar los documentos y proyecciones.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDocumentsAndProjections();
  }, [userId]);

  // Función para manejar la búsqueda de documentos
  const handleSearch = (text) => {
    setSearchQuery(text); // Actualiza el estado de búsqueda
    if (text === '') {
      // Si no hay búsqueda, mostrar todos los documentos
      setFilteredFileData(fileData);
    } else {
      // Filtrar documentos cuyo nombre incluye el texto de búsqueda
      const filteredData = fileData.filter((file) =>
        file.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFileData(filteredData);
    }
  };

  const handleDocumentClick = async (documentId) => {
    try {
      setLoadingMessage("Abriendo documento ...");
      setDocumentLoading(true);
  
      // Encuentra el documento seleccionado en `fileData`
      const documentData = fileData.find(doc => doc.id === documentId);
      if (!documentData) {
        throw new Error("Documento no encontrado");
      }
  
      // Obtén los datos binarios del documento (para renderizar su contenido)
      const response = await getDocument(documentId);
      const { file, file_type } = response.data;
  
      // Asigna todos los datos relevantes al estado `selectedDocument`
      setSelectedDocument({
        ...documentData, // Incluye nombre, tamaño, fecha y proyección
        data: file,
        type: file_type
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener el documento:', error);
      setErrorMessage('Error al visualizar el documento.');
    } finally {
      setDocumentLoading(false);
    }
  };
  
  const renderDocumentContent = () => {
    if (!selectedDocument) return null;
  
    const { data, type } = selectedDocument;
  
    if (type === 'application/pdf') {
      // Generar la URI en formato base64 para el PDF
      const pdfUri = `data:application/pdf;base64,${data}`;
      return (
        <WebView
          originWhitelist={['*']}
          source={{ uri: pdfUri }}
          style={{ flex: 1 }}
          onError={(error) => console.log('Error en WebView:', error)}
        />
      );

    } else if (type.startsWith('image/')) {
      const imageUrl = `data:${type};base64,${data}`;
      return (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      );
    }
  
    return <Text>Tipo de archivo no soportado.</Text>;
  };

  // Cerrar todos los dropdowns
  const closeDropdowns = () => {
    setShowFileTypeDropdown(false);
    setShowDateDropdown(false);
  };

  const toggleProjectionDropdown = () => {
    setIsProjectionDropdownOpen(!isProjectionDropdownOpen);
  };

  // Mostrar/ocultar dropdown de tipo de archivo
  const toggleFileTypeDropdown = () => {
    setShowFileTypeDropdown(!showFileTypeDropdown);
    setShowDateDropdown(false);
  };

  // Mostrar/ocultar dropdown de fechas
  const toggleDateDropdown = () => {
    setShowDateDropdown(!showDateDropdown);
    setShowFileTypeDropdown(false);
  };

  // Filtrar documentos por tipo
  const handleFileTypeFilter = (type) => {
    setFileTypeFilter(type);
    closeDropdowns();
  };

  // Filtrar documentos por fecha
  const handleDateFilter = (filter) => {
    setDateFilter(filter);
    closeDropdowns();
  };

  // Resetear los filtros
  const resetFilters = () => {
    setFileTypeFilter('');
    setDateFilter('');
  };

  // Función de búsqueda y filtrado
  const applyFilters = () => {
    let filteredData = fileData;

    // Filtrar por tipo de archivo
    if (fileTypeFilter) {
      filteredData = filteredData.filter((file) => file.type === fileTypeFilter);
    }

    // Filtrar por fecha
    if (dateFilter) {
      const today = new Date();
      filteredData = filteredData.filter((file) => {
        const fileDate = new Date(file.date);
        
        switch (dateFilter) {
          case 'today':
            return fileDate.toDateString() === today.toDateString();
          
          case 'this-week':
            const oneWeekAgo = new Date(today);
            oneWeekAgo.setDate(today.getDate() - 7);
            return fileDate >= oneWeekAgo && fileDate <= today;

          case 'this-month':
            return (
              fileDate.getMonth() === today.getMonth() &&
              fileDate.getFullYear() === today.getFullYear()
            );

          case 'this-year':
            return fileDate.getFullYear() === today.getFullYear();

          default:
            return true;
        }
      });
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filteredData = filteredData.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFileData(filteredData); // Actualiza el estado con los datos filtrados
  };

  // Ejecuta applyFilters cada vez que cambian los filtros o la búsqueda
  useEffect(() => {
    applyFilters();
  }, [fileTypeFilter, dateFilter, searchQuery, fileData]);



  // Pedir permisos para acceder a los archivos en Android
  const requestFilePermissions = async () => {
    if (Platform.OS === 'android') {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage("Permiso denegado para acceder a los archivos.");
        return false;
      }
      return true;
    }
    return true; 
  };

  // Subir y validar archivos
  const handleFileUpload = useCallback(async () => {
    if (!selectedProjection) {
      setErrorMessage('Seleccione una proyección antes de subir un archivo.');
      return;
    }

    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/jpg'],
        copyToCacheDirectory: true, // Asegúrate de copiar al directorio de caché si es necesario
      });

      if (!result.canceled) {
        console.log('Archivo seleccionado:', result);
  
        const getFileTypeFromName = (name) => {
          const extension = name.split('.').pop().toLowerCase();
          switch (extension) {
            case 'pdf':
              return 'application/pdf';
            case 'jpg':
            case 'jpeg':
              return 'image/jpeg';
            default:
              return 'unknown';
          }
        };
  
        const fileType = result.assets[0].mimeType || getFileTypeFromName(result.assets[0].name);
        const fileSizeInKB = result.assets[0].size / 1024;
  
        console.log('result', result);
        // Validación del archivo
        if (fileType === 'application/pdf') {
          if (fileSizeInKB <= 2048) {
            await uploadFileToAPI(result.assets[0], fileType);
          } else {
            setErrorMessage('El archivo PDF debe ser de un tamaño máximo de 2MB.');
          }
        } else if (fileType === 'image/jpeg') {
          if (fileSizeInKB >= 50 && fileSizeInKB <= 700) {
            await uploadFileToAPI(result.assets[0], fileType);
          } else {
            setErrorMessage('Las imágenes deben tener un tamaño entre 50KB y 700KB.');
          }
        } else {
          setErrorMessage('Solo se permiten archivos PDF y JPG/JPEG.');
        }

      } else if (result.canceled) {
        console.log('Selección de archivo cancelada');
      } else {
        console.log('Resultado inesperado del DocumentPicker:', result.assets[0].mimeType);
      }
    } catch (error) {
      console.error('Error en handleFileUpload:', error);
      setErrorMessage(`Error al seleccionar el archivo: ${error.message}`);
    }
  }, [selectedProjection]);

  const uploadFileToAPI = async (file, fileType) => {
    console.log('Subiendo archivo:', file);
  
    try {
      // Leer el archivo y convertirlo a base64
      const fileUri = file.uri;
      const fileData = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const document = {
        file_name: file.name,
        file_type: fileType,
        size: file.size,
        file: fileData, // Archivo en formato base64
        projection_id: projections.find(p => p.id === selectedProjection).id,
        account_id: userId,
      };
  
      setLoading(true); // Mostrar pantalla de carga
      setLoadingMessage('Subiendo documento...');
  
      const response = await uploadDocument(document); // Llamada a la API para subir
      console.log('Documento subido:', response);
  
      Toast.show({
        type: 'success',
        text1: 'Documento subido',
        text2: 'El archivo se subió exitosamente.',
      });
  
      // Ejecutar fetchDocumentsAndProjections para actualizar la lista de documentos
      await fetchDocumentsAndProjections();
    } catch (error) {
      console.error('Error al subir el documento:', error);

      // Manejamos diferentes tipos de errores
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'Error desconocido al subir el documento.';
      
      setErrorMessage(errorMsg); // Mostrar mensaje de error
    } finally {
      setLoading(false); // Ocultar pantalla de carga
    }
  };

  const handleDeleteDocument = async () => {
    try {
      setLoading(true);
      setLoadingMessage('Eliminando documento...');
      setIsOptionsModalOpen(false);

      await deleteDocument(selectedDocumentId); // Llamada al endpoint delete

      Toast.show({
        type: 'success',
        text1: 'Documento Eliminado',
        text2: 'El documento fue eliminado correctamente.',
      });

      await fetchDocumentsAndProjections();
    } catch (error) {
      console.error('Error al eliminar documento:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo eliminar el documento.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReplaceDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/jpg'],
      });
      console.log('Archivo seleccionado:', result);
  
      if (!result.canceled) {
        const fileData = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        const document = {
          file_name: result.assets[0].name || 'documento_reemplazo',
          file_type: result.assets[0].mimeType || 'application/octet-stream',
          size: result.assets[0].size || 0,
          file: fileData,
        };
  
        setLoading(true);
        setLoadingMessage('Reemplazando documento...');
        setIsOptionsModalOpen(false);
  
        await replaceDocument(selectedDocumentId, document);
  
        Toast.show({
          type: 'success',
          text1: 'Documento Reemplazado',
          text2: 'El documento fue reemplazado exitosamente.',
        });
  
        await fetchDocumentsAndProjections();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se seleccionó un archivo válido.',
        });
      }
    } catch (error) {
      console.error('Error al reemplazar documento:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo reemplazar el documento.',
      });
    } finally {
      setLoading(false);
    }
  };


  const openProjectionModal = () => {
    setIsProjectionModalOpen(true);
  };

  const selectProjection = (projection) => {
    setSelectedProjection(projection.id);
    setIsProjectionModalOpen(false);
  };

  const openOptionsModal = (documentId) => {
    setSelectedDocumentId(documentId);
    setIsOptionsModalOpen(true);
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >

      {/* Pantalla de carga */}
      {loading && <LoadingScreen message={loadingMessage} />}

        {/* Título principal */}
      <View style={tw`flex-row justify-between items-center px-5 mt-10`}>
        <Text style={tw`text-2xl font-bold text-black`}>Mis documentos</Text>
        <Ionicons name="document-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      <View style={tw`p-6`}>
        {/* Barra de búsqueda */}
        <View style={tw`mb-6`}>
          <View style={tw`flex-row items-center border-b border-gray-300`}>
            <Ionicons name="search" size={24} color="#888" />
            <TextInput
              placeholder="Buscar en mis documentos"
              value={searchQuery}
              onChangeText={handleSearch} 
              style={tw`flex-1 py-2 ml-3`}
            />
          </View>
        </View>  

        {/* Filtros */}
        <View style={tw`flex-row justify-around mb-6 relative z-20`}>
          {/* Filtro por Tipo */}
          <View style={{ position: 'relative', zIndex: 10 }}>
            <TouchableOpacity 
              onPress={toggleFileTypeDropdown} 
              style={tw`bg-gray-200 p-3 rounded-lg flex-row items-center`}
            >
              <Ionicons name="document" size={20} color="black" />
              <Text style={tw`ml-2`}>Tipo</Text>
            </TouchableOpacity>

            {showFileTypeDropdown && (
              <View style={[tw`absolute top-16 left-0 z-50 bg-white shadow-lg p-4 rounded-lg`]}>
                <TouchableOpacity 
                  onPress={() => handleFileTypeFilter('pdf')} 
                  style={tw`p-2`}
                >
                  <Text>PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleFileTypeFilter('image')} 
                  style={tw`p-2`}
                >
                  <Text>JPG/JPEG</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeDropdowns} style={tw`p-2 text-red-500`}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Filtro por Fecha */}
          <View style={{ position: 'relative', zIndex: 10 }}>
            <TouchableOpacity 
              onPress={toggleDateDropdown} 
              style={tw`bg-gray-200 p-3 rounded-lg flex-row items-center`}
            >
              <Ionicons name="calendar" size={20} color="black" />
              <Text style={tw`ml-2`}>Modificado</Text>
            </TouchableOpacity>

            {showDateDropdown && (
              <View style={[tw`absolute top-16 left-0 z-50 bg-white shadow-lg p-4 rounded-lg`]}>
                <TouchableOpacity 
                  onPress={() => handleDateFilter('today')} 
                  style={tw`p-2`}
                >
                  <Text>Hoy</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleDateFilter('this-week')} 
                  style={tw`p-2`}
                >
                  <Text>Últimos 7 días</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleDateFilter('this-month')} 
                  style={tw`p-2`}
                >
                  <Text>Último mes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleDateFilter('this-year')} 
                  style={tw`p-2`}
                >
                  <Text>Este año</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeDropdowns} style={tw`p-2 text-red-500`}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Botón para resetear filtros */}
          <TouchableOpacity 
            onPress={resetFilters} 
            style={tw`bg-gray-200 p-3 rounded-lg flex-row items-center`}
          >
            <Ionicons name="refresh" size={20} color="black" />
            <Text style={tw`ml-2`}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Botón para abrir el modal de proyecciones */}
        <Text style={tw`text-gray-700 font-bold mb-2 text-base`}>Selecciona una actividad para subir un documento nuevo:</Text>
        <TouchableOpacity
          onPress={openProjectionModal}
          style={tw`bg-white p-4 rounded-lg mb-4 border border-gray-300 flex-row justify-between items-center`}
        >
          <Text>
            {selectedProjection 
              ? projections.find(p => p.id === selectedProjection)?.activity 
              : 'Seleccione una proyección'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="gray" />
        </TouchableOpacity>

        {/* Lista de documentos */}
        <View style={tw`bg-white p-4 rounded-lg shadow-lg`}>
          {errorMessage ? (
            <Text style={tw`text-red-500 mb-4`}>{errorMessage}</Text>
          ) : null}

          {/* Encabezado de la lista */}
          <View style={tw`flex-row py-2 border-b border-gray-300`}>
            {["Nombre", "Tamaño", "Subido", "Proyección"].map((header) => (
              <View key={header} style={tw`flex-1 items-center`}>
                <Text style={tw`font-bold text-sm`}>{header}</Text>
              </View>
            ))}
          </View>

          {/* Renderizar los documentos filtrados */}
          <View style={tw`bg-white p-4 rounded-lg shadow-lg`}>
            {filteredFileData.length === 0 ? (
              <Text style={tw`text-center text-gray-500 mt-4`}>No se encontraron documentos</Text>
            ) : (
              <FlatList
                data={filteredFileData}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                  onPress={() => handleDocumentClick(item.id)}
                  onLongPress={() => openOptionsModal(item.id)} 
                  style={[
                      tw`flex-row items-center py-3 border-b border-gray-300`,
                      selectedFileIndex === index ? tw`bg-blue-500 text-white` : tw`bg-white`,
                    ]}
                  >
                    <View style={tw`flex-1 items-center justify-center`}>
                      <Ionicons 
                        name={item.type === 'pdf' ? 'document' : 'image'} 
                        size={20} 
                        color={item.type === 'pdf' ? 'red' : 'blue'} 
                      />
                      <Text 
                        style={tw`ml-2`} 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View style={tw`flex-1 items-center`}>
                      <Text numberOfLines={1} ellipsizeMode="tail">{item.size}</Text>
                    </View>
                    <View style={tw`flex-1 items-center`}>
                      <Text numberOfLines={1} ellipsizeMode="tail">{item.date}</Text>
                    </View>
                    <View style={tw`flex-1 items-center`}>
                      <Text numberOfLines={1} ellipsizeMode="tail">{item.projection}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </View>

      {/* Modal para visualizar documentos */}
      <Modal visible={isModalOpen} transparent={true} animationType="fade" onRequestClose={() => setIsModalOpen(false)}>
      <View style={tw`flex-1 bg-black bg-opacity-90 justify-center items-center`}>
        <View style={tw`absolute top-5 w-full flex-row justify-between items-center px-4`}>
          
          {/* Botón de Cerrar */}
          <TouchableOpacity
            onPress={() => setIsModalOpen(false)}
            style={tw`bg-gray-800 p-2 rounded-full`}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          
          <ScrollView
            style={tw`flex-1 mx-2 max-h-15`} 
          >
            <Text style={tw`text-white text-lg font-bold text-center`}>
              {selectedDocument?.name || 'Sin título'}
            </Text>
          </ScrollView>
          
          {/* Icono para mostrar detalles */}
          <TouchableOpacity
            onPress={() => setIsDetailsModalOpen(true)} 
            style={tw`bg-gray-800 p-2 rounded-full`}
          >
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Contenedor para mostrar el documento */}
        <View style={tw`w-full h-5/6 bg-black justify-center items-center p-4 mt-10`}>
          <View style={tw`flex-1 w-full`}>
            {renderDocumentContent()}
          </View>
        </View>

        {/* Modal de detalles del documento */}
        <Modal visible={isDetailsModalOpen} transparent={true} animationType="slide" onRequestClose={() => setIsDetailsModalOpen(false)}>
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`w-3/4 bg-white p-6 rounded-lg shadow-lg w-90`}>
              <Text style={tw`text-xl font-bold mb-4 text-center`}>Detalles del documento</Text>
              
              <View style={tw`mb-2`}>
                <Text style={tw`text-lg font-semibold`}>Nombre:</Text>
                <Text style={tw`text-base`}>{selectedDocument?.name}</Text>
              </View>

              <View style={tw`mb-2`}>
                <Text style={tw`text-lg font-semibold`}>Tamaño:</Text>
                <Text style={tw`text-base`}>{selectedDocument?.size}</Text>
              </View>

              <View style={tw`mb-2`}>
                <Text style={tw`text-lg font-semibold`}>Fecha:</Text>
                <Text style={tw`text-base`}>{selectedDocument?.date}</Text>
              </View>

              <View style={tw`mb-2`}>
                <Text style={tw`text-lg font-semibold`}>Proyección:</Text>
                <Text style={tw`text-base`}>{selectedDocument?.projection || 'Sin proyección'}</Text>
              </View>

              <TouchableOpacity
                onPress={() => setIsDetailsModalOpen(false)}
                style={tw`bg-red-500 p-3 mt-4 rounded-lg`}
              >
                <Text style={tw`text-white text-center text-lg`}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>


      {documentLoading && <LoadingScreen message={loadingMessage} />}

      {/* Modal para seleccionar proyección */}
      <Modal
          visible={isProjectionModalOpen}
          transparent={true} // Esto permite el fondo con opacidad
          animationType="fade"
          onRequestClose={() => setIsProjectionModalOpen(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`w-3/4 bg-white p-6 rounded-lg shadow-lg w-90`}>
              <Text style={tw`text-2xl font-bold mb-4 text-center`}>Seleccione una proyección</Text>
              
              <FlatList
                data={projections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => selectProjection(item)}
                    style={tw`p-4 border-b border-gray-300`}
                  >
                    <Text style={tw`text-center text-base`}>{item.activity}</Text>
                  </TouchableOpacity>
                )}
              />
            <TouchableOpacity
              onPress={() => setIsProjectionModalOpen(false)}
              style={tw`bg-red-500 p-3 mt-4 rounded-lg`}
            >
              <Text style={tw`text-white text-center text-lg`}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        {/* Modal para opciones de documento */}
        <Modal
          visible={isOptionsModalOpen}
          animationType="slide"
          onRequestClose={() => setIsOptionsModalOpen(false)}
        >
          <View style={tw`flex-1 p-6`}>
            <Text style={tw`text-xl font-bold mb-4`}>Opciones del Documento</Text>

            <TouchableOpacity
              onPress={handleDeleteDocument}
              style={tw`bg-red-500 p-4 rounded-lg mb-4`}
            >
              <Text style={tw`text-white text-center`}>Eliminar Documento</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleReplaceDocument}
              style={tw`bg-blue-500 p-4 rounded-lg`}
            >
              <Text style={tw`text-white text-center`}>Reemplazar Documento</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsOptionsModalOpen(false)}
              style={tw`mt-6 p-3 bg-gray-300 rounded-lg`}
            >
              <Text style={tw`text-center`}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      {/* Botón flotante de nuevo archivo en la esquina inferior derecha */}
      <TouchableOpacity
        onPress={handleFileUpload}
        disabled={!selectedProjection} // Botón deshabilitado si no se selecciona proyección
        style={[
          tw`bg-blue-500 p-4 rounded-full shadow-lg`,
          { position: 'absolute', bottom: 20, right: 20 },
          selectedProjection ? tw`bg-blue-500` : tw`bg-gray-300 opacity-50`
        ]}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

    {/* Toast container */}
    <CustomToast />
    </ImageBackground>
  );
};

export default Documents;