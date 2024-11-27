import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import OfficialLinksScreen from './OfficialLinksScreen';
import MoreInfoScreen from './MoreInfoScreen';
import ProjectScreen from './ProjectScreen';
import ConvocatoriaScreen from './ConvocatoriaScreen';
import EditProfileScreen from './EditProfileScreen';
import PrivacyScreen from './PrivacyScreen';
import NotificationScreen from './NotificationScreen';
import PDFViewerScreen from './PDFViewerScreen';

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Pantalla de Perfil */}
      <ProfileStack.Screen 
        name="UserProfile" 
        component={ProfileScreen} 
      />
      {/* Pantalla de Configuración */}
      <ProfileStack.Screen 
        name="Settings" 
        component={SettingsScreen} 
      />

      <ProfileStack.Screen 
        name="EditProfileScreen" 
        component={EditProfileScreen} 
      />

      <ProfileStack.Screen 
        name="OfficialLinksScreen" 
        component={OfficialLinksScreen} 
      />

      <ProfileStack.Screen 
        name="MoreInfo" 
        component={MoreInfoScreen} 
      />

      <ProfileStack.Screen 
        name="ConvocatoriaScreen" 
        component={ConvocatoriaScreen} 
      />

      <ProfileStack.Screen 
        name="ProjectScreen" 
        component={ProjectScreen} 
      />

      <ProfileStack.Screen 
        name="PrivacyScreen" 
        component={PrivacyScreen} 
      />

      <ProfileStack.Screen 
        name="NotificationScreen" 
        component={NotificationScreen} 
      />

      <ProfileStack.Screen 
        name="PDFViewerScreen" 
        component={PDFViewerScreen} 
      />

    </ProfileStack.Navigator>
  );
}
