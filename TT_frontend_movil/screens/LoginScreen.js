import React, { useState } from "react";
import { View, Text, TextInput, Image, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 
import tw from 'twrnc'; 

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation(); 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground 
        source={require('../assets/images/fondologin.jpg')} 
        style={tw`flex-1 w-full h-full`} 
        resizeMode="cover"
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={tw`flex-1`}
        >
          {/* Contenido desplazable con ScrollView */}
          <ScrollView 
            contentContainerStyle={tw`justify-center`} 
            keyboardShouldPersistTaps="handled"
          >
            <View style={tw`mt-40 justify-center items-center px-5`}>

              {/* Logo Section */}
              <View style={tw`bg-white p-4 rounded-full mb-10`}>
                <Image
                  source={require('../assets/images/estudiar.png')}
                  style={tw`w-30 h-30 rounded-full`}
                />
              </View>

              {/* Input Fields */}
              <TextInput 
                placeholder="Número de empleado"
                style={tw`w-full py-4 px-3 border border-gray-500 rounded mb-5 text-base bg-transparent`}
                placeholderTextColor="#555"
                keyboardType="numeric"
              />

              {/* Password Field with Eye Icon */}
              <View style={tw`flex-row items-center w-full border border-gray-500 rounded px-2 mb-5`}>
                <TextInput 
                  placeholder="Contraseña"
                  style={tw`flex-1 py-4 text-base bg-transparent`}
                  placeholderTextColor="#555"
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity 
                  style={tw`absolute right-4 p-2`} 
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons 
                    name={passwordVisible ? "eye-off" : "eye"} 
                    size={24} 
                    color="#555" 
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity 
                style={tw`self-end mb-5`}
                onPress={() => navigation.navigate('RecuperarCuenta')}
              >
                <Text style={tw`text-gray-500 text-sm`}>¿Olvidó su contraseña?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity 
                style={tw`bg-[#003366] py-4 rounded w-full items-center mb-5`}
                onPress={() => navigation.navigate('HomeScreen')} 
              >
                <Text style={tw`text-white font-bold text-base`}>Ingresar</Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}
              >
                <Text style={tw`text-gray-500 text-sm`}>
                  ¿No estás registrado? <Text style={tw`font-bold text-black`}>Crear una cuenta</Text>
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>

          {/* Header Section (fijo, sin scroll) */}
          <View style={tw`absolute top-10 left-5 right-5 z-10`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-2xl font-bold text-black`}>Iniciar Sesión</Text>
              <Ionicons name="person-outline" size={30} color="black" style={tw`ml-2`} />
            </View>
            <Text style={tw`text-lg text-black mt-1`}>¡Bienvenido de vuelta!</Text>
          </View>
          
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
