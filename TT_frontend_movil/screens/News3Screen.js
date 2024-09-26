import React, { useRef } from 'react';
import { View, Text, Image, Animated, PanResponder, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc'; 

const { height: screenHeight } = Dimensions.get('window'); // Obtén la altura de la pantalla

const News1Screen = ({ navigation }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          bounceAnim.setValue(gestureState.dy);
          opacityAnim.setValue(1 - gestureState.dy / 300);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 150) {
          // Reducir la duración de la animación y el rebote
          Animated.parallel([
            Animated.timing(bounceAnim, {
              toValue: 300,
              duration: 20, // Duración reducida para cierre más rápido
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 20, // Duración reducida para cierre más rápido
              useNativeDriver: true,
            }),
          ]).start(() => navigation.goBack());
        } else {
          // Restaurar la animación sin rebote lento
          Animated.parallel([
            Animated.spring(bounceAnim, {
              toValue: 0,
              useNativeDriver: true,
              speed: 50, // Aumentar la velocidad para que el rebote sea rápido
            }),
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 200,
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
          tw`rounded-t-3xl overflow-hidden`,
          {
            transform: [{ translateY: bounceAnim }],
            opacity: opacityAnim,
            height: screenHeight * 0.75, 
          },
        ]}
        {...panResponder.panHandlers} // Asigna el panResponder al Animated.View
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.8)', 'rgba(1, 1, 1, 0.8)']}
          style={tw`p-5 rounded-t-3xl border border-[rgba(147,112,219,0.3)]`}
        >
          {/* "Handle" para indicar que se puede deslizar */}
          <View style={tw`w-18 h-2 rounded-lg bg-purple-300 self-center mb-2`} />

          {/* ScrollView para permitir el desplazamiento del contenido */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Contenido de la noticia */}
            <Image 
              source={require('../assets/images/sistema.jpg')} 
              style={tw`w-full h-50 rounded-lg`} 
            />
            <Text style={tw`text-justify text-base text-[#F0FFFF] my-5`}>
              Este sitio junto con su versión móvil tienen el propósito de guiar y asistir a los docentes en su proceso
              de promoción académica con funciones y acceso a la información de una manera más cómoda y visual.
            </Text>

            <Text style={tw`text-justify text-base text-[#F0FFFF] my-5`}>
              La Promoción Docente en el IPN es tu oportunidad para brillar. Cada clase que impartes, 
              cada investigación que desarrollas, te acerca más a nuevas metas. ¡Es momento de 
              reconocer tu esfuerzo y avanzar en tu camino profesional! No solo creces tú, crecemos 
              todos. Tu dedicación merece ser recompensada. ¡Participa y sigue construyendo el futuro!
            </Text>
          </ScrollView>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default News1Screen;