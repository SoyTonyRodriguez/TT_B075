import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProjectionScreen from './ProjectionScreen';  
import ProjectionCreationScreen from './ProjectionCreationScreen';  
import UnidadesPromocion from './UnidadesPromocion'
import GradoAcademico from './GradoAcademico';
import GuideScreen from './GuideScreen';
import KanbanBoard from './KanbanBoard';

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

      <ProjectionStack.Screen 
        name="GradoAcademico" 
        component={GradoAcademico} 
      />

      <ProjectionStack.Screen 
        name="GuideScreen" 
        component={GuideScreen} 
      />

      <ProjectionStack.Screen 
        name="KanbanBoard" 
        component={KanbanBoard} 
      />

    </ProjectionStack.Navigator>
  );
};

export default ProjectionStackNavigator;
