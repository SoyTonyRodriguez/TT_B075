import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  

const ProjectionScreen = () => {
  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')}  
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Proyección y seguimiento</Text>
        <Ionicons name="eye-outline" size={40} color="#000" style={styles.eyeIcon} />
      </View>

      {/* Contenido de la pantalla */}
      <View style={styles.gridContainer}>
        {/* Opción Crear Proyección */}
        <TouchableOpacity style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="pencil-outline" size={50} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.gridText}>Crear proyección</Text>
            <Text style={styles.gridDescription}>Inicia una proyección en cualquiera de las dos modalidades disponibles</Text>
          </View>
        </TouchableOpacity>

        {/* Opción Ver mi Proyección */}
        <TouchableOpacity style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="glasses-outline" size={50} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.gridText}>Ver mi proyección</Text>
            <Text style={styles.gridDescription}>Ve todos los detalles de tu proyección actual</Text>
          </View>
        </TouchableOpacity>

        {/* Opción Guía */}
        <TouchableOpacity style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="help-circle-outline" size={50} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.gridText}>Guía</Text>
            <Text style={styles.gridDescription}>¿No sabes cómo iniciar una proyección? Consulta nuestra guía.</Text>
          </View>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'space-evenly', 
    paddingHorizontal: 10,  
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',  
    borderRadius: 20,
    paddingHorizontal: 40,  
    height: 160,  
  },
  iconContainer: {
    width: 100,  
    height: 100, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  gridText: {
    fontSize: 23,  
    color: '#fff',
    fontWeight: 'bold',
  },
  gridDescription: {
    marginTop: 8,
    fontSize: 16,
    color: '#fff',
  },
});

export default ProjectionScreen;

