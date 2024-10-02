import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const GuideScreen = () => {
  
  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <ScrollView>
        <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
          <Text style={tw`text-2xl font-bold text-black text-center`}>¿Crear proyección?</Text>
          <Ionicons name="document" size={40} color="black" />
        </View>

        <View style={tw`max-w-xl mx-auto text-center px-5`}>
          <Text style={tw`text-xl mb-6 leading-relaxed text-black`}>
            Crear una proyección te permitirá establecer y controlar todas aquellas actividades que te propongas cumplir en un
            periodo de 2 años, tomando en cuenta todas las condiciones que aquí condensamos de una manera más ligera y directa,
            así como la disposición del calendario de la convocatoria para que no olvides ninguna fecha.
          </Text>
          <Text style={tw`text-xl mb-6 leading-relaxed text-black`}>
            Para crear una proyección, luego de hacer clic sobre la opción con el mismo nombre podrás disponer de las actividades
            disponibles para acumular puntos. Con opciones para crear, asignar descripción y prioridad, así como una fecha
            aproximada para su cumplimiento ¡Podrás mantener un panorama completo sobre tus propósitos y progreso!
          </Text>
        </View>

        <View style={tw`max-w-xl mx-auto mt-8 text-center px-5`}>
          <Text style={tw`text-lg text-white leading-relaxed`}>
            Conforme creas y agregas tareas podrás visualizar la cantidad de actividades que te has propuesto y el acumulado de unidades de promoción.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default GuideScreen;
