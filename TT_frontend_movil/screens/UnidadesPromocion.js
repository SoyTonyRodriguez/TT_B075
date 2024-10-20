import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

  // Opciones de actividades por función con documentos requeridos y U.P
  const actividadesPorFuncion = {
    docencia: [ //OKKKKK
      { actividad: "Carga académica", documento: "Registro Único de Actividades Académicas (RUAA) o constancia de carga académica suscrita por las autoridades competentes.", up: ['1.00 U.P. por hora en nivel superior.', '1.00 por cada 15 horas de módulos '] },
      { actividad: "Elaboración e Impartición de acciones de formación", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", up: ['4.50 U.P. por cada 15 horas impartidas con evaluación.', '2.00 U.P. por cada 15 horas sin evaluación.'] },
      { actividad: "Programa de inducción", documento: "Constancia de validación emitida por la DEMS, DES o SIP.", up: ['1.00 U.P. por hora/semana/mes en nivel superior.'] },
      { actividad: "Tutorías", documento: "Constancia emitida por la Coordinación Institucional de Tutoría Politécnica (CITP).", up: ['1.00 U.P. por cada hora de tutoría individual a la semana. Máximo: 5.00 U.P. por semestre.', '1.00 U.P. en tutoría grupal por cada hora a la semana en el semestre. Máximo: 5.00 U.P.', '3.00 U.P. en tutoría de regularización por unidad de aprendizaje al semestre.', '5.00 U.P. en tutoría de recuperación académica por unidad de aprendizaje al semestre.', '3.00 U.P. en tutoría a distancia por grupo atendido al semestre.']},
      { actividad: "Diseño y planeación didáctica en el aula", documento: "Constancia emitida por la DEMS, DES o SIP.", up: ['10.00 U.P. por grupo al semestre.', 'Máximo: 20.00 U.P. por periodo de promoción.'] },
      { actividad: "Elaboración de material didáctico para la impartición de catedra", documento: "Constancia emitida por el presidente de la academia o equivalente, con el aval de los integrantes de la misma y el visto bueno del Subdirector Académico.", up: ['5.00 U.P. por transparencias, rotafolios.', '8.00 U.P. por antología de la asignatura', '10.00 U.P. por problemario.', '15.00 U.P. por modelos tridimensionales.', '20.00 U.P. por prototipos.', 'Máximo: 25.00 U.P. por periodo de promoción.'] },
      { actividad: "Elaboración de material didáctico digital", documento: "Constancia emitida por la DEMS, DES o SIP.", up: ['Tratamiento educativo: Curso completo 60.00 U.P.', 'Apoyo educativo: Curso completo 40.00 U.P.', 'Informativos: Curso completo 20.00 U.P.', 'Tratamiento educativo: Unidad o Módulo 40.00 U.P.', 'Apoyo educativo: Unidad o Módulo 20.00 U.P.', 'Indormativos: Unidad o Módulo 5.00 U.P.'] },
      { actividad: "Autoría de libros", documento: "Constancia de validación emitida por la DEMS, DES o SIP.", up: ['80.00 U.P. por libro con evaluación excelente.', '50.00 U.P. por libro con evaluación buena.', '20.00 U.P. por libro con evaluación regular.'] },
      { actividad: "Elaboración de apuntes, instructivos de talleres y prácticas de laboratorio", documento: "Constancia emitida por la DEMS o DES.", up: ['30.00 U.P. por evaluación excelente.', '20.00 U.P. por evaluación buena.', '15.00 U.P. por evaluación regular.'] },
      { actividad: "Elaboración de reactivos para guías de estudio y exámenes de admisión", documento: "Constancia emitida por la DEMS o DES.", up: ['30.00 U.P. por evaluación excelente.', '20.00 U.P. por evaluación buena.', '15.00 U.P. por evaluación regular.'] },
      { actividad: "Evaluación, diseño y/o rediseño de programas académicos", documento: "Constancia emitida por la DEMS, DES o SIP.", rol: "Coordinador o Participante", up: ['Coordinador "Evaluación o Rediseño": Plan de Estudio (Programa Académico) 10.00 U.P.', 'Participante "Evaluación o Rediseño": Plan de Estudio (Programa Académico) 3.00 U.P.', 'Coordinador "Diseño": Plan de Estudio (Programa Académico) 20.00 U.P.', 'Participante "Diseño": Plan de Estudio (Programa Académico) 10.00 U.P.', 'Coordinador "Evaluación o Rediseño": Programa de Estudio de una Unidad de Aprendizaje 5.00 U.P.', 'Participante "Evaluación o Rediseño": Programa de Estudio de una Unidad de Aprendizaje 3.00 U.P', 'Coordinador "Diseño": Programa de Estudio de una Unidad de Aprendizaje 8.00 U.P', 'Participante "Diseño": Programa de Estudio de una Unidad de Aprendizaje 4.00 U.P'] },
      { actividad: "Elaboración de software educativo", documento: "Constancia emitida por la DEMS, DES o SIP.", up: ['Simulador Complejo e Integrado 15.00 U.P.', 'Sistema Complejo e Integrado 15.00 U.P.', 'Tutorial Interactivo Complejo e Integrado 10.00 U.P.', 'Simulador Modular 10.00 U.P.', 'Sistema Modular 10.00 U.P.', 'Tutorial Interactivo Modular 5.00 U.P.'] }, 
      { actividad: "Elaboración de hardware", documento: "Constancia emitida por la DEMS, DES o SIP. (Definido la calidad del 'hardware')", up: ['75.00 U.P. excelente calidad.', '55.00 U.P. buena calidad.', '35.00 U.P. regular calidad.'] },
      { actividad: "Producción de Unidades de Aprendizaje en línea", documento: "Constancia emitida por la UPEV con el visto bueno de la DEMS, DES o SIP.", rol: "Profesor-autor o Diseñador o Comunicólo o Programador web o Diseñador gráfico o Supervisor", up: ['Profesor-autor 8.00 U.P.', 'Diseñador 8.00 U.P.', 'Comunicólo 5.00 U.P.', 'Programador web 5.00 U.P.', 'Diseñador gráfico 5.00 U.P.', 'Supervisor 3.00 U.P.'] },
      { actividad: "Proyecto Aula", documento: "Constancia emitida por la DEMS.", up: "5.00 U.P. por proyecto semestral" },
      { actividad: "Certificación de laboratorios y validación de pruebas de laboratorio", documento: "Certificado emitido por una entidad reconocida y constancia del titular del centro de trabajo.", up: ['20.00 U.P. para certificación de laboratorios.', '5.00 U.P. para validación de pruebas de laboratorio'] },
    ],    
    investigacion: [ // TODO BIEN
      { actividad: "Proyectos de investigación con financiamiento interno", documento: "Constancia emitida por la SIP.", up: ['5.00 U.P. con el 20% de avance inicial como director.', '3.00 U.P. con el 20% de avance inicial como participante.', '25.00 U.P. por proyecto terminado como director.', '15.00 U.P. por proyecto terminado como participante.', 'Máximo 2 proyectos como director y 3 proyectos como participante.'], rol: "Director o Participante", alcance: "Nacional" }, // OK //'Máximo 2 proyectos como director y 3 proyectos como participante por periodo de promoción.'
      { actividad: "Proyectos vinculados con financiamiento externo", documento: "Contrato o convenio, carta de aceptación del informe final o carta de finiquito, informe técnico.", up: ['25.00 U.P. como director por proyecto terminado.', '15.00 U.P. como participante por proyecto terminado.'], rol: "Director o Participante", alcance: "Nacional" }, //OK
      { actividad: "Publicación de artículos científicos y técnicos", documento: "Constancia de validación emitida por la SIP.", up:['3.00 U.P. por artículo de circulación institucional.', '5.00 U.P. por artículo de circulación nacional.', '10.00 U.P. por artículo de circulación nacional con jurado.', '20.00 U.P. por artículo de circulación internacional.', 'Máximo 5 publicaciones por periodo de promoción.'], rol: "Autor", alcance: "Nacional o Internacional"  },//OK  //'Máximo 5 publicaciones por periodo de promoción.'
      { actividad: "Estancias de Investigación", documento: "Oficio de aceptación para realizar la estancia, dictamen del COTEBAL o de la Coordinación de Proyectos Especiales de la Secretaría Académica, carta de terminación expedida por la institución donde se realizó la estancia.", up: "15.00 U.P. por año" }, //OK
      { actividad: "Desarrollo de patentes", documento: "Solicitud de registro, resultado del examen de forma, título de la patente.", up: ['40.00 para solicitud de registro de patentes nacionales del IPN.', '50.00 para aprobación del examen nacional de forma.', '60.00 para obtención de patentes nacionales del IPN con registro en el IMPI ', '80.00 para obtención de patentes internacionales del IPN '],  rol: "Solicitante", alcance: "Nacional o Internacional" } //OK
    ],
    superacion: [ //TODAS BIEN
      { actividad: "Otra licenciatura", documento: "Constancia de validación emitida por la DES.", up: ['60.00 U.P. por licenciatura.'] }, //OK
      { actividad: "Cursos de actualización, seminarios y talleres", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE para impartidos por el IPN, Constancia de validación emitida por la DEMS, DES o SIP para impartidos en institución distinta al IPN.", up: ['3.00 con evaluación por cada 15 horas', '1.00 sin evaluación por cada 15 horas', '8.00 con evaluación por cada 20 horas de identidad institucional', 'Máximo 7 cursos por periodo de promoción.'] }, //OK
      { actividad: "Estudios de especialidad, maestría y doctorado", documento: "Constancia de validación emitida por la SIP.", up: ['75.50 U.P. por especialidad.', '88.50 U.P. por maestría.', '108.50 U.P. por doctorado.'] }, //OK
      { actividad: "Cursos de propósito específico", documento: "Constancia emitida por la SIP.", up: ['6.00 U.P. por cada 30 horas de curso.' , 'Máximo: 30.00 U.P. por periodo de promoción.'] }, //OK
      { actividad: "Diplomados", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", up: ['40.00 U.P. por diplomado de 180 horas.'] }, //OK
      { actividad: "Idiomas", documento: "Constancia emitida por la Dirección de Formación en Lenguas Extranjeras y/o certificado emitido por el CENLEX Santo Tomás o Zacatenco.", up: ['8.00 U.P. por expresión oral.', '8.00 U.P. por expresión escrita.', '5.00 U.P. por comprensión de lectura.', '5.00 U.P. por comprensión auditiva.'] } //OK
    ],
    complementarias: [
      { actividad: "Distinciones académicas", documento: "Constancia de validación emitida por la SIP.", rol: "Nivel 1 o Nivel 2 o Nivel 3 o Nivel 4 o Nivel 5 o Nivel 6", up: ['Nivel 1: 31 U.P.', 'Nivel 2: 26 U.P.', 'Nivel 3: 21 U.P.', 'Nivel 4: 16 U.P.', 'Nivel 5: 11 U.P.', 'Nivel 6: 10 U.P.'] },
    //  { actividad: "Actividades académico-administrativas y sindicales", documento: "Constancia u oficio de designación y documento que acredite el término del cargo.", rol: "Director general" ,up: "Pendiente" },
      { actividad: "Dirección o asesoría de trabajos escritos para titulación", documento: "Oficio, constancia o formato de designación suscrito por el Titular de la unidad académica o autoridad competente.", up: ['5.00 U.P. por trabajo asesorado.', 'Máximo: 20.00 U.P. por periodo de promoción.'] },
      { actividad: "Jurado de examen profesional o de grado", documento: "Acta de examen profesional o de grado.", up: ['4.00 U.P. por jurado.', 'Máximo: 20.00 U.P. por periodo de promoción.'] },
      { actividad: "Experiencia profesional no docente relevante", documento: "Constancia del trabajo profesional desarrollado fuera del IPN con el aval del Titular de la unidad académica.", up: ['10.00 U.P. al año.', 'Máximo: 20.00 U.P. por periodo de promoción.'] },
      { actividad: "Traducciones", documento: "Oficio de reconocimiento emitido por la academia.", up: ['15.00 U.P. por libro traducido.', 'Máximo: 30.00 U.P. por periodo de promoción.'] },
      { actividad: "Eventos nacionales e internacionales de ciencia y formación integral", documento: "Constancia emitida por la Subdirección Académica con el visto bueno del Titular de la unidad académica y el aval de la DEMS, DES o SIP.", up: ['5.00 U.P. por evento nacional.', '7.00 U.P. por evento internacional.', 'Máximo: 14.00 U.P. por periodo de promoción.'], alcance: "Nacional o Internacional" }, //OK
      { actividad: "Evaluación de prácticas escolares", documento: "Constancia emitida por el Departamento de Extensión y Apoyos Educativos con el visto bueno del Titular de la unidad académica.", up: ['3.00 U.P. por grupo atendido.', 'Máximo: 6.00 U.P. por periodo de promoción.'] },
      { actividad: "Evaluación de informes de los prestadores de servicio social", documento: "Constancia emitida por el Departamento de Extensión y Apoyos Educativos con el visto bueno del Titular de la unidad académica.", up: ['1.00 U.P. por grupo atendido.', 'Máximo: 2.00 U.P. por periodo de promoción.'] },
      { actividad: "Evaluación de certámenes académicos", documento: "Constancia de participación emitida por la instancia correspondiente.", up: ['5.00 U.P. por evento evaluado.', 'Máximo: 15.00 U.P. por periodo de promoción.'] },
      { actividad: "Servicio externo por obra puntual, sin compensación económica", documento: "Solicitud del servicio externo, aceptación por el centro de trabajo y constancia de participación.", up: '2.00 por cada 80 horas de servicio externo' },
      { actividad: "Ponente en conferencias, videoconferencias y expositor de carteles", documento: "Constancia de participación como conferencista o expositor de carteles.", up: ['Nacional 3.00 por cartel o por conferencia.', 'Nacional 4.00 por videoconferencia.', 'Nacional 6.00 por conferencia magistral.', 'Internacional 6.00 por cartel o por conferencia.', 'Internacional 7.00 por videoconferencia.', 'Internacional 8.00 por conferencia magistral.', 'Máximo: 24.00 U.P. por periodo de promoción.'], rol: "Expositor", alcance: "Nacional o Internacional"}, //OK
      { actividad: "Expositor y asistente en congresos, simposios, reuniones, mesas redondas, coloquios, encuentros, paneles y foros", documento: "Constancia de participación emitida por la instancia correspondiente.", up: ['2.00 U.P. por asistente en evento nacional.', '4.00 U.P. por expositor en evento nacional.', '3.00 U.P. por asistente en evento internacional.', '7.00 U.P. por expositor en evento internacional.', 'Máximo 3 eventos por periodo de promoción.'], rol: "Expositor o Asistente", alcance: "Nacional o Internacional"}, //AQUI TODAVIA NO
      { actividad: "Comisiones de evaluación", documento: "Oficio de designación o constancia emitida por la DEMS, DES o SIP.", up: ['5.00 U.P. como coordinador.', '3.00 U.P. como analista'], rol: "Coordinador o Analista"},
      { actividad: "Programas y proyectos institucionales en áreas centrales", documento: "Constancia de participación emitida por el área correspondiente.", up: ['Programa institucional: 9.00 por coordinador.', 'Programa institucional: 7.00 por analista.', 'Proyecto institucional: 7.00 por coordinador.', 'Proyecto institucional: 5.00 por analista.', 'Proyecto de dependencia: 5.00 por coordinador.', 'Proyecto de dependencia: 3.00 por analista.'], rol: "Coordinador o Analista"} // OK 
    ],
    extension: [ //TODAS BIEN 
      { actividad: "Participación en la expo-profesiográfica", documento: "Constancia emitida por la Secretaría Académica o por la DEMS o DES.", up: ['2.00 U.P. por expositor.', '3.00 por atención de talleres o concursos', '3.00 por profesor coordinador'], rol: "Expositor o Atención o Profesor", alcance: "Nacional" }, //OK
      { actividad: "Encuentros Académicos Interpolitécnicos", documento: "Constancia de participación emitida por el Titular de la unidad académica.", up: ['2.00 U.P. por evento como asistente. Máximo: 8.00 U.P. por periodo de promoción.'], rol: "Asistente", alcance: "Nacional"  }, //OK
      { actividad: "Brigadas multidisciplinarias de servicio social", documento: "Constancia de participación emitida por la Dirección de Egresados y Servicio Social.", up: ['8.00 U.P. por coordinador de brigada.', '4.00 U.P. por profesor de brigada.', '4.00 U.P. por responsable del programa.'], rol: "Profesor o Coordinador o Responsable", alcance: "Nacional" }, //OK
      { actividad: "Impartición de disciplinas deportivas y/o talleres culturales", documento: "Constancia de participación emitida por la autoridad competente.", up: ['0.50 U.P. por cada hora.'], rol: "Instructor" }, //OK
    ],
  };

const prioridades = ['Baja', 'Media', 'Alta'];

const CrearProyeccion = () => {
  const [funcion, setFuncion] = useState('');
  const [actividad, setActividad] = useState('');
  const [actividadesDisponibles, setActividadesDisponibles] = useState([]);
  const [documento, setDocumento] = useState('');
  const [upOptions, setUpOptions] = useState([]); // Opciones de U.P.
  const [upFiltrada, setUpFiltrada] = useState([]); // Opciones filtradas de U.P.
  const [upSeleccionada, setUpSeleccionada] = useState(''); // U.P. seleccionada 
  const [rol, setRol] = useState('');
  const [alcance, setAlcance] = useState('');
  const [mostrarRol, setMostrarRol] = useState(false); // Controlar si mostrar el rol
  const [mostrarAlcance, setMostrarAlcance] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalType, setModalType] = useState('');
  const [priority, setPriority] = useState(''); 
  const [mostrarCamposAdicionales, setMostrarCamposAdicionales] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]); // Opciones de roles
  const [scopeOptions, setScopeOptions] = useState([]); // Opciones de alcance

  const funciones = Object.keys(actividadesPorFuncion);

  const priorityColors = {
    Baja: 'bg-blue-500',
    Media: 'bg-yellow-500',
    Alta: 'bg-red-500',
  };

  const handleActivityChange = (e) => {
    const selectedActivity = e.target.value;
    setActivity(selectedActivity);  // Guardar actividad seleccionada
    setActivityError(false);        // Eliminar error de actividad
  
    const mappedFunction = functionMapping[functionField];
    const activityInfo = actividadesPorFuncion[mappedFunction]?.find(
      (item) => item.actividad === selectedActivity
    );
  
    if (activityInfo) {
      setDocumentsRequired(activityInfo.documento);
  
      const upsArray = Array.isArray(activityInfo.up) ? activityInfo.up : [activityInfo.up];
      setUnitsOptions(upsArray);
      setUnits(upsArray.length === 1 ? upsArray[0] : '');  // Seleccionar automáticamente si solo hay una opción
  
      if (activityInfo.rol) {
        const rolesArray = activityInfo.rol.split(' o ');
        setRoleOptions(rolesArray);
        setMostrarRol(rolesArray.length > 1);  // Mostrar solo si hay más de un rol
      } else {
        setRoleOptions([]);
        setMostrarRol(false);  // Ocultar si no hay roles
      }
  
      if (activityInfo.alcance) {
        const scopeArray = activityInfo.alcance.split(' o ');
        setScopeOptions(scopeArray);
        setMostrarAlcance(scopeArray.length > 1);  // Mostrar solo si hay más de un alcance
        setScope(scopeArray.length === 1 ? scopeArray[0] : '');  // Seleccionar automáticamente si solo hay uno
      } else {
        setScopeOptions([]);
        setMostrarAlcance(false);  // Ocultar si no hay alcance
      }
    } else {
      resetCamposDependientes();  // Limpiar si no hay actividad seleccionada
    }
  };  
  
  const handleFunctionChange = (selectedFunction) => {
    setFuncion(selectedFunction);
    setActividad(''); // Limpiar la actividad seleccionada
    setDocumento(''); // Limpiar documento
    setUpOptions([]); // Limpiar opciones U.P.
    setUpSeleccionada(''); // Limpiar U.P. seleccionada
    setRol(''); // Limpiar rol seleccionado
    setAlcance(''); // Limpiar alcance seleccionado
    setPriority(''); // Limpiar prioridad

    setMostrarRol(false); // Ocultar selector de rol
    setMostrarAlcance(false); // Ocultar selector de alcance

    // Actualizar actividades disponibles según la función seleccionada
    setActividadesDisponibles(actividadesPorFuncion[selectedFunction] || []);
  };
  
  // Función para resetear todos los campos dependientes
  const resetCamposDependientes = () => {
    setActivity('');           // Limpiar actividad seleccionada
    setDocumentsRequired('');  // Limpiar documento requerido
    setUnitsOptions([]);        // Limpiar opciones de U.P.
    setUnits('');               // Limpiar U.P. seleccionada
    setRoleOptions([]);         // Limpiar opciones de rol
    setScopeOptions([]);        // Limpiar opciones de alcance
    setRol('');                 // Limpiar rol seleccionado
    setScope('');               // Limpiar alcance seleccionado
    setPriority('');            // Limpiar prioridad
    setMostrarRol(false);       // Ocultar selector de rol
    setMostrarAlcance(false);   // Ocultar selector de alcance
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
        setUpOptions(actividadEncontrada.up); // Guardar opciones de U.P.
        setUpFiltrada(actividadEncontrada.up); // Iniciar con todas las opciones disponibles
        setMostrarCamposAdicionales(true);

        setMostrarRol(!!actividadEncontrada.rol); // Mostrar rol solo si existe
        setMostrarAlcance(!!actividadEncontrada.alcance); 
      }
    } else if (modalType === 'rol') {
      setRol(item);
      filtrarUp(); // Aplicar filtro al seleccionar rol
    } else if (modalType === 'alcance') {
      setAlcance(item);
      filtrarUp(); // Aplicar filtro al seleccionar alcance
    } else if (modalType === 'up') {
      setUpSeleccionada(item); // Seleccionar la U.P.
    } else if (modalType === 'prioridad') {
      setPriority(item);
    }
    setModalVisible(false);
  };

  const filtrarUp = () => {
    // Filtrar las U.P. en función del rol y alcance seleccionados
    let opcionesFiltradas = upOptions;

    if (rol) {
      opcionesFiltradas = opcionesFiltradas.filter(up => up.includes(rol));
    }
    if (alcance) {
      opcionesFiltradas = opcionesFiltradas.filter(up => up.includes(alcance));
    }

    setUpFiltrada(opcionesFiltradas);

    // Si solo hay una opción después del filtro, seleccionarla automáticamente
    if (opcionesFiltradas.length === 1) {
      setUpSeleccionada(opcionesFiltradas[0]);
    } else {
      setUpSeleccionada(''); // Limpiar selección si hay varias opciones
    }
  };


  return (
    <ImageBackground source={require('../assets/images/fondo.jpg')} style={tw`flex-1`}>
      <View style={tw`px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Unidades de promoción</Text>
      </View>

      <ScrollView style={tw`px-5`}>
        {/* Selector de Función */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-bold text-black`}>Función</Text>
          <TouchableOpacity
            onPress={() => { setModalType('funcion'); setModalVisible(true); }}
            style={tw`w-full p-4 border rounded-lg bg-white mb-3 flex-row justify-between`}
          >
            <Text style={tw`${funcion ? "text-black" : "text-gray-500"}`}>
              {funcion || "Selecciona una función"}
            </Text>
            <Ionicons name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Selector de Actividad */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-bold text-black`}>Actividad</Text>
          <TouchableOpacity
            onPress={() => { setModalType('actividad'); setModalVisible(true); }}
            style={tw`w-full p-4 border rounded-lg bg-white mb-3 flex-row justify-between`}
            disabled={actividadesDisponibles.length === 0}
          >
            <Text style={tw`${actividad ? "text-black" : "text-gray-500"}`}>
              {actividad || "Selecciona una actividad"}
            </Text>
            <Ionicons name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Mostrar rol, alcance y U.P. solo después de seleccionar una actividad */}
        {mostrarCamposAdicionales && (
          <>
            {/* Selector de Rol */}
            {mostrarRol && roleOptions.length > 0 && (
              <View style={tw`mb-4`}>
                <Text style={tw`text-base font-bold text-black`}>Rol</Text>
                <TouchableOpacity
                  onPress={() => { setModalType('rol'); setModalVisible(true); }}
                  style={tw`w-full p-4 border rounded-lg bg-white mb-3 flex-row justify-between`}
                >
                  <Text style={tw`${rol ? "text-black" : "text-gray-500"}`}>
                    {rol || "Selecciona un rol"}
                  </Text>
                  <Ionicons name="chevron-down" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}

            {/* Selector de Alcance */}
            {mostrarAlcance && (
              <View style={tw`mb-4`}>
                <Text style={tw`text-base font-bold text-black`}>Alcance</Text>
                <TouchableOpacity
                  onPress={() => { setModalType('alcance'); setModalVisible(true); }}
                  style={tw`w-full p-4 border rounded-lg bg-white mb-3 flex-row justify-between`}
                >
                  <Text style={tw`${alcance ? "text-black" : "text-gray-500"}`}>
                    {alcance || "Selecciona un alcance"}
                  </Text>
                  <Ionicons name="chevron-down" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}

            {/* Selector de U.P. */}
            {upFiltrada.length > 1 ? (
              <View style={tw`mb-4`}>
                <Text style={tw`text-base font-bold text-black`}>Selecciona U.P.</Text>
                <TouchableOpacity
                  onPress={() => { setModalType('up'); setModalVisible(true); }}
                  style={tw`w-full p-4 border rounded-lg bg-white mb-3 flex-row justify-between`}
                >
                  <Text style={tw`${upSeleccionada ? "text-black" : "text-gray-500"}`}>
                    {upSeleccionada || "Selecciona una opción"}
                  </Text>
                  <Ionicons name="chevron-down" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={tw`mb-4`}>
                <Text style={tw`text-base font-bold text-black`}>U.P.</Text>
                <TextInput
                  style={tw`w-full p-4 border rounded-lg bg-white text-black mb-3`}
                  value={upSeleccionada || 'Sin U.P. disponible'}
                  editable={false}
                />
              </View>
            )}
          </>
        )}

        <View style={tw`mb-4 flex-row justify-between items-center`}>
          {/* Botón de Prioridad */}
          <TouchableOpacity
            onPress={() => { setModalType('prioridad'); setModalVisible(true); }}
            style={tw`flex-1 h-12 rounded-lg flex-row justify-between items-center px-4 mr-2 ${
              priority ? priorityColors[priority] : 'bg-white border border-gray-400'
            }`}
          >
            <Text style={tw`${priority ? 'text-white' : 'text-gray-500'}`}>
              {priority || "Selecciona una prioridad"}
            </Text>
            <Ionicons name="chevron-down" size={20} color={priority ? 'white' : 'black'} />
          </TouchableOpacity>

          {/* Botón Agregar */}
          <TouchableOpacity
            style={tw`flex-1 h-12 bg-[#003366] rounded-lg justify-center items-center ml-2`}
            onPress={() => console.log("Agregar actividad")}
          >
            <Text style={tw`text-white text-center text-lg`}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Modal para selección */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
          <View style={tw`w-4/5 bg-white rounded-lg p-5`}>
            <FlatList
              data={
                modalType === 'funcion' ? funciones :
                modalType === 'actividad' ? actividadesDisponibles.map((a) => a.actividad) :
                modalType === 'rol' ? roleOptions :
                modalType === 'alcance' ? scopeOptions :
                modalType === 'up' ? upFiltrada : []
              }
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={tw`py-3 border-b border-gray-300`}
                  onPress={() => handleModalSelect(item)}
                >
                  <Text style={tw`text-black`}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tw`mt-5 items-center`}
            >
              <Text style={tw`text-blue-700 text-base`}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default CrearProyeccion;