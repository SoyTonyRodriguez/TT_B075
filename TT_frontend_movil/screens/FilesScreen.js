import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground, Image, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'; 
import * as MediaLibrary from 'expo-media-library'; // Importa MediaLibrary para permisos de archivos
import tw from 'twrnc'; 
import { WebView } from 'react-native-webview';

import Toast from 'react-native-toast-message'; 
import LoadingScreen from './LoadingScreen'; // Pantalla de carga
import CustomToast from '../components/CustomToast'; // Toast personalizado

import { AuthContext } from '../components/AuthContext'; // Contexto de autenticación (Pasar token entre pantallas)
import { getDocuments, getDocument } from '../api/documents.api'; // Endpoints de documentos
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
  const [selectedProjection, setSelectedProjection] = useState(''); // Proyección seleccionada por el usuario

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(false); // Estado de carga del documento

  const [loading, setLoading] = useState(true); // Estado de carga inicial
  const [loadingMessage, setLoadingMessage] = useState(""); // Mensaje para LoadingScreen

  const { userId, token } = useContext(AuthContext); // Accede al token y userId del contexto

  // Obtener documentos desde la API
  // Obtener documentos y proyecciones desde la API
  useEffect(() => {
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
          projection: projectionsMap[doc.projection_id]?.activity || 'Sin proyección', // Obtener el nombre de la proyección
        }));

        setFileData(documents);
        setProjections(projectionsResponse.data);
        setErrorMessage('');
      } catch (error) {
        console.error('Error al obtener documentos y proyecciones:', error);
        setErrorMessage('No se pudieron cargar los documentos y proyecciones.');
      } finally {
        setLoading(false); 
      }
    };

    fetchDocumentsAndProjections();
  }, [userId]);

  const handleDocumentClick = async (documentId) => {
    try {
      setDocumentLoading(true);
      const response = await getDocument(documentId);
      const { file, file_type } = response.data;

      setSelectedDocument({ data: file, type: file_type });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching document:', error);
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

  // Filtrar documentos por tipo y fecha
  const filteredFileData = fileData.filter(file => {
    if (fileTypeFilter && file.type !== fileTypeFilter) {
      return false;
    }
    if (dateFilter && file.date !== dateFilter) {
      return false;
    }
    return true;
  });

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
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/jpg'],
        copyToCacheDirectory: false,
      });
  
      if (result.type === 'success') {
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
  
        const fileType = result.mimeType || getFileTypeFromName(result.name);
        const fileSizeInKB = result.size / 1024;
  
        // Lógica de validación de archivos
        if (fileType === "application/pdf") {
          if (fileSizeInKB <= 2048) {
            setFileData(prevFiles => [...prevFiles, {
              name: result.name,
              size: `${(result.size / 1024 / 1024).toFixed(2)} Mb`,
              date: new Date().toLocaleDateString(),
              type: 'pdf'
            }]);
            setErrorMessage('');
          } else {
            setErrorMessage("El archivo PDF debe ser de un tamaño máximo de 2MB.");
          }
        } else if (fileType === "image/jpeg") {
          if (fileSizeInKB >= 50 && fileSizeInKB <= 700) {
            setFileData(prevFiles => [...prevFiles, {
              name: result.name,
              size: `${(result.size / 1024).toFixed(2)} Kb`,
              date: new Date().toLocaleDateString(),
              type: 'image'
            }]);
            setErrorMessage('');
          } else {
            setErrorMessage("Las imágenes deben tener un tamaño entre 50KB y 700KB.");
          }
        } else {
          setErrorMessage("Solo se permiten archivos PDF y JPG/JPEG.");
        }
      } else if (result.type === 'cancel') {
        console.log('Selección de archivo cancelada');
      } else {
        console.log('Resultado inesperado del DocumentPicker:', result.type);
      }
    } catch (error) {
      console.error('Error en handleFileUpload:', error);
      setErrorMessage(`Error al seleccionar el archivo: ${error.message}`);
    }
  }, [fileData]);
  

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
              style={tw`flex-1 py-2 ml-3`}
            />
          </View>
        </View>

        {/* Filtros */}
        <View style={tw`flex-row justify-around mb-6 relative`}>
          {/* Filtro por Tipo */}
          <View>
            <TouchableOpacity onPress={toggleFileTypeDropdown} style={tw`bg-gray-200 p-3 rounded-lg flex-row items-center`}>
              <Ionicons name="document" size={20} color="black" />
              <Text style={tw`ml-2`}>Tipo</Text>
            </TouchableOpacity>

            {showFileTypeDropdown && (
              <View style={[tw`absolute top-16 left-0 z-10 bg-white shadow-lg p-4 rounded-lg`]}>
                <TouchableOpacity onPress={() => handleFileTypeFilter('pdf')} style={tw`p-2`}>
                  <Text>PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFileTypeFilter('image')} style={tw`p-2`}>
                  <Text>JPG/JPEG</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeDropdowns} style={tw`p-2 text-red-500`}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Filtro por Fecha */}
          <View>
            <TouchableOpacity onPress={toggleDateDropdown} style={tw`bg-gray-200 p-3 rounded-lg flex-row items-center`}>
              <Ionicons name="calendar" size={20} color="black" />
              <Text style={tw`ml-2`}>Modificado</Text>
            </TouchableOpacity>

            {showDateDropdown && (
              <View style={[tw`absolute top-16 left-0 z-10 bg-white shadow-lg p-4 rounded-lg`]}>
                <TouchableOpacity onPress={() => handleDateFilter('today')} style={tw`p-2`}>
                  <Text>Hoy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDateFilter('this-week')} style={tw`p-2`}>
                  <Text>Últimos 7 días</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDateFilter('this-month')} style={tw`p-2`}>
                  <Text>Último mes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDateFilter('this-year')} style={tw`p-2`}>
                  <Text>Este año</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeDropdowns} style={tw`p-2 text-red-500`}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Botón para resetear filtros */}
          <TouchableOpacity onPress={resetFilters} style={tw`bg-gray-200 p-3 rounded-lg flex-row items-center`}>
            <Ionicons name="refresh" size={20} color="black" />
            <Text style={tw`ml-2`}>Reset</Text>
          </TouchableOpacity>
        </View>

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
          {fileData.length === 0 ? (
            <Text style={tw`text-center text-gray-500 mt-4`}>No tienes documentos cargados</Text>
          ) : (
            <FlatList
              data={fileData}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                onPress={() => handleDocumentClick(item.id)}
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

      {/* Modal para visualizar documentos */}
      <Modal visible={isModalOpen} animationType="slide" onRequestClose={() => setIsModalOpen(false)}>
        <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => setIsModalOpen(false)}
          style={tw`bg-blue-500 p-3 mx-4 my-4 rounded-lg`}
          >
            <Text style={tw`text-white text-center text-lg`}>Cerrar</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity title="Cerrar" onPress={() => setIsModalOpen(false)} /> */}
          <View style={{ flex: 1, marginTop: 10 }}>{renderDocumentContent()}</View>
        </View>
      </Modal>
      {/* {selectedFile && <LoadingScreen message={loadingMessage} />} */}

      {/* Botón flotante de nuevo archivo en la esquina inferior derecha */}
      <TouchableOpacity
        onPress={handleFileUpload}
        style={[
          tw`bg-blue-500 p-4 rounded-full shadow-lg`,
          { position: 'absolute', bottom: 20, right: 20 },
        ]}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Documents;