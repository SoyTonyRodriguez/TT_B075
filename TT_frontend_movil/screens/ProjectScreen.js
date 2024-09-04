import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  

const ProjectScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Nuestro proyecto</Text>
          <Ionicons name="people-outline" size={40} color="#000" style={styles.icon} />
        </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentText}>
          Este proyecto fue desarrollado como parte del proceso de titulación por Trabajo Terminal bajo el nombre clave TT-B075 por los alumnos de la Escuela Superior de Cómputo Casaos Tabaco Luis Ángel, García Montiel Gustavo y Rodríguez Flores Antonio.
        </Text>
        <Text style={styles.contentText}>
          Como parte de las limitaciones para este proyecto fue el desarrollo principal sobre plataformas y marcos gratuitos, lo que limita y estandariza este sistema dentro de lo que servicios de este tipo confiere.
        </Text>
        <Text style={styles.contentText}>
          Este proyecto fue presentado el DD/MM/YYYY como parte de la presentación para su evaluación ante el grupo de sinodales cuyo dictamen permite el progreso del desarrollo.
        </Text>
        <Text style={styles.contentText}>
          Toda la documentación técnica sobre las herramientas y marcos de trabajo programáticos se encuentran disponibles en el manual técnico de este sistema.
        </Text>
        <Text style={styles.contentText}>
          El propósito de todo este sistema web junto con su símil para plataformas móviles de android es brindar aplicaciones auxiliares que guíen a los docentes, además de ser gestoras de archivos de índole personal, académica y laboral; deben contar con los enlaces e información relevante sobre cada proceso a seguir dentro del sistema.
        </Text>
      </ScrollView>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 50, 
    paddingHorizontal: 20, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    marginRight: 10,
  },
  contentContainer: {
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    textAlign: 'justify',
  },
});

export default ProjectScreen;
