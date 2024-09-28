import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import tw from 'twrnc';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const CalendarScreen = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(today);
  const [calendarKey, setCalendarKey] = useState(0); 

  // Fechas de inicio y final
  const inicioConvocatoria = '2024-01-17';
  const finalConvocatoria = '2024-05-30';

  // Realizamos la limitacion de 2 años atras y 2 adelante
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear - 2}-01-01`; 
  const maxDate = `${currentYear + 2}-12-31`; //Tiene un bug aveces y se queda en noviembre, luego vemos como se soluciona

  // Función para cambiar la fecha y marcarla
  const changeDate = (date) => {
    setCurrentDate(date); 
    setSelectedDate(date); 
    setCalendarKey(prevKey => prevKey + 1); 
  };

  // Función para controlar el avance al presionar la flecha derecha
  const handlePressArrowRight = (addMonth) => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    if (nextMonth <= new Date(maxDate)) {
      addMonth(); 
      setCurrentDate(nextMonth.toISOString().split('T')[0]); 
    }
  };

  // Función para controlar el retroceso al presionar la flecha izquierda
  const handlePressArrowLeft = (subtractMonth) => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    if (prevMonth >= new Date(minDate)) {
      subtractMonth(); 
      setCurrentDate(prevMonth.toISOString().split('T')[0]); 
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')}  
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      {/* Encabezado */}
      <View style={tw`flex-row justify-between items-center px-5 mt-10`}>
        <Text style={tw`text-3xl font-bold text-black`}>Calendario</Text>
        <Ionicons name="calendar-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      {/* Botones de Inicio y Final */}
      <View style={tw`flex-row justify-around mt-5 px-5`}>
        {/* Botón de Inicio */}
        <TouchableOpacity 
          style={tw`flex-row items-center bg-blue-600 py-2 px-5 rounded-full`}
          onPress={() => changeDate(inicioConvocatoria)} 
        >
          <Ionicons name="arrow-back" size={20} color="#fff" style={tw`mr-3`} />
          <Text style={tw`text-white text-lg`}>Inicio</Text>
        </TouchableOpacity>

        {/* Botón de Final */}
        <TouchableOpacity 
          style={tw`flex-row items-center bg-blue-600 py-2 px-5 rounded-full`}
          onPress={() => changeDate(finalConvocatoria)} 
        >
          <Text style={tw`text-white text-lg mr-3`}>Final</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Calendario */}
      <View style={tw`flex-1 justify-center items-center mt-10`}>
        <View style={tw`shadow-lg rounded-lg bg-white p-3`}>
          <Calendar
            key={calendarKey} 
            current={currentDate}
            minDate={minDate} // Fecha mínima para limitar el retroceso
            maxDate={maxDate} // Fecha máxima para limitar el avance
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: 'purple' },
            }}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: '#f1f5f9',
              textSectionTitleColor: '#1e293b',
              dayTextColor: '#1e293b',
              todayTextColor: '#9333ea',
              selectedDayTextColor: 'white',
              arrowColor: '#1e293b',
              monthTextColor: '#1e293b',
            }}
            // Limitar la navegación con flechas
            onPressArrowRight={handlePressArrowRight} 
            onPressArrowLeft={handlePressArrowLeft} 
            style={[tw`border rounded-lg`, { width: 330, height: 380 }]} 
          />
        </View>
      </View>

      {/* Apartado de información - Solo se muestra cuando hay una fecha seleccionada */}
      {selectedDate && (
        <View style={tw`px-5 py-5 bg-white rounded-t-3xl mt-5 shadow-lg`}>
          <Text style={tw`text-lg font-bold text-red-600 mb-3`}>Detalles</Text>
          
          {/* Fecha seleccionada */}
          <View style={tw`flex-row items-center mb-3`}>
            <Text style={tw`text-4xl font-extrabold text-red-600 mr-3`}>
              {new Date(Date.parse(selectedDate)).getUTCDate()}
            </Text>
            <Text style={tw`text-2xl font-bold text-red-400 uppercase`}>
              {new Date(Date.parse(selectedDate)).toLocaleString('es-ES', { month: 'long' })}
            </Text>
          </View>

          {/* Información adicional */}
          <View style={tw`flex-row mb-3`}>
            <Text style={tw`font-bold text-gray-600 mr-2`}>Actividad:</Text>
            <Text style={tw`text-gray-600`}></Text>
          </View>
          
          <View style={tw`flex-row mb-3`}>
            <Text style={tw`font-bold text-gray-600 mr-2`}>Periodo:</Text>
            <Text style={tw`text-gray-600`}></Text>
          </View>
          
          <View style={tw`flex-row mb-3`}>
            <Text style={tw`font-bold text-gray-600 mr-2`}>Responsable:</Text>
            <Text style={tw`text-gray-600`}></Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default CalendarScreen;
