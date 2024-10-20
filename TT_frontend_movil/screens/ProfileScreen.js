import * as React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import tw from 'twrnc'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

  const navigation = useNavigation(); 

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
        <Ionicons name="settings-outline" size={40} color="#000" />
      </TouchableOpacity>

      {/* Encabezado del perfil */}
      <View style={tw`items-center mt-20 mb-5`}>
        <Ionicons name="person-circle-outline" size={100} color="#000" />
        <Text style={tw`text-2xl font-bold mt-3`}>Usuario</Text>
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

