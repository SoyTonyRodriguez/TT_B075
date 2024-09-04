import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Pantalla de Perfil */}
      <ProfileStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
      {/* Pantalla de Configuración */}
      <ProfileStack.Screen 
        name="Settings" 
        component={SettingsScreen} 
      />
    </ProfileStack.Navigator>
  );
}
