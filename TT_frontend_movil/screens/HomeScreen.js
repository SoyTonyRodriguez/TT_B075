import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ImageBackground, TouchableOpacity, ScrollView } from "react-native"; 
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { getAccount } from "../api/accounts.api"; // Importa tu función de API
import LoadingScreen from './LoadingScreen'; // Pantalla de carga
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { jwtDecode } from "jwt-decode";
import tw from 'twrnc';

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

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        Toast.show({ type: 'success', text1: 'Bienvenido!', visibilityTime: 1000 });
        // Verifica si los datos de la cuenta están almacenados
        const storedAccountData = await AsyncStorage.getItem('accountDetails');
        
        if (storedAccountData) {
          const { userName, fullName, email, category, phone } = JSON.parse(storedAccountData);
          setUserName(userName);
          setFullName(fullName);
          setEmail(email);
          setCategory(category);
          setPhone(phone);
          setLoading(false); // Datos encontrados, omitimos la animación de carga
        } else {
          // Si no hay datos almacenados, obtenemos el token
          const token = await AsyncStorage.getItem('token');
          if (token) {
            try {
              const decodedToken = jwtDecode(token);
              setUserId(decodedToken.user_id);
              console.log('Token decodificado:', decodedToken.user_id);
            } catch (error) {
              console.error('Token inválido:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error al cargar los datos de la cuenta:', error);
      }
    };

    loadAccountData();
  }, []);

  useEffect(() => {
    if (userId && !userName) {
      const fetchAccountDetails = async () => {
        try {

          const response = await getAccount(userId);
          console.log('Detalles de la cuenta:', response);
          const fullName = response.data.name;
          const firstName = fullName.split(' ')[0];
          const email = response.data.email;
          const category = response.data.category;
          const phone = response.data.phone;

          setUserName(firstName);
          setFullName(fullName);
          setEmail(email);
          setCategory(category);
          setPhone(phone);

          // Guarda los detalles de la cuenta en AsyncStorage
          const accountDetails = {
            userName: firstName,
            fullName,
            email,
            category,
            phone,
          };

          await AsyncStorage.setItem('accountDetails', JSON.stringify(accountDetails));
        } catch (error) {
          console.error('Error al obtener los detalles de la cuenta:', error);
          if (error.response && error.response.status === 401) {
            console.error('No autorizado: token inválido o caducado');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchAccountDetails();
    }
  }, [userId, userName]);

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
  );
};

export default HomeScreen;
