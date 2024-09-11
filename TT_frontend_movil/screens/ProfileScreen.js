import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  

const ProfileScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >

    <TouchableOpacity 
      style={styles.settingsIcon} 
      onPress={() => navigation.navigate('Settings')} // Navegar a la pantalla de Settings
    >
      <Ionicons name="settings-outline" size={40} color="#000" />
    </TouchableOpacity>


      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={100} color="#000" />
        <Text style={styles.userName}>Usuario</Text>
      </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem}
          onPress={() => navigation.navigate('OfficialLinksScreen')}
         >
          <Ionicons name="link-outline" size={40} color="#fff" />
          <Text style={styles.gridText}>Enlaces oficiales</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}
          onPress={() => navigation.navigate('ProjectScreen')}
        >
          <Ionicons name="people-outline" size={40} color="#fff" />
          <Text style={styles.gridText}>Nuestro proyecto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}
          onPress={() => navigation.navigate('ConvocatoriaScreen')}
        >
          <Ionicons name="megaphone-outline" size={40} color="#fff" />
          <Text style={styles.gridText}>Convocatoria</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => navigation.navigate('MoreInfo')} // Navigate to MoreInfoScreen
        >
          <Ionicons name="information-circle-outline" size={40} color="#fff" />
          <Text style={styles.gridText}>Más información</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.gridItem}>
          <Ionicons name="log-out-outline" size={40} color="#fff" />
          <Text style={styles.gridText}>Cerrar sesión</Text>
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
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,  
    zIndex: 1,  
  },
  header: {
    alignItems: 'center',
    marginTop: 80, 
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
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

export default ProfileScreen;

