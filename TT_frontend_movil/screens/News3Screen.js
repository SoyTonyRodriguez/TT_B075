import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, PanResponder } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const News1Screen = ({ navigation }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      // Se llama cuando el usuario comienza el gesto
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // Controla el movimiento del gesto
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) { 
          bounceAnim.setValue(gestureState.dy);
          opacityAnim.setValue(1 - gestureState.dy / 300); // Cambia la opacidad según el deslizamiento
        }
      },
      // Cuando el gesto termina
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 150) { 
          Animated.parallel([
            Animated.spring(bounceAnim, {
              toValue: 300,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => navigation.goBack());
        } else {
          // Si no se desliza lo suficiente, regresa a su posición original
          Animated.parallel([
            Animated.spring(bounceAnim, {
              toValue: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.modalContent,
          {
            transform: [{ translateY: bounceAnim }],
            opacity: opacityAnim,
          },
        ]}
        {...panResponder.panHandlers} // Asigna el panResponder al Animated.View
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.8)', 'rgba(1, 1, 1, 0.8)']}
          style={styles.modalContent}
        >
          {/* "Handle" para indicar que se puede deslizar */}
          <View style={styles.handle} />

          {/* Contenido de la noticia */}
          <Image 
            source={require('../assets/images/sistema.jpg')} 
            style={styles.image} 
          />
          <Text style={styles.newsText}>
          Este sitio junto con su versión móvil tienen el propósito de guiar y asistir a los docentes en su proceso
          de promoción académica con funciones y acceso a la información de una manera más cómoda y visual.
          </Text>
        
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fondo general translúcido para ver el fondo de la pantalla previa
    },
    handle: {
      width: 70,
      height: 7,
      borderRadius: 5,
      backgroundColor: '#DDA0DD', // Morado suave para combinar con el fondo
      alignSelf: 'center',
      marginBottom: 10,
    },
    modalContent: {
      padding: 20,
      borderRadius: 20, // Bordes redondeados en todas las esquinas
      overflow: 'hidden', // Para evitar que el contenido sobresalga de los bordes
      backdropFilter: 'blur(15px)', // Efecto difuminado suave
      borderWidth: 1,
      borderColor: 'rgba(147, 112, 219, 0.3)', // Un borde morado claro para más detalle
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
    },
    newsText: {
      fontSize: 16,
      color: '#F0FFFF', // Azul claro que combina con el fondo sin ser tan intenso
      marginVertical: 20,
    },
  });
  

export default News1Screen;

