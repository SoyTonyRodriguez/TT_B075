import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function OfficialLinksScreen({ navigation }) {
  // Funciones para abrir los enlaces
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL: ", err);
    });
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

        {/* Grid de enlaces */}
        <View style={tw`flex-1 flex-row flex-wrap justify-evenly items-center py-10`}>
          <TouchableOpacity 
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`} 
            onPress={() => openLink('https://www.ipn.mx/assets/files/dch/docs/Personal-Docente/PromocionDoc/2024/Convocatoria.pdf')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Convocatoria 2024</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`} 
            onPress={() => openLink('https://www.ipn.mx/assets/files/normatividad/docs/reglamentos/EXT828.pdf')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Reglamento promoción</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`} 
            onPress={() => openLink('https://www.ipn.mx/assets/files/dch/docs/Personal-Docente/PromocionDoc/2024/Cronograma.pdf')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Cronograma 2024</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`} 
            onPress={() => openLink('https://www.ipn.mx/assets/files/dch/docs/Personal-Docente/PromocionDoc/2023/Valact100UP.pdf')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Valoración de actividades</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
