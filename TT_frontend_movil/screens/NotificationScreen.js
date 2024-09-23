import * as React from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const NotificationScreen = ({ navigation }) => {
  const notifications = [
    { title: "Inicio de Convocatoria", message: "La convocatoria para la promoción docente será publicada el 17 de enero de 2024. Revisa los requisitos.", icon: "notifications-outline" },
    { title: "Cierre de solicitud", message: "Recuerda que tienes hasta el 19 de febrero de 2024 para inscribirte en el proceso de promoción docente.", icon: "calendar-outline" },
    { title: "Publicación de Resultados", message: "26 de abril de 2024.", icon: "calendar-outline" },
    { title: "Publicación de Reconsideración", message: "30 de mayo de 2024.", icon: "calendar-outline" },
    { title: "Solicitud Incompleta", message: "Tu solicitud está incompleta. Faltan documentos.", icon: "alert-circle-outline" },
  ];

  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-1 pt-12 px-5`}>
        <View style={tw`flex-row justify-between items-center mb-5`}>
          <Text style={tw`text-2xl font-bold text-black`}>Notificaciones</Text>
          <Ionicons name="notifications-outline" size={40} color="#000" />
        </View>

        <ScrollView style={tw`px-5`}>
          {notifications.map((notification, index) => (
            <View 
              key={index} 
              style={tw`flex-row items-start mb-5 bg-white p-3 rounded-lg shadow-md`}
            >
              <Ionicons 
                name={notification.icon} 
                size={30} 
                color="#4b5563" 
                style={tw`mr-4`}
              />
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-bold text-black`}>{notification.title}</Text>
                <Text style={tw`text-sm text-gray-700 mt-1`}>{notification.message}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default NotificationScreen;


