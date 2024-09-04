import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import FilesScreen from './FilesScreen';
import ProjectionScreen from './ProjectionScreen';
import ProfileStackNavigator from './ProfileStackNavigator';  // Importa el nuevo ProfileStackNavigator

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,  
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Files') {
            iconName = focused ? 'document' : 'document-outline';
          } else if (route.name === 'Projection') {
            iconName = focused ? 'eye' : 'eye-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }


          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: { height: 60, paddingBottom: 10 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Inicio' }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ tabBarLabel: 'Calendario' }} />
      <Tab.Screen name="Files" component={FilesScreen} options={{ tabBarLabel: 'Documentos' }} />
      <Tab.Screen name="Projection" component={ProjectionScreen} options={{ tabBarLabel: 'Proyección' }} />
      {/* Aquí se usa el nuevo Stack Navigator para Profile */}
      <Tab.Screen name="Profile" component={ProfileStackNavigator} options={{ tabBarLabel: 'Perfil' }} />

    </Tab.Navigator>
  );
}
