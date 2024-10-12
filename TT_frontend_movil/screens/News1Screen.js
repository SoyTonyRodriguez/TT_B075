import React, { useRef } from 'react';
import { View, Text, Image, Animated, PanResponder, Dimensions, ScrollView } from 'react-native';
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
        <View style={tw`w-18 h-2 rounded bg-gray-400 self-center mb-2`} />

        {/* ScrollView para contenido desplazable */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Contenido de la noticia */}
          <Image 
            source={require('../assets/images/ipn-main.webp')} 
            style={tw`w-full h-50 rounded-lg`} 
          />
          <Text style={tw`text-justify text-base text-[#d0e1ff] my-5`}>
            El Instituto Politécnico Nacional (IPN) tiene un sistema de promoción para su personal académico y de apoyo que reconoce y recompensa la excelencia en desempeño y trayectoria, especialmente en áreas académicas y de investigación. Este proceso se rige por normativas internas y acuerdos de la Comisión Central Mixta Paritaria de Promoción Docente.
          </Text>
          
          <Text style={tw`text-justify text-base text-[#d0e1ff] my-5`}>
            Para ascender, los empleados deben acumular Unidades de Promoción, logradas a través de la enseñanza, investigación, actividades de extensión o logros académicos, conforme a los estándares y puntos definidos por el Reglamento Interno de las Condiciones Interiores de Trabajo del Personal Académico (RCITAIPN), artículos y anexos del Reglamento de Promoción Docente (RPDIPN) y los acuerdos suscritos por la Comisión Central Mixta Paritaria de Promoción Docente (CCMPPD).
          </Text>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default News1Screen;
