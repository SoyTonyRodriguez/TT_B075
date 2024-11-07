import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createProjection } from '../api/projections.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Collapsible from 'react-native-collapsible';
import tw from 'twrnc';

function ProjectionFirstTime() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Estado para controlar las secciones activas del acordeón
  const [activeSections, setActiveSections] = useState([]);

  const handleCreateProjection = async () => {
    setLoading(true);
    try {
      const response = await createProjection({ products: [] });
      if (response.status === 200 || response.status === 201) {
        const projectionId = response.data.id;
        const accountDetailsJson = await AsyncStorage.getItem('accountDetails');
        const accountDetails = accountDetailsJson ? JSON.parse(accountDetailsJson) : {};
        accountDetails.projection_id = projectionId;
        await AsyncStorage.setItem('accountDetails', JSON.stringify(accountDetails));
        navigation.navigate('ProjectionCreationScreen');
      } else {
        Alert.alert('Error', 'Error al crear la proyección');
      }
    } catch (error) {
      console.error('Error creando la proyección:', error);
      Alert.alert('Error', 'Error creando la proyección');
    } finally {
      setLoading(false);
    }
  };

  const accordionSections = [
    {
      title: 'Docencia (carga académica y otras actividades)',
      content: 'La docencia es el pilar de tu labor en el IPN. Planifica tu carga académica, tutorías y creación de materiales didácticos para asegurar que cumples con los objetivos clave.',
    },
    {
      title: 'Investigación',
      content: 'La investigación es fundamental para el avance académico. Proyecta tus actividades de investigación para cumplir con los hitos en tus proyectos y publicaciones.',
    },
    {
      title: 'Superación Académica',
      content: 'La superación académica incluye cursos de actualización, diplomados o posgrados. Proyecta estos estudios para continuar tu crecimiento profesional y acumular U.P.',
    },
    {
      title: 'Actividades complementarias de apoyo a la docencia y a la investigación',
      content: 'Participa en comités, dirige tesis y evalúa prácticas académicas. Estas actividades enriquecen tu experiencia y suman U.P.',
    },
    {
      title: 'Extensión, integración y difusión de la ciencia y la cultura',
      content: 'Las actividades de extensión permiten que el conocimiento trascienda el aula. Participar en eventos científicos o culturales contribuye a tu crecimiento y acumula U.P.',
    },
  ];

  const toggleSection = (section) => {
    const index = activeSections.indexOf(section);
    if (index === -1) {
      setActiveSections([...activeSections, section]);
    } else {
      setActiveSections(activeSections.filter((s) => s !== section));
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      {/* Título */}
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}> 
        <Text style={tw`text-2xl font-bold text-black`}>¿Por qué necesitas una proyección?</Text>
        <Ionicons name="eye-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      {/* Contenido */}
      <ScrollView contentContainerStyle={tw`flex-grow p-4`}>
        {/* Sección de descripción general */}
        <View style={tw`bg-black bg-opacity-60 p-4 rounded-lg mb-6`}>
          <Text style={tw`text-white mb-2`}>
            Crear una proyección te permite planificar y organizar tus actividades académicas y profesionales de manera estructurada para los próximos dos años. Es fundamental porque:
          </Text>
          <View style={tw`ml-4`}>
            <Text style={tw`text-white mb-1`}>
              - <Text style={tw`font-bold`}>Acumulación de Unidades de Promoción (U.P.):</Text> Las U.P. son esenciales para avanzar en tu carrera, y cada actividad que realices te ayudará a sumar los puntos necesarios.
            </Text>
            <Text style={tw`text-white mb-1`}>
              - <Text style={tw`font-bold`}>Balance de responsabilidades:</Text> Planificar evita la sobrecarga y te permite enfocarte en actividades de mayor impacto.
            </Text>
            <Text style={tw`text-white mb-1`}>
              - <Text style={tw`font-bold`}>Reconocimiento de esfuerzos:</Text> Un plan bien estructurado asegura que todas tus actividades sean valoradas y cuenten para tu promoción.
            </Text>
            <Text style={tw`text-white`}>
              - <Text style={tw`font-bold`}>Desarrollo continuo:</Text> Facilita el seguimiento de tu progreso en docencia, investigación y superación académica, maximizando tu crecimiento profesional.
            </Text>
          </View>
        </View>

        {accordionSections.map((section, index) => (
          <View key={index} style={tw`mb-4`}>
            <TouchableOpacity
              onPress={() => toggleSection(index)}
              style={tw`bg-black bg-opacity-60 p-4 rounded-lg flex-row justify-between items-center`}
            >
              <Text style={tw`text-white text-lg font-bold flex-shrink`}>
                {section.title}
              </Text>
              <Ionicons
                name={activeSections.includes(index) ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            <Collapsible collapsed={!activeSections.includes(index)}>
              <View style={tw`bg-black bg-opacity-50 p-4`}>
                <Text style={tw`text-white`}>{section.content}</Text>
              </View>
            </Collapsible>
          </View>
        ))}

        {/* Botón de acción */}
        <View style={tw`flex items-center mb-4`}>
          <TouchableOpacity
            onPress={handleCreateProjection}
            style={tw`bg-blue-800 px-6 py-3 rounded-full`}
          >
            <Text style={tw`text-white text-lg font-semibold`}>
              Acepta y crea tu proyección
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default ProjectionFirstTime;
