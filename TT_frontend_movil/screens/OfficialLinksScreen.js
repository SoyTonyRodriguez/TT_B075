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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Más información</Text>
          <Ionicons name="link" size={40} color="#000" style={styles.icon} />
        </View>

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
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly', 
    alignItems: 'center',  
    paddingVertical: 40,  
  },
  gridItem: {
    width: 150, 
    height: 150, 
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80, 
  },
  gridText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
