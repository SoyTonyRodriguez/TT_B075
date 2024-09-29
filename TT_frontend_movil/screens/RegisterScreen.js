import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Modal, ScrollView, Dimensions, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useForm, Controller } from "react-hook-form";
import { createAccount } from "../api/accounts.api"; // Import the API
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

const RegisterScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

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

  const handleRegister = async (data) => {
    const password = data.password;
    const confirmPassword = data.confirmar_password;
  
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
  
    const { confirmar_password, ...accountData } = data;
  
    try {
      const response = await createAccount(accountData);
  
      // Assuming the API returns a successful response
      if (response.ok) {
        Alert.alert("Éxito", "Cuenta creada con éxito");
      } else {
        throw new Error("Unexpected error"); // Fallback for non-400 errors
      }
    } catch (error) {
      // Handle 400 errors explicitly
      if (error.response && error.response.status === 400) {
        Alert.alert("Error", "Hubo un error en la solicitud. Verifica los datos ingresados.");
      } else {
        // Handle other errors
        Alert.alert("Error", "Hubo un error al crear la cuenta.");
      }
    }
  };

  const selectCategory = (category) => {
    setValue('category', category, { shouldValidate: true });  // Sets value and triggers validation
    setCategoryModalVisible(false);
  };
  

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

  const inputStyle = (hasError) => tw`w-full p-4 border ${hasError ? 'border-red-500' : 'border-gray-700'} rounded-lg text-base bg-transparent text-black mb-4`;

  return (
    <ImageBackground source={require('../assets/images/fondologin.jpg')} style={{ width: width, height: height, flex: 1 }} resizeMode="cover">
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={tw`px-5`}>
          <View style={tw`pt-12`}>
            <Text style={tw`text-2xl font-bold text-black`}>Regístrate</Text>
            <Text style={tw`text-lg text-gray-500 mt-2`}>Introduce los datos solicitados</Text>
            <View style={tw`h-0.5 bg-black mt-3 mb-5`} />
          </View>

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

          <TouchableOpacity style={tw`bg-[#003366] p-4 rounded-lg items-center mt-8 mb-10`} onPress={handleSubmit(handleRegister)}>
            <Text style={tw`text-white font-bold text-lg`}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {/* Modal de categorías */}
      <Modal visible={categoryModalVisible} transparent={true} animationType="slide">
  <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
    {/* Smaller and more stylized modal */}
    <View style={tw`w-4/5 h-1/2 bg-white rounded-lg p-5`}>
      {/* ScrollView for scrollable content */}
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
