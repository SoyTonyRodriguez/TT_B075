import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const PDF_FILES = {
  convocatoria: require('../assets/pdfs/convocatoria.pdf'),
  reglamento: require('../assets/pdfs/reglamento.pdf'),
  cronograma: require('../assets/pdfs/cronograma.pdf'),
  valoracion: require('../assets/pdfs/valoracionactividades.pdf'),
  gaceta: require('../assets/pdfs/gaceta.pdf'),
};


export default function OfficialLinksScreen({ navigation }) {
  const openPDF = (pdfKey) => {
    const pdfResource = PDF_FILES[pdfKey]; // Carga el recurso del PDF
    navigation.navigate('PDFViewer', { pdfResource });
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
        <View style={tw`flex-1 flex-row flex-wrap justify-evenly items-center py-10`}>
          <TouchableOpacity
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`}
            onPress={() => openPDF('convocatoria')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Convocatoria 2024</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`}
            onPress={() => openPDF('reglamento')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Reglamento promoción</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`}
            onPress={() => openPDF('cronograma')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Cronograma 2024</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-20`}
            onPress={() => openPDF('valoracion')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-base`}>Valoración de actividades</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mt-10`}
            onPress={() => openPDF('gaceta')}
          >
            <Ionicons name="link-outline" size={40} color="#fff" />
            <Text style={tw`mt-2 text-white text-center text-lg`}>Gaceta Politécnica No. 1511</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
