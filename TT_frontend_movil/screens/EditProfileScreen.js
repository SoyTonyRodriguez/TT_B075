import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView, Image, Alert} from 'react-native';
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
  const [userId, setUserId] = useState(null);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [initialCategory, setInitialCategory] = useState(''); // Para comparar si la categoría cambió
  
  const [loadingMessage, setLoadingMessage] = useState(""); // Mensaje para LoadingScreen
  const [loading, setLoading] = useState(true); // Estado de carga
  // const [password, setPassword] = useState('');

  // const [passwordVisible, setPasswordVisible] = useState(false);
  // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',      
    email: '',    
    category: '',  
    password: '',  
  });

  const [profileImage, setProfileImage] = useState(null);
  
  // Load account data from localStorage on component mount
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

        const storedAccountData =  await AsyncStorage.getItem('accountDetails');
        console.log("Datos de la cuenta:", storedAccountData);
        if (storedAccountData) {
          const { fullName, email, category } = JSON.parse(storedAccountData);
          setFullName(fullName);
          setEmail(email);
          setCategory(category);
          setInitialCategory(category); // Guardar la categoría inicial
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
            {
              text: "Cancelar",
              style: "cancel",
            },
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

                  accountDetails.projection_id = null; // Actualizar el campo `projection_id`
                  accountDetails.units_projection = 0; // Actualizar el campo `units_projection`
                  // Guardar los datos actualizados nuevamente en AsyncStorage
                  await AsyncStorage.setItem('accountDetails', JSON.stringify(accountDetails));

                } catch (error) {
                  console.error("Error al borrar proyecciones:", error);
                  Alert.alert(
                    "Error",
                    "No se pudieron borrar las proyecciones. Inténtelo nuevamente más tarde."
                  );
                }
              },
            },
          ]
        );
      } else {
        const response = await updateAccount(userId, updatedAccountData); // Actualizar directamente si no cambió la categoría
        console.log('Respuesta del servidor:', response.data);
      }

      // Guardar en AsyncStorage
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

      {/* Contenedor del ícono y título */}
      <View style={tw`flex-row items-center justify-between px-5 mt-12`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-xl font-bold text-black`}>Regresar</Text>
        </TouchableOpacity>
        <Text style={tw`text-3xl font-bold text-center text-black`}>Editar Perfil</Text>
        <View style={tw`w-8`} />
      </View>

      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Nombre */}
        <Text style={tw`text-base font-bold text-black`}>Nombre</Text>
        <TextInput
          value={fullName} // El estado `fullName` controla el valor del campo
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholder="Escribe tu nombre"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => setFullName(value)} // Actualiza el estado al cambiar el texto
        />

        {/* Correo */}
        <Text style={tw`text-base font-bold text-black`}>Correo</Text>
        <TextInput
          value={email} // El estado `email` controla el valor del campo
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholder="Escribe tu correo"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => setEmail(value)} // Actualiza el estado al cambiar el texto
        />

        {/* Categoría */}
        <Text style={tw`text-base font-bold text-black`}>Categoría</Text>
        <View style={tw`border border-gray-700 rounded-lg mb-3`}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={tw`text-black`}
          >
            <Picker.Item label="Selecciona una categoría" value="" />
            <Picker.Item label="Técnico Docente de Asignatura A" value="Técnico Docente de Asignatura A" />
            <Picker.Item label="Técnico Docente de Asignatura B" value="Técnico Docente de Asignatura B" />
            <Picker.Item label="Técnico Docente Auxiliar A" value="Técnico Docente Auxiliar A" />
            <Picker.Item label="Técnico Docente Auxiliar B" value="Técnico Docente Auxiliar B" />
            <Picker.Item label="Técnico Docente Auxiliar C" value="Técnico Docente Auxiliar C" />
            <Picker.Item label="Técnico Docente Asociado A" value="Técnico Docente Asociado A" />
            <Picker.Item label="Técnico Docente Asociado B" value="Técnico Docente Asociado B" />
            <Picker.Item label="Técnico Docente Asociado C" value="Técnico Docente Asociado C" />
            <Picker.Item label="Técnico Docente Titular A" value="Técnico Docente Titular A" />
            <Picker.Item label="Profesor de Asignatura A" value="Profesor de Asignatura A" />
            <Picker.Item label="Profesor Asistente A" value="Profesor Asistente A" />
            <Picker.Item label="Profesor Asistente B" value="Profesor Asistente B" />
            <Picker.Item label="Profesor Asistente C" value="Profesor Asistente C" />
            <Picker.Item label="Profesor Asociado A" value="Profesor Asociado A" />
            <Picker.Item label="Profesor Asociado B" value="Profesor Asociado B" />
            <Picker.Item label="Profesor Asociado C" value="Profesor Asociado C" />
            <Picker.Item label="Profesor Titular A" value="Profesor Titular A" />
            <Picker.Item label="Profesor Titular B" value="Profesor Titular B" />
          </Picker>
        </View>
            selectedValue={initialCategory}
            onValueChange={(value) => setCategory(value)}
            style={tw`text-black`}
          >
            <Picker.Item label="Técnico Docente de Asignatura A" value="Técnico Docente de Asignatura A"/>
            <Picker.Item label="Técnico Docente de Asignatura B" value="Técnico Docente de Asignatura B"/>
            <Picker.Item label="Técnico Docente Auxiliar A" value="Técnico Docente Auxiliar A"/>
            <Picker.Item label="Técnico Docente Auxiliar B" value="Técnico Docente Auxiliar B"/>
            <Picker.Item label="Técnico Docente Auxiliar C" value="Técnico Docente Auxiliar C"/>
            <Picker.Item label="Técnico Docente Asociado A" value="Técnico Docente Asociado A"/>
            <Picker.Item label="Técnico Docente Asociado B" value="Técnico Docente Asociado B"/>
            <Picker.Item label="Técnico Docente Asociado C" value="Técnico Docente Asociado C"/>
            <Picker.Item label="Técnico Docente Titular A" value="Técnico Docente Titular A"/>
            <Picker.Item label="Profesor de Asignatura A" value="Profesor de Asignatura A"/>
            <Picker.Item label="Profesor Asistente A" value="Profesor Asistente A"/>
            <Picker.Item label="Profesor Asistente B" value="Profesor Asistente B"/>
            <Picker.Item label="Profesor Asistente C" value="Profesor Asistente C"/>
            <Picker.Item label="Profesor Asociado A" value="Profesor Asociado A"/>
            <Picker.Item label="Profesor Asociado B" value="Profesor Asociado B"/>
            <Picker.Item label="Profesor Asociado C" value="Profesor Asociado C"/>
            <Picker.Item label="Profesor Titular A" value="Profesor Titular A"/>
            <Picker.Item label="Profesor Titular B" value="Profesor Titular B"/>
          </Picker>
        </View>

        {/* <Text style={tw`text-base font-bold text-black`}>Contraseña</Text>
        <View style={tw`relative w-full mb-3`}>
          <TextInput
            secureTextEntry={!passwordVisible} 
            style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            onChangeText={(value) => handleInputChange('password', value)}
          />
          <TouchableOpacity 
            style={tw`absolute right-4 top-4`} 
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons 
              name={passwordVisible ? "eye-off" : "eye"} 
              size={24} 
              color="rgba(0, 0, 0, 0.8)" 
            />
          </TouchableOpacity>
        </View>

        <Text style={tw`text-base font-bold text-black`}>Confirmar contraseña</Text>
        <View style={tw`relative w-full mb-3`}>
          <TextInput
            value={form.passwordVisible}
            secureTextEntry={!passwordVisible} 
            style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
          />
          <TouchableOpacity 
            style={tw`absolute right-4 top-4`} 
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Ionicons 
              name={passwordVisible ? "eye-off" : "eye"} 
              size={24} 
              color="rgba(0, 0, 0, 0.8)" 
            />
          </TouchableOpacity>
        </View> */}

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
