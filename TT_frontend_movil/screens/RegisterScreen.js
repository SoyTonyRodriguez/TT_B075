import React, { useState } from "react";
import { View, Text, TextInput, StatusBar, ImageBackground, TouchableOpacity, Modal, ScrollView, Dimensions, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useForm, Controller } from "react-hook-form";
import { createAccount } from "../api/accounts.api"; // Import the API
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen'; // Import the LoadingScreen component

const { width, height } = Dimensions.get('window');

// Helper function to display styled error messages
const renderErrorMessage = (error) => {
  return (
    <View style={tw`flex-row items-center bg-red-100 p-2 rounded-lg mb-4`}>
      <Ionicons name="alert-circle" size={18} color="red" />
      <Text style={tw`ml-2 text-red-700 text-sm`}>{error}</Text>
    </View>
  );
};

const RegisterScreen = (route) => {
  // -_-_-_-_-_ navigation -_-_-_-_-_
  const navigation = useNavigation();

  // -_-_-_-_-_ States -_-_-_-_-_
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [loadingMessage, setLoadingMessage] = useState(""); // Message for LoadingScreen
  const [requirementsModalVisible, setRequirementsModalVisible] = useState(false);
  
  // -_-_-_-_-_ Form -_-_-_-_-_
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      category: '',
      password: '',
      confirmar_password: ''
    }
  });

  // -_-_-_-_-_ Categories -_-_-_-_-_  
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

  // -_-_-_-_-_ Handle Register -_-_-_-_-_
  const handleRegister = async (data) => {
    setLoading(true);  // Set loading to true when request starts

    const password = data.password;
    const confirmPassword = data.confirmar_password;

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      setLoading(false);  // Stop loading if passwords don't match
      return;
    }

    const { confirmar_password, ...accountData } = data;

    try {
      setLoadingMessage("Creando cuenta...");
      const response = await createAccount(accountData);

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Éxito", "Cuenta creada con éxito");
        navigation.navigate("Login");
      } else {
        console.log("Response data:", response.data);
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error response:", error);

      if (error.response) {
        const apiErrors = error.response.data || {};
        const email_Error_str = apiErrors.email ? apiErrors.email.join(', ') : '';

        if (error.response.status === 400) {
          if (apiErrors.email) {
            Alert.alert("Error", email_Error_str || "Hubo un error en la solicitud.");
          } else {
            Alert.alert("Error", "Hubo un error en la solicitud. Verifica los datos ingresados.");
          }
        } else {
          Alert.alert("Error", "Hubo un error al crear la cuenta.");
        }
      } else {
        Alert.alert("Error", "No se pudo conectar con el servidor. Inténtalo más tarde.");
      }
    } finally {
      setLoading(false);  // Stop loading once the request completes
    }
  };

  // -_-_-_-_-_ Select Category -_-_-_-_-_
  const selectCategory = (category) => {
    setValue('category', category, { shouldValidate: true });
    setCategoryModalVisible(false);
  };

  // -_-_-_-_-_ Get Error Message -_-_-_-_-_
  const getErrorMessage = (field) => {
    switch (field) {
      case 'name':
        return "Por favor, ingresa tu nombre completo.";
      case 'email':
        return "Por favor, ingresa un correo electrónico válido.";
      case 'category':
        return "Selecciona una categoría.";
      case 'password':
        return "La contraseña es obligatoria.";
      case 'confirmar_password':
        return "Confirma tu contraseña.";
      default:
        return "";
    }
  };

  // -_-_-_-_-_ Input Style -_-_-_-_-_
  const inputStyle = (hasError) => tw`w-full p-4 border ${hasError ? 'border-red-500' : 'border-gray-700'} rounded-lg text-base bg-transparent text-black mb-4`;

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <ImageBackground source={require('../assets/images/fondologin.jpg')} style={{ width: width, height: height + 30, flex: 1 }} resizeMode="cover">
          {/* Show LoadingScreen with a dynamic message */}
          {loading && <LoadingScreen message={loadingMessage} />}

          <View style={tw`flex-1 justify-center px-5`}>
              <View style={tw`pt-12`}>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-2xl font-bold text-black`}>Regístrate</Text>
                  <Ionicons name="person-outline" size={30} color="black" style={tw`ml-2`} />
                </View>
                <Text style={tw`text-lg text-black mt-2`}>Introduce los datos solicitados</Text>
                <View style={tw`h-0.5 bg-black mt-3 mb-5`} />
              </View>
          </View>

          <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={tw`px-5 mt-6`}>

              {/* Form inputs */}
              <Controller
                control={control}
                name="name"
                rules={{ required: 'El nombre es obligatorio.' }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      placeholder="Ingresa tu nombre completo"
                      style={inputStyle(errors.name)}
                      placeholderTextColor="#555"
                      value={value}
                      onChangeText={onChange}
                    />
                    {errors.name && renderErrorMessage(getErrorMessage('name'))}
                  </>
                )}
              />

              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'El correo electrónico es obligatorio.',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'El formato del correo no es válido.',
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      placeholder="Ingresa tu correo electrónico"
                      style={inputStyle(errors.email)}
                      placeholderTextColor="#555"
                      keyboardType="email-address"
                      value={value}
                      onChangeText={onChange}
                    />
                    {errors.email && renderErrorMessage(getErrorMessage('email'))}
                  </>
                )}
              />

              {/* Category selection */}
              <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={inputStyle(errors.category)}>
                <Controller
                  control={control}
                  name="category"
                  rules={{ required: 'Selecciona una categoría.' }}
                  render={({ field: { value } }) => (
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text style={tw`${value ? "text-black" : "text-gray-500"} flex-1`}>
                        {value || "Selecciona tu categoría"}
                      </Text>
                      <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
                    </View>
                  )}
                />
              </TouchableOpacity>
              {errors.category && renderErrorMessage(getErrorMessage('category'))}

              {/* Password and Confirm Password Inputs */}
              <Controller
                control={control}
                name="password"
                rules={{ required: 'La contraseña es obligatoria.' }}
                render={({ field: { onChange, value } }) => (
                  <View style={tw`relative w-full`}>
                    <TextInput
                      placeholder="Contraseña"
                      style={inputStyle(errors.password)}
                      placeholderTextColor="#555"
                      secureTextEntry={!passwordVisible}
                      value={value}
                      onChangeText={onChange}
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
                    {errors.password && renderErrorMessage(getErrorMessage('password'))}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="confirmar_password"
                rules={{
                  required: 'Confirma tu contraseña.',
                  validate: (value) => value === control._formValues.password || 'Las contraseñas no coinciden.'
                }}
                render={({ field: { onChange, value } }) => (
                  <View style={tw`relative w-full mb-4`}>
                    <TextInput
                      placeholder="Confirma tu contraseña"
                      style={inputStyle(errors.confirmar_password)}
                      placeholderTextColor="#555"
                      secureTextEntry={!confirmPasswordVisible}
                      value={value}
                      onChangeText={onChange}
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
                    {errors.confirmar_password && renderErrorMessage(getErrorMessage('confirmar_password'))}
                  </View>
                )}
              />

              <TouchableOpacity
                style={tw`bg-transparent mt-5`}
                onPress={() => setRequirementsModalVisible(true)}
              >
                <Text style={tw`text-blue-700 text-center text-base`}>
                  Conoce los requisitos para participar en el proceso de promoción docente
                </Text>
              </TouchableOpacity>

              {/* Submit Button */}
              <TouchableOpacity
                style={tw`bg-[#003366] p-4 rounded-lg items-center mt-8 mb-10`}
                onPress={handleSubmit(handleRegister)}
                disabled={loading} // Disable button during loading
              >
                <Text style={tw`text-white font-bold text-lg`}>Ingresar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>

          <Modal visible={requirementsModalVisible} transparent={true} animationType="fade">
            <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
              <View style={tw`w-4/5 bg-white rounded-xl p-6 shadow-2xl`}>
                <Text style={tw`text-xl font-bold text-center mb-4 text-black`}>
                  Requisitos para la Promoción Docente
                </Text>

                <ScrollView style={{ maxHeight: height * 0.4 }}>
                  <Text style={tw`text-base text-justify text-gray-700 mb-2`}>
                    • Poseer plaza en propiedad (en carácter de alta definitiva) de medio, tres cuartos, tiempo completo o con máximo 19 horas de asignatura.
                  </Text>
                  <Text style={tw`text-base text-justify text-gray-700 mb-2`}>
                    • Tener categoría académica dictaminada con carácter definitivo.
                  </Text>
                  <Text style={tw`text-base text-justify text-gray-700 mb-2`}>
                    • Haber laborado en la categoría actual cuando menos dos años.
                  </Text>
                  <Text style={tw`text-base text-justify text-gray-700 mb-2`}>
                    • Cumplir con la carga académica frente a grupo establecida en los artículos 49, 50 y 51 del RCITPAIPN en cada uno de los semestres considerados en el periodo de promoción o contar con excepción parcial o total, según sea el caso, desde la fecha de efectos del último Comunicado Oficial a diciembre de 2023.
                  </Text>
                  <Text style={tw`text-base text-justify text-gray-700 mb-2`}>
                    • La carga académica y/o sus excepciones, los méritos y actividades contemplados en el RPDIPN y Puntos de Acuerdo de la CCMPPD, corresponderán exclusivamente a los semestres declarados en la solicitud, de acuerdo con la opción de promoción seleccionada.
                  </Text>
                </ScrollView>

                <TouchableOpacity
                  style={tw`mt-5 bg-blue-700 py-3 rounded-lg`}
                  onPress={() => setRequirementsModalVisible(false)}
                >
                  <Text style={tw`text-white text-center text-lg`}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Modal de categorías */}
          <Modal visible={categoryModalVisible} transparent={true} animationType="slide">
            <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
              <View style={tw`w-4/5 h-1/2 bg-white rounded-lg p-5`}>
                <ScrollView>
                  {categories.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={tw`py-3 border-b border-gray-300`}
                      onPress={() => selectCategory(item)}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={tw`mt-5 items-center`}
                  onPress={() => setCategoryModalVisible(false)}
                >
                  <Text style={tw`text-blue-700 text-base`}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </View>
  );
};

export default RegisterScreen;
