import React, { useRef } from 'react';
import { View, Text, Image, Animated, PanResponder, ScrollView, Dimensions } from 'react-native';
import tw from 'twrnc'; 

const { height: screenHeight } = Dimensions.get('window'); 

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
          tw`bg-[rgba(15,32,39,0.9)] p-5 rounded-t-xl`,
          {
            height: screenHeight * 0.75, 
            transform: [{ translateY: bounceAnim }],
            opacity: opacityAnim,
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
            source={require('../assets/images/convo_2.jpg')} 
            style={tw`w-full h-50 rounded-lg`} 
          />
          <Text style={tw`text-justify text-base text-[#d0e1ff] my-1`}>
            La Promoción Docente en el Instituto Politécnico Nacional (IPN) nace como parte de su compromiso por impulsar el desarrollo académico y reconocer el esfuerzo de su personal. 
            Desde su creación, el IPN ha tenido como objetivo principal la excelencia educativa y la mejora continua de sus docentes. A finales del siglo XX, con la creciente demanda de 
            calidad en la educación superior, el IPN implementó un proceso formal para que los docentes pudieran ascender en su carrera mediante el reconocimiento de sus méritos en 
            docencia, investigación y formación académica.
          </Text>

          <Text style={tw`text-justify text-base text-[#d0e1ff] my-1`}>
            Este proceso fue diseñado para asegurar que los profesores más dedicados y capacitados tuvieran la oportunidad de crecer profesionalmente, fortaleciendo así la calidad 
            educativa del instituto. Con el tiempo, la promoción docente se ha convertido en un pilar fundamental del IPN, garantizando que los esfuerzos y logros de los académicos 
            sean justamente valorados y recompensados, beneficiando tanto a los docentes como a los estudiantes.
          </Text>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default News1Screen;
