import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'; 
import LoginButton from "../components/Button/LoginButton"; 

const Login = () => {
  const navigation = useNavigation(); 

  return (
    <ImageBackground 
      source={require('../assets/images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={tw`flex-1 justify-center items-center w-full`}>
        {/* Logo */}
        <View style={tw`bg-white p-2 rounded-full mb-8 flex items-center`}>
          <Image
            source={require('../assets/images/estudiar.png')}
            style={tw`w-28 h-28 rounded-full`} 
          />
        </View>

        {/* Texto de bienvenida */}
        <Text style={tw`text-3xl font-bold text-center mt-4`}>¡Bienvenido!</Text>
        <View style={tw`flex items-center w-full`}>
          {/* Botones */}
          <LoginButton 
            title="Iniciar sesión" 
            className1="bg-blue-800 w-64 mt-8 py-3 rounded-full"  
            textClassName="text-white"
            onPress={() => navigation.navigate('Login')} 
          />
          <LoginButton 
            title="Registrate" 
            className1="border border-blue-700 w-64 mt-4 py-3 rounded-full" 
            textClassName="text-blue-700" 
            onPress={() => navigation.navigate('RegisterScreen')} 
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
