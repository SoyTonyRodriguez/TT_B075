import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function OfficialLinksScreen({ navigation }) {
  // Función para abrir un enlace específico
  const openPDF = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-1 pt-12 px-5`}>
        <View style={tw`flex-row justify-between items-center mb-5`}>
          <Text style={tw`text-2xl font-bold text-black`}>Enlaces oficiales</Text>
          <Ionicons name="link" size={40} color="#000" />
        </View>

        {/* Botones para abrir los PDFs */}
        <View style={tw`flex-1 flex-row flex-wrap justify-evenly items-center py-5`}>
          <TouchableOpacity
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`}
            onPress={() => openPDF('http://192.168.1.142:8000/docs/Convocatoria.pdf')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Convocatoria 2024</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`}
            onPress={() => openPDF('http://192.168.1.142:8000/docs/Reglamento.pdf')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Reglamento promoción</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`}
            onPress={() => openPDF('http://192.168.1.142:8000/docs/Cronograma.pdf')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Cronograma 2024</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`}
            onPress={() => openPDF('http://192.168.1.142:8000/docs/Valoracion.pdf')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Valoración de actividades</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-8`}
            onPress={() => openPDF('http://192.168.1.142:8000/docs/Gaceta.pdf')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Gaceta Politécnica No. 1511</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
