import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProjectionCreationScreen = ({ navigation }) => {  // Aquí agregamos 'navigation' como prop
  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Crear proyección</Text>
        <Ionicons name="eye-outline" size={40} color="#000" style={styles.eyeIcon} />
      </View>

      {/* Contenido de la pantalla */}
      <View style={styles.contentContainer}>
        {/* Unidades de Promoción - Evento de clic para navegar */}
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => navigation.navigate('UnidadesPromocion')} // Usamos 'navigation' directamente
        >
          <View style={styles.optionIcon}>
            <Ionicons name="star-outline" size={50} color="#fff" />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Unidades de promoción</Text>
            <Text style={styles.optionDescription}>
              Las Unidades de Promoción (U.P.) son un sistema de reconocimiento al desempeño docente...
            </Text>
          </View>
        </TouchableOpacity>

        {/* Grado Académico */}
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => navigation.navigate('GradoAcademico')} // Usamos 'navigation' directamente
        >
          <View style={styles.optionIcon}>
            <Ionicons name="school-outline" size={50} color="#fff" />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Obtención de grado académico</Text>
            <Text style={styles.optionDescription}>
              La obtención del grado de maestro o doctor concede al académico la promoción al nivel superior...
            </Text>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 20,
  },
  optionIcon: {
    marginRight: 20,
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 20,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionDescription: {
    marginTop: 8,
    fontSize: 16,
    color: '#fff',
  },
});

export default ProjectionCreationScreen;
