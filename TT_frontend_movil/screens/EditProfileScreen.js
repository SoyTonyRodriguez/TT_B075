import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdown
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

const EditProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const storedAccountData = await AsyncStorage.getItem('accountDetails');
        if (storedAccountData) {
          const { fullName, email, category } = JSON.parse(storedAccountData);
          setFullName(fullName);
          setEmail(email);
          setCategory(category);
        }
      } catch (error) {
        console.error("Error accessing or parsing account details from AsyncStorage:", error);
      }
    };
    loadAccountData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const updatedAccountDetails = { fullName, email, category };
      await AsyncStorage.setItem('accountDetails', JSON.stringify(updatedAccountDetails));
      console.log('Perfil actualizado:', updatedAccountDetails);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving updated account details:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-row items-center justify-between px-5 mt-12`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-xl font-bold text-black`}>Regresar</Text>
        </TouchableOpacity>
        <Text style={tw`text-3xl font-bold text-center text-black`}>Editar Perfil</Text>
        <View style={tw`w-8`} />
      </View>

      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Nombre */}
        <Text style={tw`text-base font-bold text-black`}>Nombre</Text>
        <TextInput
          value={fullName}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholder="Escribe tu nombre"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={setFullName}
        />

        {/* Correo */}
        <Text style={tw`text-base font-bold text-black`}>Correo</Text>
        <TextInput
          value={email}
          style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 text-base bg-transparent text-black`}
          placeholder="Escribe tu correo"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          onChangeText={setEmail}
        />

        {/* Categoría */}
        <Text style={tw`text-base font-bold text-black`}>Categoría</Text>
        <View style={tw`border border-gray-700 rounded-lg mb-3`}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={tw`text-black`}
          >
            <Picker.Item label="Selecciona una categoría" value="" />
            <Picker.Item label="Técnico Docente de Asignatura A" value="Técnico Docente de Asignatura A" />
            <Picker.Item label="Técnico Docente de Asignatura B" value="Técnico Docente de Asignatura B" />
            <Picker.Item label="Técnico Docente Auxiliar A" value="Técnico Docente Auxiliar A" />
            <Picker.Item label="Técnico Docente Auxiliar B" value="Técnico Docente Auxiliar B" />
            <Picker.Item label="Técnico Docente Auxiliar C" value="Técnico Docente Auxiliar C" />
            <Picker.Item label="Técnico Docente Asociado A" value="Técnico Docente Asociado A" />
            <Picker.Item label="Técnico Docente Asociado B" value="Técnico Docente Asociado B" />
            <Picker.Item label="Técnico Docente Asociado C" value="Técnico Docente Asociado C" />
            <Picker.Item label="Técnico Docente Titular A" value="Técnico Docente Titular A" />
            <Picker.Item label="Profesor de Asignatura A" value="Profesor de Asignatura A" />
            <Picker.Item label="Profesor Asistente A" value="Profesor Asistente A" />
            <Picker.Item label="Profesor Asistente B" value="Profesor Asistente B" />
            <Picker.Item label="Profesor Asistente C" value="Profesor Asistente C" />
            <Picker.Item label="Profesor Asociado A" value="Profesor Asociado A" />
            <Picker.Item label="Profesor Asociado B" value="Profesor Asociado B" />
            <Picker.Item label="Profesor Asociado C" value="Profesor Asociado C" />
            <Picker.Item label="Profesor Titular A" value="Profesor Titular A" />
            <Picker.Item label="Profesor Titular B" value="Profesor Titular B" />
          </Picker>
        </View>

        {/* Botón para guardar cambios */}
        <TouchableOpacity
          style={tw`bg-[#003366] py-4 rounded w-full items-center mb-5`}
          onPress={handleSaveChanges}
        >
          <Text style={tw`text-white font-bold text-base`}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default EditProfileScreen;
