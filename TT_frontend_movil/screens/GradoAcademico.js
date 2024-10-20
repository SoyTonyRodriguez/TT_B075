import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import tw from 'twrnc';

export default function ProyeccionGrado() {
  const [nombre, setNombre] = useState('');
  const [grado, setGrado] = useState('');
  const [documentoRequerido, setDocumentoRequerido] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [fecha, setFecha] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const documentosPorGrado = {
    pasante: 'Copia cotejada del original de la carta de pasante o en su caso, del original de la boleta de calificaciones con el 100% de los créditos y de la constancia de realización de servicio social.',
    licenciatura: 'Copia cotejada del original del título de licenciatura o en su caso, del original del acta de examen profesional.',
    maestria: 'Copia cotejada del original del diploma de grado o en su caso, del original del acta de examen de grado.',
    doctorado: 'Copia cotejada del original del diploma de grado o en su caso, del original del acta de examen de grado.'
  };

  const gradoOptions = [
    { label: 'Pasantía de Licenciatura', value: 'pasante' },
    { label: 'Título de Licenciatura', value: 'licenciatura' },
    { label: 'Maestría', value: 'maestria' },
    { label: 'Doctorado', value: 'doctorado' },
  ];

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowCalendar(false);
    setFecha(currentDate.toLocaleDateString('es-ES'));
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={tw`flex-1`}
    >
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Obtención grado académico</Text>
        <Ionicons name="school-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      <ScrollView style={tw`px-5`}>
        <View style={tw`mb-4`}>

          {/* Selector de Grado Académico */}
          <Text style={tw`text-base font-bold text-black`}>Seleccione su grado académico obtenido</Text>
          <TouchableOpacity
            style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
            onPress={() => setModalVisible(true)}
          >
            <Text>{grado ? gradoOptions.find(option => option.value === grado)?.label : 'Seleccione grado'}</Text>
            <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
          </TouchableOpacity>

          {/* Modal para seleccionar grado */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
              <View style={tw`bg-white p-4`}>
                <Text style={tw`text-lg font-bold mb-4`}>Seleccione su grado</Text>
                {gradoOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={tw`p-4 border-b`}
                    onPress={() => {
                      setGrado(option.value);
                      setDocumentoRequerido(documentosPorGrado[option.value]); 
                      setModalVisible(false);
                    }}
                  >
                    <Text>{option.label}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={tw`bg-gray-200 p-2 rounded-lg mt-4`}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={tw`text-center text-black`}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Mostrar documento a presentar */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-base font-bold text-black`}>Documento a presentar</Text>
            <Text style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}>
              {documentoRequerido || 'Seleccione un grado académico para ver el documento requerido.'}
            </Text>
          </View>

          {/* Selector de Fecha */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-base font-bold text-black`}>Seleccione la fecha de obtención</Text>
            <View style={tw`mb-4 flex-row items-center`}>
              <TextInput
                style={tw`flex-1 border rounded-lg p-4 bg-white mr-2`}
                value={fecha}
                placeholder="dd/mm/aaaa"
                editable={false}
              />
              <TouchableOpacity onPress={() => setShowCalendar(true)}>
                <Ionicons name="calendar" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {showCalendar && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          {/* Botón de Agregar */}
          <TouchableOpacity
            style={tw`bg-[#003366] p-4 rounded-lg items-center mt-8 mb-10`}
            onPress={() => console.log(`Nombre: ${nombre}, Grado: ${grado}, Fecha: ${fecha}`)}
          >
            <Text style={tw`text-white text-center`}>Agregar</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
