import React, { useState, useEffect } from 'react';
import { IoStarOutline, IoSchoolOutline } from "react-icons/io5";
import Navigation from './Navigation/Navigation';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import LoadingAnimation from "../components/LoadingAnimation";
import { jwtDecode } from "jwt-decode";
import { createProduct } from '../api/products.api';
import { get_Check_Products } from '../api/check_products.api';
import { getProjection } from '../api/projections.api';

function UnidadesPromocion() {
  const navigate = useNavigate();

  const [checkProductData, setCheckProductData] = useState(null); // Datos recibidos
  const [userId, setUserId] = useState(null);

  // Estados para los campos del formulario
  const [functionField, setFunctionField] = useState('');
  const [role, setRole] = useState('');
  const [scope, setScope] = useState('');
  const [activity, setActivity] = useState('');
  const [documents_required, setDocumentsRequired] = useState('');
  const [unitsOptions, setUnitsOptions] = useState([]);
  const [units, setUnits] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projection_id, setProjectionId] = useState('');
  const [documents_uploaded, setDocumentUploaded] = useState('');
  const [error, setError] = useState(null);
  const [maxText, setMaxText] = useState('');
  const [isUnitsSelected, setIsUnitsSelected] = useState(false); // si las unidades están seleccionadas

  // Estados de validación para los errores
  const [functionError, setFunctionError] = useState(false);
  const [activityError, setActivityError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [scopeError, setScopeError] = useState(false);
//este pedo es para que funcione el rol y el alcance 
  const [roleOptions, setRoleOptions] = useState([]);
  const [scopeOptions, setScopeOptions] = useState([]);

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

  const [start_date, setStartDate] = useState(''); // Estado para almacenar la fecha de inicio
  const [end_date, setEndDate] = useState(''); // Estado para almacenar la fecha de fin

  // Obtener account_id de localStorage y llamar a get_Check_Products
  // Decode JWT once at the start and get the user ID
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id);
        } catch (error) {
            console.error('Invalid token:', error);
        }
    } else {
        setLoading(false); // Stop loading if no token is found
    }

  }, []);

  useEffect(() => {

    const fetchProjection = async (userId) => {
      try {
        setLoading(true);
        const response = await getProjection(userId); // Llamada a la API
        setStartDate(response.data[0].start_date); // Almacenar los datos recibidos
        setEndDate(response.data[0].end_date);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError('No se pudo cargar la información.'); // Mostrar mensaje de error
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProjection(userId);
    }
  }, [userId]);


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
    const storedAccountDetails = localStorage.getItem('accountDetails');
    const storedConditions = localStorage.getItem('conditions');
    const storedMaxConditions = localStorage.getItem('conditions_max');

    if (storedAccountDetails && storedConditions && storedMaxConditions) {
      const accountDetails = JSON.parse(storedAccountDetails);
      const normalizedCategory = normalizeCategory(accountDetails.category);
      setCategoryNormalized(normalizeCategory(accountDetails.category));

      setCategory(normalizedCategory);
      setConditions(JSON.parse(storedConditions));
      setMaxConditions(JSON.parse(storedMaxConditions));
    }
  }, []);

  // Función para normalizar la categoría del usuario
  const normalizeCategory = (category) => {
    const removeAccents = (str) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina acentos.
    
    const words = removeAccents(category).toLowerCase().trim().split(/\s+/); // Divide la cadena en palabras.
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
  }


  // Manejar el cambio del tiempo de trabajo
  const handleWorkTimeChange = (e) => {
    const selectedTime = e.target.value;
    setWorkTime(selectedTime);
  
    if (conditions && category) {
      const { horas } = conditions.carga_academica[category]?.[selectedTime] || {};
      if (horas) {
        setHourLimits({ min: horas.min, max: horas.max }); // Establece los límites
      } else {
        setHourLimits({ min: 1, max: 100 });
      }
    }
  };

  const handleHoursChange = (e) => {
    const enteredHours = parseInt(e.target.value, 10); // Convertir a número
    setHours(enteredHours);
  
    const { min, max } = hourLimits;
  
    if (enteredHours < min || enteredHours > max) {
      setHoursError(`Las horas deben estar entre ${min} y ${max}.`);
      setCalculatedUnits('');
      return;
    } else {
      setHoursError('');
  
      // Si es "Carga académica", calculamos las U.P.
      if (activity === "Carga académica") {
        const units = enteredHours * 4;
        setCalculatedUnits(units);
          // Verificar si supera el límite máximo de U.P.
        if (conditions && category) {
          const workConfig = conditions.carga_academica[category]?.[workTime];
          const maxUP = workConfig?.up?.max || 0; // Obtener el máximo permitido
        
          if (units > maxUP) {
            setHoursError(`Las U.P. calculadas superan el máximo permitido (${maxUP} U.P.). 
              Se colocara el máximo permitido, de acuerdo a tú categoria.`);
            setCalculatedUnits(maxUP);
          }
        }
      } else if (activity === "Programa de inducción") {
        const units = enteredHours * 4;
        setCalculatedUnits(units);
      } else {
        const units = Math.floor(enteredHours / hoursCalculated) * up_allowed;
        //console.log(enteredHours, hoursCalculated, up_allowed, units);
        setCalculatedUnits(units);
      }
    }
  };

   // Mapeo de nombres legibles a claves en actividadesPorFuncion
  const functionMapping = {
    'Docencia': 'docencia',
    'Otras actividades en docencia': 'otras',
    'Investigación': 'investigacion',
    'Superación académica': 'superacion',
    'Actividades complementarias de apoyo a la docencia y a la investigación': 'complementarias',
    'Actividades de extensión, integración y difusión de la ciencia y de la cultura': 'extension',
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

  // Opciones de actividades por función con documentos requeridos y U.P
  const actividadesPorFuncion = {
    docencia: [ //OKKKKK
      { actividad: "Carga académica", documento: "Registro Único de Actividades Académicas (RUAA) o constancia de carga académica suscrita por las autoridades competentes.", up: ['1.00 U.P. por hora en nivel superior.', '1.00 por cada 15 horas de módulos '] },
    ],   
    otras: [
      { actividad: "Elaboración e Impartición de acciones de formación", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", up: ['4.50 U.P. por cada 15 horas impartidas con evaluación.', '2.00 U.P. por cada 15 horas sin evaluación.'] },
      { actividad: "Programa de inducción", documento: "Constancia de validación emitida por la DEMS, DES o SIP.", up: ['1.00 U.P. por hora/semana/mes en nivel superior.'] },
      { actividad: "Tutorías", documento: "Constancia emitida por la Coordinación Institucional de Tutoría Politécnica (CITP).", up: ['1.00 U.P. por cada hora de tutoría individual a la semana.', '1.00 U.P. en tutoría grupal por cada hora a la semana en el semestre.', '3.00 U.P. en tutoría de regularización por unidad de aprendizaje al semestre.', '5.00 U.P. en tutoría de recuperación académica por unidad de aprendizaje al semestre.', '3.00 U.P. en tutoría a distancia por grupo atendido al semestre.']},
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
      { actividad: "Proyectos vinculados con financiamiento externo", documento: "Contrato o convenio\n Carta de aceptación del informe final o carta de finiquito\n Informe técnico.", up: ['25.00 U.P. como director por proyecto terminado.', '15.00 U.P. como participante por proyecto terminado.'], rol: "Director o Participante", alcance: "Nacional" }, //OK
      { actividad: "Publicación de artículos científicos y técnicos", documento: "Constancia de validación emitida por la SIP.", up:['3.00 U.P. por artículo de circulación institucional.', '5.00 U.P. por artículo de circulación nacional.', '10.00 U.P. por artículo de circulación nacional con jurado.', '20.00 U.P. por artículo de circulación internacional.', 'Máximo 5 publicaciones por periodo de promoción.'], rol: "Autor", alcance: "Nacional o Internacional"  },//OK  //'Máximo 5 publicaciones por periodo de promoción.'
      { actividad: "Estancias de Investigación", documento: "Oficio de aceptación para realizar la estancia\n Dictamen del COTEBAL o de la Coordinación de Proyectos Especiales de la Secretaría Académica\n Carta de terminación expedida por la institución donde se realizó la estancia.", up: "15.00 U.P. por año" }, //OK
      { actividad: "Desarrollo de patentes", documento: "Solicitud de registro\n Resultado del examen de forma\n Título de la patente.", up: ['40.00 para solicitud de registro de patentes nacionales del IPN.', '50.00 para aprobación del examen nacional de forma.', '60.00 para obtención de patentes nacionales del IPN con registro en el IMPI ', '80.00 para obtención de patentes internacionales del IPN '],  rol: "Solicitante o ", alcance: "Nacional o Internacional" } //OK
    ],
    superacion: [ //TODAS BIEN
      { actividad: "Otra licenciatura", documento: "Constancia de validación emitida por la DES.", up: ['60.00 U.P. por licenciatura.'] }, //OK
      { actividad: "Cursos de actualización, seminarios y talleres", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE para impartidos por el IPN\n Constancia de validación emitida por la DEMS, DES o SIP para impartidos en institución distinta al IPN.", up: ['3.00 con evaluación por cada 15 horas', '1.00 sin evaluación por cada 15 horas', '8.00 con evaluación por cada 20 horas de identidad institucional', 'Máximo 7 cursos por periodo de promoción.'] }, //OK
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
      { actividad: "Servicio externo por obra puntual, sin compensación económica", documento: "Solicitud del servicio externo, aceptación por el centro de trabajo y constancia de participación.", up: '2.00 U.P. por cada 80 horas de servicio externo' },
      { actividad: "Ponente en conferencias, videoconferencias y expositor de carteles", documento: "Constancia de participación como conferencista o expositor de carteles.", up: ['Nacional 3.00 por cartel o por conferencia.', 'Nacional 4.00 por videoconferencia.', 'Nacional 6.00 por conferencia magistral.', 'Internacional 6.00 por cartel o por conferencia.', 'Internacional 7.00 por videoconferencia.', 'Internacional 8.00 por conferencia magistral.', 'Máximo: 24.00 U.P. por periodo de promoción.'], rol: "Expositor", alcance: "Nacional o Internacional"}, //OK
      { actividad: "Expositor y asistente en congresos, simposios, reuniones, mesas redondas, coloquios, encuentros, paneles y foros", documento: "Constancia de participación emitida por la instancia correspondiente.", up: ['2.00 U.P. por asistente en evento nacional.', '4.00 U.P. por expositor en evento nacional.', '3.00 U.P. por asistente en evento internacional.', '7.00 U.P. por expositor en evento internacional.', 'Máximo 3 eventos por periodo de promoción.'], rol: "Expositor o Asistente", alcance: "Nacional o Internacional"}, //AQUI TODAVIA NO
      { actividad: "Comisiones de evaluación", documento: "Oficio de designación o constancia emitida por la DEMS, DES o SIP.", up: ['5.00 U.P. como coordinador.', '3.00 U.P. como analista'], rol: "Coordinador o Analista"},
      { actividad: "Programas y proyectos institucionales en áreas centrales", documento: "Constancia de participación emitida por el área correspondiente.", up: ['Programa institucional: 9.00 por coordinador.', 'Programa institucional: 7.00 por analista.', 'Proyecto institucional: 7.00 por coordinador.', 'Proyecto institucional: 5.00 por analista.', 'Proyecto de dependencia: 5.00 por coordinador.', 'Proyecto de dependencia: 3.00 por analista.'], rol: "Coordinador o Analista"} // OK 
    ],
    extension: [ //TODAS BIEN 
      { actividad: "Participación en la expo-profesiográfica", documento: "Constancia emitida por la Secretaría Académica o por la DEMS o DES.", up: ['2.00 U.P. por expositor.', '3.00 por atención de talleres o concursos', '3.00 por profesor coordinador'], rol: "Expositor o Atención o Profesor", alcance: "Nacional" }, //OK
      { actividad: "Encuentros Académicos Interpolitécnicos", documento: "Constancia de participación emitida por el Titular de la unidad académica.", up: ['2.00 U.P. por evento como asistente', 'Máximo: 8.00 U.P. por periodo de promoción.'], rol: "Asistente", alcance: "Nacional"  }, //OK
      { actividad: "Brigadas multidisciplinarias de servicio social", documento: "Constancia de participación emitida por la Dirección de Egresados y Servicio Social.", up: ['8.00 U.P. por coordinador de brigada.', '4.00 U.P. por profesor de brigada.', '4.00 U.P. por responsable del programa.'], rol: "Profesor o Coordinador o Responsable", alcance: "Nacional" }, //OK
      { actividad: "Impartición de disciplinas deportivas y/o talleres culturales", documento: "Constancia de participación emitida por la autoridad competente.", up: ['0.50 U.P. por 1 hora.'], rol: "Instructor" }, //OK
    ],
  };

  useEffect(() => {
    // Verify if the userName is stored in the localStorage
    const storedAccountData = localStorage.getItem('accountDetails');

    // If the account is stored, set data and skip loading animation
    if (storedAccountData) {
      const { projection_id } = JSON.parse(storedAccountData);
      setProjectionId(projection_id);
      setDocumentUploaded(documents_uploaded);
    } else {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.user_id);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }
  }, []);

  const handleFunctionChange = (e) => {
    setFunctionField(e.target.value);
    setFunctionError(false); // Elimina el error al seleccionar algo
    setActivity('');
    setRole('');
    setScope('');
    setDocumentsRequired('');
    setUnits('');
    setTasks([]);
    setDocumentUploaded([]);
    setRoleOptions([]);
    setScopeOptions([]);
    setUnitsOptions([]);
    setHourLimits({ min: 0, max: 200 }); // Restablecer los límites de horas
    setHours('');
    setIsUnitsSelected(false);
    setCalculatedUnits('')
  };

 // Manejar el cambio de actividad seleccionada
  const handleActivityChange = (e) => {
    const selectedActivity = e.target.value;
    setActivity(selectedActivity);
    setActivityError(false); // Elimina el error al seleccionar algo

    setHours('');
    setCalculatedUnits('');

    const mappedFunction = functionMapping[functionField];
    const activityInfo = actividadesPorFuncion[mappedFunction]?.find(
      (item) => item.actividad === selectedActivity
    );

    if (activityInfo) {
      setDocumentsRequired(activityInfo.documento);

    // Si la actividad es "Carga académica", mostramos tiempo de trabajo y horas
    if (selectedActivity === "Carga académica") {
      setShowWorkTime(true); // Mostrar tiempo de trabajo
    } else if (activitiesWithHours.has(selectedActivity)) {
      // Mostrar solo horas para otras actividades específicas
      setShowWorkTime(false); 
    } else {
      // Ocultar horas y tiempo de trabajo si no es relevante
      setShowWorkTime(false);
      setHours('');
      setCalculatedUnits('');
      setHoursError('');
      setHourLimits({ min: 0, max: 200 }); // Restablecer los límites de horas
      setIsUnitsSelected(false);
      setHoursCalculated(1)
      setUpAllowed('')
      setHoursError('');
    }

      // Si `up` es un array, lo usamos como opciones; si es un string, lo convertimos en array
      let upsArray = Array.isArray(activityInfo.up) ? activityInfo.up : [activityInfo.up];
      
      // Filtrar las opciones que no contengan la palabra "máximo"
      const filteredUpsArray = upsArray.filter((up) => !up.toLowerCase().includes('máximo'));
      setUnitsOptions(filteredUpsArray);

      // Asegurar que "Máximo" solo se muestra como texto si existe
      const maxOption = upsArray.find((up) => up.toLowerCase().includes('máximo'));
      setMaxText(maxOption || ''); // Establecer el máximo o limpiar
  
      // Selecciona automáticamente la única opción de U.P. si existe
      if (filteredUpsArray.length === 1) {
        const selectedUnit = filteredUpsArray[0];

        // Lógica para procesar la unidad seleccionada
        const parts = selectedUnit.split(' ');
        let firstNumber = '';
        let secondNumber = '';

        // Iterar sobre las partes para encontrar el primer y segundo número
        let foundFirst = false;
        for (let i = 0; i < parts.length; i++) {
          const num = Number(parts[i].trim());
          if (!isNaN(num)) {
            if (!foundFirst) {
              firstNumber = num;  // Primer número encontrado (U.P.)
              foundFirst = true;
            } else {
              secondNumber = num; // Segundo número encontrado (Horas calculadas)
              break;
            }
          }
        }

        console.log('Unidades seleccionadas:', firstNumber); // Mostrar U.P. en consola
        console.log('Horas calculadas:', secondNumber); // Mostrar horas en consola

        setUpAllowed(firstNumber); // Guardar el primer número
        setHoursCalculated(secondNumber || 1); // Guardar el segundo número si existe

        // Asignar los valores procesados al estado
        setUnits(selectedUnit);
        setIsUnitsSelected(true); // Habilitar los campos
      } else {
        setUnits(''); // Limpiar si hay múltiples opciones
        setHoursCalculated(1); // Limpiar horas calculadas si hay múltiples opciones
        setIsUnitsSelected(false); // Deshabilitar los campos
        setUpAllowed(''); // Limpiar el máximo permitido
      }

      // Si hay roles disponibles, los establecemos; si no, dejamos vacío
      // Configurar y asignar rol automáticamente si hay una opción
      if (activityInfo.rol) {
        const rolesArray = activityInfo.rol.split(" o ");
        setRoleOptions(rolesArray);
        if (rolesArray.length === 1) setRole(rolesArray[0]); // Asignar automáticamente
      } else {
        setRoleOptions([]);
        setRole('');
      }

      // Configurar y asignar alcance automáticamente si hay una opción
      if (activityInfo.alcance) {
        const scopeArray = activityInfo.alcance.split(" o ");
        setScopeOptions(scopeArray);
        if (scopeArray.length === 1) setScope(scopeArray[0]); // Asignar automáticamente
      } else {
        setScopeOptions([]);
        setScope('');
      }
    } else {
      // Reseteamos los valores si no hay actividad seleccionada
      setDocumentsRequired('');
      setUnitsOptions([]);
      setUnits('');
      setRoleOptions([]);
      setRole('');
      setScopeOptions([]);
      setScope('');
      setMaxText('');
      setCalculatedUnits('');
      setHours('');
      setHourLimits({ min: 0, max: 200 }); // Restablecer los límites de horas
      setIsUnitsSelected(false);
      setHoursCalculated(1);
      setUpAllowed('');
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    filterUPByRoleAndScope(selectedRole, scope);
    
    const mappedFunction = functionMapping[functionField];
    const activityInfo = actividadesPorFuncion[mappedFunction]?.find(
      (item) => item.actividad === activity
    );
  
    if (activityInfo) {
      const upsArray = Array.isArray(activityInfo.up) ? activityInfo.up : [activityInfo.up];
  
      // Filtramos las U.P. por el rol seleccionado, si corresponde
      const filteredUPs = upsArray.filter((up) =>
        up.toLowerCase().includes(selectedRole.toLowerCase())
      );
  
      setUnitsOptions(filteredUPs);
  
      // Si solo hay una opción de U.P., seleccionarla automáticamente
      if (filteredUPs.length === 1) {
        setUnits(filteredUPs[0]);
      } else {
        setUnits(''); // Limpiamos si hay múltiples opciones
      }
    }
  };
  
  const handleScopeChange = (e) => {
    const selectedScope = e.target.value || '';
    setScope(selectedScope);
    filterUPByRoleAndScope(role, selectedScope);
  
    const mappedFunction = functionMapping[functionField];
    const activityInfo = actividadesPorFuncion[mappedFunction]?.find(
      (item) => item.actividad === activity
    );
  
    if (activityInfo) {
      const upsArray = Array.isArray(activityInfo.up) ? activityInfo.up : [activityInfo.up];
  
      // Filtro preciso de las U.P. según el alcance seleccionado
      const filteredUPs = upsArray.filter((up) => {
        const lowerUp = up?.toLowerCase() || ''; 
        const lowerScope = selectedScope.toLowerCase();
  
        // Si el alcance es "nacional", evitamos las U.P. que contengan "internacional"
        if (lowerScope === 'nacional') {
          return lowerUp.includes('nacional') && !lowerUp.includes('internacional');
        }
        // Si el alcance es "internacional", aceptamos combinaciones y las internacionales
        if (lowerScope === 'internacional') {
          return lowerUp.includes('internacional');
        }
        return false; // Por seguridad, si no encaja, descartamos
      });
  
      setUnitsOptions(filteredUPs);
  
      // Si solo hay una opción de U.P., seleccionarla automáticamente
      if (filteredUPs.length === 1) {
        setUnits(filteredUPs[0]);
      } else {
        setUnits(''); // Limpiamos si hay múltiples opciones
      }
    }
  };  

  const filterUPByRoleAndScope = (selectedRole, selectedScope) => {
    const mappedFunction = functionMapping[functionField];
    const activityInfo = actividadesPorFuncion[mappedFunction]?.find(
      (item) => item.actividad === activity
    );
  
    if (activityInfo) {
      const upsArray = Array.isArray(activityInfo.up) ? activityInfo.up : [activityInfo.up];
  
      // Filtrar las U.P. basadas en rol y alcance simultáneamente
      const filteredUPs = upsArray.filter((up) => {
        const lowerUp = up.toLowerCase();
        const lowerRole = selectedRole?.toLowerCase() || "";
        const lowerScope = selectedScope?.toLowerCase() || "";
  
        const matchesRole = lowerUp.includes(`por ${lowerRole}`);
        const matchesScope = lowerUp.includes(lowerScope);
  
        // Retornar solo si ambas condiciones se cumplen
        return matchesRole && matchesScope;
      });
  
      setUnitsOptions(filteredUPs);
  
      // Si solo hay una opción, seleccionarla automáticamente
      if (filteredUPs.length === 1) {
        setUnits(filteredUPs[0]);
      } else {
        setUnits(''); // Limpiar si hay múltiples opciones
      }
    }
  };
    

  const validateForm = () => {
    let isValid = true;
  
    if (functionField === '') {
      setFunctionError(true);
      isValid = false;
    } else {
      setFunctionError(false);
    }
  
    if (activity === '') {
      setActivityError(true);
      isValid = false;
    } else {
      setActivityError(false);
    }
  
    if (units === '') {
      isValid = false;
    }
  
    // Condición adicional:
    // Si la actividad es Tutorías y la unidad seleccionada está en tutoringOptions,
    // no validamos horas.
    const isTutoringOptionSelected = activity === "Tutorías" && tutoringOptions.has(units);
  
    // Solo validamos horas si NO estamos en el caso de tutorías especiales
    if (!isTutoringOptionSelected && activitiesWithHours.has(activity)) {
      if (hours === '' || hours < hourLimits.min || hours > hourLimits.max) {
        setHoursError(`Las horas deben estar entre ${hourLimits.min} y ${hourLimits.max}.`);
        isValid = false;
      } else {
        setHoursError('');
      }
      
      if (calculatedUnits === 0) {
        setHoursError('Ingresa horas válidas para calcular las U.P.');
        isValid = false;
      }
    } else {
      // Si es tutoría con una de las opciones de tutoringOptions, no pedimos horas.
      setHoursError('');
    }
  
    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, completa todos los campos obligatorios.');
      return; // Si el formulario no es válido, no se envía
    }  
    // Si `units` está vacío y hay un máximo, lo usamos como valor por defecto
    const parts = units.split(' '); // Divide la cadena en partes
    let result = ''; // Resultado final
    
    // Función para encontrar la primera parte que sea un número
    for (let i = 0; i < parts.length; i++) {
      if (!isNaN(Number(parts[i])) && parts[i].trim() !== '') {
        result = parts[i]; // Si es un número, se guarda
        break; // Termina el bucle si encuentra un número
      }
    }
    
    // Si no encontró un número, guarda la siguiente parte disponible
    if (result === '' && parts.length > 1) {
      result = parts[1]; // Guarda la segunda parte si no encontró ningún número
    }
    
    // -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ VALIDACIONES -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    // Crea una variable temporal para almacenar la actividad ajustada según el rol
    let activityToSend = activity;

    if (activity === 'Proyectos de investigación con financiamiento interno' && role === 'Director') {
      activityToSend = 'Proyectos de investigación con financiamiento interno (Director)';
    }
    if (activity === 'Proyectos de investigación con financiamiento interno' && role === 'Participante') {
      activityToSend = 'Proyectos de investigación con financiamiento interno (Participante)';
    }
    
    // obtener la función normalizada
    const normalized_function = normalizeFuction(functionField);

    // Acceder a max_UP_allowed de forma segura
    const max_UP_allowed = 
      conditions?.[normalized_function]?.[category_normalized]?.[workTime]?.up?.max || 
      conditions?.[normalized_function]?.[category_normalized]?.up?.max;
    if (max_UP_allowed === 0) {
      toast.error('Tú categoría esta excenta de realizar está actividad.');
      return;
    }

     // verifica si el objeto checkProductData tiene datos
    if (Object.keys(checkProductData).length > 0) {
      console.log( checkProductData?.[functionField]?.[activityToSend])

      // Verificar si tiene datos para la función seleccionada
      if (checkProductData?.[functionField]) {
        console.log("Estoy aqui")
        // Calcular el total de U.P. de la función
        const total_UP_check_product = checkProductData?.[functionField].total;
        console.log(total_UP_check_product)

        // Calcular el total de U.P. con la actividad actual
        const sum_total_funcition = total_UP_check_product + Number(calculatedUnits || result);

        console.log('sum_total_funcition:', sum_total_funcition);
        console.log('max_UP_allowed:', max_UP_allowed);
        console.log("total_UP_check_product:", total_UP_check_product);

        // Verificar si supera el límite máximo de U.P. de acuerdo a la categoría
        if (sum_total_funcition > max_UP_allowed) {
          toast.error(`La cantidad de U.P. con está actividad será (${sum_total_funcition}), lo que supera el límite máximo permitido (${max_UP_allowed}) de acuerdo a tú categoria.`);
          return;
        }

        // Verificar si tiene datos para la actividad seleccionada
        if (checkProductData?.[functionField]?.[activityToSend]) {

          const currentActivityData = checkProductData?.[functionField]?.[activityToSend];
          const accumulatedUP = currentActivityData.up; // UP acumuladas para la actividad seleccionada
          const accumulatedLength = currentActivityData.length; // Número de veces registrada
          
            const max_UP_Conditions = max_conditions.configuracion[activityToSend]?.max_up || 100;
            const max_Length_Conditions = max_conditions.configuracion[activityToSend]?.max_length || 100;

            const sum_UP = accumulatedUP + Number(calculatedUnits || result);
            const sum_Length = accumulatedLength + 1;
        
            //console.log('max_UP_Conditions:', max_UP_Conditions);
            // console.log('sum_UP:', sum_UP);
            // console.log(sum_UP > max_UP_Conditions);
            console.log('max_Length_Conditions:', max_Length_Conditions);
            if (sum_UP > max_UP_Conditions) {
                toast.error(`Agregar esta activdad superará el máximo permitido (${max_UP_Conditions} U.P) de acuerdo al reglamento de promocion docente.`);
                return;
            }
            
            if (sum_Length > max_Length_Conditions) {
              toast.error(`El número de veces registradas (${sum_Length}) supera el límite máximo permitido (${max_Length_Conditions}) de acuerdo a al reglamento de promocion docente.`);
              return;
            }

            if (sum_UP > max_UP_allowed) {
              toast.error(`La cantidad de U.P. (${sum_UP}) supera el límite máximo permitido (${max_UP_allowed}) de acuerdo a tú categoria.`);
              return;
            }
        }
      }

    }
    // -_-_-_-_-_-_-_-_-_-_-_-_-_-_ FIN DE VALIDACIONES -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ 
    
    // return;
    // Calcular la longitud de los documentos requeridos
    const documentsList = documents_required.split('\n').map(doc => doc.trim()).filter(doc => doc);
    const documentsCount = documentsList.length;

  
    // Preparar los datos para la proyección
    const projectionData = {
      function: functionField,
      activity: activityToSend,
      role,
      scope,
      documents_required,
      documents_number: documentsCount,
      units: calculatedUnits || result,
      tasks,
      projection_id,
      documents_uploaded,
      type: "Unidades de Promoción",
    };
  
    try {
      setLoading(true);
      setError(null);
  
      // Llama al método createProjection con los datos del formulario
      const response = await createProduct(projectionData);
      toast.success('Producto creado exitosamente');
      navigate('/KanbanBoard');

      const responseProductCheck = await get_Check_Products(userId);
      const accountDetails = JSON.parse(localStorage.getItem('accountDetails')) || {};
      console.log('responseProductCheck:', responseProductCheck);
      accountDetails.units_projection = responseProductCheck.data.total_up;
      localStorage.setItem('accountDetails', JSON.stringify(accountDetails));


    } catch (error) {
      const apiErrors = error.response?.data || {};
      if (error.response?.status === 400) {
        const errorMessage = apiErrors.non_field_errors[0] || "Error en la solicitud. Verifica los datos.";
        toast.error(errorMessage);
      } else {
        console.error('Error creando proyección:', error);
        toast.error('Error al crear el producto');
      }
    } finally {
      setLoading(false);
    }
  };

  const tutoringOptions = new Set([
    '3.00 U.P. en tutoría de regularización por unidad de aprendizaje al semestre.',
    '5.00 U.P. en tutoría de recuperación académica por unidad de aprendizaje al semestre.',
    '3.00 U.P. en tutoría a distancia por grupo atendido al semestre.',
  ]);

  const handleUnitsChange = (e) => {
    const selectedUnit = e.target.value;
    setUnits(selectedUnit);
    setHours(''); 
    setCalculatedUnits(''); 
    setHoursError(''); 
  
    const parts = selectedUnit.split(' ');
    let firstNumber = '';
    let secondNumber = '';
  
    // Iterar sobre las partes para encontrar el primer y segundo número
    let foundFirst = false;
    for (let i = 0; i < parts.length; i++) {
      const num = Number(parts[i].trim());
      if (!isNaN(num)) {
        if (!foundFirst) {
          firstNumber = num;
          foundFirst = true;
        } else {
          secondNumber = num;
          break;
        }
      }
    }
  
    setUpAllowed(firstNumber); // Guardar el primer número
    setHoursCalculated(secondNumber || 1); // Guardar el segundo número si existe
  
    // Si el rol está vacío, asignar automáticamente la primera palabra de la U.P. seleccionada
    if (!role) {
      const firstWord = selectedUnit.split(' ')[0]; // Obtener la primera palabra
      setRole(firstWord); // Asignar al estado de role
    }
  
    setIsUnitsSelected(true); // Asegurarse de habilitar los campos
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-cover bg-center">
    {/* Incluye la navegación */}
    <Navigation />

      {/* Línea de separación */}
      <hr className="border-t-2 border-black my-4" />

      {/* Contenido Principal */}
      <div className="container mx-auto mt-8 mb-8">
        <div className="flex flex-wrap justify-between">
          {/* Formulario de Actividad */}
          <form onSubmit={handleSubmit} className="bg-gray-800 bg-opacity-40 p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Obtención por unidades de promoción</h1>
              <IoStarOutline size={40} color="#fff" />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Función</label>
              <select
                value={functionField}
                onChange={handleFunctionChange}
                className="w-full p-2 rounded-lg border border-gray-400"
              >
                <option value="" disabled>Selecciona una función</option>
                <option value="Docencia">Docencia</option>
                <option value="Otras actividades en docencia">Otras actividades en docencia</option>
                <option value="Investigación">Investigación</option>
                <option value="Superación académica">Superación académica</option>
                <option value="Actividades complementarias de apoyo a la docencia y a la investigación">Actividades complementarias de apoyo a la docencia y a la investigación</option>
                <option value="Actividades de extensión, integración y difusión de la ciencia y de la cultura">Actividades de extensión, integración y difusión de la ciencia y de la cultura</option>
              </select>
              {functionError && <span className="text-red-500">Por favor, selecciona una función.</span>}
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Nombre de la actividad</label>
              <select
                value={activity}
                onChange={handleActivityChange}
                className="w-full p-2 rounded-lg border border-gray-400"
              >
                <option value="" disabled>Selecciona una actividad</option>
                {functionMapping[functionField] &&
                  actividadesPorFuncion[functionMapping[functionField]].map((item, index) => (
                    <option key={index} value={item.actividad}>{item.actividad}</option>
                ))}
              </select>
              {activityError && <span className="text-red-500">Por favor, selecciona una actividad.</span>}

            </div>

            {roleOptions.length > 1 ? (
                <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2">Rol de participación</label>
                    <select
                    value={role}
                    onChange={handleRoleChange}
                    className="w-full p-2 rounded-lg border border-gray-400"
                    >
                    <option value="" disabled>Selecciona un rol</option>
                    {roleOptions.map((rolOption, index) => (
                        <option key={index} value={rolOption}>{rolOption}</option>
                    ))}
                    </select>
                    {roleError && <span className="text-red-500">Por favor, selecciona un rol.</span>}
                </div>
                ) : roleOptions.length === 1 && (
                <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2">Rol de participación</label>
                    <p className="bg-white p-2 rounded-lg border border-gray-400">{roleOptions[0]}</p>
                    {roleError && <span className="text-red-500">Por favor, selecciona un rol.</span>}
                </div>
            )}

            {scopeOptions.length > 1 ? (
            <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">Alcance</label>
                <select
                value={scope}
                onChange={handleScopeChange}
                className="w-full p-2 rounded-lg border border-gray-400"
                >
                <option value="" disabled>Selecciona un alcance</option>
                {scopeOptions.map((scopeOption, index) => (
                    <option key={index} value={scopeOption}>{scopeOption}</option>
                ))}
                </select>
                {scopeError && <span className="text-red-500">Por favor, selecciona un alcance.</span>}
            </div>
            ) : scopeOptions.length === 1 && (
            <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">Alcance</label>
                <p className="bg-white p-2 rounded-lg border border-gray-400">{scopeOptions[0]}</p>
                {scopeError && <span className="text-red-500">Por favor, selecciona un alcance.</span>}
            </div>
            )}

            {documents_required && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">Documento(s) requeridos</label>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-lg">
                  <ul className="list-disc pl-6 text-gray-800">
                    {documents_required.split('\n').map((doc, index) => (
                      <li key={index} className="mb-2">
                        {doc.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {unitsOptions.length > 1 ? (
                <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2">U.P. disponibles</label>
                    <select
                        value={units}
                        onChange={handleUnitsChange}
                        className={`w-full p-2 rounded-lg border border-gray-400 ${
                        roleOptions.length > 0 && !role ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={roleOptions.length > 0 && !role} // Deshabilitar si hay opciones de rol pero no se ha seleccionado uno
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        {unitsOptions.map((up, index) => (
                        <option key={index} value={up}>{up}</option>
                        ))}
                    </select>
                    {roleOptions.length > 0 && !role && (
                        <span className="text-red-500">Selecciona un rol para habilitar las U.P.</span>
                    )}
                    </div>
            ) : unitsOptions.length === 1 && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">U.P. aproximadas</label>
                <p className="bg-white p-2 rounded-lg border border-gray-400">{unitsOptions[0]}</p>
              </div>
            )}

            {activitiesWithHours.has(activity) && (
            <>
                {activity === "Carga académica" && (
                <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2">
                    Tiempo de trabajo
                    </label>
                    <select
                    value={workTime}
                    onChange={(e) => handleWorkTimeChange(e)}
                    className="w-full p-2 rounded-lg border border-gray-400"
                    disabled={
                        // Deshabilitar si es tutorías y la opción seleccionada está en tutoringOptions
                        activity === "Tutorías" && tutoringOptions.has(units)
                    }
                    >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="medio_tiempo">Medio tiempo</option>
                    <option value="tres_cuartos_tiempo">Tres cuartos</option>
                    <option value="tiempo_completo">Tiempo completo</option>
                    </select>
                </div>
                )}

                <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                    Horas de trabajo
                </label>
                <input
                    type="number"
                    value={hours}
                    onChange={handleHoursChange}
                    className="w-full p-2 rounded-lg border border-gray-400"
                    placeholder={`Ingresa entre ${hourLimits.min} y ${hourLimits.max} horas`}
                    disabled={
                    !isUnitsSelected || 
                    (activity === "Tutorías" && tutoringOptions.has(units))
                    }
                />
                {hoursError && <span className="text-red-500">{hoursError}</span>}
                </div>

                <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                    U.P. Calculadas
                </label>
                <p 
                    className={`bg-white p-2 rounded-lg border border-gray-400 ${
                    !isUnitsSelected ||
                    (activity === "Tutorías" && tutoringOptions.has(units))
                        ? 'opacity-50'
                        : ''
                    }`}
                >
                    {calculatedUnits ? `${calculatedUnits} U.P.` : '—'}
                </p>
                </div>
            </>
            )}


            {maxText && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">Máximo permitido</label>
                <p className="bg-red-500 p-2 rounded-lg border border-gray-400">{maxText}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="w-full ml-2">
                <button 
                  type="submit" 
                  className="bg-blue-800 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 w-full mt-6"
                  >
                  Agregar
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>

          {/* Información Adicional */}
          <div className="w-full md:w-1/2 lg:w-2/5">
            {/* Recuadro llamativo con la proyección */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">Tú proyección actual:</h3>
              <div className="bg-yellow-300 border-l-4 border-yellow-600 text-yellow-800 p-4 rounded-lg shadow-lg">
                <p className="font-semibold">
                  Tu proyección cubrirá el período:
                  <br />
                    <strong>{start_date} al {end_date}</strong>
                  <br />
                  <br />
                  Aquí puedes comenzar a registrar actividades que realices dentro de este período, donde acumularás U.P. 
                </p>

                <p className='font-semibold mt-4'>
                Cada actividad que completes contribuirá a tus unidades de promoción (U.P), que te beneficiarán en tu proceso de promoción docente.
                </p>
              </div>
            </div>
            
            {/* Campos de texto para agregar actividades proyectadas y U.P acumuladas */}
            {/* <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">Actividades proyectadas:</h3>
              <input type="text" className="w-full p-2 mt-2 rounded-lg border border-gray-400" />
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">U.P acumuladas:</h3>
              <input type="text" className="w-full p-2 mt-2 rounded-lg border border-gray-400" />
            </div> */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">¿No sabes qué agregar?</h3>
              <p className="text-gray-700 mb-8">¡Conoce más acerca de las actividades que puedes realizar, qué implican y sus detalles!</p>
              <Link to= '/InfoProjection' className="mt-4 bg-blue-800 text-white px-6 py-3 rounded-2xl hover:bg-blue-600">¿Qué puedo agregar?</Link>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">
                Conoce el mínimo y el máximo que debes cumplir de acuerdo a tu categoría actual
              </h3>
              <Link 
                to='/CategoryLimits' 
                className="mt-4 bg-blue-800 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 inline-block"
              >
                Ver categorías y límites
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UnidadesPromocion;