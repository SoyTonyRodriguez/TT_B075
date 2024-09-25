import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const RecuperarCuentaScreen = () => {
  const [email, setEmail] = useState("");

  return (
    <ImageBackground 
      source={require('../assets/images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Recupera tu cuenta</Text>
        <Ionicons name="person-outline" size={28} color="black" style={{ marginLeft: 8 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.instructions}>Introduce los datos solicitados</Text>
        <View style={styles.line} />
        <TextInput 
          placeholder="Ingresa tu correo electrónico"
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.instructions}>
          Te enviaremos un correo con indicaciones para restablecer tu contraseña
        </Text>
        <TouchableOpacity style={styles.recoverButton}>
          <Text style={styles.recoverButtonText}>Recuperar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 60, 
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10, 
    textAlign: 'left',
    width: '100%',
  },
  line: {
    height: 1,
    backgroundColor: '#003366',
    marginBottom: 60, 
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#003366', 
    borderBottomWidth: 2,
    borderRadius: 10,
    marginBottom: 60,
    fontSize: 16,
    backgroundColor: 'transparent', 
  },
  recoverButton: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 60, 
  },
  recoverButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RecuperarCuentaScreen;
