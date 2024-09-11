import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProjectionScreen from './ProjectionScreen';  
import ProjectionCreationScreen from './ProjectionCreationScreen';  
import UnidadesPromocion from './UnidadesPromocion'

const ProjectionStack = createStackNavigator();

const ProjectionStackNavigator = () => {
  return (
    <ProjectionStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Pantalla Principal de Proyección */}
      <ProjectionStack.Screen 
        name="ProjectionScreen" 
        component={ProjectionScreen} 
      />

      {/* Pantalla para Crear Proyección */}
      <ProjectionStack.Screen 
        name="ProjectionCreationScreen" 
        component={ProjectionCreationScreen} 
      />

      <ProjectionStack.Screen 
        name="UnidadesPromocion" 
        component={UnidadesPromocion} 
      />
    </ProjectionStack.Navigator>
  );
};

export default ProjectionStackNavigator;
