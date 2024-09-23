import * as React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; 

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
            <TouchableOpacity style={tw`w-42 h-38 bg-blue-900 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-lg font-bold text-white text-center`}>Noticia</Text>
              <Text style={tw`text-sm text-gray-400 text-center`}>Mario Barbosa</Text>
            </TouchableOpacity>
            <View style={tw`w-42 h-38 bg-teal-100 border border-teal-600 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-base text-teal-800 text-center mb-3`}>
                ¿Conoces las condiciones para que acepten tu promoción?
              </Text>
              <TouchableOpacity>
                <Text style={tw`text-sm text-teal-800 underline text-center`}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Segunda tarjeta */}
          <View style={tw`flex-row justify-between mb-5`}>
            <TouchableOpacity style={tw`w-42 h-38 bg-blue-900 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-lg font-bold text-white text-center`}>Noticia</Text>
            </TouchableOpacity>
            <View style={tw`w-42 h-38 bg-teal-100 border border-teal-600 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-base text-teal-800 text-center mb-3`}>
                ¿Sabes las condiciones sobre tutorados para ser válidas?
              </Text>
              <TouchableOpacity>
                <Text style={tw`text-sm text-teal-800 underline text-center`}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tercera tarjeta */}
          <View style={tw`flex-row justify-between mb-5`}>
            <TouchableOpacity style={tw`w-42 h-38 bg-blue-900 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-lg font-bold text-white text-center`}>Artículo</Text>
              <Text style={tw`text-sm text-gray-400 text-center`}>Liferay</Text>
            </TouchableOpacity>
            <View style={tw`w-42 h-38 bg-teal-100 border border-teal-600 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-base text-teal-800 text-center mb-3`}>
                Docentes aceptados durante los procesos de años anteriores
              </Text>
              <TouchableOpacity>
                <Text style={tw`text-sm text-teal-800 underline text-center`}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cuarta tarjeta */}
          <View style={tw`flex-row justify-between mb-5`}>
            <TouchableOpacity style={tw`w-42 h-38 bg-blue-900 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-lg font-bold text-white text-center`}>Base</Text>
              <Text style={tw`text-sm text-gray-400 text-center`}>Alianza</Text>
            </TouchableOpacity>
            <View style={tw`w-42 h-38 bg-teal-100 border border-teal-600 rounded-3xl justify-center items-center`}>
              <Text style={tw`text-base text-teal-800 text-center mb-3`}>
                Reglamento de promoción docente
              </Text>
              <TouchableOpacity>
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

