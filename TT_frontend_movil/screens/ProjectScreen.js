import * as React from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; 

const ProjectScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-1 pt-12 px-5`}>
        <View style={tw`flex-row justify-between items-center mb-5`}>
          <Text style={tw`text-2xl font-bold text-black`}>Nuestro proyecto</Text>
          <Ionicons name="people-outline" size={40} color="#000" />
        </View>

        <ScrollView style={tw`px-5`}>
          <Text style={tw`text-base text-black mb-3 text-justify`}>
            Este proyecto fue desarrollado como parte del proceso de titulación por Trabajo Terminal bajo el nombre clave TT-B075 por los alumnos de la Escuela Superior de Cómputo Casaos Tabaco Luis Ángel, García Montiel Gustavo y Rodríguez Flores Antonio.
          </Text>
          <Text style={tw`text-base text-black mb-3 text-justify`}>
            Como parte de las limitaciones para este proyecto fue el desarrollo principal sobre plataformas y marcos gratuitos, lo que limita y estandariza este sistema dentro de lo que servicios de este tipo confiere.
          </Text>
          <Text style={tw`text-base text-black mb-3 text-justify`}>
            Este proyecto fue presentado el día 16 de diciembre de 2024 como parte de la presentación para su evaluación ante el grupo de sinodales cuyo dictamen permite el progreso del desarrollo.
          </Text>
          <Text style={tw`text-base text-black mb-3 text-justify`}>
            Toda la documentación técnica sobre las herramientas y marcos de trabajo programáticos se encuentran disponibles en el manual técnico de este sistema.
          </Text>
          <Text style={tw`text-base text-black mb-3 text-justify`}>
            El propósito de todo este sistema web junto con su símil para plataformas móviles de android es brindar aplicaciones auxiliares que guíen a los docentes, además de ser gestoras de archivos de índole personal, académica y laboral; deben contar con los enlaces e información relevante sobre cada proceso a seguir dentro del sistema.
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default ProjectScreen;
