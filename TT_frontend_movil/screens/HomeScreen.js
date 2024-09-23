import React, { useState } from "react"; 
import { View, Text, TextInput, Image, ImageBackground, TouchableOpacity, ScrollView } from "react-native"; 
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      {/* Encabezado */}
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Bienvenido</Text>
        <Ionicons name="home" size={40} color="black" style={tw`ml-2`} />
      </View>

      {/* Contenedor de imágenes */}
      <ScrollView contentContainerStyle={tw`px-4`}>
        {/* Primer artículo */}
        <TouchableOpacity onPress={() => navigation.navigate('News1Screen')}>
          <View style={tw`mb-5 items-center`}>
            <Image 
              source={require('../assets/images/ipn-main.webp')}
              style={tw`w-full h-64 rounded-lg`}
            />
            <Text style={tw`mt-2 text-lg text-center text-black`}>
              Promoción docente en el Instituto Politécnico Nacional.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Segundo artículo */}
        <TouchableOpacity onPress={() => navigation.navigate('News5Screen')}>
          <View style={tw`mb-5 items-center`}>
            <Image 
              source={require('../assets/images/convo_2.jpg')}
              style={tw`w-full h-64 rounded-lg`}
            />
            <Text style={tw`mt-2 text-lg text-center text-black`}>
              Nacimiento de la promoción docente.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Tercer artículo */}
        <TouchableOpacity onPress={() => navigation.navigate('News2Screen')}>
          <View style={tw`mb-5 items-center`}>
            <Image 
              source={require('../assets/images/sistema.jpg')}
              style={tw`w-full h-64 rounded-lg`}
            />
            <Text style={tw`mt-2 text-lg text-center text-black`}>
              ¡Da el siguiente paso en tu carrera!
            </Text>
          </View>
        </TouchableOpacity>

        {/* Cuarto artículo */}
        <TouchableOpacity onPress={() => navigation.navigate('News3Screen')}>
          <View style={tw`mb-5 items-center`}>
            <Image 
              source={require('../assets/images/sistema.jpg')}
              style={tw`w-full h-64 rounded-lg`}
            />
            <Text style={tw`mt-2 text-lg text-center text-black`}>
              Sobre este sistema.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Quinto artículo */}
        <TouchableOpacity onPress={() => navigation.navigate('News4Screen')}>
          <View style={tw`mb-5 items-center`}>
            <Image 
              source={require('../assets/images/main_3.jpg')}
              style={tw`w-full h-64 rounded-lg`}
            />
            <Text style={tw`mt-2 text-lg text-center text-black`}>
              Visita la plataforma oficial.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
