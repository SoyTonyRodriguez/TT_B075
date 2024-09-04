import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Ícono de regresar */}
        <TouchableOpacity 
          style={styles.backIcon} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.headerText}>Configuración</Text>

        {/* Título fuera del cuadro para la sección de cuenta */}
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <View style={styles.section}>
          <TouchableOpacity style={[styles.option, styles.border]}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.optionText}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, styles.border]}>
            <Ionicons name="shield-outline" size={24} color="black" />
            <Text style={styles.optionText}>Seguridad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, styles.border]}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.optionText}>Notificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <Text style={styles.optionText}>Privacidad</Text>
          </TouchableOpacity>
        </View>

        {/* Título fuera del cuadro para la sección de acciones */}
        <Text style={styles.sectionTitle}>Acciones</Text>
        <View style={styles.section}>
          <TouchableOpacity style={[styles.option, styles.border]}>
            <Ionicons name="flag-outline" size={24} color="black" />
            <Text style={styles.optionText}>Reportar un problema</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, styles.border]}>
            <Ionicons name="person-add-outline" size={24} color="black" />
            <Text style={styles.optionText}>Añadir cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="log-out-outline" size={24} color="black" />
            <Text style={styles.optionText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backIcon: {
    position: 'absolute', 
    top: 45, 
    left: 20, 
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20, 
    marginBottom: 20,
    color: 'black',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
    color: 'black',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)', 
  },
});
