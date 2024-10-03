import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Links from '../img/enlace.png';
import Documents from '../img/documentos.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';
import MenuIcon from '../img/menu-icon.png';
import InfoProjection from './InfoProjection';

function UnidadesPromocion() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prioridad, setPrioridad] = useState('');
  const [fechaProyectada, setFechaProyectada] = useState('');
  const [funcion, setFuncion] = useState('');
  const [rolParticipacion, setRolParticipacion] = useState('');
  const [alcance, setAlcance] = useState('');
  const [actividad, setActividad] = useState('');
  const [documentoRequerido, setDocumentoRequerido] = useState('');
  const [up, setUp] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

  const getActividades = () => {
    if (funcion && actividadesPorFuncion[funcion]) {
      return actividadesPorFuncion[funcion].map((item, index) => (
        <option key={index} value={item.actividad}>
          {item.actividad}
        </option>
      ));
    }
    return null;
  };

  const handleActividadChange = (e) => {
    const actividadSeleccionada = e.target.value;
    setActividad(actividadSeleccionada);
    
    const actividadInfo = actividadesPorFuncion[funcion].find(item => item.actividad === actividadSeleccionada);
    if (actividadInfo) {
      setDocumentoRequerido(actividadInfo.documento);
      setUp(actividadInfo.up);
    } else {
      setDocumentoRequerido('');
      setUp('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Formulario enviado');
  };

  return (
    <div className="min-h-screen bg-cover bg-center">
      
      {/* Navegación Secundaria y Título */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-0">Crear proyección</h2>
        
        {/* Botones normales en pantallas grandes, botón compacto en pantallas pequeñas */}
        <div className="hidden md:flex space-x-4 mr-14">
          <Link to="/links" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Enlaces y bases</p>
          </Link>
          <Link to="/documents" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Documents} alt="Mis documentos" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Mis documentos</p>
          </Link>
          <Link to="/calendar" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Calendar} alt="Calendario" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Calendario</p>
          </Link>
          <Link to="/account" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Account} alt="Mi cuenta" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Mi cuenta</p>
          </Link>
        </div>

        {/* Botón Compacto para pantallas pequeñas */}
        <div className="md:hidden relative">
          <button
            onClick={toggleMenu}
            className="text-white p-4 transition-transform transform hover:scale-125 w-30 h-30 flex items-center justify-center"
          >
            <img src={MenuIcon} alt="Menú" className="w-10 h-10" />
          </button>

          {/* Menú Desplegable */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg">
              <div className="p-4 flex flex-col space-y-4">
                <Link to="/links" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Enlaces y bases</p>
                </Link>
                <Link to="/documents" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Documents} alt="Mis documentos" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Mis documentos</p>
                </Link>
                <Link to="/calendar" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Calendar} alt="Calendario" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Calendario</p>
                </Link>
                <Link to="/account" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Account} alt="Mi cuenta" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Mi cuenta</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="border-t-2 border-black mt-0 mb-8" />

      {/* Contenido Principal */}
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap justify-between">
          {/* Formulario de Actividad */}
          <form onSubmit={handleSubmit} className="bg-gray-800 bg-opacity-40 p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-bold text-white mb-4">Actividad</h3>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Función</label>
              <select
                value={funcion}
                onChange={(e) => setFuncion(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-400"
              >
                <option value="" disabled>Selecciona una función</option>
                <option value="docencia">Docencia (carga académica y otras actividades)</option>
                <option value="investigacion">Investigación</option>
                <option value="superacion">Superación académica</option>
                <option value="complementarias">Actividades complementarias de apoyo a la docencia y a la investigación</option>
                <option value="extension">Actividades de extensión, integración y difusión de la ciencia y de la cultura</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Nombre de la actividad</label>
              <select
                value={actividad}
                onChange={handleActividadChange}
                className="w-full p-2 rounded-lg border border-gray-400"
                disabled={!funcion}
              >
                <option value="" disabled>Selecciona una actividad</option>
                {getActividades()}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Establece una fecha proyectada de inicio</label>
              <input
                type="date"
                value={fechaProyectada}
                onChange={(e) => setFechaProyectada(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Selecciona tu rol de participación</label>
              <select
                value={rolParticipacion}
                onChange={(e) => setRolParticipacion(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-400"
              >
                <option value="" disabled>Selecciona un rol de participación</option>
                <option value="expositor">Expositor</option>
                <option value="asistente">Asistente</option>
                <option value="organizador">Organizador</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2">Alcance</label>
              <select
                value={alcance}
                onChange={(e) => setAlcance(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-400"
              >
                <option value="" disabled>Selecciona un alcance</option>
                <option value="nacional">Nacional</option>
                <option value="internacional">Internacional</option>
              </select>
            </div>
            {documentoRequerido && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">Documento requerido</label>
                <p className="bg-white p-2 rounded-lg border border-gray-400">{documentoRequerido}</p>
              </div>
            )}
            {up && (
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">U.P aproximadas a obtener</label>
                <input type="text" value={up} className="w-full p-2 rounded-lg border border-gray-400" readOnly />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="w-1/2 mr-2">
                <label className="block text-white text-sm font-semibold mb-2">Prioridad</label>
                <select
                  className={`w-full p-2 rounded-lg border border-gray-400 ${getColorForPriority(prioridad)}`}
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value)}
                >
                  <option value="" disabled>Selecciona una prioridad</option>
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
              <div className="w-1/2 ml-2">
                <button type="submit" className="bg-blue-800 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 w-full mt-6">Agregar</button>
              </div>
            </div>
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
