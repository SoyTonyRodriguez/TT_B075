import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import tw from 'twrnc';

  // Opciones de actividades por función con documentos requeridos y U.P
  const actividadesPorFuncion = {
    Docencia: [
      { actividad: "Carga académica", documento: "Registro Único de Actividades Académicas (RUAA) o constancia de carga académica suscrita por las autoridades competentes.", up: 1.25 },
      { actividad: "Elaboración e Impartición de acciones de formación", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", up: 4.5 },
      { actividad: "Programa de inducción", documento: "Constancia de validación emitida por la DEMS, DES o SIP.", up: 5 },
      { actividad: "Tutorías", documento: "Constancia emitida por la Coordinación Institucional de Tutoría Politécnica (CITP).", up: 5 },
      { actividad: "Diseño y planeación didáctica en el aula", documento: "Constancia emitida por la DEMS, DES o SIP.", up: 20 },
      { actividad: "Elaboración de material didáctico", documento: "Constancia emitida por el presidente de la academia o equivalente, con el aval de los integrantes de la misma y el visto bueno del Subdirector Académico.", up: 25 },
      { actividad: "Autoría de libros", documento: "Constancia de validación emitida por la DEMS, DES o SIP.", up: 6 },
      { actividad: "Elaboración de software educativo", documento: "Constancia emitida por la DEMS, DES o SIP.", up: 5 },
      { actividad: "Producción de Unidades de Aprendizaje en línea", documento: "Constancia emitida por la UPEV con el visto bueno de la DEMS, DES o SIP.", up: 0 }
    ],
    Investigación: [
      { actividad: "Proyectos de investigación con financiamiento interno", documento: "Constancia emitida por la SIP.", up: 50.00 },
      { actividad: "Proyectos vinculados con financiamiento externo", documento: "Contrato o convenio, carta de aceptación del informe final o carta de finiquito, informe técnico.", up: 25.00 },
      { actividad: "Publicación de artículos científicos y técnicos", documento: "Constancia de validación emitida por la SIP.", up: 20.00 },
      { actividad: "Estancias de Investigación", documento: "Oficio de aceptación para realizar la estancia, dictamen del COTEBAL o de la Coordinación de Proyectos Especiales de la Secretaría Académica, carta de terminación expedida por la institución donde se realizó la estancia.", up: 15.00 },
      { actividad: "Desarrollo de patentes", documento: "Solicitud de registro, resultado del examen de forma, título de la patente.", up: 80.00 }
    ],
    Superación: [
      { actividad: "Otra licenciatura", documento: "Constancia de validación emitida por la DES.", up: 60.00 },
      { actividad: "Cursos de actualización, seminarios y talleres", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE para impartidos por el IPN, Constancia de validación emitida por la DEMS, DES o SIP para impartidos en institución distinta al IPN.", up: 8.00 },
      { actividad: "Estudios de especialidad, maestría y doctorado", documento: "Constancia de validación emitida por la SIP.", up: 108.50 },
      { actividad: "Cursos de propósito específico", documento: "Constancia emitida por la SIP.", up: 30.00 },
      { actividad: "Diplomados", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", up: 40.00 },
      { actividad: "Idiomas", documento: "Constancia emitida por la Dirección de Formación en Lenguas Extranjeras y/o certificado emitido por el CENLEX Santo Tomás o Zacatenco.", up: 8.00 }
    ],
    Complementarias: [
      { actividad: "Distinciones académicas", documento: "Constancia de validación emitida por la SIP.", up: 0 },
      { actividad: "Actividades académico-administrativas y sindicales", documento: "Constancia u oficio de designación y documento que acredite el término del cargo.", up: 0 },
      { actividad: "Dirección o asesoría de trabajos escritos para titulación", documento: "Oficio, constancia o formato de designación suscrito por el Titular de la unidad académica o autoridad competente.", up: 20 },
      { actividad: "Jurado de examen profesional o de grado", documento: "Acta de examen profesional o de grado.", up: 20 },
      { actividad: "Experiencia profesional no docente relevante", documento: "Constancia del trabajo profesional desarrollado fuera del IPN con el aval del Titular de la unidad académica.", up: 20 },
      { actividad: "Traducciones", documento: "Oficio de reconocimiento emitido por la academia.", up: 30 },
      { actividad: "Eventos nacionales e internacionales de ciencia y formación integral", documento: "Constancia emitida por la Subdirección Académica con el visto bueno del Titular de la unidad académica y el aval de la DEMS, DES o SIP.", up: 12 },
      { actividad: "Evaluación de prácticas escolares", documento: "Constancia emitida por el Departamento de Extensión y Apoyos Educativos con el visto bueno del Titular de la unidad académica.", up: 6.00},
      { actividad: "Evaluación de prácticas escolares", documento: "Constancia emitida por el Departamento de Extensión y Apoyos Educativos con el visto bueno del Titular de la unidad académica.", up: 6.00},
      { actividad: "Evaluación de prácticas escolares", documento: "Constancia emitida por el Departamento de Extensión y Apoyos Educativos con el visto bueno del Titular de la unidad académica.", up: 6.00}
    ],
    Extensión: [
      { actividad: "Participación en la expoprofesiográfica", documento: "Constancia emitida por la Secretaría Académica o por la DEMS o DES.", up: 3.00 },
      { actividad: "Encuentros Académicos Interpolitécnicos", documento: "Constancia de participación emitida por el Titular de la unidad académica.", up: 8.00 },
      { actividad: "Brigadas multidisciplinarias de servicio social", documento: "Constancia de participación emitida por la Dirección de Egresados y Servicio Social.", up: 8.00 },
      { actividad: "Impartición de disciplinas deportivas y/o talleres culturales", documento: "Constancia de participación emitida por la autoridad competente.", up: 0.50 }
    ],
  };

const rolesParticipacion = ['Expositor', 'Asistente', 'Organizador'];
const alcances = ['Nacional', 'Internacional'];
const prioridades = ['Baja', 'Media', 'Alta'];

const CrearProyeccion = () => {
  const [funcion, setFuncion] = useState('');
  const [actividad, setActividad] = useState('');
  const [actividadesDisponibles, setActividadesDisponibles] = useState([]);
  const [documento, setDocumento] = useState('');
  const [up, setUp] = useState('');
  const [fecha, setFecha] = useState('');
  const [rol, setRol] = useState('');
  const [alcance, setAlcance] = useState('');
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalType, setModalType] = useState('');
  const [showCalendar, setShowCalendar] = useState(false); 
  const [priority, setPriority] = useState('Baja'); 

  const funciones = Object.keys(actividadesPorFuncion);

  const priorityColors = {
    Baja: 'bg-blue-500',
    Media: 'bg-yellow-500',
    Alta: 'bg-red-500',
  };

  const handleModalSelect = (item) => {
    if (modalType === 'funcion') {
      setFuncion(item);
      setActividadesDisponibles(actividadesPorFuncion[item] || []);
    } else if (modalType === 'actividad') {
      setActividad(item);
      const actividadEncontrada = actividadesDisponibles.find(act => act.actividad === item);
      if (actividadEncontrada) {
        setDocumento(actividadEncontrada.documento);
        setUp(actividadEncontrada.up.toString());
      }
    } else if (modalType === 'rol') {
      setRol(item);
    } else if (modalType === 'alcance') {
      setAlcance(item);
    } else if (modalType === 'prioridad') {
      setPriority(item);
    }
    setModalVisible(false);
  };

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
        <Text style={tw`text-2xl font-bold text-black`}>Unidades de promoción</Text>
        <Ionicons name="star-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      <ScrollView style={tw`px-5`}>

        {/* Selector de función */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-bold text-black`}>Función</Text>
          <TouchableOpacity
            onPress={() => { setModalType('funcion'); setModalVisible(true); }}
            style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
          >
            <Text style={tw`${funcion ? "text-black" : "text-gray-500"}`}>
              {funcion || "Selecciona una función"}
            </Text>
            <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
          </TouchableOpacity>
        </View>

        {/* Selector de actividad */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-bold text-black`}>Nombre de la actividad</Text>
          <TouchableOpacity
            onPress={() => { setModalType('actividad'); setModalVisible(true); }}
            style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
            disabled={actividadesDisponibles.length === 0}
          >
            <Text style={tw`${actividad ? "text-black" : "text-gray-500"}`}>
              {actividad || "Selecciona una actividad"}
            </Text>
            <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
          </TouchableOpacity>
        </View>

        {/* Selector de fecha con ícono de calendario */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-bold text-black`}>Establece una fecha proyectada de inicio</Text>
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

        {/* Campo de documento autocompletado */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-bold text-black`}>Tipo de documento que debes presentar</Text>
          <TextInput
            style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
            value={documento}
            editable={false}
          />
        </View>

        {/* Selector de rol de participación */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-bold text-black`}>Selecciona tu rol de participación</Text>
          <TouchableOpacity
            onPress={() => { setModalType('rol'); setModalVisible(true); }}
            style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
          >
            <Text style={tw`${rol ? "text-black" : "text-gray-500"}`}>
              {rol || "Selecciona un rol de participación"}
            </Text>
            <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
          </TouchableOpacity>
        </View>

        {/* Selector de alcance */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-bold text-black`}>Alcance</Text>
          <TouchableOpacity
            onPress={() => { setModalType('alcance'); setModalVisible(true); }}
            style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
          >
            <Text style={tw`${alcance ? "text-black" : "text-gray-500"}`}>
              {alcance || "Selecciona un alcance"}
            </Text>
            <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
          </TouchableOpacity>
        </View>

        {/* Campo de U.P autocompletado */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-bold text-black`}>U.P aproximadas a obtener</Text>
          <TextInput
            style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
            value={up}
            editable={false}
            placeholder="U.P"
          />
        </View>

        {/* Selector de Prioridad */}
        <View style={tw`mb-4 flex-row items-center`}>
          {/* Selector de prioridad */}
          <TouchableOpacity
            onPress={() => { setModalType('prioridad'); setModalVisible(true); }}
            style={tw`flex-1 p-4 border border-gray-700 rounded-lg flex-row justify-between items-center ${priorityColors[priority]} mr-2`}
          >
            <Text style={tw`text-white`}>{priority}</Text>
            <Ionicons name="chevron-down" size={24} color="white" />
          </TouchableOpacity>

          {/* Botón Agregar */}
          <TouchableOpacity
            style={tw`flex-1 p-4 bg-[#003366] rounded-lg ml-2`}
            onPress={() => console.log("Agregar actividad")}
          >
            <Text style={tw`text-white text-center`}>Agregar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Modal para mostrar opciones */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
          <View style={tw`w-4/5 bg-white rounded-lg p-5`}>
            <FlatList
              data={
                modalType === 'funcion' ? funciones :
                modalType === 'actividad' ? actividadesDisponibles.map(a => a.actividad) :
                modalType === 'rol' ? rolesParticipacion :
                modalType === 'alcance' ? alcances :
                modalType === 'prioridad' ? prioridades : []
              }
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={tw`py-3 border-b border-gray-300`} onPress={() => handleModalSelect(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={tw`mt-5 items-center`} onPress={() => setModalVisible(false)}>
              <Text style={tw`text-blue-700 text-base`}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ImageBackground>
  );
};

export default CrearProyeccion;
