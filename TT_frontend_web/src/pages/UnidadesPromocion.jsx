import React, { useState, useEffect } from 'react';
import { IoStarOutline, IoSchoolOutline } from "react-icons/io5";
import Navigation from './Navigation/Navigation';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";

import { createProjection, getProjection, deleteProjection, updateProjection } from '../../../api/projections.api';

function UnidadesPromocion() {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [priority, setPriority] = useState('');
  const [start_date, setStartDate] = useState(''); 
  const [end_date, setEndDate] = useState('');
  const [functionField, setFunctionField] = useState('');
  const [role, setRole] = useState('');
  const [scope, setScope] = useState('');
  const [activity, setActivity] = useState('');
  const [documents_required, setDocumentsRequired] = useState('');
  const [units, setUnits] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados de validación para los errores
  const [functionError, setFunctionError] = useState(false);
  const [activityError, setActivityError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [scopeError, setScopeError] = useState(false);
  const [priorityError, setPriorityError] = useState(false);

  const getCurrenDate = () => {
    // Obtener la fecha actual y restar un día
    const today = new Date();
    today.setDate(today.getDate());

    // Formatear la fecha en "YYYY-MM-DD"
    const formattedDate = today.toISOString().split('T')[0];
    setStartDate(formattedDate);
  };

  // Usa useEffect para establecer la fecha actual cuando el componente se monta
  useEffect(() => {
    getCurrenDate();
    console.log(getCurrenDate());
    setTasks([]);
  }, []);

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
    'Docencia (carga académica y otras actividades)': 'docencia',
    'Investigación': 'investigacion',
    'Superación académica': 'superacion',
    'Actividades complementarias de apoyo a la docencia y a la investigación': 'complementarias',
    'Actividades de extensión, integración y difusión de la ciencia y de la cultura': 'extension',
  };

  
  // Opciones de actividades por función con documentos requeridos y U.P
  const actividadesPorFuncion = {
    docencia: [
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
    investigacion: [
      { actividad: "Proyectos de investigación con financiamiento interno", documento: "Constancia emitida por la SIP.", up: 50.00 },
      { actividad: "Proyectos vinculados con financiamiento externo", documento: "Contrato o convenio, carta de aceptación del informe final o carta de finiquito, informe técnico.", up: 25.00 },
      { actividad: "Publicación de artículos científicos y técnicos", documento: "Constancia de validación emitida por la SIP.", up: 20.00 },
      { actividad: "Estancias de Investigación", documento: "Oficio de aceptación para realizar la estancia, dictamen del COTEBAL o de la Coordinación de Proyectos Especiales de la Secretaría Académica, carta de terminación expedida por la institución donde se realizó la estancia.", up: 15.00 },
      { actividad: "Desarrollo de patentes", documento: "Solicitud de registro, resultado del examen de forma, título de la patente.", up: 80.00 }
    ],
    superacion: [
      { actividad: "Otra licenciatura", documento: "Constancia de validación emitida por la DES.", up: 60.00 },
      { actividad: "Cursos de actualización, seminarios y talleres", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE para impartidos por el IPN, Constancia de validación emitida por la DEMS, DES o SIP para impartidos en institución distinta al IPN.", up: 8.00 },
      { actividad: "Estudios de especialidad, maestría y doctorado", documento: "Constancia de validación emitida por la SIP.", up: 108.50 },
      { actividad: "Cursos de propósito específico", documento: "Constancia emitida por la SIP.", up: 30.00 },
      { actividad: "Diplomados", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", up: 40.00 },
      { actividad: "Idiomas", documento: "Constancia emitida por la Dirección de Formación en Lenguas Extranjeras y/o certificado emitido por el CENLEX Santo Tomás o Zacatenco.", up: 8.00 }
    ],
    complementarias: [
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
    extension: [
      { actividad: "Participación en la expoprofesiográfica", documento: "Constancia emitida por la Secretaría Académica o por la DEMS o DES.", up: 3.00 },
      { actividad: "Encuentros Académicos Interpolitécnicos", documento: "Constancia de participación emitida por el Titular de la unidad académica.", up: 8.00 },
      { actividad: "Brigadas multidisciplinarias de servicio social", documento: "Constancia de participación emitida por la Dirección de Egresados y Servicio Social.", up: 8.00 },
      { actividad: "Impartición de disciplinas deportivas y/o talleres culturales", documento: "Constancia de participación emitida por la autoridad competente.", up: 0.50 }
    ],
  };

  const handleFunctionChange = (e) => {
    setFunctionField(e.target.value);
    setFunctionError(false); // Elimina el error al seleccionar algo
    setActivity('');
    setEndDate('');
    setRole('');
    setScope('');
    setDocumentsRequired('');
    setUnits('');
    setTasks([]);
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

    // Mapeo de la función seleccionada al conjunto de actividades
    const mappedFunction = functionMapping[functionField];
    const activityInfo = actividadesPorFuncion[mappedFunction].find(item => item.actividad === selectedActivity);

    if (activityInfo) {
      setDocumentsRequired(activityInfo.documento);
      setUnits(activityInfo.up); // Actualiza las unidades (U.P) basadas en la actividad seleccionada
    } else {
      setDocumentsRequired('');
      setUnits('');
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!functionField) {
      setFunctionError(true);
      isValid = false;
    }

    if (!activity) {
      setActivityError(true);
      isValid = false;
    }

    if (!end_date) {
      setDateError(true);
      isValid = false;
    }

    if (!role) {
      setRoleError(true);
      isValid = false;
    }

    if (!scope) {
      setScopeError(true);
      isValid = false;
    }

    if (!priority) {
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
    
    // Prepara los datos para la proyección con los nombres correctos
    const projectionData = {
      function: functionField,
      activity,
      start_date,
      end_date,
      role,
      scope,
      documents_required,
      priority,
      units,
      tasks,
    };

    try {
      setLoading(true);
      setError(null);

      // Llama al método createProjection con los datos del formulario
      const response = await createProjection(projectionData);
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
                <option value="Docencia (carga académica y otras actividades)">Docencia (carga académica y otras actividades)</option>
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
                disabled={!functionField}
              >
                <option value="" disabled>Selecciona una actividad</option>
                {getActividades()}
              </select>
              {activityError && <span className="text-red-500">Por favor, selecciona una actividad.</span>}

            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Establece una fecha proyectada de inicio</label>
              <input
                type="date"
                value={end_date}
                onChange={(e) => {
                  setEndDate(e.target.value)
                  setDateError(false); // Elimina el error al seleccionar una fecha
                }}
                className="w-full p-2 rounded-lg border border-gray-400"
              />
              {dateError && <span className="text-red-500">Por favor, selecciona una fecha de inicio.</span>}
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Rol de participación</label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setRoleError(false); // Elimina el error al seleccionar un rol
                }}
                className="w-full p-2 rounded-lg border border-gray-400"
              >
                <option value="" disabled>Selecciona un rol de participación</option>
                <option value="expositor">Expositor</option>
                <option value="asistente">Asistente</option>
                <option value="organizador">Organizador</option>
              </select>
              {roleError && <span className="text-red-500">Por favor, selecciona un rol.</span>}
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Alcance</label>
              <select
                value={scope}
                onChange={(e) => {
                  setScope(e.target.value);
                  setScopeError(false); // Elimina el error al seleccionar un alcance
                }}
                className="w-full p-2 rounded-lg border border-gray-400"
              >
                <option value="" disabled>Selecciona un alcance</option>
                <option value="nacional">Nacional</option>
                <option value="internacional">Internacional</option>
              </select>
              {scopeError && <span className="text-red-500">Por favor, selecciona un alcance.</span>}
            </div>

            {documents_required && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">Documento requerido</label>
                <p className="bg-white p-2 rounded-lg border border-gray-400">{documents_required}</p>
              </div>
            )}
            {units && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">U.P aproximadas a obtener</label>
                <input type="text" value={units} className="w-full p-2 rounded-lg border border-gray-400" readOnly />
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
                <button type="submit" className="bg-blue-800 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 w-full mt-6">
                  Agregar
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>

          {/* Información Adicional */}
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">Actividades proyectadas:</h3>
              <input type="text" className="w-full p-2 mt-2 rounded-lg border border-gray-400" />
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">U.P acumuladas:</h3>
              <input type="text" className="w-full p-2 mt-2 rounded-lg border border-gray-400" />
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700">¿No sabes qué agregar?</h3>
              <p className="text-gray-700">¡Conoce más acerca de las actividades que puedes realizar, qué implican y sus detalles!</p>
              <button className="mt-4 bg-blue-800 text-white px-6 py-3 rounded-2xl hover:bg-blue-600">¿Qué puedo agregar?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnidadesPromocion;