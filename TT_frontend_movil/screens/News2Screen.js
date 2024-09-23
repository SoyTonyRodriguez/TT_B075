import React, { useRef } from 'react';
import { View, Text, Image, Animated, PanResponder, ScrollView } from 'react-native';
import tw from 'twrnc'; 

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
          opacityAnim.setValue(1 - gestureState.dy / 300); 
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
    <View style={tw`flex-1 justify-end bg-[rgba(0,0,0,0.3)]`}>
      <Animated.View
        style={[
          tw`bg-[rgba(15,32,39,0.9)] p-5 rounded-t-3xl`,
          {
            transform: [{ translateY: bounceAnim }],
            opacity: opacityAnim,
            height: '75%', 
          },
        ]}
        {...panResponder.panHandlers} // Asigna el panResponder al Animated.View
      >
        {/* "Handle" para indicar que se puede deslizar */}
        <View style={tw`w-18 h-2 rounded-lg bg-gray-400 self-center mb-2`} />

        {/* ScrollView para permitir el desplazamiento del contenido */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Contenido de la noticia */}
          <Image 
            source={require('../assets/images/sistema.jpg')} 
            style={tw`w-full h-50 rounded-lg`} 
          />
          <Text style={tw`text-justify text-base text-[#d0e1ff] my-5`}>
            La Promoción Docente en el IPN es tu oportunidad para brillar. Cada clase que impartes, 
            cada investigación que desarrollas, te acerca más a nuevas metas. ¡Es momento de 
            reconocer tu esfuerzo y avanzar en tu camino profesional! No solo creces tú, crecemos 
            todos. Tu dedicación merece ser recompensada. ¡Participa y sigue construyendo el futuro!
          </Text>
        </ScrollView>
        
      </Animated.View>
    </View>
  );
};

export default News1Screen;

