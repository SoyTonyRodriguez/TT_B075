import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; // Importamos twrnc para usar Tailwind

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
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-1 justify-center px-5`}>

        {/* Header */}
        <View style={tw`absolute top-10 left-5`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-2xl font-bold text-black`}>Regístrate</Text>
            <Ionicons name="person-outline" size={30} color="black" style={tw`ml-2`} />
          </View>
          <Text style={tw`text-lg text-gray-500 mt-2`}>Introduce los datos solicitados</Text>
          <View style={tw`h-0.5 bg-black mt-3 mb-5`} />
        </View>

        {/* Form Fields */}
        <TextInput 
          placeholder="Ingresa tu nombre completo"
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={(value) => handleInputChange('name', value)}
        />

        <TextInput 
          placeholder="Ingresa tu correo electrónico"
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          keyboardType="email-address"
          onChangeText={(value) => handleInputChange('email', value)}
        />

        <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center`}>
          <Text style={tw`${form.category ? "text-black" : "text-gray-500"}`}>
            {form.category || "Selecciona tu categoría"}
          </Text>
          <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
        </TouchableOpacity>

        <TextInput 
          placeholder="Ingresa tu número de empleado"
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange('employeeNumber', value)}
        />

        <View style={tw`relative w-full mb-3`}>
          <TextInput 
            placeholder="Contraseña"
            style={tw`w-full p-4 border border-gray-700 rounded-lg text-base bg-transparent text-black`}
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            secureTextEntry={!passwordVisible}
            onChangeText={(value) => handleInputChange('password', value)}
          />
          <TouchableOpacity 
            style={tw`absolute right-4 top-4`} 
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons 
              name={passwordVisible ? "eye-off" : "eye"} 
              size={24} 
              color="rgba(0, 0, 0, 0.8)" 
            />
          </TouchableOpacity>
        </View>

        <View style={tw`relative w-full mb-5`}>
          <TextInput 
            placeholder="Confirma tu contraseña"
            style={tw`w-full p-4 border border-gray-700 rounded-lg text-base bg-transparent text-black`}
            placeholderTextColor="rgba(0, 0, 0, 0.8)"
            secureTextEntry={!confirmPasswordVisible}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
          />
          <TouchableOpacity 
            style={tw`absolute right-4 top-4`} 
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
          style={tw`bg-[#003366] p-4 rounded-lg items-center mt-8 mb-10`}
          onPress={handleRegister}
        >
          <Text style={tw`text-white font-bold text-lg`}>Ingresar</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          visible={categoryModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
            <View style={tw`w-4/5 bg-white rounded-lg p-5`}>
              <FlatList 
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={tw`py-3 border-b border-gray-300`} onPress={() => selectCategory(item)}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={tw`mt-5 items-center`} onPress={() => setCategoryModalVisible(false)}>
                <Text style={tw`text-blue-700 text-base`}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;
