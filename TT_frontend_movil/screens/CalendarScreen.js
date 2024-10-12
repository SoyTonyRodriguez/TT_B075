import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { getAllDates } from '../api/calendar_dates.api';
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
  const [activities, setActivities] = useState([]);

  // Fetch activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      const response = await getAllDates();
      setActivities(response.data);
    };

    fetchActivities();
  }, []);

  // Fechas de inicio y final
  const inicioConvocatoria = '2024-01-17';
  const finalConvocatoria = '2024-05-30';

  // Limitación de 2 años atrás y 2 adelante
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear - 2}-01-01`; 
  const maxDate = `${currentYear + 2}-12-31`; 

  // Cambiar la fecha seleccionada
  const changeDate = (date) => {
    setCurrentDate(date);
    setSelectedDate(date);
    setCalendarKey(prevKey => prevKey + 1);
  };

  // Controlar avance y retroceso de meses
  const handlePressArrowRight = (addMonth) => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    if (nextMonth <= new Date(maxDate)) {
      addMonth();
      setCurrentDate(nextMonth.toISOString().split('T')[0]);
    }
  };

  const handlePressArrowLeft = (subtractMonth) => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    if (prevMonth >= new Date(minDate)) {
      subtractMonth();
      setCurrentDate(prevMonth.toISOString().split('T')[0]);
    }
  };

  // Generar rango de fechas
  // Generar rango de fechas
  const generateDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateRange = {};
    let isFirstDate = true;
  
    while (startDate <= endDate) {
      const dayOfWeek = startDate.getDay();
      if (dayOfWeek !== 5 && dayOfWeek !== 6) {
        const formattedDate = startDate.toISOString().split('T')[0];

        dateRange[formattedDate] = {
          marked: true,
          customStyles: {
            container: {
              backgroundColor: isFirstDate ? 'rgba(255,0,0,0.3)' : 'rgba(0,128,0,0.3)', // Rojo para el inicio, verde para las demás
            },
            text: {
              color: '#1e293b',
              fontWeight: 'bold',
            },
          },
        };

        isFirstDate = false; // Después del primer día, las demás fechas no serán rojas
      }
      startDate.setDate(startDate.getDate() + 1);
    }
    return dateRange;
  };

  // Marcar fechas de actividades
  const markedDates = activities.reduce((acc, activity) => {
    const activityRange = generateDateRange(activity.start_date.split('T')[0], activity.end_date.split('T')[0]);
    return { ...acc, ...activityRange };
  }, {});

  // Añadir estilo personalizado a las fechas
  const enrichedMarkedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: true,
      selectedColor: 'purple',
    },
  };

  // Filtrar actividades para la fecha seleccionada
  const filteredActivities = activities.filter(activity => {
    const startDate = activity.start_date.split('T')[0];
    const endDate = activity.end_date.split('T')[0];
    return startDate <= selectedDate && endDate >= selectedDate;
  });

  // Ajustar fecha a GMT-6
  const adjustToMexicoTimezone = (dateString) => {
    const date = new Date(dateString);
    const currentOffset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() + currentOffset * 60000);
    return adjustedDate;
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      {/* Encabezado */}
      <View style={tw`flex-row justify-between items-center px-5 mt-10`}>
        <Text style={tw`text-2xl font-bold text-black`}>Calendario</Text>
        <Ionicons name="calendar-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      {/* Botones de Inicio y Final */}
      <View style={tw`flex-row justify-around mt-2 px-5`}>
        <TouchableOpacity
          style={tw`flex-row items-center bg-blue-600 py-2 px-5 rounded-full`}
          onPress={() => changeDate(inicioConvocatoria)}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" style={tw`mr-3`} />
          <Text style={tw`text-white text-lg`}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row items-center bg-blue-600 py-2 px-5 rounded-full`}
          onPress={() => changeDate(finalConvocatoria)}
        >
          <Text style={tw`text-white text-lg mr-3`}>Final</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Calendario */}
      <View style={tw`flex-1 justify-center items-center mt-4`}>
        <View style={tw`shadow-lg rounded-lg bg-white p-2`}>
          <Calendar
            key={calendarKey}
            current={currentDate}
            minDate={minDate}
            maxDate={maxDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={enrichedMarkedDates}
            markingType={'custom'}
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
            onPressArrowRight={handlePressArrowRight}
            onPressArrowLeft={handlePressArrowLeft}
            style={[tw`border rounded-lg`, { width: 320, height: 360 }]}
          />
        </View>
      </View>


      {/* Detalles de actividad */}
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

          {/* Detalles de la actividad */}
          <ScrollView style={tw`h-28`}>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity, index) => {
                const startDate = adjustToMexicoTimezone(activity.start_date).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });
                const endDate = adjustToMexicoTimezone(activity.end_date).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <View key={index} style={tw`mb-3`}>
                    <View style={tw`flex-row mb-3 flex-wrap`}>
                      <Text style={tw`font-bold text-gray-600 mr-2`}>Actividad:</Text>
                      <Text style={tw`text-gray-600 flex-wrap w-60`}>{activity.activity}</Text>
                    </View>
                    <View style={tw`flex-row mb-3`}>
                      <Text style={tw`font-bold text-gray-600 mr-2`}>Periodo:</Text>
                      <Text style={tw`text-gray-600 flex-wrap w-60`}>
                        {startDate} - {endDate}
                      </Text>
                    </View>
                    <View style={tw`flex-row mb-3 flex-wrap`}>
                      <Text style={tw`font-bold text-gray-600 mr-2`}>Responsable:</Text>
                      <Text style={tw`text-gray-600 flex-wrap w-60`}>{activity.responsible}</Text>
                    </View>
                    <View style={tw`flex-row mb-3 flex-wrap`}>
                      <Text style={tw`font-bold text-gray-600 mr-2`}>Duración:</Text>
                      <Text style={tw`text-gray-600 flex-wrap w-60`}>{activity.duration} días (Días hábiles)</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={tw`text-gray-600`}>No hay actividades para esta fecha.</Text>
            )}
          </ScrollView>
        </View>
      )}
    </ImageBackground>
  );
};

export default CalendarScreen;
