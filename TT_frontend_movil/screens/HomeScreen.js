import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, Image, ImageBackground, TouchableOpacity, ScrollView } from "react-native"; 
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { getAccount } from "../api/accounts.api"; // Importa tu función de API
import { getConditions } from '../api/conditions.api'; // Importa tu función de API
import { getConditionsMax } from '../api/conditions_max.api'; // Importa tu función de API
import LoadingScreen from './LoadingScreen'; // Pantalla de carga
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { jwtDecode } from "jwt-decode";
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomToast from '../components/CustomToast'; // Toast personalizado
import Toast from 'react-native-toast-message'; 

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');

  const [loadingMessage, setLoadingMessage] = useState(""); // Mensaje para LoadingScreen
  const [loading, setLoading] = useState(true); // Estado de carga

  // State for conditions
  const [conditions, setConditions] = useState(null);
  const [conditions_max, setConditionsMax] = useState(null);

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        Toast.show({ type: 'success', text1: 'Bienvenido!', visibilityTime: 1000 });

        const storedConditions = await AsyncStorage.getItem('conditions');

        const storedConditionsMax = await AsyncStorage.getItem('conditions_max');
        
        const token = await AsyncStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id);
          } catch (error) {
            console.error('Token inválido:', error);
          }
        }

        if (storedConditions) {
          setConditions(JSON.parse(storedConditions));
          console.log('Conditions cargadas desde AsyncStorage.');
        } else {
          fetchConditions();
        }
  
        if (storedConditionsMax) {
          setConditionsMax(JSON.parse(storedConditionsMax));
          console.log('Conditions_max cargadas desde AsyncStorage.');
        } else {
          fetchConditionsMax();
        }
      } catch (error) {
        console.error('Error al cargar los datos de la cuenta:', error);
      }
    };

    loadAccountData();
  }, []);

  useEffect(() => {
    if (userId ) {
      const fetchAccountDetails = async () => {
        try {
          const response = await getAccount(userId);
          
          if (response && response.data) {
            console.log('Detalles de la cuenta recibidos:', response.data);
            const fullName = response.data.name || 'Sin nombre';
            const firstName = fullName.split(' ')[0];
            const email = response.data.email || 'Sin email';
            const category = response.data.category || 'Sin categoría';
            const projection_id = response.data.projection_id || 'Sin proyección';
      
            setUserName(firstName);
            setFullName(fullName);
            setEmail(email);
            setCategory(category);
      
            // Guarda en AsyncStorage
            const accountDetails = { userName: firstName, fullName, email, category, projection_id };
            await AsyncStorage.setItem('accountDetails', JSON.stringify(accountDetails));
          } else {
            console.warn('La API no devolvió datos de usuario válidos.');
          }
        } catch (error) {
          console.error('Error al obtener los detalles de la cuenta:', error);
          if (error.response?.status === 401) {
            console.error('No autorizado: token inválido o caducado');
          }
        } finally {
          setLoading(false);
        }
      };
      console.log('Intentando obtener detalles de la cuenta para el usuario:', userId);

      fetchAccountDetails();
    }
  }, [userId, userName]);    
  
  const fetchConditions = async () => {
    try {
      const response = await getConditions();
      setConditions(response.data[0]);
  
      // Verificar que los datos sean válidos antes de guardar
      if (response.data[0]) {
        await AsyncStorage.setItem('conditions', JSON.stringify(response.data[0]));
        console.log('Conditions guardadas en AsyncStorage.');
      }
    } catch (error) {
      console.error('Error fetching conditions:', error);
    }
  };
  
  const fetchConditionsMax = async () => {
    try {
      const response = await getConditionsMax();
  
      // Verificar que los datos sean válidos
      if (response && response.data) {
        setConditionsMax(response.data);
  
        await AsyncStorage.setItem('conditions_max', JSON.stringify(response.data));
        console.log('Conditions_max guardadas en AsyncStorage.');
      } else {
        console.warn('No se encontraron datos para conditions_max.');
      }
    } catch (error) {
      console.error('Error fetching conditions_max:', error);
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ImageBackground 
        source={require('../assets/images/fondo.jpg')} 
        style={tw`flex-1 w-full h-full`}
        resizeMode="cover"
      >
        {/* Pantalla de carga */}
        {loading && <LoadingScreen message={loadingMessage} />}
        
        {/* Encabezado */}
        <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
          <Text style={tw`text-2xl font-bold text-black`}>Bienvenido {`${userName}`}</Text>
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
        
        
        {/* Toast container */}
        <CustomToast />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
