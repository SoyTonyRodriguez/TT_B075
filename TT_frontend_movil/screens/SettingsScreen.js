import React from 'react';
import { View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de que esto está importado

export default function SettingsScreen({ navigation }) {
  // Función para solicitar permisos de notificaciones
  const askForNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert(
          'Permiso Rechazado',
          'No podrás recibir notificaciones si no activas los permisos.',
          [{ text: 'OK' }]
        );
        return;
      }
    }
    navigation.navigate('NotificationScreen');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); 
    navigation.replace('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-1 p-5`}>
        <TouchableOpacity 
          style={tw`absolute top-12 left-5 z-10`} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>

        <Text style={tw`text-2xl font-bold text-center mt-5 mb-5 text-black`}>Configuración</Text>
        <Text style={tw`text-lg font-bold mt-5 mb-2 text-black`}>Cuenta</Text>
        <View style={tw`bg-[rgba(255,255,255,0.7)] rounded-xl py-2`}>
          <TouchableOpacity 
            style={tw`flex-row items-center py-3 px-2 border-b border-[rgba(0,0,0,0.2)]`} 
            onPress={() => navigation.navigate('EditProfileScreen')}
          >
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={tw`ml-2 text-black text-base`}>Editar perfil</Text>
          </TouchableOpacity>

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

        <Text style={tw`text-lg font-bold mt-5 mb-2 text-black`}>Acciones</Text>
        <View style={tw`bg-[rgba(255,255,255,0.7)] rounded-xl py-2`}>
          <TouchableOpacity 
            style={tw`flex-row items-center py-3 px-2 border-b border-[rgba(0,0,0,0.2)]`}
          >
            <Ionicons name="person-add-outline" size={24} color="black" />
            <Text style={tw`ml-2 text-black text-base`}>Añadir cuenta</Text> 
          </TouchableOpacity>
          <TouchableOpacity 
            style={tw`flex-row items-center py-3 px-2`}
            onPress={() => {
              Alert.alert(
                "Cerrar sesión",
                "¿Estás seguro que quieres cerrar sesión?",
                [
                  { text: "Cancelar", style: 'cancel' },
                  { text: "Aceptar", onPress: handleLogout }
                ],
                { cancelable: false }
              );
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="black" />
            <Text style={tw`ml-2 text-black text-base`}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
