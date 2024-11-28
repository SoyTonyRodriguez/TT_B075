import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView, Image, Modal, Alert, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Importa Picker
import * as ImagePicker from 'expo-image-picker'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import tw from 'twrnc'; 
import { jwtDecode } from "jwt-decode";
import LoadingScreen from './LoadingScreen'; // Pantalla de carga

import { deleteProjection } from '../api/projections.api'; // Importa tu función de API
import { updateAccount } from '../api/accounts.api';

const EditProfileScreen = ({ navigation }) => {
  // Estados para almacenar los datos del usuario
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [initialCategory, setInitialCategory] = useState(''); // Para comparar si la categoría cambió
  const [loadingMessage, setLoadingMessage] = useState(""); // Mensaje para LoadingScreen
  const [loading, setLoading] = useState(true); // Estado de carga
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false)

  const [form, setForm] = useState({
    name: '',      
    email: '',    
    category: '',  
    password: '',  
  });

  const [profileImage, setProfileImage] = useState(null);

  // Lista de categorías para el selector personalizado (reemplaza Picker)
  const categories = [
    "Técnico Docente de Asignatura A",
    "Técnico Docente de Asignatura B",
    "Técnico Docente Auxiliar A",
    "Técnico Docente Auxiliar B",
    "Técnico Docente Auxiliar C",
    "Técnico Docente Asociado A",
    "Técnico Docente Asociado B",
    "Técnico Docente Asociado C",
    "Técnico Docente Titular A",
    "Profesor de Asignatura A",
    "Profesor Asistente A",
    "Profesor Asistente B",
    "Profesor Asistente C",
    "Profesor Asociado A",
    "Profesor Asociado B",
    "Profesor Asociado C",
    "Profesor Titular A",
    "Profesor Titular B",
  ];

  // Carga los datos de la cuenta desde el almacenamiento local al montar el componente
  useEffect(() => {
    const loadAccountData = async () => {
      try {
        setLoadingMessage("Cargando datos...");
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id);
          } catch (error) {
            console.error('Token inválido:', error);
          }
        }
        const storedAccountData = await AsyncStorage.getItem('accountDetails');
        console.log("Datos de la cuenta:", storedAccountData);
        if (storedAccountData) {
          const { fullName, email, category } = JSON.parse(storedAccountData);
          setFullName(fullName);
          setEmail(email);
          setCategory(category);
          setInitialCategory(category);// Guardar la categoría inicial
        }
      } catch (error) {
        console.error("Error accessing or parsing account details from localStorage:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAccountData();
  }, []);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  // Función para manejar la acción de guardar los cambios
  const handleSaveChanges = async () => {
    const updatedAccountData = { name: fullName, email, category };
    try {
      setLoading(true);
      setLoadingMessage("Guardando cambios...");
      console.log("Inicial:", initialCategory);
      console.log("Actual:", category);
      if (category !== initialCategory) {
        Alert.alert(
          "Confirmación requerida",
          "Al cambiar la categoría, se borrarán todas sus tareas, documentos y productos. ¿Desea continuar?",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Aceptar",
              onPress: async () => {
                try {
                  const accountDetailsString = await AsyncStorage.getItem('accountDetails');
      
                  const accountDetails = JSON.parse(accountDetailsString); // Analizar la cadena JSON
                  await deleteProjection(accountDetails.projection_id); // Llamar al endpoint para borrar proyecciones
                  console.log("Proyecciones borradas exitosamente.");
                  const response = await updateAccount(userId, updatedAccountData); // Actualizar la cuenta después de borrar las proyecciones
                  console.log('Respuesta del servidor:', response.data);

                  // Actualizar AsyncStorage
                  accountDetails.projection_id = null;
                  accountDetails.units_projection = 0;
                  await AsyncStorage.setItem('accountDetails', JSON.stringify(accountDetails));

                } catch (error) {
                  console.error("Error al borrar proyecciones:", error);
                  Alert.alert("Error", "No se pudieron borrar las proyecciones. Inténtelo nuevamente más tarde.");
                }
              },
            },
          ]
        );
      } else {
        const response = await updateAccount(userId, updatedAccountData); // Actualizar directamente si no cambió la categoría
        console.log('Respuesta del servidor:', response.data);
      }

      // Guardar los datos actualizados en AsyncStorage
      const accountDetailsString = await AsyncStorage.getItem('accountDetails');
      const accountDetails = JSON.parse(accountDetailsString); // Analizar la cadena JSON
      accountDetails.fullName = fullName; // Actualizar el campo `fullName`
      accountDetails.email = email;       // Actualizar el campo `email`
      accountDetails.category = category; // Actualizar el campo `category`
      // Guardar los datos actualizados nuevamente en AsyncStorage
      await AsyncStorage.setItem('accountDetails', JSON.stringify(accountDetails));

    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    } finally {
      setLoading(false);
    }

    navigation.goBack(); 
  };

  // Función para cambiar la imagen de perfil
  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert('Permiso para acceder a la galería es requerido.');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setProfileImage({ uri: pickerResult.assets[0].uri });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >

      {/* Pantalla de carga */}
      {loading && <LoadingScreen message={loadingMessage} />}

      {/* Contenedor del ícono de regresar y título */}
      <View style={tw`flex-row items-center px-5 mt-12`}>
        {/* Ícono de regresar */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>
        {/* Título "Editar Perfil" */}
        <Text style={tw`flex-1 text-3xl font-bold text-center text-black`}>Editar Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Campo de Nombre */}
        <Text style={tw`text-base font-bold text-black`}>Nombre</Text>
        <TextInput
          value={fullName}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholder="Escribe tu nombre"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => setFullName(value)}
        />

        {/* Campo de Correo */}
        <Text style={tw`text-base font-bold text-black`}>Correo</Text>
        <TextInput
          value={email}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholder="Escribe tu correo"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => setEmail(value)}
        />

        {/* Selector de Categoría */}
        <Text style={tw`text-base font-bold text-black`}>Categoría</Text>
        <TouchableOpacity
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 bg-transparent`}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={tw`text-black`}>{category || "Selecciona una categoría"}</Text>
        </TouchableOpacity>

        {/* Modal para la selección de categoría */}
        <Modal visible={isCategoryModalVisible} transparent={true} animationType="slide">
          <View style={tw`flex-1 bg-black/50 justify-center`}>
            <View style={tw`bg-white p-5 rounded-lg mx-5`}>
              <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={tw`p-3 border-b border-gray-300`}
                    onPress={() => {
                      setCategory(item);
                      setCategoryModalVisible(false);
                    }}
                  >
                    <Text style={tw`text-black`}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                onPress={() => setCategoryModalVisible(false)}
                style={tw`mt-5 py-2 px-4 bg-gray-300 rounded-lg`}
              >
                <Text style={tw`text-center text-black`}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Botón para guardar cambios */}
        <TouchableOpacity
          style={tw`bg-[#003366] py-4 rounded w-full items-center mb-5`}
          onPress={handleSaveChanges}
        >
          <Text style={tw`text-white font-bold text-base`}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default EditProfileScreen;