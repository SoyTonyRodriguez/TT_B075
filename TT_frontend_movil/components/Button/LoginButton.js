import React from "react";
import { Text, TouchableOpacity } from "react-native";

const LoginButton = ({title, onPress, className1='', textClassName=''}) => {
  return (
    <TouchableOpacity onPress={onPress} className={`py-4 rounded-full ${className1}`}>
      <Text className={`text-center text-lg ${textClassName}`}>{title}</Text>
    </TouchableOpacity>
  );
}

export default LoginButton;