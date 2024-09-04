import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LoginButton from "../components/Button/LoginButton"; 

const Login = () => {
  const navigation = useNavigation(); 

  return (
    <ImageBackground 
      source={require('../assets/images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View className="flex-1 justify-center items-center w-full">
        {/* Logo */}
        <View className="bg-white p-2 rounded-full mb-8 flex items-center">
          <Image
            source={require('../assets/images/estudiar.png')}
            className="w-28 h-28 rounded-full"
          />
        </View>

        {/* Welcome Text */}
        <Text className="text-3xl font-bold text-center mt-4">¡Bienvenido!</Text>
        <View className="flex items-center w-full">
          {/* Buttons */}
          <LoginButton 
            title="Iniciar sesión" 
            className1="bg-blue-700 w-64 mt-8" 
            textClassName="text-white"
            onPress={() => navigation.navigate('Login')} 
          />
          <LoginButton 
  title="Registrate" 
  className1="border border-blue-700 w-64 mt-4" 
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
