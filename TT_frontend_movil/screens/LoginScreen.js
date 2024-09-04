import React, { useState } from "react";
import { View, Text, TextInput, Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation(); 

  return (
    <ImageBackground 
      source={require('../assets/images/fondologin.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Ionicons name="person-outline" size={28} color="black" />
        </View>
        <Text style={styles.subtitle}>¡Bienvenido de vuelta!</Text>



        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/estudiar.png')}
            style={styles.logo}
          />
        </View>

        <TextInput 
          placeholder="Número de empleado"
          style={[styles.input, styles.transparentInput]}
          placeholderTextColor="#555"
          keyboardType="numeric"
        />
        <View style={styles.passwordContainer}>
          <TextInput 
            placeholder="Contraseña"
            style={[styles.input, styles.transparentInput, styles.passwordInput]}
            placeholderTextColor="#555"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons 
              name={passwordVisible ? "eye-off" : "eye"} 
              size={24} 
              color="#555" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate('RecuperarCuenta')}
        >
          <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('HomeScreen')} 
        >
          <Text style={styles.loginButtonText}>Ingresar</Text>
        </TouchableOpacity>


        <TouchableOpacity>
          <Text style={styles.signUp}>¿No estás registrado? <Text style={styles.signUpBold}>Crear una cuenta</Text></Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 50,
    left: 20, 
    flexDirection: 'row',
  },
  logoContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
    marginBottom: 30,
  },
  logo: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    flexDirection: 'row',
    color: '#000',
    marginTop: 4,
  },
  input: {
    width: '100%',
    padding: 12, 
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    marginBottom: 20, 
    fontSize: 16, 
  },
  transparentInput: {
    backgroundColor: 'rgba(255, 255, 255, 0)', 
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end', 
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#555',
    fontSize: 14, 
  },
  loginButton: {
    backgroundColor: '#003366',
    padding: 15, 
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUp: {
    color: '#555',
  },
  signUpBold: {
    fontWeight: 'bold',
    color: '#000',
  }
});

export default LoginScreen;
