import * as React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
          <Ionicons name="home" size={40} color="black" style={styles.homeIcon}/>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/images/ipn-main.webp')}
            style={styles.image}
          />
          <Text style={styles.imageText}>Promoción docente en el Instituto Politécnico Nacional</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/images/sistema.jpg')}
            style={styles.image}
          />
          <Text style={styles.imageText}>Sobre este sistema</Text>
        </View>
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
  homeIcon: {
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  imageText: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
});

export default HomeScreen;
