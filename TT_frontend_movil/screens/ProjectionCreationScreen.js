import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import LoadingScreen from './LoadingScreen'; // Pantalla de carga
import { getProjection } from '../api/projections.api';
import {jwtDecode} from 'jwt-decode';

const ProjectionCreationScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(''); // Accede al token y userId del contexto
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(""); // Mensaje para LoadingScreen
  const [projectionType, setProjectionType] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log('Token decodificado:', decodedToken.user_id);
          setUserId(decodedToken.user_id);
        }
      } catch (error) {
        console.error('Error al obtener token:', error);
      }
    }
    fetchToken();
  }, []);



  useEffect(() => {
  
    const fetchProjection = async () => {
      try {
        setLoading(true);
        setLoadingMessage("Cargando datos..."); // Mensaje para LoadingScreen
        const response = await getProjection(userId); // Llamada a la API
        console.log(userId);
        setProjectionType(response.data[0].type); // Almacenar los datos recibidos
        console.log('Datos recibidos:', response.data[0].type);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError('No se pudo cargar la información.'); // Mostrar mensaje de error
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProjection(userId);
    }
  }, [userId]);


  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')} 
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      {/* Pantalla de carga */}
      {loading && <LoadingScreen message={loadingMessage} />}
      {/* Encabezado */}
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Crear proyección</Text>
        <Ionicons name="eye-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      {/* Contenido de la pantalla */}
      <View style={tw`flex-1 justify-center px-5`}>
        {/* Unidades de Promoción */}
        <TouchableOpacity
          style={[
            tw`flex-row items-center bg-[rgba(0,0,0,0.3)] rounded-3xl px-4 py-5`,
            projectionType === "Grado Académico" && tw`bg-gray-400`
          ]}
          onPress={() => {
            if (projectionType !== "Grado Académico") {
              navigation.navigate('UnidadesPromocion');
            }
          }}
          disabled={projectionType === "Grado Académico"}
        >
          <View style={tw`mr-4 bg-blue-500 p-4 rounded-3xl`}>
            <Ionicons name="star-outline" size={50} color="#fff" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-xl text-center font-bold text-white`}>Unidades de promoción</Text>
            <Text style={tw`mt-1 text-base text-justify text-white`}>
              Las Unidades de Promoción (U.P.) son un sistema de reconocimiento al desempeño docente.
              Se otorgan a los profesores por realizar actividades que van más allá de sus obligaciones básicas.
            </Text>
            {projectionType === "Grado Académico" && (
              <View style={tw`mt-2 p-2 bg-red-100 border border-red-500 rounded-md`}>
                <Text style={tw`text-red-500 text-center`}>
                  Este botón está deshabilitado porque ya tiene una proyección de "Grado Académico".
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View style={tw`mt-4`} />
        {/* Grado Académico */}
        <TouchableOpacity
          style={[
            tw`flex-row items-center bg-[rgba(0,0,0,0.3)] rounded-3xl px-4 py-5`,
            projectionType === "Unidades de Promoción" && tw`bg-gray-400`
          ]}
          onPress={() => {
            if (projectionType !== "Unidades de Promoción") {
              navigation.navigate('GradoAcademico');
            }
          }}
          disabled={projectionType === "Unidades de Promoción"}
        >
          <View style={tw`mr-4 bg-blue-500 p-4 rounded-3xl`}>
            <Ionicons name="school-outline" size={50} color="#fff" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-xl text-center font-bold text-white`}>Obtención de grado académico</Text>
            <Text style={tw`mt-1 text-base text-justify text-white`}>
              La obtención del grado de maestro o doctor concede al académico la promoción al nivel superior.
              Cuando no se haya promovido en cuatro o más años y al solicitarla presente los grados de maestría y doctorado.
            </Text>
            {projectionType === "Unidades de Promoción" && (
              <View style={tw`mt-2 p-2 bg-red-100 border border-red-500 rounded-md`}>
                <Text style={tw`text-red-500 text-center`}>
                  Este botón está deshabilitado porque ya tiene una proyección de "Unidades de Promoción".
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
};

export default ProjectionCreationScreen;
