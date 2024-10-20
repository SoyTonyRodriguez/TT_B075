import * as React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; 

const openURL = async (url) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`No se puede abrir el enlace: ${url}`);
  }
};

const MoreInfoScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}  
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-1 pt-12 px-5`}>
        <View style={tw`flex-row justify-between items-center mb-5`}>
          <Text style={tw`text-2xl font-bold text-black`}>Más información</Text>
          <Ionicons name="information-circle-outline" size={40} color="#000" style={tw`mr-2`} />
        </View>

        <ScrollView contentContainerStyle={tw`pb-5`}>
          {/* Primera tarjeta */}
          <View style={tw`flex-row justify-between mb-5`}>
            <TouchableOpacity 
              style={tw`w-42 h-38 bg-blue-900 rounded-3xl justify-center items-center`}
              onPress={() => openURL('https://www.ipn.mx/radio/noticias/ver-comunicado.html?y=2023&n=11&t=15&u=4')}
            >
              <Text style={tw`text-lg font-bold text-white text-center`}>Noticia</Text>
              <Text style={tw`text-sm text-gray-400 text-center`}>Mario Barbosa</Text>
            </TouchableOpacity>
            <View style={tw`w-42 h-38 bg-teal-100 border border-teal-600 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-base text-teal-800 text-center mb-3`}>
                ¿Conoces las condiciones para que acepten tu promoción?
              </Text>
              <TouchableOpacity onPress={() => openURL('https://www.ipn.mx/imageninstitucional/comunicados/ver-comunicado.html?y=2023&n=12&t=6')}>
                <Text style={tw`text-sm text-teal-800 underline text-center`}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Segunda tarjeta */}
          <View style={tw`flex-row justify-between mb-5`}>
            <TouchableOpacity 
              style={tw`w-42 h-38 bg-blue-900 rounded-3xl justify-center items-center`}
            >
              <Text style={tw`text-lg font-bold text-white text-center`}>Noticia</Text>
            </TouchableOpacity>
            <View style={tw`w-42 h-38 bg-teal-100 border border-teal-600 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-base text-teal-800 text-center mb-3`}>
                ¿Sabes las condiciones sobre tutorados para ser válidas?
              </Text>
              <TouchableOpacity onPress={() => openURL('https://www.ipn.mx/imageninstitucional/comunicados/ver-comunicado.html?y=2023&n=12&t=6')}>
                <Text style={tw`text-sm text-teal-800 underline text-center`}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tercera tarjeta */}
          <View style={tw`flex-row justify-between mb-5`}>
            <TouchableOpacity 
              style={tw`w-42 h-38 bg-blue-900 rounded-3xl justify-center items-center`}
            >
              <Text style={tw`text-lg font-bold text-white text-center`}>Artículo</Text>
              <Text style={tw`text-sm text-gray-400 text-center`}>Docentes aceptados</Text>
            </TouchableOpacity>
            <View style={tw`w-42 h-38 bg-teal-100 border border-teal-600 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-base text-teal-800 text-center mb-3`}>
                Docentes aceptados durante los procesos de años anteriores
              </Text>
              <TouchableOpacity onPress={() => openURL('https://www.ipn.mx/imageninstitucional/comunicados/ver-comunicado.html?y=2023&n=12&t=6')}>
                <Text style={tw`text-sm text-teal-800 underline text-center`}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cuarta tarjeta */}
          <View style={tw`flex-row justify-between mb-5`}>
            <TouchableOpacity 
              style={tw`w-42 h-38 bg-blue-900 rounded-3xl justify-center items-center`}
            >
              <Text style={tw`text-lg font-bold text-white text-center`}>Noticia</Text>
              <Text style={tw`text-sm text-gray-400 text-center`}>Promoción Docente</Text>
            </TouchableOpacity>
            <View style={tw`w-42 h-38 bg-teal-100 border border-teal-600 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-base text-teal-800 text-center mb-3`}>
                Fortalecimiento Académico IPN
              </Text>
              <TouchableOpacity onPress={() => openURL('https://www.ipn.mx/radio/noticias/ver-comunicado.html?y=2023&n=11&t=15&u=4')}>
                <Text style={tw`text-sm text-teal-800 underline text-center`}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default MoreInfoScreen;
