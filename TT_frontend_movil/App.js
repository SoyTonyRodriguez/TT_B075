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
          
          {/* Pantallas adicionales */}
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="OfficialLinksScreen" component={OfficialLinksScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


