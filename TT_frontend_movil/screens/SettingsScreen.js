import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications'; // Para manejar permisos de notificaciones
import tw from 'twrnc';

export default function SettingsScreen({ navigation }) {
  // Función para solicitar permisos de notificaciones
  const askForNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();  // Obtener permisos de notificación
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();  // Solicitar permisos de notificación
      if (newStatus !== 'granted') {
        Alert.alert(
          'Permiso Rechazado',
          'No podrás recibir notificaciones si no activas los permisos.',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    // Si los permisos son concedidos, navega a la pantalla de notificaciones
    navigation.navigate('NotificationScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')} 
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-1 p-5`}>
        {/* Ícono de regresar */}
        <TouchableOpacity 
          style={tw`absolute top-12 left-5 z-10`} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>

        {/* Título */}
        <Text style={tw`text-2xl font-bold text-center mt-5 mb-5 text-black`}>Configuración</Text>

        {/* sección de cuenta */}
        <Text style={tw`text-lg font-bold mt-5 mb-2 text-black`}>Cuenta</Text>
        <View style={tw`bg-[rgba(255,255,255,0.7)] rounded-xl py-2`}>
          <TouchableOpacity 
            style={tw`flex-row items-center py-3 px-2 border-b border-[rgba(0,0,0,0.2)]`} 
            onPress={() => navigation.navigate('EditProfileScreen')} 
          >
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={tw`ml-2 text-black text-base`}>Editar perfil</Text>
          </TouchableOpacity>

          {/* Botón de Notificaciones */}
          <TouchableOpacity 
            style={tw`flex-row items-center py-3 px-2 border-b border-[rgba(0,0,0,0.2)]`}
            onPress={askForNotificationPermission}  
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={tw`ml-2 text-black text-base`}>Notificaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`flex-row items-center py-3 px-2`} 
            onPress={() => navigation.navigate('PrivacyScreen')} 
          >
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <Text style={tw`ml-2 text-black text-base`}>Privacidad y seguridad</Text>
          </TouchableOpacity>
        </View>

        {/* sección de acciones */}
        <Text style={tw`text-lg font-bold mt-5 mb-2 text-black`}>Acciones</Text>
        <View style={tw`bg-[rgba(255,255,255,0.7)] rounded-xl py-2`}>
          <TouchableOpacity style={tw`flex-row items-center py-3 px-2 border-b border-[rgba(0,0,0,0.2)]`}
          // dejamos pendiente esto porque no se que tan conveniente sea tener dos perfiles 
          >
            <Ionicons name="person-add-outline" size={24} color="black" />
            <Text style={tw`ml-2 text-black text-base`}>Añadir cuenta</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center py-3 px-2`}>
            <Ionicons name="log-out-outline" size={24} color="black" />
            <Text style={tw`ml-2 text-black text-base`}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
