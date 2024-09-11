import * as React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
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

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('News1Screen')}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/ipn-main.webp')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Promoción docente en el Instituto Politécnico Nacional.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('News5Screen')}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/convo_2.jpg')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Nacimiento de la promoción docente.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('News2Screen')}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/sistema.jpg')}
              style={styles.image}
            />
            <Text style={styles.imageText}>¡Da el siguiente paso en tu carrera!</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('News3Screen')}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/sistema.jpg')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Sobre este sistema.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('News4Screen')}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/main_3.jpg')}
              style={styles.image}
            />
            <Text style={styles.imageText}>Visita la plataforma oficial.</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
  scrollContainer: {
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
