import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from 'twrnc'; 

const LoginButton = ({title, onPress, className1='', textClassName=''}) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`${className1}`}>
      <Text style={tw`${textClassName} text-center text-lg`}>{title}</Text>
    </TouchableOpacity>
  );
}

export default LoginButton;
