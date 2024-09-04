import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const MoreInfoScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}  
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Más información</Text>
          <Ionicons name="information-circle-outline" size={40} color="#000" style={styles.icon} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* First card */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Noticia</Text>
              <Text style={styles.cardSubtitle}>Mario Barbosa</Text>
            </TouchableOpacity>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>¿Conoces las condiciones para que acepten tu promoción?</Text>
              <TouchableOpacity>
                <Text style={styles.readMore}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Second card */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Noticia</Text>
            </TouchableOpacity>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>¿Sabes las condiciones sobre tutorados para ser válidas?</Text>
              <TouchableOpacity>
                <Text style={styles.readMore}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Third card */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Artículo</Text>
              <Text style={styles.cardSubtitle}>Liferay</Text>
            </TouchableOpacity>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Docentes aceptados durante los procesos de años anteriores</Text>
              <TouchableOpacity>
                <Text style={styles.readMore}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Fourth card */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>Base</Text>
              <Text style={styles.cardSubtitle}>Alianza</Text>
            </TouchableOpacity>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Reglamento de promoción docente</Text>
              <TouchableOpacity>
                <Text style={styles.readMore}>Leer →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    container: {
      flex: 1,
      paddingTop: 50, 
      paddingHorizontal: 20, 
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000',
    },
    icon: {
      marginRight: 10,
    },
    scrollContainer: {
      paddingBottom: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    card: {
      width: 170,  
      height: 150,
      backgroundColor: '#003366',
      borderRadius: 15,
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    cardSubtitle: {
      fontSize: 14,
      color: '#ccc',
      textAlign: 'center',
    },
    infoBox: {
      width: 170,   
      height: 150, 
      backgroundColor: '#e0f7fa',
      borderColor: '#00838f',
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',  
      alignItems: 'center',  
    },
    infoText: {
      fontSize: 16,
      color: '#006064',
      textAlign: 'center',
      marginBottom: 10,
    },
    readMore: {
      fontSize: 14,
      color: '#006064',
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
  });
  
  export default MoreInfoScreen;
  