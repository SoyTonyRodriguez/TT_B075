import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { get_Check_Products } from '../api/check_products.api'; 
import { AuthContext } from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

import tw from 'twrnc';

  // Opciones de actividades por función con documentos requeridos y U.P
  const actividadesPorFuncion = {
    "Docencia": [ //OKKKKK
      { actividad: "Carga académica", documento: "Registro Único de Actividades Académicas (RUAA) o constancia de carga académica suscrita por las autoridades competentes.", up: ['1.00 U.P. por hora en nivel superior.', '1.00 por cada 15 horas de módulos '] },
    ],     
    "Otras actividades en docencia": [
      { actividad: "Elaboración e Impartición de acciones de formación", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", up: ['4.50 U.P. por cada 15 horas impartidas con evaluación.', '2.00 U.P. por cada 15 horas sin evaluación.'] },//OK
      { actividad: "Programa de inducción", documento: "Constancia de validación emitida por la DEMS, DES o SIP.", up: ['1.00 U.P. por hora/semana/mes en nivel superior.'] },//OK
      { actividad: "Tutorías", documento: "Constancia emitida por la Coordinación Institucional de Tutoría Politécnica (CITP).", up: ['1.00 U.P. por cada hora de tutoría individual a la semana.', '1.00 U.P. en tutoría grupal por cada hora a la semana en el semestre.', '3.00 U.P. en tutoría de regularización por unidad de aprendizaje al semestre.', '5.00 U.P. en tutoría de recuperación académica por unidad de aprendizaje al semestre.', '3.00 U.P. en tutoría a distancia por grupo atendido al semestre.']},//OK
      { actividad: "Diseño y planeación didáctica en el aula", documento: "Constancia emitida por la DEMS, DES o SIP.", up: ['10.00 U.P. por grupo al semestre.', 'Máximo: 20.00 U.P. por periodo de promoción.'] },//OK
      { actividad: "Elaboración de material didáctico para la impartición de catedra", documento: "Constancia emitida por el presidente de la academia o equivalente, con el aval de los integrantes de la misma y el visto bueno del Subdirector Académico.", up: ['5.00 U.P. por transparencias, rotafolios.', '8.00 U.P. por antología de la asignatura', '10.00 U.P. por problemario.', '15.00 U.P. por modelos tridimensionales.', '20.00 U.P. por prototipos.', 'Máximo: 25.00 U.P. por periodo de promoción.'] },//OK
      { actividad: "Elaboración de material didáctico digital", documento: "Constancia emitida por la DEMS, DES o SIP.", up: ['Tratamiento educativo: Curso completo 60.00 U.P.', 'Apoyo educativo: Curso completo 40.00 U.P.', 'Informativos: Curso completo 20.00 U.P.', 'Tratamiento educativo: Unidad o Módulo 40.00 U.P.', 'Apoyo educativo: Unidad o Módulo 20.00 U.P.', 'Indormativos: Unidad o Módulo 5.00 U.P.'] },//OK
      { actividad: "Autoría de libros", documento: "Constancia de validación emitida por la DEMS, DES o SIP.", up: ['80.00 U.P. por libro con evaluación excelente.', '50.00 U.P. por libro con evaluación buena.', '20.00 U.P. por libro con evaluación regular.'] },//OK
      { actividad: "Elaboración de apuntes, instructivos de talleres y prácticas de laboratorio", documento: "Constancia emitida por la DEMS o DES.", up: ['30.00 U.P. por evaluación excelente.', '20.00 U.P. por evaluación buena.', '15.00 U.P. por evaluación regular.'] },//OK
      { actividad: "Elaboración de reactivos para guías de estudio y exámenes de admisión", documento: "Constancia emitida por la DEMS o DES.", up: ['30.00 U.P. por evaluación excelente.', '20.00 U.P. por evaluación buena.', '15.00 U.P. por evaluación regular.'] },//OK
      { actividad: "Evaluación, diseño y/o rediseño de programas académicos", documento: "Constancia emitida por la DEMS, DES o SIP.", rol: "Coordinador o Participante", up: ['Coordinador "Evaluación o Rediseño": Plan de Estudio (Programa Académico) 10.00 U.P.', 'Participante "Evaluación o Rediseño": Plan de Estudio (Programa Académico) 3.00 U.P.', 'Coordinador "Diseño": Plan de Estudio (Programa Académico) 20.00 U.P.', 'Participante "Diseño": Plan de Estudio (Programa Académico) 10.00 U.P.', 'Coordinador "Evaluación o Rediseño": Programa de Estudio de una Unidad de Aprendizaje 5.00 U.P.', 'Participante "Evaluación o Rediseño": Programa de Estudio de una Unidad de Aprendizaje 3.00 U.P', 'Coordinador "Diseño": Programa de Estudio de una Unidad de Aprendizaje 8.00 U.P', 'Participante "Diseño": Programa de Estudio de una Unidad de Aprendizaje 4.00 U.P'] },//OK
      { actividad: "Elaboración de software educativo", documento: "Constancia emitida por la DEMS, DES o SIP.", up: ['Simulador Complejo e Integrado 15.00 U.P.', 'Sistema Complejo e Integrado 15.00 U.P.', 'Tutorial Interactivo Complejo e Integrado 10.00 U.P.', 'Simulador Modular 10.00 U.P.', 'Sistema Modular 10.00 U.P.', 'Tutorial Interactivo Modular 5.00 U.P.'] }, //OK
      { actividad: "Elaboración de hardware", documento: "Constancia emitida por la DEMS, DES o SIP. (Definido la calidad del 'hardware')", up: ['75.00 U.P. excelente calidad.', '55.00 U.P. buena calidad.', '35.00 U.P. regular calidad.'] },//OK
      { actividad: "Producción de Unidades de Aprendizaje en línea", documento: "Constancia emitida por la UPEV con el visto bueno de la DEMS, DES o SIP.", rol: "Profesor-autor o Diseñador o Comunicólo o Programador web o Diseñador gráfico o Supervisor", up: ['Profesor-autor 8.00 U.P.', 'Diseñador 8.00 U.P.', 'Comunicólo 5.00 U.P.', 'Programador web 5.00 U.P.', 'Diseñador gráfico 5.00 U.P.', 'Supervisor 3.00 U.P.'] }, //OK
      { actividad: "Proyecto Aula", documento: "Constancia emitida por la DEMS.", up: ["5.00 U.P. por proyecto semestral"] }, //OK
      { actividad: "Certificación de laboratorios y validación de pruebas de laboratorio", documento: "Certificado emitido por una entidad reconocida y constancia del titular del centro de trabajo.", up: ['20.00 U.P. para certificación de laboratorios.', '5.00 U.P. para validación de pruebas de laboratorio'] }, //OK
    ],
    "Investigación": [ //Falla la tercera y la ultima 
      { actividad: "Proyectos de investigación con financiamiento interno", documento: "Constancia emitida por la SIP.", up: ['5.00 U.P. con el 20% de avance inicial como director.', '3.00 U.P. con el 20% de avance inicial como participante.', '25.00 U.P. por proyecto terminado como director.', '15.00 U.P. por proyecto terminado como participante.', 'Máximo 2 proyectos como director y 3 proyectos como participante.'], rol: "Director o Participante" }, // OK //'Máximo 2 proyectos como director y 3 proyectos como participante por periodo de promoción.'
      { actividad: "Proyectos vinculados con financiamiento externo", documento: "Contrato o convenio, carta de aceptación del informe final o carta de finiquito, informe técnico.", up: ['25.00 U.P. como director por proyecto terminado.', '15.00 U.P. como participante por proyecto terminado.'], rol: "Director o Participante"}, //OK
      { actividad: "Publicación de artículos científicos y técnicos", documento: "Constancia de validación emitida por la SIP.", up:['3.00 U.P. por artículo de circulación institucional.', '5.00 U.P. por artículo de circulación nacional.', '10.00 U.P. por artículo de circulación nacional con jurado.', '20.00 U.P. por artículo de circulación internacional.', 'Máximo 5 publicaciones por periodo de promoción.'], rol: "Autor", alcance: "Nacional o Internacional"  },//AQUI NO ME DEJA ELEGIR
      { actividad: "Estancias de Investigación", documento: "Oficio de aceptación para realizar la estancia, dictamen del COTEBAL o de la Coordinación de Proyectos Especiales de la Secretaría Académica, carta de terminación expedida por la institución donde se realizó la estancia.", up: ['15.00 U.P. por año'] }, //OK
      { actividad: "Desarrollo de patentes", documento: "Solicitud de registro, resultado del examen de forma, título de la patente.", up: ['40.00 para solicitud de registro de patentes nacionales del IPN.', '50.00 para aprobación del examen nacional de forma.', '60.00 para obtención de patentes nacionales del IPN con registro en el IMPI ', '80.00 para obtención de patentes internacionales del IPN '],  rol: "Solicitante", alcance: "Nacional o Internacional" } //AQUI TAMPOCO SALE NADA 
    ],
    "Superación académica": [ //TODAS BIEN
      { actividad: "Otra licenciatura", documento: "Constancia de validación emitida por la DES.", up: ['60.00 U.P. por licenciatura.'] }, //OK
      { actividad: "Cursos de actualización, seminarios y talleres", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE para impartidos por el IPN, Constancia de validación emitida por la DEMS, DES o SIP para impartidos en institución distinta al IPN.", up: ['3.00 con evaluación por cada 15 horas', '1.00 sin evaluación por cada 15 horas', '8.00 con evaluación por cada 20 horas de identidad institucional', 'Máximo 7 cursos por periodo de promoción.'] }, //OK
      { actividad: "Estudios de especialidad, maestría y doctorado", documento: "Constancia de validación emitida por la SIP.", up: ['75.50 U.P. por especialidad.', '88.50 U.P. por maestría.', '108.50 U.P. por doctorado.'] }, //OK
      { actividad: "Cursos de propósito específico", documento: "Constancia emitida por la SIP.", up: ['6.00 U.P. por cada 30 horas de curso.' , 'Máximo: 30.00 U.P. por periodo de promoción.'] }, //OK
      { actividad: "Diplomados", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", up: ['40.00 U.P. por diplomado de 180 horas.'] }, //OK
      { actividad: "Idiomas", documento: "Constancia emitida por la Dirección de Formación en Lenguas Extranjeras y/o certificado emitido por el CENLEX Santo Tomás o Zacatenco.", up: ['8.00 U.P. por expresión oral.', '8.00 U.P. por expresión escrita.', '5.00 U.P. por comprensión de lectura.', '5.00 U.P. por comprensión auditiva.'] } //OK
    ],
    "Actividades complementarias de apoyo a la docencia y a la investigación": [ //Fallan y el filtro para nacional e internacional
      { actividad: "Distinciones académicas", documento: "Constancia de validación emitida por la SIP.", rol: "Nivel 1 o Nivel 2 o Nivel 3 o Nivel 4 o Nivel 5 o Nivel 6", up: ['Nivel 1: 31 U.P.', 'Nivel 2: 26 U.P.', 'Nivel 3: 21 U.P.', 'Nivel 4: 16 U.P.', 'Nivel 5: 11 U.P.', 'Nivel 6: 10 U.P.'] }, //OK
    //  { actividad: "Actividades académico-administrativas y sindicales", documento: "Constancia u oficio de designación y documento que acredite el término del cargo.", rol: "Director general" ,up: "Pendiente" },
      { actividad: "Dirección o asesoría de trabajos escritos para titulación", documento: "Oficio, constancia o formato de designación suscrito por el Titular de la unidad académica o autoridad competente.", up: ['5.00 U.P. por trabajo asesorado.', 'Máximo: 20.00 U.P. por periodo de promoción.'] }, //OK
      { actividad: "Jurado de examen profesional o de grado", documento: "Acta de examen profesional o de grado.", up: ['4.00 U.P. por jurado.', 'Máximo: 20.00 U.P. por periodo de promoción.'] },//OK
      { actividad: "Experiencia profesional no docente relevante", documento: "Constancia del trabajo profesional desarrollado fuera del IPN con el aval del Titular de la unidad académica.", up: ['10.00 U.P. al año.', 'Máximo: 20.00 U.P. por periodo de promoción.'] },//OK
      { actividad: "Traducciones", documento: "Oficio de reconocimiento emitido por la academia.", up: ['15.00 U.P. por libro traducido.', 'Máximo: 30.00 U.P. por periodo de promoción.'] },//OK
      { actividad: "Eventos nacionales e internacionales de ciencia y formación integral", documento: "Constancia emitida por la Subdirección Académica con el visto bueno del Titular de la unidad académica y el aval de la DEMS, DES o SIP.", up: ['5.00 U.P. por evento nacional.', '7.00 U.P. por evento internacional.', 'Máximo: 14.00 U.P. por periodo de promoción.'], alcance: "Nacional o Internacional" }, //Recordar el filtro para nacional o internacional
      { actividad: "Evaluación de prácticas escolares", documento: "Constancia emitida por el Departamento de Extensión y Apoyos Educativos con el visto bueno del Titular de la unidad académica.", up: ['3.00 U.P. por grupo atendido.', 'Máximo: 6.00 U.P. por periodo de promoción.'] }, //OK
      { actividad: "Evaluación de informes de los prestadores de servicio social", documento: "Constancia emitida por el Departamento de Extensión y Apoyos Educativos con el visto bueno del Titular de la unidad académica.", up: ['1.00 U.P. por grupo atendido.', 'Máximo: 2.00 U.P. por periodo de promoción.'] }, //OK
      { actividad: "Evaluación de certámenes académicos", documento: "Constancia de participación emitida por la instancia correspondiente.", up: ['5.00 U.P. por evento evaluado.', 'Máximo: 15.00 U.P. por periodo de promoción.'] },//OK
      { actividad: "Servicio externo por obra puntual, sin compensación económica", documento: "Solicitud del servicio externo, aceptación por el centro de trabajo y constancia de participación.", up: ['2.00 por cada 80 horas de servicio externo'] }, //OK
      { actividad: "Ponente en conferencias, videoconferencias y expositor de carteles", documento: "Constancia de participación como conferencista o expositor de carteles.", up: ['Nacional 3.00 por cartel o por conferencia.', 'Nacional 4.00 por videoconferencia.', 'Nacional 6.00 por conferencia magistral.', 'Internacional 6.00 por cartel o por conferencia.', 'Internacional 7.00 por videoconferencia.', 'Internacional 8.00 por conferencia magistral.', 'Máximo: 24.00 U.P. por periodo de promoción.'], rol: "Expositor", alcance: "Nacional o Internacional"}, //AQUI NO 
      { actividad: "Expositor y asistente en congresos, simposios, reuniones, mesas redondas, coloquios, encuentros, paneles y foros", documento: "Constancia de participación emitida por la instancia correspondiente.", up: ['2.00 U.P. por asistente en evento nacional.', '4.00 U.P. por expositor en evento nacional.', '3.00 U.P. por asistente en evento internacional.', '7.00 U.P. por expositor en evento internacional.', 'Máximo 3 eventos por periodo de promoción.'], rol: "Expositor o Asistente", alcance: "Nacional o Internacional"}, //Parece broma, pero este si sirve 
      { actividad: "Comisiones de evaluación", documento: "Oficio de designación o constancia emitida por la DEMS, DES o SIP.", up: ['5.00 U.P. como coordinador.', '3.00 U.P. como analista'], rol: "Coordinador o Analista"},//OK
      { actividad: "Programas y proyectos institucionales en áreas centrales", documento: "Constancia de participación emitida por el área correspondiente.", up: ['Programa institucional: 9.00 por coordinador.', 'Programa institucional: 7.00 por analista.', 'Proyecto institucional: 7.00 por coordinador.', 'Proyecto institucional: 5.00 por analista.', 'Proyecto de dependencia: 5.00 por coordinador.', 'Proyecto de dependencia: 3.00 por analista.'], rol: "Coordinador o Analista"} // OK    
    ],
    "Actividades de extensión, integración y difusión de la ciencia y de la cultura": [ //Fallan 1 y 3
      { actividad: "Participación en la expo-profesiográfica", documento: "Constancia emitida por la Secretaría Académica o por la DEMS o DES.", up: ['2.00 U.P. por expositor.', '3.00 por atención de talleres o concursos', '3.00 por profesor coordinador'], rol: "Expositor o Atención o Profesor", alcance: "Nacional" }, //NO
      { actividad: "Encuentros Académicos Interpolitécnicos", documento: "Constancia de participación emitida por el Titular de la unidad académica.", up: ['2.00 U.P. por evento como asistente.', 'Máximo: 8.00 U.P. por periodo de promoción.'], rol: "Asistente", alcance: "Nacional"  }, //OK
      { actividad: "Brigadas multidisciplinarias de servicio social", documento: "Constancia de participación emitida por la Dirección de Egresados y Servicio Social.", up: ['8.00 U.P. por coordinador de brigada.', '4.00 U.P. por profesor de brigada.', '4.00 U.P. por responsable del programa.'], rol: "Profesor o Coordinador o Responsable", alcance: "Nacional" }, //NO
      { actividad: "Impartición de disciplinas deportivas y/o talleres culturales", documento: "Constancia de participación emitida por la autoridad competente.", up: ['0.50 U.P. por cada hora.'], rol: "Instructor" }, //OK
    ],
  };

  const activitiesWithHours = new Set([
    "Carga académica",
    "Elaboración e Impartición de acciones de formación",
    "Programa de inducción",
    "Tutorías",
    "Cursos de actualización, seminarios y talleres",
    "Cursos de propósito específico",
    "Diplomados",
    "Servicio externo por obra puntual, sin compensación económica",
    "Impartición de disciplinas deportivas y/o talleres culturales",
  ]);

  const CrearProyeccion = () => {
    const [funcion, setFuncion] = useState('');
    const [actividad, setActividad] = useState('');
    const [actividadesDisponibles, setActividadesDisponibles] = useState([]);
    const [documento, setDocumento] = useState('');
    const [up, setUp] = useState('');
    const [upsDisponibles, setUpsDisponibles] = useState([]); // Inicia vacío
    const [upSeleccionada, setUpSeleccionada] = useState(''); 
    const [fecha, setFecha] = useState('');
    const [rol, setRol] = useState('');
    const [alcancesDisponibles, setAlcancesDisponibles] = useState([]); 
    const [alcance, setAlcance] = useState('');  
    const [modalVisible, setModalVisible] = useState(false); 
    const [modalType, setModalType] = useState('');
    const [showCalendar, setShowCalendar] = useState(false); 
    const [rolesDisponibles, setRolesDisponibles] = useState([]); 
    const [mostrarRol, setMostrarRol] = useState(false);
    const [mostrarAlcance, setMostrarAlcance] = useState(false);
    const [mostrarUp, setMostrarUp] = useState(false); 
    const [mostrarDocumento, setMostrarDocumento] = useState(false);
    const [maximoUps, setMaximoUps] = useState([]); // Estado para U.P. con máximo permitido

    const [checkProductData, setCheckProductData] = useState(null); // Datos recibidos
    const { userId, token } = useContext(AuthContext); // Accede al token y userId del contexto
    const [loading, setLoading] = useState(true); // Estado de carga inicial

    // Nuevos estados
    const [showWorkTime, setShowWorkTime] = useState(false); // Controla la visibilidad del campo

    const [workTime, setWorkTime] = useState(''); // Almacena el tiempo seleccionado
    const [category, setCategory] = useState(''); // Categoría del usuario
    const [conditions, setConditions] = useState(null); // Condiciones desde localStorage
    const [max_conditions, setMaxConditions] = useState(null) // Condiciones de maximos desde el localstorage
    const [calculatedUnits, setCalculatedUnits] = useState(''); // U.P. calculadas

    const [hours, setHours] = useState(''); // Estado para almacenar las horas
    const [hoursError, setHoursError] = useState(''); // Estado para mostrar errores de validación
    const [hourLimits, setHourLimits] = useState({ min: 0, max: 200 }); // Almacena los límites de horas

    const [category_normalized, setCategoryNormalized] = useState(''); // Categoría normalizada
    const [hoursCalculated, setHoursCalculated] = useState(1); // Estado para almacenar el segundo número (horas)

    const [up_allowed, setUpAllowed] = useState(''); // Estado para almacenar las U.P. permitidas
    const [isUnitsSelected, setIsUnitsSelected] = useState(false); 
    const [modalWorkTimeVisible, setModalWorkTimeVisible] = useState(false); // Modal específico para tiempo de trabajo

    
    useEffect(() => {
  
      const fetchCheckProducts = async (userId) => {
        try {
          setLoading(true);
          const response = await get_Check_Products(userId); // Llamada a la API
          setCheckProductData(response.data); // Almacenar los datos recibidos
          console.log('Datos recibidos:', response.data);
        } catch (error) {
          console.error('Error al obtener datos:', error);
          setError('No se pudo cargar la información.'); // Mostrar mensaje de error
        } finally {
          setLoading(false);
        }
      };
  
      if (userId) {
        fetchCheckProducts(userId);
      }
    }, [userId]);

      // Obtener la categoría y las condiciones del localStorage al cargar el componente
    useEffect(() => {
      const load_data = async () => {
        const storedAccountDetails = await AsyncStorage.getItem('accountDetails');
        const storedConditions = await AsyncStorage.getItem('conditions');
        const storedMaxConditions = await AsyncStorage.getItem('conditions_max');

        if (storedAccountDetails && storedConditions && storedMaxConditions) {
          const accountDetails = JSON.parse(storedAccountDetails);
          const normalizedCategory = normalizeCategory(accountDetails.category);
          console.log(userId);
          setCategoryNormalized(normalizeCategory(accountDetails.category));

          setCategory(normalizedCategory);
          setConditions(JSON.parse(storedConditions));
          setMaxConditions(JSON.parse(storedMaxConditions));
        }
      };
      load_data();
    }, []);

    // Función para normalizar la categoría del usuario
    const normalizeCategory = (category) => {
      const words = category.toLowerCase().trim().split(/\s+/); // Divide la cadena en palabras.
      words.pop(); // Elimina la última palabra.
      return words.join('_'); // Une las palabras restantes con '_'.
    };

    const normalizeFuction = (functionField) => {
      const mappings = {
        "Docencia": "carga_academica",
        "Otras actividades en docencia": "otras_actividades",
        "Investigación": "investigacion",
        "Superación académica": "superacion_academica",
        "Actividades complementarias de apoyo a la docencia y a la investigación": "actividades_complementarias",
        "Actividades de extensión, integración y difusión de la ciencia y de la cultura": "actividades_extension"
      };
  
      return mappings[functionField];
    };


  // **Manejo del cambio en horas ingresadas**
  const handleHoursChange = (text) => {
    const enteredHours = parseInt(text, 10);
    setHours(enteredHours);

    const { min, max } = hourLimits;

    if (enteredHours < min || enteredHours > max) {
      setHoursError(`Las horas deben estar entre ${min} y ${max}.`);
      setCalculatedUnits('');
      return;
    }

    setHoursError(''); // Limpiar errores

    // Calcular U.P. si la actividad es "Carga académica"
    if (actividad === 'Carga académica') {
      const units = enteredHours * 4; // 4 U.P. por hora
      setCalculatedUnits(units);
      validateUP(units);
    } else if (actividad === "Programa de inducción") {
      const units = enteredHours * 4;
      setCalculatedUnits(units);
      //validateUP(units);
    } else {
      console.log(hoursCalculated);
      const units = Math.floor(enteredHours / hoursCalculated) * up_allowed;
      setCalculatedUnits(units);
      //validateUP(units);
    }
  };

  // **Validar que no se supere el límite de U.P. permitidas** (solo en carga académica)
  const validateUP = (units) => {
    if (conditions && category) {
      const maxUP = conditions?.carga_academica?.[category]?.[workTime]?.up?.max || 0;
      if (units > maxUP) {
        setHoursError(`Las U.P. calculadas superan el máximo permitido (${maxUP} U.P.).`);
        setCalculatedUnits(maxUP); // Establecer el máximo permitido
      }
    }
  };

  // **Manejo del cambio en tiempo de trabajo**
  const handleWorkTimeChange = (selectedOption) => {
    setWorkTime(selectedOption);
    console.log("category", category);

    if (conditions && category) {
      const horas = conditions.carga_academica[category]?.[selectedOption]?.horas || { min: 0, max: 200 };
      setHourLimits(horas);
    }
  };

  const options_work_time = [
    { value: 'medio_tiempo', label: 'Medio tiempo' },
    { value: 'tres_cuartos_tiempo', label: 'Tres cuartos' },
    { value: 'tiempo_completo', label: 'Tiempo completo' },
  ];


    const funciones = Object.keys(actividadesPorFuncion);
  
    const filtrarUPs = (rolSeleccionado, alcanceSeleccionado) => {
      if (!actividad) return; // No hacer nada si no hay actividad seleccionada
    
      const actividadEncontrada = actividadesDisponibles.find(
        (act) => act.actividad === actividad
      );
    
      if (actividadEncontrada) {
        // Si hay un solo rol o alcance, seleccionarlo automáticamente
        if (rolesDisponibles.length === 1 && !rolSeleccionado) {
          setRol(rolesDisponibles[0]);
          rolSeleccionado = rolesDisponibles[0];
        }
        if (alcancesDisponibles.length === 1 && !alcanceSeleccionado) {
          setAlcance(alcancesDisponibles[0]);
          alcanceSeleccionado = alcancesDisponibles[0];
        }
    
        // Filtrar las U.P. considerando rol y alcance si están presentes
        const upsFiltradas = actividadEncontrada.up.filter((up) => {
          const textoUP = up.toLowerCase();
    
          // Verificar si el rol coincide (o no está seleccionado)
          const coincideRol = 
            !rolSeleccionado || textoUP.includes(rolSeleccionado.toLowerCase());
    
          // Verificar si el alcance coincide (o no está seleccionado)
          let coincideAlcance = true;
          if (alcanceSeleccionado) {
            if (alcanceSeleccionado.toLowerCase() === 'internacional') {
              coincideAlcance = /\binternacional\b/.test(textoUP);
            } else if (alcanceSeleccionado.toLowerCase() === 'nacional') {
              coincideAlcance = 
                /\bnacional\b/.test(textoUP) && !/\binternacional\b/.test(textoUP);
            }
          }
    
          // Retornar la U.P. si coincide con ambos criterios
          return coincideRol && coincideAlcance;
        });
    
        // Asegurarse de que si no hay coincidencias, no se bloquee la lista
        const upsAMostrar = upsFiltradas.length > 0 ? upsFiltradas : actividadEncontrada.up;
    
        // Actualizar el estado con las U.P. disponibles
        setUpsDisponibles(upsAMostrar);
    
        // Seleccionar automáticamente si hay una sola U.P.
        setUpSeleccionada(upsAMostrar.length === 1 ? upsAMostrar[0] : '');
      }
    };

    const extractNumbers = (text) => {
      const regex = /\d+(\.\d+)?/g; // Captura números enteros o decimales
      const numbers = text.match(regex); // Extrae todos los números encontrados
      return numbers ? numbers.slice(0, 2).map(Number) : []; // Retorna los dos primeros como números
    };
    
    const handleModalSelect = (item) => {
      if (modalType === 'funcion') {
        setFuncion(item);
        setActividadesDisponibles(actividadesPorFuncion[item] || []);
    
        // Reinicia los campos relacionados
        setActividad('');
        setDocumento('');
        setMostrarDocumento(false);
        setUpSeleccionada('');
        setUpsDisponibles([]);
        setMaximoUps([]);
        setMostrarUp(false);
        setRol('');
        setMostrarRol(false);
        setRolesDisponibles([]);
        setAlcance('');
        setMostrarAlcance(false);
        setAlcancesDisponibles([]);
        setFecha('');
        setHourLimits({ min: 0, max: 200 });
        setCalculatedUnits('');
        setWorkTime('');
      } else if (modalType === 'actividad') {
        setActividad(item);
        const actividadEncontrada = actividadesDisponibles.find(
          (act) => act.actividad === item
        );
        if (actividadEncontrada) {
          setDocumento(actividadEncontrada.documento || '');
          setMostrarDocumento(!!actividadEncontrada.documento);
    
          // Manejo de roles y visibilidad
          const roles = actividadEncontrada.rol ? actividadEncontrada.rol.split(' o ') : [];
          setRolesDisponibles(roles);
          setRol(roles.length === 1 ? roles[0] : '');
          setMostrarRol(roles.length > 0);
    
          // Manejo de alcances y visibilidad
          const alcance = actividadEncontrada.alcance ? actividadEncontrada.alcance.split(' o ') : [];
          setAlcancesDisponibles(alcance);
          setAlcance(alcance.length === 1 ? alcance[0] : '');
          setMostrarAlcance(alcance.length > 0);
    
          // Manejo de U.P.
          const ups = actividadEncontrada.up || [];
          setMaximoUps(ups.filter((up) => up.toLowerCase().includes('máximo')));
          setUpsDisponibles(ups.filter((up) => !up.toLowerCase().includes('máximo')));
    
          const normales = ups.filter((up) => !up.toLowerCase().includes('máximo'));
          const seleccionada = normales.length === 1 ? normales[0] : '';
          setUpSeleccionada(seleccionada);
          if (seleccionada) {
            const [firstNumber, secondNumber] = extractNumbers(seleccionada);
            //console.log('Números extraídos:', firstNumber, secondNumber); // Aquí tienes los dos primeros números
            setUpAllowed(firstNumber);
            setHoursCalculated(secondNumber);
            console.log(up_allowed, hoursCalculated );
          }
          setMostrarUp(true);
        }
      } else if (modalType === 'rol') {
        setRol(item);
        filtrarUPs(item, alcance);
      } else if (modalType === 'alcance') {
        setAlcance(item);
        filtrarUPs(rol, item);
      } else if (modalType === 'up') {
        setUpSeleccionada(item);
        const [firstNumber, secondNumber] = extractNumbers(item);
        console.log('Números extraídos:', firstNumber, secondNumber); // Aquí tienes los dos primeros números
        setUpAllowed(firstNumber);
        setHoursCalculated(secondNumber);
      }
      setModalVisible(false);
    };

    const handleWorkTimeSelect = (option) => {
      handleWorkTimeChange(option);
      setModalWorkTimeVisible(false); // Cerrar el modal de tiempo de trabajo
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
              <View style={tw`flex-1`}>
                <Text style={tw`text-black text-left`}>
                  {funcion || "Selecciona una función"}
                </Text>
              </View>
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
              <View style={tw`flex-1`}>
                <Text style={tw`text-black text-left`}>
                  {actividad || "Selecciona una actividad"}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
            </TouchableOpacity>
          </View>
  
          {/* Campo de documento autocompletado */}
          {mostrarDocumento && (
            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-bold text-black`}>Tipo de documento que debes presentar</Text>
              <TextInput
                style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 bg-white text-black`}
                value={documento}
                editable={false}
                multiline={true}  
                scrollEnabled={true} 
                placeholder="Documento a presentar"
              />
            </View>
          )}
  
          {/* Selector de rol de participación */}
          {mostrarRol && (
            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-bold text-black`}>Selecciona tu rol de participación</Text>
              <TouchableOpacity
                onPress={() => {
                  if (rolesDisponibles.length > 1) {
                    setModalType('rol');
                    setModalVisible(true);
                  }
                }}
                style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
                disabled={rolesDisponibles.length === 0} // Deshabilita si no hay roles disponibles
              >
                <Text style={tw`${rol ? "text-black" : "text-gray-500"}`}>
                  {rol || "Selecciona un rol"}
                </Text>
                <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
              </TouchableOpacity>
            </View>
          )}
  
          {/* Selector de alcance */}
          {mostrarAlcance && (
            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-bold text-black`}>Alcance</Text>
              <TouchableOpacity
                onPress={() => {
                  if (alcancesDisponibles.length > 1) {
                    setModalType('alcance');
                    setModalVisible(true);
                  }
                }}
                style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
                disabled={alcancesDisponibles.length === 0} // Deshabilita si no hay alcances disponibles
              >
                <Text style={tw`${alcance ? "text-black" : "text-gray-500"}`}>
                  {alcance || "Selecciona un alcance"}
                </Text>
                <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
              </TouchableOpacity>
            </View>
          )}
  
          {/* Campo de U.P */}
          {mostrarUp && (
            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-bold text-black`}>U.P. aproximadas a obtener</Text>
              <TouchableOpacity
                onPress={() => {
                  if (upsDisponibles.length > 1) {
                    setModalType('up');
                    setModalVisible(true);
                  }
                }}
                style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-white`}
                disabled={upsDisponibles.length === 0}
              >
                <View style={tw`flex-1`}>
                  <Text style={tw`text-black text-left`}>
                    {upSeleccionada || "Selecciona una U.P."}
                  </Text>
                </View>
                <Ionicons name="chevron-down" size={24} color="rgba(0, 0, 0, 0.8)" />
              </TouchableOpacity>
            </View>
          )}
  
          {activitiesWithHours.has(actividad) && (
              <>
                {/* Si la actividad es "Carga académica", mostrar el selector de tiempo de trabajo */}
                {actividad === "Carga académica" && (
                  <View style={tw`mb-4`}>
                    <Text style={tw`text-base font-bold text-black`}>
                      Tiempo de trabajo
                    </Text>
                    <TouchableOpacity
                    onPress={() => setModalWorkTimeVisible(true)} // Abrir modal de tiempo de trabajo
                    style={tw`w-full p-4 border border-gray-700 rounded-lg bg-white flex-row justify-between items-center`}
                  >
                    <Text>{workTime || 'Selecciona una opción'}</Text>
                    <Ionicons name="chevron-down" size={24} color="black" />
                  </TouchableOpacity>

                  <Modal
                    visible={modalWorkTimeVisible}
                    transparent={true}
                    animationType="slide"
                  >
                    <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
                      <View style={tw`w-4/5 bg-white rounded-lg p-5`}>
                        {options_work_time.map((options_work_time) => (
                          <TouchableOpacity
                            key={options_work_time.value}
                            style={tw`py-3 border-b border-gray-300`}
                            onPress={() => handleWorkTimeSelect(options_work_time.value)}
                          >
                            <Text style={tw`text-black`}>{options_work_time.label}</Text>
                          </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                          style={tw`mt-5 items-center`}
                          onPress={() => setModalWorkTimeVisible(false)}
                        >
                          <Text style={tw`text-blue-700`}>Cerrar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              )}

              {/* Campo de horas con validación */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-base font-bold text-black`}>Horas de trabajo</Text>
                <TextInput
                  value={hours}
                  onChangeText={handleHoursChange}
                  keyboardType="numeric"
                  placeholder={`Ingresa entre ${hourLimits.min} y ${hourLimits.max} horas`}
                  style={tw`w-full p-4 border border-gray-700 rounded-lg bg-white text-black`}
                  maxLength={3} // Limitar a 3 dígitos (por si acaso)
                />
                {hoursError ? <Text style={tw`text-red-500`}>{hoursError}</Text> : null}
              </View>

              {/* Campo de visualización de U.P. calculadas */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-base font-bold text-black`}>
                  U.P. Calculadas
                </Text>
                <View
                  style={tw`w-full p-4 border border-gray-700 rounded-lg bg-white ${!isUnitsSelected ? 'opacity-50' : ''}`}
                >
                  <Text style={tw`text-black`}>
                    {calculatedUnits ? `${calculatedUnits} U.P.` : '—'}
                  </Text>
                </View>
              </View>              
            </>
          )}
  
          {maximoUps.length > 0 && (
              <View style={tw`mb-4`}>
                <Text style={tw`text-base font-bold text-black`}>Máximo permitido</Text>
                <View style={tw`w-full p-4 border border-gray-700 rounded-lg mb-3 flex-row justify-between items-center bg-red-500`}>
                  {maximoUps.map((up, index) => (
                    <Text key={index} style={tw`text-black`}>
                      {up}
                    </Text>
                  ))}
                </View>
              </View>
            )}
  
          {/* Selector de Prioridad */}
          <View style={tw`mb-4 flex-row items-center`}>
  
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
                  modalType === 'rol' ? rolesDisponibles :
                  modalType === 'alcance' ? alcancesDisponibles :
                  modalType === 'up' ? upsDisponibles : []
                }
                keyExtractor={(item, index) => `${item}-${index}`} // Evita conflictos en las keys
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