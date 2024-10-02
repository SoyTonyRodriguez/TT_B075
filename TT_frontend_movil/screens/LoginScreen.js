import React, { useState } from "react";
import { View, Text, TextInput, Image, ImageBackground, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 
import tw from 'twrnc'; 
import { useForm, Controller } from "react-hook-form";
import { login } from "../api/accounts.api"; // Importa tu función de API
import LoadingScreen from './LoadingScreen'; // Pantalla de carga
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

const { width, height } = Dimensions.get('window');


// Helper function to display styled error messages
const renderErrorMessage = (error) => {
  return (
    <View style={tw`flex-row items-center bg-red-100 p-2 rounded-lg mb-4`}>
      <Ionicons name="alert-circle" size={18} color="red" />
      <Text style={tw`ml-2 text-red-700 text-sm`}>{error}</Text>
    </View>
  );
};

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation(); 
  const [loading, setLoading] = useState(false); // Estado de carga
  const [loadingMessage, setLoadingMessage] = useState(""); // Mensaje para LoadingScreen

  // Configura el formulario usando react-hook-form
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Función para manejar el inicio de sesión
  const handleLogin = async (data) => {
    setLoading(true);
    setLoadingMessage("Iniciando sesión...");
  
    try {
      const response = await login(data); // API para iniciar sesión
    
      if (response.status === 200) {
        // Save the token or user data as needed
        await AsyncStorage.setItem('token', JSON.stringify(response.data.access));

        Alert.alert("Éxito", "Has iniciado sesión correctamente");
        navigation.navigate("HomeScreen");
        console.log("Inicio de sesión exitoso:", response.data);

      } else {
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error response:", error);
    
      if (error.response) {
        console.error("API error:", error.response.data);
        const apiErrors = error.response.data || {};
      
        // Muestra el mensaje de error específico que viene de la API
        if (error.response.status === 400) {
          const errorMessage = apiErrors.non_field_errors[0] || "Hubo un error en la solicitud. Verifica los datos ingresados.";
          Alert.alert("Error", errorMessage);
        } else {
          Alert.alert("Error", "Hubo un error al iniciar sesión.");
        }
      } else {
        Alert.alert("Error", "No se pudo conectar con el servidor. Inténtalo más tarde.");
      }
    } finally {
      setLoading(false); // Detiene la carga
    }
  };
  // -_-_-_-_-_ Get Error Message -_-_-_-_-_
  const getErrorMessage = (field) => {
    switch (field) {
      case 'email':
        return "Por favor, ingresa un correo electrónico válido.";
      case 'password':
        return "La contraseña es obligatoria.";
      default:
        return "";
    }
  };
  

  // Estilo de los inputs
  const inputStyle = (hasError) => tw`w-full p-4 border ${hasError ? 'border-red-500' : 'border-gray-700'} rounded-lg text-base bg-transparent text-black mb-4`;

  return (
      <ImageBackground 
        source={require('../assets/images/fondologin.jpg')} 
        style={{ width: width, height: height + 30, flex: 1 }} resizeMode="cover"
      >
        {/* Pantalla de carga */}
        {loading && <LoadingScreen message={loadingMessage} />}

          {/* Header */}
          <View style={tw`px-5 mt-10 mb-5`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-2xl font-bold text-black`}>Iniciar Sesión</Text>
              <Ionicons name="person-outline" size={30} color="black" style={tw`ml-2`} />
            </View>
            <Text style={tw`text-lg text-black mt-1`}>¡Bienvenido de vuelta!</Text>
          </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={tw`flex-1`}
        >
          <ScrollView 
            contentContainerStyle={tw`justify-center`} 
            keyboardShouldPersistTaps="handled"
          >
            <View style={tw`mt-10 justify-center items-center px-5`}>

              {/* Logo Section */}
              <View style={tw`bg-white p-4 rounded-full mb-10`}>
                <Image
                  source={require('../assets/images/estudiar.png')}
                  style={tw`w-30 h-30 rounded-full`}
                />
              </View>

              {/* Email */}
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'El correo electrónico es obligatorio.',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'El formato del correo no es válido.',
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      placeholder="Ingresa tu correo electrónico"
                      style={inputStyle(errors.email)}
                      keyboardType="email-address"
                      value={value}
                      onChangeText={onChange}
                    />
                    {errors.email && renderErrorMessage(getErrorMessage('email'))}
                  </>
                )}
              />

              {/* Contraseña */}
              <Controller
                control={control}
                name="password"
                rules={{ required: "La contraseña es obligatoria." }}
                render={({ field: { onChange, value } }) => (
                  <View style={tw`relative w-full mb-4`}>
                    <TextInput
                      placeholder="Contraseña"
                      style={inputStyle(errors.password)}
                      placeholderTextColor="#555"
                      secureTextEntry={!passwordVisible}
                      value={value}
                      onChangeText={onChange}
                    />
                    <TouchableOpacity
                      style={tw`absolute right-4 top-4`}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                      <Ionicons
                        name={passwordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="#555"
                      />
                    </TouchableOpacity>
                    {errors.password && renderErrorMessage(getErrorMessage('password'))}
                  </View>
                )}
              />

              {/* Olvidó su contraseña */}
              <TouchableOpacity 
                style={tw`self-end mb-5`}
                onPress={() => navigation.navigate('RecuperarCuenta')}
              >
                <Text style={tw`text-gray-500 text-sm`}>¿Olvidó su contraseña?</Text>
              </TouchableOpacity>

              {/* Botón de Ingreso */}
              <TouchableOpacity 
                style={tw`bg-[#003366] py-4 rounded w-full items-center mb-5`}
                onPress={handleSubmit(handleLogin)} // Usamos handleSubmit de react-hook-form
                disabled={loading} // Desactiva el botón durante la carga
              >
                <Text style={tw`text-white font-bold text-base`}>Ingresar</Text>
              </TouchableOpacity>

              {/* Crear cuenta */}
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}
              >
                <Text style={tw`text-gray-500 text-sm`}>
                  ¿No estás registrado? <Text style={tw`font-bold text-black`}>Crear una cuenta</Text>
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
  );
};

export default LoginScreen;
