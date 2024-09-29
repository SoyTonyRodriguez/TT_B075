import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Modal, ScrollView, Dimensions, Alert } from "react-native";
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

  // -_-_-_-_-_ Form -_-_-_-_-_
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      category: '',
      employee_number: '',
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
      case 'employee_number':
        return "El número de empleado es obligatorio.";
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
    <ImageBackground source={require('../assets/images/fondologin.jpg')} style={{ width: width, height: height, flex: 1 }} resizeMode="cover">
      {/* Show LoadingScreen with a dynamic message */}
      {loading && <LoadingScreen message={loadingMessage} />}

      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={tw`px-5`}>
          <View style={tw`pt-12`}>
            <Text style={tw`text-2xl font-bold text-black`}>Regístrate</Text>
            <Text style={tw`text-lg text-gray-500 mt-2`}>Introduce los datos solicitados</Text>
            <View style={tw`h-0.5 bg-black mt-3 mb-5`} />
          </View>

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

          {/* Employee number input */}
          <Controller
            control={control}
            name="employee_number"
            rules={{ required: 'El número de empleado es obligatorio.' }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Ingresa tu número de empleado"
                  style={inputStyle(errors.employee_number)}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.employee_number && renderErrorMessage(getErrorMessage('employee_number'))}
              </>
            )}
          />

          {/* Password and Confirm Password Inputs */}
          <Controller
            control={control}
            name="password"
            rules={{ required: 'La contraseña es obligatoria.' }}
            render={({ field: { onChange, value } }) => (
              <View style={tw`relative w-full mb-4`}>
                <TextInput
                  placeholder="Contraseña"
                  style={inputStyle(errors.password)}
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
  );
};

export default RegisterScreen;
