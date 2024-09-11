import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import News1Screen from './News1Screen';  
import News2Screen from './News2Screen';
import News3Screen from './News3Screen';
import News4Screen from './News4Screen';
import News5Screen from './News5Screen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Pantalla principal del Home */}
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      
      {/* Pantallas de noticias */}
      <Stack.Screen 
        name="News1Screen" 
        component={News1Screen} 
        options={{ 
            headerShown: false,
            presentation: 'transparentModal', 
            gestureEnabled: true,
            cardStyle: { backgroundColor: 'transparent' }, 
        }}
      />
      <Stack.Screen 
        name="News5Screen" 
        component={News5Screen} 
        options={{ 
            headerShown: false,
            presentation: 'transparentModal', 
            gestureEnabled: true,
            cardStyle: { backgroundColor: 'transparent' }, 
        }}
      />
      <Stack.Screen 
        name="News2Screen" 
        component={News2Screen} 
        options={{ 
            headerShown: false,
            presentation: 'transparentModal',
            gestureEnabled: true, 
            cardStyle: { backgroundColor: 'transparent' }, 
        }}
      />
      <Stack.Screen 
        name="News3Screen" 
        component={News3Screen} 
        options={{ 
            headerShown: false,
            presentation: 'transparentModal', 
            gestureEnabled: true, 
            cardStyle: { backgroundColor: 'transparent' }, 
        }}
      />
      <Stack.Screen 
        name="News4Screen" 
        component={News4Screen} 
        options={{ 
            headerShown: false,
            presentation: 'transparentModal', 
            gestureEnabled: true, 
            cardStyle: { backgroundColor: 'transparent' }, 
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
