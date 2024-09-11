import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, PanResponder } from 'react-native';

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
        {/* "Handle" para indicar que se puede deslizar */}
        <View style={styles.handle} />

        {/* Contenido de la noticia */}
        <Image 
          source={require('../assets/images/sistema.jpg')} 
          style={styles.image} 
        />
        <Text style={styles.newsText}>
        El Instituto Politécnico Nacional (IPN) tiene un sistema de promoción para su personal académico y de apoyo que reconoce y recompensa la excelencia en desempeño y trayectoria, 
        especialmente en áreas académicas y de investigación. Este proceso se rige por normativas internas y acuerdos de la Comisión Central Mixta Paritaria de Promoción Docente.
        </Text>
        
        <Text style={styles.newsText}>
        Para ascender, los empleados deben acumular Unidades de Promoción, logradas a través de la enseñanza, investigación, actividades de extensión o logros académicos, conforme a 
        los estándares y puntos definidos por el Reglamento Interno de las Condiciones Interiores de Trabajo del Personal Académico (RCITAIPN), artículos y anexos del Reglamento de 
        Promoción Docente (RPDIPN) y los acuerdos suscritos por la Comisión Central Mixta Paritaria de Promoción Docente (CCMPPD).
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fondo semitransparente para permitir ver la pantalla previa
  },
  handle: {
    width: 70,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#C0C0C0', // Plata suave, sutil pero visible
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: 'rgba(15, 32, 39, 0.9)', // Azul marino oscuro elegante y con transparencia
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  newsText: {
    fontSize: 16,
    color: '#d0e1ff', // Un gris claro para un look elegante sin ser un blanco puro
    marginVertical: 20,
  },
});

export default News1Screen;
