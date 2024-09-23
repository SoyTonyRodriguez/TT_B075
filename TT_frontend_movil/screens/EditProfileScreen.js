import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import tw from 'twrnc'; 

const EditProfileScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',      
    email: '',    
    category: '',  
    password: '',  
    employeeNumber: ''
  });

  const [profileImage, setProfileImage] = useState(null); 

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

        {/* Espacio vacío para mantener el layout centrado */}
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

      {/* ScrollView que solo incluye los campos y el botón */}
      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Campos de edición del perfil */}
        <Text style={tw`text-lg font-bold text-black`}>Nombre</Text>
        <TextInput
          value={form.name}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => handleInputChange('name', value)}
        />

        <Text style={tw`text-lg font-bold text-black`}>Email</Text>
        <TextInput
          value={form.email}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => handleInputChange('email', value)}
        />

        <Text style={tw`text-lg font-bold text-black`}>Categoría</Text>
        <TextInput
          value={form.category}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => handleInputChange('category', value)}
        />

        <Text style={tw`text-lg font-bold text-black`}>Número de empleado</Text>
        <TextInput
          value={form.employeeNumber}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => handleInputChange('employeeNumber', value)}
        />

        <Text style={tw`text-lg font-bold text-black`}>Contraseña</Text>
        <TextInput
          value={form.password}
          secureTextEntry
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => handleInputChange('password', value)}
        />

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
