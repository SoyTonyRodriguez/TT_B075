import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const ProjectionCreationScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')} 
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      {/* Encabezado */}
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Crear proyección</Text>
        <Ionicons name="eye-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      {/* Contenido de la pantalla */}
      <View style={tw`flex-1 justify-center px-5`}>
        {/* Unidades de Promoción */}
        <TouchableOpacity 
          style={tw`flex-row items-center bg-[rgba(0,0,0,0.3)] rounded-3xl px-5 py-7 mb-5`}
          onPress={() => navigation.navigate('UnidadesPromocion')}
        >
          <View style={tw`mr-5 bg-blue-500 p-5 rounded-3xl`}>
            <Ionicons name="star-outline" size={50} color="#fff" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-xl font-bold text-white`}>Unidades de promoción</Text>
            <Text style={tw`mt-2 text-lg text-white`}>
              Las Unidades de Promoción (U.P.) son un sistema de reconocimiento al desempeño docente...
            </Text>
          </View>
        </TouchableOpacity>

        {/* Grado Académico */}
        <TouchableOpacity 
          style={tw`flex-row items-center bg-[rgba(0,0,0,0.3)] rounded-3xl px-5 py-7`}
          onPress={() => navigation.navigate('GradoAcademico')}
        >
          <View style={tw`mr-5 bg-blue-500 p-5 rounded-3xl`}>
            <Ionicons name="school-outline" size={50} color="#fff" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-xl font-bold text-white`}>Obtención de grado académico</Text>
            <Text style={tw`mt-2 text-lg text-white`}>
              La obtención del grado de maestro o doctor concede al académico la promoción al nivel superior...
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ProjectionCreationScreen;
