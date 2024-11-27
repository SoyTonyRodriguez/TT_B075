import * as React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import tw from 'twrnc'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getAccount } from "../api/accounts.api"; // Importa tu función de API
import { jwtDecode } from "jwt-decode";

const ProfileScreen = () => {

  const navigation = useNavigation(); 
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [unitsPromotion, setUnitsPromotion] = useState(''); // Valor inicial de las U.P. acumuladas
  const [showUnits, setShowUnits] = useState(false); // Estado para mostrar/ocultar las U.P.

  // Load account data from localStorage on component mount
  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id);
          } catch (error) {
            console.error('Token inválido:', error);
          }
        }

        const storedAccountData =  await AsyncStorage.getItem('accountDetails');
        if (storedAccountData) {
          const { userName } = JSON.parse(storedAccountData);
          setUserName(userName);
        }
      } catch (error) {
        console.error("Error accessing or parsing account details from localStorage:", error);
        AsyncStorage.removeItem('accountDetails');
      }
    };
    loadAccountData();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchAccountDetails = async () => {
        try {
          const response = await getAccount(userId);
          
          if (response && response.data) {
            console.log('Detalles de la cuenta recibidos:', response.data);
            const fullName = response.data.name || 'Sin nombre';
            const firstName = fullName.split(' ')[0];
            const unitsProjection = response.data.units_projection || 0;

            setUserName(firstName);
            setUnitsPromotion(unitsProjection);
      
            // Guarda en AsyncStorage
            // const accountDetails = { userName: firstName, unitsProjection };
            // await AsyncStorage.setItem('accountDetails', JSON.stringify(accountDetails));
          } else {
            console.warn('La API no devolvió datos de usuario válidos.');
          }
        } catch (error) {
          console.error('Error al obtener los detalles de la cuenta:', error);
          if (error.response?.status === 401) {
            console.error('No autorizado: token inválido o caducado');
          }
        }
      };
      console.log('Intentando obtener detalles de la cuenta para el usuario:', userId);

      fetchAccountDetails();
    }
  }, [userId]);    

  useEffect(() => {
    const interval = setInterval(() => {
      if (userId) {
        const fetchAccountDetails = async () => {
          try {
            const response = await getAccount(userId);
            
            if (response && response.data) {
              // console.log('Detalles de la cuenta actualizados:', response.data);
              const unitsProjection = response.data.units_projection || 0;
              setUnitsPromotion(unitsProjection);
            }
          } catch (error) {
            console.error('Error al actualizar los detalles de la cuenta:', error);
          }
        };
        fetchAccountDetails();
      }
    }, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval);
  }, [userId]);

  const handleLogout = () => {
    // Función para mostrar un diálogo de confirmación
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que quieres cerrar sesión?", 
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"), 
          style: "cancel"
        },
        { 
          text: "Aceptar", 
          onPress: async () => {
            await AsyncStorage.removeItem('token'); 
            navigation.replace('Login'); // Redirige a la pantalla de inicio de sesión
          }
        }
      ],
      { cancelable: false } 
    );
  };
  
  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      {/* Icono de configuración */}
      <TouchableOpacity 
        style={tw`absolute top-10 right-5 z-10`} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Ionicons name="settings-outline" size={35} color="#000" />
      </TouchableOpacity>

      {/* Icono de U.P. acumuladas con fondo reducido */}
      <TouchableOpacity 
        style={tw`absolute top-9 left-4 z-10 bg-[rgba(0,0,0,0.2)] rounded-full p-2 flex-row items-center`} 
        onPress={() => setShowUnits(!showUnits)}
      >
        <Ionicons name="star-outline" size={30} color="#ffd700" />
        {showUnits && (
          <Text style={tw`ml-2 text-lg font-bold text-black`}>U.P. acumuladas: {unitsPromotion}</Text>
        )}
      </TouchableOpacity>

      {/* Encabezado del perfil */}
      <View style={tw`items-center mt-20 mb-5`}>
        <Ionicons name="person-circle-outline" size={100} color="#000" />
        <Text style={tw`text-2xl font-bold mt-3`}>{userName}</Text>
      </View>

      {/* Contenedor de botones en cuadrícula */}
      <View style={tw`flex-1 flex-row flex-wrap justify-around p-2`}>
        {/* Enlaces Oficiales */}
        <TouchableOpacity 
          style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-5`}
          onPress={() => navigation.navigate('OfficialLinksScreen')}
        >
          <Ionicons name="link-outline" size={40} color="#fff" />
          <Text style={tw`mt-2 text-white text-center text-base`}>Enlaces oficiales</Text>
        </TouchableOpacity>

        {/* Nuestro Proyecto */}
        <TouchableOpacity 
          style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-5`}
          onPress={() => navigation.navigate('ProjectScreen')}
        >
          <Ionicons name="people-outline" size={40} color="#fff" />
          <Text style={tw`mt-2 text-white text-center text-base`}>Nuestro proyecto</Text>
        </TouchableOpacity>

        {/* Convocatoria */}
        <TouchableOpacity 
          style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-5`}
          onPress={() => navigation.navigate('ConvocatoriaScreen')}
        >
          <Ionicons name="megaphone-outline" size={40} color="#fff" />
          <Text style={tw`mt-2 text-white text-center text-base`}>Convocatoria</Text>
        </TouchableOpacity>

        {/* Más información */}
        <TouchableOpacity 
          style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-5`}
          onPress={() => navigation.navigate('MoreInfo')}
        >
          <Ionicons name="information-circle-outline" size={40} color="#fff" />
          <Text style={tw`mt-2 text-white text-center text-base`}>Más información</Text>
        </TouchableOpacity>

        {/* Cerrar sesión */}
        <TouchableOpacity 
          style={tw`w-38 h-38 bg-[rgba(0,0,0,0.3)] rounded-xl justify-center items-center mb-5`}
          onPress={handleLogout} 
        >
          <Ionicons name="log-out-outline" size={40} color="#fff" />
          <Text style={tw`mt-2 text-white text-center text-base`}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
