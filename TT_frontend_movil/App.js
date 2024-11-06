import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RecuperarCuentaScreen from './screens/RecuperarCuentaScreen';
import HomeScreen from './screens/HomeScreen';
import MainTabNavigator from './screens/MainTabNavigator';
import SettingsScreen from './screens/SettingsScreen';
import OfficialLinksScreen from './screens/OfficialLinksScreen';
import MoreInfoScreen from './screens/MoreInfoScreen';
import ProjectionCreationScreen from './screens/ProjectionCreationScreen';
import ProjectScreen from './screens/ProjectScreen';
import UnidadesPromocion from './screens/UnidadesPromocion';
import KanbanBoard from './screens/KanbanBoard';
import FilesScreen from './screens/FilesScreen';
import PDFViewer from './screens/PDFViewer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView className="flex-auto">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          {/* Aquí van las pantallas de autenticación */}
          <Stack.Screen name="Home" component={Login} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> 
          <Stack.Screen name="RecuperarCuenta" component={RecuperarCuentaScreen} options={{ headerShown: false }} />
          
          {/* Aquí está el Tab Navigator */}
          <Stack.Screen name="HomeScreen" component={MainTabNavigator} />
          
          {/* Pantallas adicionales de la navegacion Home (solo es prueba) */}
          <Stack.Screen name="FilesScreen" component={FilesScreen} />

          {/* Pantallas adicionales de la navegacion Proyección */}
          <Stack.Screen name="ProjectionCreationScreen" component={ProjectionCreationScreen} />
          <Stack.Screen name="UnidadesPromocion" component={UnidadesPromocion} />
          
          

          {/* Pantallas adicionales de la navegacion Perfil */}
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="OfficialLinksScreen" component={OfficialLinksScreen} />
          <Stack.Screen name="MoreInfo" component={MoreInfoScreen} />
          <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
          <Stack.Screen name="PDFViewer" component={PDFViewer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


