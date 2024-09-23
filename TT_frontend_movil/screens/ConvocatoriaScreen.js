import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; 

const { height: screenHeight } = Dimensions.get('window');

const ConvocatoriaScreen = () => {
  // Estados para controlar la visibilidad de cada sección
  const [showRequisitos, setShowRequisitos] = useState(false);
  const [showFechas, setShowFechas] = useState(false);
  const [showCriterios, setShowCriterios] = useState(false);

  return (
    <ScrollView contentContainerStyle={tw`flex-grow`}>
      <ImageBackground 
        source={require('../assets/images/fondo.jpg')} 
        style={tw`flex-1 w-full h-full`}
        resizeMode="cover"
      >
        <View style={tw`p-5`}>
          <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
            <Text style={tw`text-2xl font-bold text-black`}>¿En qué consiste la convocatoria?</Text>
            <Ionicons name="megaphone-outline" size={40} color="black" style={tw`ml-2`} />
          </View>

          <Text style={tw`text-lg text-black mb-5 text-justify`}>
            La Promoción Docente busca reconocer y premiar el esfuerzo de los docentes del IPN.
            Su objetivo es ayudarte a crecer profesionalmente, avanzando en tu carrera académica,
            y mejorar la calidad educativa a través de la actualización constante y la innovación
            en tu enseñanza. En pocas palabras, es una oportunidad para desarrollarte y ser valorado
            por tus contribuciones al instituto.
          </Text>

          <Image 
            source={require('../assets/images/convo_1.webp')} 
            style={tw`w-38 h-38 self-center my-5`} 
            resizeMode="contain" 
          />

          <Text style={tw`text-xl text-black my-5 text-justify`}>
            Si es tu primer contacto con este proceso, estos son los puntos más importantes que debes tomar en cuenta:
          </Text>

          <View style={tw`flex-row items-center mt-5`}>
            <Image 
              source={require('../assets/images/covo_calendar.png')} 
              style={tw`w-10 h-10 mr-3`} 
              resizeMode="contain" 
            />
            <Text style={tw`text-base text-black flex-1 text-justify`}>
              La Dirección General del IPN emite la convocatoria de promoción cada año antes del primer día hábil de enero
            </Text>
          </View>

          {/* Botón para mostrar/ocultar Requisitos */}
          <TouchableOpacity style={tw`flex-row items-center justify-between mt-5`} onPress={() => setShowRequisitos(!showRequisitos)}>
            <Text style={tw`text-lg text-blue-500`}>Requisitos</Text>
            <Icon
              name={showRequisitos ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="blue"
            />
          </TouchableOpacity>
          <Animatable.View
            animation={showRequisitos ? 'fadeInDown' : 'fadeOutUp'}
            duration={500}
            style={tw`${showRequisitos ? 'flex' : 'hidden'} mt-2 pl-3`}
          >
            {showRequisitos && (
              <View style={tw`flex-row items-start mt-2`}>
                <Ionicons name="clipboard-outline" size={24} color="blue" style={tw`mr-2 mt-1`} />
                <View style={tw`flex-1`}>
                  <Text>1. Tener plaza en propiedad.</Text>
                  <Text>2. Tener una categoría académica definitiva.</Text>
                  <Text>3. Haber laborado en la categoría actual por al menos dos años.</Text>
                  <Text>4. Cumplir con la carga académica establecida en el Reglamento de las Condiciones Interiores de Trabajo del Personal Académico.</Text>
                  <Text>5. Demostrar méritos académicos obtenidos después del último comunicado oficial de categoría.</Text>
                  <Text>6. Presentar documentos probatorios, como constancias de validación o registro de proyectos de investigación.</Text>
                </View>
              </View>
            )}
          </Animatable.View>

          {/* Botón para mostrar/ocultar Fechas Importantes */}
          <TouchableOpacity style={tw`flex-row items-center justify-between mt-5`} onPress={() => setShowFechas(!showFechas)}>
            <Text style={tw`text-lg text-blue-500`}>Fechas Importantes</Text>
            <Icon
              name={showFechas ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="blue"
            />
          </TouchableOpacity>
          <Animatable.View
            animation={showFechas ? 'fadeInDown' : 'fadeOutUp'}
            duration={500}
            style={tw`${showFechas ? 'flex' : 'hidden'} mt-2 pl-3`}
          >
            {showFechas && (
              <View style={tw`flex-row items-start mt-2`}>
                <Ionicons name="calendar-outline" size={24} color="blue" style={tw`mr-2 mt-1`} />
                <View style={tw`flex-1`}>
                  <Text>• Inicio de convocatoria: 17 de enero de 2024</Text>
                  <Text>• Cierre de solicitud: 19 de febrero de 2024</Text>
                  <Text>• Publicación de resultados: 26 de abril de 2024</Text>
                  <Text>• Publicación de reconsideración: 30 de mayo de 2024</Text>
                </View>
              </View>
            )}
          </Animatable.View>

          {/* Botón para mostrar/ocultar Criterios de Selección */}
          <TouchableOpacity style={tw`flex-row items-center justify-between mt-5`} onPress={() => setShowCriterios(!showCriterios)}>
            <Text style={tw`text-lg text-blue-500`}>Criterios de Selección</Text>
            <Icon
              name={showCriterios ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="blue"
            />
          </TouchableOpacity>

          <Animatable.View
            animation={showCriterios ? 'fadeInDown' : 'fadeOutUp'}
            duration={500}
            style={tw`${showCriterios ? 'flex' : 'hidden'} mt-2 pl-3`}
          >
            {showCriterios && (
              <View style={tw`mt-2`}>
                <Text style={tw`mt-2`}>
                  1. La promoción del personal académico se realizará conforme a lo establecido en el RCITPAIPN, el RPDIPN y 
                  los Puntos de Acuerdo suscritos por la Comisión Central Mixta Paritaria de Promoción Docente (CCMPPD).
                </Text>
                <Text style={tw`mt-2`}>
                  2. Las opciones para obtener la promoción son:
                  {'\n'}- Por acumulación de 100 Unidades de Promoción (U.P.) en el desarrollo de diversas funciones.
                  {'\n'}- Por obtención de un nivel o grado académico.
                </Text>
                <Text style={tw`mt-2`}>
                  3. Para comprobar las actividades declaradas en su solicitud, deberán respaldarse con la documentación probatoria y, 
                  en su caso, contar con la validación correspondiente.
                </Text>
                <Text style={tw`mt-2`}>
                  4. Las actividades declaradas en la solicitud de promoción no deben haberse incluido en procesos anteriores.
                </Text>
                <Text style={tw`mt-2`}>
                  5. La calificación de los méritos deberá efectuarse por cuerpos colegiados con un criterio explícito.
                </Text>
                <Text style={tw`mt-2`}>
                  6. La integración de la Comisión de Promoción Docente (CPD) y los Jurados Calificadores (JC) se realizará de acuerdo 
                  a la normatividad aplicable.
                </Text>
                <Text style={tw`mt-2`}>
                  7. Los documentos registrados en el Sistema Institucional del Personal Académico (SIPAC) son responsabilidad única 
                  del personal académico participante.
                </Text>
                <Text style={tw`mt-2`}>
                  8. La Dirección de Capital Humano será el área encargada de coordinar y organizar las actividades contempladas.
                </Text>
              </View>
            )}
          </Animatable.View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default ConvocatoriaScreen;
