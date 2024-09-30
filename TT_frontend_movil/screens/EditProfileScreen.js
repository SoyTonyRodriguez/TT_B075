import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import tw from 'twrnc'; 

const EditProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [password, setPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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
        const storedAccountData =  await AsyncStorage.getItem('accountDetails');
        if (storedAccountData) {
          const { userName, fullName, email, category } = JSON.parse(storedAccountData);
          setUserName(userName);
          setFullName(fullName);
          setEmail(email);
          setCategory(category);
        }
      } catch (error) {
        console.error("Error accessing or parsing account details from localStorage:", error);
        // You can clear invalid data if necessary
        localStorage.removeItem('accountDetails');
      }
    };
    loadAccountData();
  }, []);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log('Perfil actualizado:', form);
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
      {/* Contenedor del ícono y título */}
      <View style={tw`flex-row items-center justify-between px-5 mt-12`}>
        {/* Ícono de regresar */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>

        {/* Título */}
        <Text style={tw`text-3xl font-bold text-center text-black`}>Editar Perfil</Text>
        <View style={tw`w-8`} />
      </View>

      {/* Imagen de perfil o ícono predeterminado */}
      <View style={tw`items-center mb-8 p-5`}>
        {profileImage ? (
          <Image source={profileImage} style={tw`w-30 h-30 rounded-full`} />
        ) : (
          <Ionicons name="person-circle-outline" size={120} color="black" />
        )}
        <TouchableOpacity 
          style={tw`absolute bottom-0 right-5 bg-gray-200 p-2 rounded-full`} 
          onPress={pickImage} // Cambiar imagen al tocar el ícono de la cámara
        >
          <Ionicons name="camera-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Campos de edición del perfil */}
        <Text style={tw`text-base font-bold text-black`}>Nombre</Text>
        <TextInput
          value={fullName}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => handleInputChange('name', value)}
        />

        <Text style={tw`text-base font-bold text-black`}>Email</Text>
        <TextInput
          value={email}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => handleInputChange('email', value)}
        />

        <Text style={tw`text-base font-bold text-black`}>Categoría</Text>
        <TextInput
          value={category}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => handleInputChange('category', value)}
        />

        <Text style={tw`text-base font-bold text-black`}>Contraseña</Text>
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
        </View>

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
