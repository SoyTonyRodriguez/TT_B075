import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const GuideScreen = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  // Información detallada de todas las tarjetas
  const guideCards = [
    {
      id: 1,
      icon: '🎓',
      imgSrc: '/src/img/Grado.png',
      title: 'Promoción por grado académico',
      description: 'Conoce cómo puedes avanzar con la obtención de un nuevo grado académico.',
      details: 'Este proceso se da cuando el docente busca promoverse al obtener un grado académico superior. Se requiere presentar documentación que acredite la obtención del grado y cumplir con los requisitos establecidos por la normativa interna.',
      filter: 'Promoción por Grado Académico',
    },
    {
      id: 2,
      icon: '📈',
      imgSrc: '/src/img/UP.png',
      title: 'Acumulación de unidades de promoción',
      description: 'Aprende cómo acumular unidades para mejorar tu posición.',
      details: 'Esta opción te permitirá acumular unidades de promoción en diferentes campos. Podrás elegir funciones y actividades que se alineen con tus intereses y habilidades. A medida que acumulas unidades, podrás medir tu progreso y alcanzar tus metas de promoción.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 3,
      icon: '💼',
      imgSrc: '/src/img/Funcion.png',
      title: 'Función',
      description: 'Selecciona las funciones que deseas realizar según tus intereses.',
      details: 'Esta opción despliega las funciones disponibles que están asociadas a la acumulación de unidades de promoción. Escoge las funciones que deseas realizar y que mejor se alineen con tus objetivos de desarrollo.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 4,
      icon: '⚙️',
      imgSrc: '/src/img/Actividad.png',
      title: 'Actividad',
      description: 'Descubre las actividades disponibles para acumular unidades.',
      details: 'Las actividades variarán según la función seleccionada. Cada actividad tiene diferentes parámetros que debes considerar antes de incluirlas en tu proyección. Asegúrate de entender qué se espera de cada actividad para cumplir adecuadamente.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 5,
      icon: '📅',
      imgSrc: '/src/img/Limite.png',
      title: 'Límite de fechas',
      description: 'Consulta las fechas límite para cada período.',
      details: 'Durante cada período, se mostrará la información referente a las fechas límite para la acumulación de unidades de promoción. Consulta este módulo regularmente para no perder de vista los objetivos y aprovechar tu tiempo disponible.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 6,
      icon: '📊',
      imgSrc: '/src/img/Acumuladas.png',
      title: 'Unidades acumuladas',
      description: 'Mantente al tanto de tus unidades acumuladas.',
      details: 'Podrás visualizar en todo momento las unidades que has acumulado. Esta vista te permitirá tener un control de tu progreso y saber cuántas unidades necesitas para cumplir con los requisitos.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 7,
      icon: '📈',
      imgSrc: '/src/img/UPS_A.png',
      title: 'Unidades a obtener',
      description: 'Visualiza los valores en U.P. que puedes obtener según tu participación.',
      details: 'Para cada actividad, podrás ver los valores en Unidades de Promoción (U.P.) que te puede aportar según tu rol. Asegúrate de elegir la opción que mejor se ajuste a tu participación.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 8,
      icon: '🚫',
      imgSrc: '/src/img/MAX.png',
      title: 'Máximo permitido',
      description: 'Conoce los límites establecidos en cada actividad.',
      details: 'Algunas actividades tienen un límite permitido respecto a las unidades que puedes acumular. Asegúrate de no exceder estos límites para que tu proyección sea válida y puedas seguir acumulando unidades correctamente.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 9,
      icon: '⏱️',
      imgSrc: '/src/img/Hrs.png',
      title: 'Horas de trabajo',
      description: 'Registra las horas de trabajo necesarias para cada actividad.',
      details: 'Para las actividades que requieren tiempo, deberás ingresar las horas de trabajo dedicadas. Ingresa un valor correcto para asegurar que acumules unidades correctamente. Las horas serán validadas conforme al reglamento, y pueden variar según criterios específicos.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 10,
      icon: '🎓',
      imgSrc: '/src/img/GradoAcademico.png',
      title: 'Seleccionar grado académico',
      description: 'Elige el grado académico obtenido para iniciar tu proyección.',
      details: 'Selecciona el grado académico de la lista: Pasantía, Título, Maestría o Doctorado. Una vez seleccionado, se te mostrarán los documentos requeridos para validar tu promoción.',
      filter: 'Promoción por Grado Académico',
    },
    {
      id: 11,
      icon: '🗂️',
      imgSrc: '/src/img/Documentos.png',
      title: 'Documentos Requeridos',
      description: 'Consulta los documentos necesarios para tu promoción.',
      details: 'Los documentos requeridos varían según el grado académico seleccionado. Asegúrate de contar con alguno de los siguientes: constancias oficiales, carta de pasante, títulos, diploma de grado, examen de grado o cualquier documentación indicada al momento de seleccionar su grado académico.',
      filter: 'Promoción por Grado Académico',
    },
    {
      id: 12,
      icon: '🛠️',
      imgSrc: '/src/img/Rol.png',
      title: 'Rol de Participación',
      description: 'Selecciona tu rol dentro de la actividad.',
      details: 'El rol de participación define tu contribución específica en la actividad seleccionada. Los roles pueden incluir: coordinador, colaborador, o asesor, entre otros. Cada rol tiene un valor específico en unidades de promoción (U.P.) y requisitos asociados que deben ser validados.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 13,
      icon: '🌍',
      imgSrc: '/src/img/Alcance.png',
      title: 'Alcance',
      description: 'Selecciona el alcance de tu actividad.',
      details: 'El alcance puede ser nacional o internacional. Esta categoría refleja el impacto de tu actividad y puede influir en el valor de las unidades de promoción (U.P.) obtenidas. Asegúrate de contar con la validación correspondiente según el nivel seleccionado.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 14,
      icon: '📋',
      imgSrc: '/src/img/Kanban.png',
      title: 'Progreso de Actividades',
      description: 'Visualiza y organiza las actividades de tu promoción.',
      details: 'Cada actividad creada, ya sea por grado académico o acumulación de U.P., se refleja aquí. Puedes moverlas entre columnas (por hacer, en progreso, hecho) para controlar su estado. El color de la tarjeta indica la función asignada, y el progreso se mide por tareas y documentos completados.',
      filter: 'Tablero Kanban',
    },
    {
      id: 15,
      icon: '📝',
      imgSrc: '/src/img/NuevaTarea.png',
      title: 'Crear nueva tarea',
      description: 'Genera una nueva tarea vinculada a tus actividades.',
      details: 'Puedes crear una nueva tarea asociándola a una actividad existente seleccionada en "Proyección". Define el título, descripción y la prioridad de acuerdo a tus necesidades para organizar tu progreso de manera eficiente. Asegúrate de elegir correctamente la actividad para mantener la trazabilidad.',
      filter: 'Tablero Kanban',
    },
    {
      id: 16,
      icon: '📋',
      imgSrc: '/src/img/PorHacer.png',
      title: 'Por hacer',
      description: 'Tareas y actividades pendientes por iniciar.',
      details: 'En esta columna se encuentran todas las tareas o actividades que aún no han comenzado. Puedes moverlas a "En progreso" para iniciar su ejecución. Esta sección sirve como lista inicial para organizar tu trabajo.',
      filter: 'Tablero Kanban',
    },
    {
      id: 17,
      icon: '⏳',
      imgSrc: '/src/img/EnProgreso.png',
      title: 'En progreso',
      description: 'Tareas y actividades actualmente en desarrollo.',
      details: 'Aquí se encuentran las tareas o actividades que ya están en ejecución. Puedes moverlas de vuelta a "Por hacer" si deseas detenerlas temporalmente, o en el futuro, marcarlas como completadas.',
      filter: 'Tablero Kanban',
    },
    {
      id: 18,
      icon: '✏️',
      imgSrc: '/src/img/EditarTarea.png',
      title: 'Editar Tarea',
      description: 'Modifica los detalles de una tarea existente.',
      details: 'Permite al usuario actualizar el título, descripción, prioridad y la proyección asociada de una tarea ya creada. Esta funcionalidad es útil para corregir información o ajustar parámetros según sea necesario.',
      filter: 'Tablero Kanban',
    },
    {
      id: 19,
      icon: '✅',
      imgSrc: '/src/img/Hecho.png',
      title: 'Hecho',
      description: 'Tareas o actividades completadas.',
      details: 'Solo puedes mover tareas a esta columna si ya has subido el documento requerido en la sección "Mis documentos". Esto asegura que cada actividad cumpla con los requisitos necesarios antes de ser marcada como completada.',
      filter: 'Tablero Kanban',
    },
    {
      id: 20,
      icon: '⭐',
      imgSrc: '/src/img/UP_Disabled.png',
      title: 'Por unidades de promoción (Proyección activa)',
      description: 'Esta proyección está activa, deshabilitando la opción de grado académico.',
      details: 'Al iniciar una proyección por unidades de promoción, la opción para crear una proyección por grado académico queda inhabilitada. Esto asegura que se complete un solo proceso de promoción a la vez, respetando los lineamientos establecidos.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 21,
      icon: '🎓',
      imgSrc: '/src/img/Grado_Disabled.png',
      title: 'Por obtención de grado académico (Proyección activa)',
      description: 'Esta proyección está activa, deshabilitando la opción de unidades de promoción.',
      details: 'Al iniciar una proyección por obtención de grado académico, la opción para crear una proyección por unidades de promoción queda inhabilitada. Esto garantiza que el docente se enfoque en un único proceso de promoción conforme a las normativas.',
      filter: 'Promoción por Grado Académico',
    }
    
  ];
  
  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black text-center`}>Guía</Text>
        <Ionicons name="document" size={40} color="black" />
      </View>
      
      <ScrollView>
        {/* Tarjetas */}
        <View style={tw`flex-row flex-wrap justify-between px-4`}>
          {guideCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={tw`bg-white rounded-lg p-4 w-[48%] mb-4 shadow-lg`}
              onPress={() => setSelectedCard(card)}
            >
              <Text style={tw`text-4xl text-center mb-2`}>{card.icon}</Text>
              <Text style={tw`text-lg font-bold text-center mb-1`}>{card.title}</Text>
              <Text style={tw`text-sm text-gray-600 text-center`}>{card.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Modal de Información Expandida */}
        <Modal visible={!!selectedCard} transparent={true} animationType="slide">
          <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}>
            <View style={tw`bg-white rounded-lg p-6 w-4/5 shadow-lg`}>
              {selectedCard && (
                <>
                  <Text style={tw`text-xl font-bold text-center mb-4`}>
                    {selectedCard.title}
                  </Text>
                  <Image
                    source={selectedCard.imgSrc}
                    style={tw`w-full h-40 mb-4`}
                    resizeMode="contain"
                  />
                  <Text style={tw`text-base text-gray-700 text-center mb-4`}>
                    {selectedCard.details}
                  </Text>
                  <TouchableOpacity
                    style={tw`bg-red-500 rounded-lg py-2 px-4 self-center`}
                    onPress={() => setSelectedCard(null)}
                  >
                    <Text style={tw`text-white text-base font-bold`}>Cerrar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
        
      </ScrollView>
    </ImageBackground>
  );
}

export default GuideScreen;
