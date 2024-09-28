import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, TouchableOpacity, Modal, FlatList, Dimensions, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; 
import { useForm, Controller } from "react-hook-form";
import { createAccount } from "../api/accounts.api"; // Import the API
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
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
      console.log("Passwords do not match");
      return;
    }

    const { confirmar_password, ...accountData } = data;

    try {
      const response = await createAccount(accountData);
      console.log("Account created successfully:", response.data);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const selectCategory = (category) => {
    setValue('category', category);
    setCategoryModalVisible(false);
  };

    // Estilo dinámico para la imagen
  const imageStyle = {
    width: width,      // Ancho de la ventana
    height: height,    // Alto de la ventana
    flex: 1,           // Para que la imagen ocupe todo el contenedor
  };

  return (

      <ImageBackground 
        source={require('../assets/images/fondologin.jpg')} 
        style={imageStyle}
        resizeMode="cover"
      >
        <KeyboardAwareScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          resetScrollToCoords={{ x: 0, y: 0 }} 
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled" // Permite que los inputs mantengan el foco al hacer scroll
          >
          <View style={tw`px-5`}>
            {/* Cambiamos el header para evitar que se superponga */}
            <View style={tw`pt-12`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-2xl font-bold text-black`}>Regístrate</Text>
                <Ionicons name="person-outline" size={30} color="black" style={tw`ml-2`} />
              </View>
              <Text style={tw`text-lg text-gray-500 mt-2`}>Introduce los datos solicitados</Text>
              <View style={tw`h-0.5 bg-black mt-3 mb-5`} />
            </View>

            {/* Formulario */}
            <Controller
              control={control}
              name="name"
              rules={{ required: 'El nombre es obligatorio.' }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    placeholder="Ingresa tu nombre completo"
                    style={tw`w-full p-4 border border-gray-700 rounded-lg text-base bg-transparent text-black mb-4`}
                    placeholderTextColor="rgba(0, 0, 0, 0.8)"
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.name && <Text style={tw`text-red-500 mb-4`}>{errors.name.message}</Text>}
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
                    style={tw`w-full p-4 border border-gray-700 rounded-lg text-base bg-transparent text-black mb-4`}
                    placeholderTextColor="rgba(0, 0, 0, 0.8)"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.email && <Text style={tw`text-red-500 mb-4`}>{errors.email.message}</Text>}
                </>
              )}
            />

            <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={tw`w-full p-4 border border-gray-700 rounded-lg mb-4 flex-row justify-between items-center`}>
              <Controller
                control={control}
                name="category"
                rules={{ required: 'Selecciona una categoría.' }}
                render={({ field: { value } }) => (
                  <>
                    <Text style={tw`${value ? "text-black" : "text-gray-500"}`}>
                      {value || "Selecciona tu categoría"}
                    </Text>
                    {errors.category && <Text style={tw`text-red-500 mb-4`}>{errors.category.message}</Text>}
                  </>
                )}
              />
              <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
            </TouchableOpacity>

            <Controller
              control={control}
              name="employee_number"
              rules={{ required: 'El número de empleado es obligatorio.' }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    placeholder="Ingresa tu número de empleado"
                    style={tw`w-full p-4 border border-gray-700 rounded-lg text-base bg-transparent text-black mb-4`}
                    placeholderTextColor="rgba(0, 0, 0, 0.8)"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.employee_number && <Text style={tw`text-red-500 mb-4`}>{errors.employee_number.message}</Text>}
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
                    style={tw`w-full p-4 border border-gray-700 rounded-lg text-base bg-transparent text-black`}
                    placeholderTextColor="rgba(0, 0, 0, 0.8)"
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
                  {errors.password && <Text style={tw`text-red-500 mb-4`}>{errors.password.message}</Text>}
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
                    style={tw`w-full p-4 border border-gray-700 rounded-lg text-base bg-transparent text-black`}
                    placeholderTextColor="rgba(0, 0, 0, 0.8)"
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
                  {errors.confirmar_password && <Text style={tw`text-red-500 mb-4`}>{errors.confirmar_password.message}</Text>}
                </View>
              )}
            />

            <TouchableOpacity 
              style={tw`bg-[#003366] p-4 rounded-lg items-center mt-8 mb-10`}
              onPress={handleSubmit(handleRegister)} 
            >
              <Text style={tw`text-white font-bold text-lg`}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

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
      </ImageBackground>
  );
};

export default RegisterScreen;
