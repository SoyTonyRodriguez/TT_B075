import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OfficialLinksScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >

      <TouchableOpacity 
        style={styles.backIcon} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* Título de la pantalla */}
      <Text style={styles.headerText}>Enlaces oficiales</Text>

      {/* Grid de enlaces */}
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem}>
          <Ionicons name="link-outline" size={40} color="#fff" />
          <Text style={styles.gridText}>Convocatoria 2024</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Ionicons name="link-outline" size={40} color="#fff" />
          <Text style={styles.gridText}>Reglamento promoción</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Ionicons name="link-outline" size={40} color="#fff" />
          <Text style={styles.gridText}>Cronograma 2024</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Ionicons name="link-outline" size={40} color="#fff" />
          <Text style={styles.gridText}>Valoración de actividades</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  headerText: {
    fontSize: 28, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  gridItem: {
    width: 150, 
    height: 150, 
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  gridText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
