import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc'; 
import { createProjection } from '../api/projections.api';

const ProjectionScreen = () => {
  const navigation = useNavigation();
  const [projection_id, setProjectionId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStoredAccountData = async () => {
      try {
        const storedAccountData = await AsyncStorage.getItem('accountDetails');
        if (storedAccountData) {
          const { projection_id } = JSON.parse(storedAccountData);
          setProjectionId(projection_id);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchStoredAccountData();
  }, []);

  const handleCreateProjection = () => {
    setLoading(true);
    if (projection_id === '') {
      navigation.navigate('ProjectionFirstTime');
    } else {
      navigation.navigate('ProjectionCreationScreen');
    }
    setLoading(false);
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')}  
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      {/* Encabezado */}
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Proyección y seguimiento</Text>
        <Ionicons name="eye-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      {/* Contenido de la pantalla */}
      <View style={tw`flex-1 justify-evenly px-2`}>
        {/* Opción Crear Proyección */}
        <TouchableOpacity 
          style={tw`flex-row items-center bg-[rgba(0,0,0,0.3)] rounded-3xl px-10 h-40`}
          onPress={() => navigation.navigate('ProjectionFirstTime')}
        >
          <View style={tw`w-25 h-25 justify-center items-center bg-blue-500 rounded-3xl mr-5`}>
            <Ionicons name="pencil-outline" size={50} color="#fff" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-2xl text-center text-white font-bold`}>Crear proyección</Text>
            <Text style={tw`mt-2 text-lg text-justify text-white`}>
              Inicia una proyección en cualquiera de las dos modalidades disponibles.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Opción Ver mi Proyección */}
        <TouchableOpacity style={tw`flex-row items-center bg-[rgba(0,0,0,0.3)] rounded-3xl px-10 h-40`}
          onPress={() => navigation.navigate('KanbanBoard')}  
        >
          <View style={tw`w-25 h-25 justify-center items-center bg-blue-500 rounded-3xl mr-5`}>
            <Ionicons name="glasses-outline" size={50} color="#fff" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-2xl text-center text-white font-bold`}>Ver mi proyección</Text>
            <Text style={tw`mt-2 text-lg text-justify text-white`}>
              Ve todos los detalles de tu proyección actual.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Opción Guía */}
        <TouchableOpacity 
          style={tw`flex-row items-center bg-[rgba(0,0,0,0.3)] rounded-3xl px-10 h-40`}
          onPress={() => navigation.navigate('GuideScreen')}  
        >
          <View style={tw`w-25 h-25 justify-center items-center bg-blue-500 rounded-3xl mr-5`}>
            <Ionicons name="help-circle-outline" size={50} color="#fff" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-2xl text-center text-white font-bold`}>Guía</Text>
            <Text style={tw`mt-2 text-lg text-justify text-white`}>
              ¿No sabes cómo iniciar una proyección? Consulta nuestra guía.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ProjectionScreen;


