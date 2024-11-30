import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import CalendarScreen from './CalendarScreen';
import FilesScreen from './FilesScreen';
import ProjectionStackNavigator from './ProjectionStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const [filesKey, setFilesKey] = React.useState(0);

  const handleFilesTabPress = () => {
    // Cambiar la clave para forzar la recarga del componente
    setFilesKey(prevKey => prevKey + 1);
  };

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
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ tabBarLabel: 'Calendario' }}
      />
      <Tab.Screen
        name="Files"
        component={() => <FilesScreen key={filesKey} />} // Pasar la clave única
        options={{ tabBarLabel: 'Documentos' }}
        listeners={{
          tabPress: handleFilesTabPress, // Ejecutar la recarga en el evento tabPress
        }}
      />
      <Tab.Screen
        name="Projection"
        component={ProjectionStackNavigator}
        options={{ tabBarLabel: 'Proyección' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}
