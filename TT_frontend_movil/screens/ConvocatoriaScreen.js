import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Usaremos los íconos de MaterialIcons
import { Ionicons } from '@expo/vector-icons';

// Obtener las dimensiones de la pantalla
const { height: screenHeight } = Dimensions.get('window');

const ConvocatoriaScreen = () => {
  // Estados para controlar la visibilidad de cada sección
  const [showRequisitos, setShowRequisitos] = useState(false);
  const [showFechas, setShowFechas] = useState(false);
  const [showCriterios, setShowCriterios] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <ImageBackground 
        source={require('../assets/images/fondo.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>¿En qué consiste la convocatoria?</Text>
            <Ionicons name="megaphone-outline" size={40} color="black" style={styles.megaphoneIcon}/>
          </View>

          <Text style={styles.description}>
            La Promoción Docente busca reconocer y premiar el esfuerzo de los docentes del IPN.
            Su objetivo es ayudarte a crecer profesionalmente, avanzando en tu carrera académica,
            y mejorar la calidad educativa a través de la actualización constante y la innovación
            en tu enseñanza. En pocas palabras, es una oportunidad para desarrollarte y ser valorado
            por tus contribuciones al instituto.
          </Text>

          <Image 
            source={require('../assets/images/convo_1.webp')} 
            style={styles.image} 
            resizeMode="contain" 
          />

          <Text style={styles.subTitle}>
            Si es tu primer contacto con este proceso, estos son los puntos más importantes que debes tomar en cuenta:
          </Text>

          <View style={styles.row}>
            <Image 
              source={require('../assets/images/covo_calendar.png')} 
              style={styles.icon} 
              resizeMode="contain" 
            />
            <Text style={styles.infoText}>
              La Dirección General del IPN emite la convocatoria de promoción cada año antes del primer día hábil de enero
            </Text>
          </View>

          {/* Botón para mostrar/ocultar Requisitos */}
          <TouchableOpacity style={styles.toggleButton} onPress={() => setShowRequisitos(!showRequisitos)}>
            <Text style={styles.sectionTitle}>Requisitos</Text>
            <Icon
              name={showRequisitos ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="blue"
            />
          </TouchableOpacity>
          <Animatable.View
            animation={showRequisitos ? 'fadeInDown' : 'fadeOutUp'}
            duration={500}
            style={[styles.sectionContent, { display: showRequisitos ? 'flex' : 'none' }]}
          >
            {showRequisitos && (
              <View style={styles.contentWithIcon}>
                <Ionicons name="clipboard-outline" size={24} color="blue" style={styles.iconWithContent} />
                <View style={styles.fullTextContainer}>
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
          <TouchableOpacity style={styles.toggleButton} onPress={() => setShowFechas(!showFechas)}>
            <Text style={styles.sectionTitle}>Fechas Importantes</Text>
            <Icon
              name={showFechas ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="blue"
            />
          </TouchableOpacity>
          <Animatable.View
            animation={showFechas ? 'fadeInDown' : 'fadeOutUp'}
            duration={500}
            style={[styles.sectionContent, { display: showFechas ? 'flex' : 'none' }]}
          >
            {showFechas && (
              <View style={styles.contentWithIcon}>
                <Ionicons name="calendar-outline" size={24} color="blue" style={styles.iconWithContent} />
                <View style={styles.fullTextContainer}>
                  <Text>• Inicio de convocatoria: 01 de marzo de 2024</Text>
                  <Text>• Cierre de inscripción: 30 de abril de 2024</Text>
                  <Text>• Publicación de resultados: 15 de mayo de 2024</Text>
                </View>
              </View>
            )}
          </Animatable.View>

          {/* Botón para mostrar/ocultar Criterios de Selección */}
          <TouchableOpacity style={styles.toggleButton} onPress={() => setShowCriterios(!showCriterios)}>
            <Text style={styles.sectionTitle}>Criterios de Selección</Text>
            <Icon
              name={showCriterios ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="blue"
            />
          </TouchableOpacity>
          <Animatable.View
            animation={showCriterios ? 'fadeInDown' : 'fadeOutUp'}
            duration={500}
            style={[styles.sectionContent, { display: showCriterios ? 'flex' : 'none' }]}
          >
            {showCriterios && (
              <View style={styles.contentWithIcon}>
                <Ionicons name="checkmark-circle-outline" size={24} color="blue" style={styles.iconWithContent} />
                <View style={styles.fullTextContainer}>
                  <Text>• Desempeño académico.</Text>
                  <Text>• Experiencia laboral relevante.</Text>
                  <Text>• Otros criterios especificados en la convocatoria.</Text>
                </View>
              </View>
            )}
          </Animatable.View>

        </View>
      </ImageBackground>
    </ScrollView>
  );
};

// Estilos
const styles = {
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
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
  megaphoneIcon: {
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  infoText: {
    flexShrink: 1,
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'blue',
  },
  sectionContent: {
    marginTop: 10,
    paddingLeft: 10,
  },
  contentWithIcon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  iconWithContent: {
    marginRight: 10,
    marginTop: 5,
  },
  fullTextContainer: {
    flexShrink: 1,
    flex: 1,
  }
};

export default ConvocatoriaScreen;
