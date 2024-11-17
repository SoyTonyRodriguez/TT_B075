import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 
import tw from 'twrnc'; // Importamos twrnc para usar Tailwind

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  // Validación del correo
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Manejar la recuperación de contraseña
  const handleRecover = () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor, introduce un correo electrónico válido');
      return;
    }

    // Lógica placeholder para recuperación de contraseña
    Alert.alert('Recuperación enviada', 'Se ha enviado un correo con instrucciones para restablecer tu contraseña.');
    // Lógica para enviar la solicitud de recuperación (llamada a la API)
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <ImageBackground 
          source={require('../assets/images/fondorecuperar.jpg')}
          style={tw`flex-1 w-full h-full`}
          resizeMode="cover"
        >
          <View style={tw`flex-1 justify-center px-5`}>
            {/* Sección del encabezado */}
            <View style={tw`absolute top-10 left-5`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-2xl font-bold text-black`}>Recupera tu cuenta</Text>
                <Ionicons name="person-outline" size={30} color="black" style={tw`ml-2`} />
              </View>
              <Text style={tw`text-lg text-black mt-2`}>Introduce los datos solicitados</Text>
              <View style={tw`h-0.5 bg-black mt-3 mb-5`} />
            </View>

            {/* Campo de correo electrónico */}
            <TextInput 
              placeholder="Ingresa tu correo electrónico"
              style={tw`w-full p-4 border border-gray-500 rounded mb-5 text-base bg-transparent text-black`}
              placeholderTextColor="#555"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Texto informativo */}
            <Text style={tw`text-center text-sm text-gray-500 mb-5`}>
              Te enviaremos un correo con indicaciones para restablecer tu contraseña
            </Text>

            {/* Botón de recuperar */}
            <TouchableOpacity 
              style={tw`bg-[#003366] p-4 rounded items-center mb-5`}
              onPress={handleRecover}
            >
              <Text style={tw`text-white font-bold text-base`}>Recuperar</Text>
            </TouchableOpacity>

            {/* Botón para volver a iniciar sesión */}
            <TouchableOpacity 
              style={tw`bg-gray-500 p-4 rounded items-center`}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={tw`text-white font-bold text-base`}>Iniciar Sesión</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground>
      </View>
  );
};

export default ForgotPasswordScreen;
