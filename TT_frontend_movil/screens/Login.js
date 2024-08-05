import React from "react";
import { View, Text, Image } from "react-native";
import LoginButton from "../components/Button/LoginButton"; // Importing LoginButton component

const LoginScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-blue-300">
      {/* Logo */}
      <View className="bg-white p-2 rounded-full">
        <Image
          source={require('../assets/images/estudiar.png')}
          className="w-28 h-28 rounded-full"
        />
      </View>

      {/* Welcome Text */}
      <Text className="text-3xl font-bold text-center mt-4">¡Bienvenido!</Text>

      {/* Buttons */}
      <LoginButton title="Iniciar sesión" className1="bg-blue-700 w-64 mt-8" textClassName="text-white" />
      <LoginButton title="Registrate" className1="border border-blue-700 w-64 mt-4" textClassName="text-blue-700" />
    </View>
  );
};

export default LoginScreen;