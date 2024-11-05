import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import LoadingScreen from './LoadingScreen'; // Pantalla de carga
import { createProduct } from '../api/products.api'; // Importa el método createProduct

import CustomToast from '../components/CustomToast'; // Toast personalizado
import Toast from 'react-native-toast-message'; 

import tw from 'twrnc';

export default function ProyeccionGrado({navigation}) {
  const [grado, setGrado] = useState('');
  const [documentoRequerido, setDocumentoRequerido] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [gradoError, setGradoError] = useState(false);
  const [projection_id, setProjectionId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(""); // Mensaje para LoadingScreen
  const { userId, token } = useContext(AuthContext); // Accede al token y userId del contexto

  const documentosPorGrado = {
    pasante: 'Copia cotejada del original de la carta de pasante o en su caso, del original de la boleta de calificaciones con el 100% de los créditos. \nConstancia de realización de servicio social.',
    licenciatura: 'Copia cotejada del original del título de licenciatura o en su caso, del original del acta de examen profesional.',
    maestria: 'Copia cotejada del original del diploma de grado o en su caso, del original del acta de examen de grado.',
    doctorado: 'Copia cotejada del original del diploma de grado o en su caso, del original del acta de examen de grado.'
  };

  const gradoOptions = [
    { label: 'Pasantía de Licenciatura', value: 'pasante' },
    { label: 'Título de Licenciatura', value: 'licenciatura' },
    { label: 'Maestría', value: 'maestria' },
    { label: 'Doctorado', value: 'doctorado' },
  ];

        // Obtener la categoría y las condiciones del localStorage al cargar el componente
  useEffect(() => {
    const load_data = async () => {
      const storedAccountDetails = await AsyncStorage.getItem('accountDetails');

      if (storedAccountDetails) {
        const { projection_id } = JSON.parse(storedAccountDetails);
        setProjectionId(projection_id);
        console.log('projection_id:', projection_id);
      }
    };
    load_data();
  }, []);

  const validateForm = () => {
    let isValid = true;
    if (!grado) {
      alert("Por favor selecciona una grado académico.");
      return false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // Calcular la longitud de los documentos requeridos
    const documentsList = documentoRequerido.split('\n').map(doc => doc.trim()).filter(doc => doc);
    const documentsCount = documentsList.length;

    // Preparar los datos para la proyección
    const projectionData = {
      function: grado,
      activity: grado,
      role: '',
      scope: '',
      documents_required: documentoRequerido,
      documents_number: documentsCount,
      units: 100,
      projection_id,
      tasks: [], // Agrega tasks como una lista vacía si no tiene valores
      documents_uploaded: [] // Asegura que sea una lista vacía si está en None
    };

    console.log('Datos de la proyección:', projectionData);
  
    try {
      setLoading(true);
      setLoadingMessage("Creando ...");
  
      // Llama al método createProjection con los datos del formulario
      await createProduct(projectionData);
      navigation.navigate('KanbanBoard');
    } catch (error) {
      const apiErrors = error.response?.data || {};
      if (error.response?.status === 400) {
        const errorMessage = apiErrors.non_field_errors[0] || "Error en la solicitud. Verifica los datos.";
        Toast.show({ type: 'error', text1: errorMessage, visibilityTime: 2000 });
      } else {
        console.error('Error creando proyección:', error);
      }
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={tw`flex-1`}
    >
      {/* Pantalla de carga */}
      {loading && <LoadingScreen message={loadingMessage} />}

      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Obtención grado académico</Text>
        <Ionicons name="school-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      <ScrollView style={tw`px-5`}>
        <View style={tw`mb-4`}>

          {/* Selector de Grado Académico */}
          <Text style={tw`text-base font-bold text-black`}>Seleccione su grado académico obtenido</Text>
          <TouchableOpacity
            style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
            onPress={() => setModalVisible(true)}
          >
            <Text>{grado || 'Seleccione grado'}</Text>
            <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
          </TouchableOpacity>

          {/* Modal para seleccionar grado */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
              <View style={tw`bg-white p-4`}>
                <Text style={tw`text-lg font-bold mb-4`}>Seleccione su grado</Text>
                {gradoOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={tw`p-4 border-b`}
                    onPress={() => {
                      setGrado(option.label); // Guardar el label en lugar del value
                      setDocumentoRequerido(documentosPorGrado[option.value]); 
                      setModalVisible(false);
                    }}
                  >
                    <Text>{option.label}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={tw`bg-gray-200 p-2 rounded-lg mt-4`}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={tw`text-center text-black`}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Mostrar documento a presentar */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-base font-bold text-black`}>Documento(s) requeridos</Text>
            <View style={tw`bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-lg`}>
              {documentoRequerido.split('\n').map((doc, index) => (
                <View key={index} style={tw`flex-row items-start mb-2`}>
                  {/* Icono o símbolo para el marcador de lista */}
                  <Text style={tw`text-gray-800 mr-2`}>•</Text>
                  <Text style={tw`text-gray-800 flex-1`}>
                    {doc.trim() || 'Seleccione un grado académico para ver el documento requerido.'}
                  </Text>
                </View>
              ))}
            </View>
          </View>


          {/* Botón de Agregar */}
          <TouchableOpacity
            style={tw`bg-[#003366] p-4 rounded-lg items-center mt-8 mb-10`}
            onPress={handleSubmit}
          >
            <Text style={tw`text-white text-center`}>Agregar</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
      
      {/* Toast container */}
      <CustomToast />
    </ImageBackground>
  );
}
