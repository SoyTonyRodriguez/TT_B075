import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: '',
    employeeNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const categories = [
    "Técnico Docente de Asignatura A",
    "Técnico Docente de Asignatura B",
    "Técnico Docente Auxiliar A",
    "Técnico Docente Auxiliar B",
    "Técnico Docente Auxiliar C",
    "Técnico Docente Asociado A",
    "Técnico Docente Asociado B",
    "Técnico Docente Asociado C",
    "Técnico Docente Titular A",
    "Profesor de Asignatura A",
    "Profesor Asistente A",
    "Profesor Asistente B",
    "Profesor Asistente C",
    "Profesor Asociado A",
    "Profesor Asociado B",
    "Profesor Asociado C",
    "Profesor Titular A",
    "Profesor Titular B"
  ];

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = () => {
    console.log("Datos del formulario:", form);
  };

  const selectCategory = (category) => {
    handleInputChange('category', category);
    setCategoryModalVisible(false);
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fondologin.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Regístrate</Text>
          <Ionicons name="person-outline" size={24} color="black" style={{ marginLeft: 5 }} />
        </View>
        <Text style={styles.subtitle}>Introduce los datos solicitados</Text>

        <TextInput 
          placeholder="Ingresa tu nombre completo"
          style={styles.input}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => handleInputChange('name', value)}
        />

        <TextInput 
          placeholder="Ingresa tu correo electrónico"
          style={styles.input}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          keyboardType="email-address"
          onChangeText={(value) => handleInputChange('email', value)}
        />

        <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={styles.input}>
          <Text style={{ color: form.category ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.8)" }}>
            {form.category || "Selecciona tu categoría"}
          </Text>
          <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" style={styles.iconRight} />
        </TouchableOpacity>

        <TextInput 
          placeholder="Ingresa tu número de empleado"
          style={styles.input}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange('employeeNumber', value)}
        />

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Contraseña"
            style={styles.input}
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            secureTextEntry={!passwordVisible}
            onChangeText={(value) => handleInputChange('password', value)}
          />
          <TouchableOpacity 
            style={styles.iconContainer} 
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons 
              name={passwordVisible ? "eye-off" : "eye"} 
              size={24} 
              color="rgba(0, 0, 0, 0.8)" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Confirma tu contraseña"
            style={styles.input}
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            secureTextEntry={!confirmPasswordVisible}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
          />
          <TouchableOpacity 
            style={styles.iconContainer} 
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Ionicons 
              name={confirmPasswordVisible ? "eye-off" : "eye"} 
              size={24} 
              color="rgba(0, 0, 0, 0.8)" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <Modal
          visible={categoryModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList 
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => selectCategory(item)}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setCategoryModalVisible(false)}>
                <Text style={styles.modalCloseText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: 'transparent', 
    color: 'rgba(0, 0, 0, 0.8)'
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 10
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  iconRight: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  button: {
    backgroundColor: '#1E40AF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 80, 
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  modalCloseButton: {
    marginTop: 20,
    alignItems: 'center'
  },
  modalCloseText: {
    color: 'blue',
    fontSize: 16
  }
});

export default RegisterScreen;
