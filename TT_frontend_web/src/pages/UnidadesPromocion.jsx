import React, { useState, useEffect } from 'react';
import { IoStarOutline, IoSchoolOutline } from "react-icons/io5";
import Navigation from './Navigation/Navigation';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import LoadingAnimation from "../components/LoadingAnimation";
import { jwtDecode } from "jwt-decode";
import { createProduct } from '../../../api/products.api';

function UnidadesPromocion() {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [priority, setPriority] = useState('');
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

  // Estados de validación para los errores
  const [functionError, setFunctionError] = useState(false);
  const [activityError, setActivityError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [scopeError, setScopeError] = useState(false);
  const [priorityError, setPriorityError] = useState(false);
//este pedo es para que funcione el rol y el alcance 
  const [roleOptions, setRoleOptions] = useState([]);
  const [scopeOptions, setScopeOptions] = useState([]);


  // Definición de la función para obtener el color según la prioridad
  const getColorForPriority = (priority) => {
    switch (priority) {
      case 'Baja':
        return 'bg-blue-500';
      case 'Media':
        return 'bg-yellow-500';
      case 'Alta':
        return 'bg-red-500';
      default:
        return 'bg-white-500';
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
      { actividad: "Desarrollo de patentes", documento: "Solicitud de registro\n Resultado del examen de forma\n Título de la patente.", up: ['40.00 para solicitud de registro de patentes nacionales del IPN.', '50.00 para aprobación del examen nacional de forma.', '60.00 para obtención de patentes nacionales del IPN con registro en el IMPI ', '80.00 para obtención de patentes internacionales del IPN '],  rol: "Solicitante", alcance: "Nacional o Internacional" } //OK
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

  useEffect(() => {
    // Verify if the userName is stored in the localStorage
    const storedAccountData = localStorage.getItem('accountDetails');

    // If the account is stored, set data and skip loading animation
    if (storedAccountData) {
      const { projection_id } = JSON.parse(storedAccountData);
      setProjectionId(projection_id);
      setDocumentUploaded(documents_uploaded);
      console.log('Account details loaded from localStorage' + storedAccountData);
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
  };

  const getActividades = () => {
    const mappedFunction = functionMapping[functionField]; // Mapeamos el nombre legible a la clave
    if (mappedFunction && actividadesPorFuncion[mappedFunction]) {
      return actividadesPorFuncion[mappedFunction].map((item, index) => (
        <option key={index} value={item.actividad}>
          {item.actividad}
        </option>
      ));
    }
    return null;
  };

 // Manejar el cambio de actividad seleccionada
  const handleActivityChange = (e) => {
    const selectedActivity = e.target.value;
    setActivity(selectedActivity);
    setActivityError(false); // Elimina el error al seleccionar algo

    const mappedFunction = functionMapping[functionField];
    const activityInfo = actividadesPorFuncion[mappedFunction]?.find(
      (item) => item.actividad === selectedActivity
    );

    if (activityInfo) {
      setDocumentsRequired(activityInfo.documento);

      // Si `up` es un array, lo usamos como opciones; si es un string, lo convertimos en array
      let upsArray = Array.isArray(activityInfo.up) ? activityInfo.up : [activityInfo.up];
      
      // Filtrar las opciones que no contengan la palabra "máximo"
      const filteredUpsArray = upsArray.filter((up) => !up.toLowerCase().includes('máximo'));
      setUnitsOptions(filteredUpsArray);

      // Aseguramos que solo se almacena un "Máximo" si existe
      const maxOption = upsArray.find((up) => up.toLowerCase().includes('máximo'));
      if (maxOption) {
        setMaxText(maxOption); // Guardamos el texto máximo si existe
      } else {
        setMaxText(''); // Limpiamos si no hay "Máximo"
      }

      // Si hay solo una opción de U.P., la seleccionamos automáticamente
      if (upsArray.length === 1) {
        setUnits(upsArray[0]);
      } else {
        setUnits(''); // Limpiamos si hay múltiples opciones
      }

      // Si hay roles disponibles, los establecemos; si no, dejamos vacío
      if (activityInfo.rol) {
        const rolesArray = activityInfo.rol.split(" o ");
        setRoleOptions(rolesArray);
      } else {
        setRoleOptions([]);
      }

      // Si hay alcances disponibles, los establecemos; si no, dejamos vacío
      if (activityInfo.alcance) {
        const scopeArray = activityInfo.alcance.split(" o ");
        setScopeOptions(scopeArray);
        if (scopeArray.length === 1) setScope(scopeArray[0]);
        else setScope(''); // Limpiamos si hay múltiples opciones
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
    const selectedScope = e.target.value;
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
        const lowerUp = up.toLowerCase();
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
    }
  
    if (activity === '') {
      setActivityError(true);
      isValid = false;
    }
  
    // Validar rol solo si hay opciones de rol
    if (roleOptions.length > 0 && role === '') {
      setRoleError(true);
      isValid = false;
    }
  
    // Validar alcance solo si hay opciones de alcance
    if (scopeOptions.length > 0 && scope === '') {
      setScopeError(true);
      isValid = false;
    }
  
    // Validar prioridad solo si el campo es visible
    if (priority === '') {
      setPriorityError(true);
      isValid = false;
    }
  
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Si el formulario no es válido, no se envía
    }
    
    // Extraer la primera palabra del campo 'units'
    const cleanedUnits = units.split(' ')[0];

    // Calcular la longitud de los documentos requeridos
    const documentsList = documents_required.split('\n').map(doc => doc.trim()).filter(doc => doc);
    const documentsCount = documentsList.length;
    
    // Prepara los datos para la proyección con los nombres correctos
    const projectionData = {
      function: functionField,
      activity,
      role,
      scope,
      documents_required,
      documents_number: documentsCount,
      priority,
      units: cleanedUnits,
      tasks,
      projection_id,
      documents_uploaded
    };

    try {
      setLoading(true);
      setError(null);

      // Llama al método createProjection con los datos del formulario
      const response = await createProduct(projectionData);
      console.log('Proyección creada:', response.data);
      toast.success('Proyección creada con éxito');  // Mostrar toast de éxito
      navigate('/KanbanBoard'); // Redirect to login or another page
    } catch (error) {
      const apiErrors = error.response.data || {};
      if (error.response.status === 400) {
          const errorMessage = apiErrors.non_field_errors[0] || "Hubo un error en la solicitud. Verifica los datos ingresados.";
          toast.error(errorMessage);
      }else {
          console.error('Error creando proyeccion:', error);
          // Mostrar un toast si ocurre un error
          toast.error('Error creando la proyeccion. Verifica los datos.');
      }

    } finally {
      setLoading(false);
    }
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
              </div>
            ) : roleOptions.length === 1 && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">Rol de participación</label>
                <p className="bg-white p-2 rounded-lg border border-gray-400">{roleOptions[0]}</p>
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
              </div>
            ) : scopeOptions.length === 1 && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">Alcance</label>
                <p className="bg-white p-2 rounded-lg border border-gray-400">{scopeOptions[0]}</p>
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
                <label className="block text-white text-sm font-semibold mb-2">U.P. aproximadas</label>
                <select
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-400"
                >
                  <option value="" disabled>Selecciona una opción</option>
                  {unitsOptions.map((up, index) => (
                    <option key={index} value={up}>{up}</option>
                  ))}
                </select>
              </div>
            ) : unitsOptions.length === 1 && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">U.P. aproximadas</label>
                <p className="bg-white p-2 rounded-lg border border-gray-400">{unitsOptions[0]}</p>
              </div>
            )}

            {maxText && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">Máximo permitido</label>
                <p className="bg-red-500 p-2 rounded-lg border border-gray-400">{maxText}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="w-1/2 mr-2">
                <label className="block text-white text-sm font-semibold mb-2">Prioridad</label>
                <select
                  className={`w-full p-2 rounded-lg border border-gray-400 ${getColorForPriority(priority)}`}
                  value={priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                    setPriorityError(false); // Elimina el error al seleccionar una prioridad
                  }}
                >
                  <option value="" disabled>Selecciona una prioridad</option>
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
                {priorityError && <span className="text-red-500">Por favor, selecciona una prioridad.</span>}
              </div>

              <div className="w-1/2 ml-2">
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
                  Tu proyección cubrirá el período del <strong>2024 al 2026</strong>. 
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

          </div>
        </div>
      </div>
    </div>
  );
}

export default UnidadesPromocion;