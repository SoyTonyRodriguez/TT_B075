import React, { useState, useRef } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { useSpring, animated } from 'react-spring';
import Navigation from './Navigation/Navigation';

const actividadesPorFuncion = {
  docencia: [ //ok
    {
      actividad: "Carga académica", 
      documento: "Registro Único de Actividades Académicas (RUAA) o constancia de carga académica suscrita por las autoridades competentes.", 
      up: ['1.00 U.P. por hora en nivel superior.', '1.00 por cada 15 horas de módulos '], 
      condiciones: [
        'La actividad debe estar registrada en el RUAA o validada por la autoridad correspondiente.'
      ]
    },
    {
      actividad: "Elaboración e Impartición de acciones de formación", 
      documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", 
      up: ['4.50 U.P. por cada 15 horas impartidas con evaluación.', '2.00 U.P. por cada 15 horas sin evaluación.'], 
      condiciones: [
        'La acción formativa debe estar aprobada por las instancias correspondientes.'
      ]
    },
    {
      actividad: "Programa de inducción", 
      documento: "Constancia de validación emitida por la DEMS, DES o SIP.", 
      up: ['1.00 U.P. por hora/semana/mes en nivel superior.'], 
      condiciones: [
        'El programa debe estar validado por las autoridades académicas correspondientes.'
      ]
    },
    {
      actividad: "Tutorías", 
      documento: "Constancia emitida por la Coordinación Institucional de Tutoría Politécnica (CITP).", 
      up: ['1.00 U.P. por cada hora de tutoría individual a la semana.  Máximo 5.00.', '1.00 U.P. en tutoría grupal por cada hora a la semana en el semestre. Máximo 5.00.', '3.00 U.P. en tutoría de regularización por unidad de aprendizaje al semestre.', '5.00 U.P. en tutoría de recuperación académica por unidad de aprendizaje al semestre.', '3.00 U.P. en tutoría a distancia por grupo atendido al semestre.'], 
      condiciones: [
        'Las tutorías deben estar registradas oficialmente y validadas por el CITP.'
      ]
    },
    {
      actividad: "Diseño y planeación didáctica en el aula", 
      documento: "Constancia emitida por la DEMS, DES o SIP.", 
      up: ['10.00 U.P. por grupo al semestre.', 'Máximo: 20.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'La planeación debe estar avalada por las autoridades académicas y ajustarse a los programas oficiales.'
      ]
    },
    {
      actividad: "Elaboración de material didáctico para la impartición de cátedra", 
      documento: "Constancia emitida por el presidente de la academia o equivalente, con el aval de los integrantes de la misma y el visto bueno del Subdirector Académico.", 
      up: ['5.00 U.P. por transparencias, rotafolios.', '8.00 U.P. por antología de la asignatura', '10.00 U.P. por problemario.', '20.00 U.P. por prototipos.', 'Máximo: 25.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'El material debe ser aprobado por la academia correspondiente.'
      ]
    },
    {
      actividad: "Elaboración de material didáctico digital", 
      documento: "Constancia emitida por la DEMS, DES o SIP.", 
      up: ['Tratamiento educativo: Curso completo 60.00 U.P.', 'Apoyo educativo: Curso completo 40.00 U.P.', 'Informativos: Curso completo 20.00 U.P.', 'Tratamiento educativo: Unidad o Módulo 40.00 U.P.', 'Apoyo educativo: Unidad o Módulo 20.00 U.P.', 'Indormativos: Unidad o Módulo 5.00 U.P.'], 
      condiciones: [
        'El material digital debe estar validado por las instancias correspondientes.'
      ]
    },
    {
      actividad: "Autoría de libros", 
      documento: "Constancia de validación emitida por la DEMS, DES o SIP.", 
      up: ['80.00 U.P. por libro con evaluación excelente.', '50.00 U.P. por libro con evaluación buena.', '20.00 U.P. por libro con evaluación regular.'], 
      condiciones: [
        'El libro debe estar aprobado y evaluado por las instancias académicas correspondientes.'
      ]
    },
    {
      actividad: "Elaboración de apuntes, instructivos de talleres y prácticas de laboratorio", 
      documento: "Constancia emitida por la DEMS o DES.", 
      up: ['30.00 U.P. por evaluación excelente.', '20.00 U.P. por evaluación buena.', '15.00 U.P. por evaluación regular.'], 
      condiciones: [
        'El material debe ser aprobado por la academia y evaluado por las autoridades competentes.'
      ]
    },
    {
      actividad: "Elaboración de reactivos para guías de estudio y exámenes de admisión", 
      documento: "Constancia emitida por la DEMS o DES.", 
      up: ['30.00 U.P. por evaluación excelente.', '20.00 U.P. por evaluación buena.', '15.00 U.P. por evaluación regular.'], 
      condiciones: [
        'Elaboración de reactivos aprobada y validada por las instancias correspondientes.'
      ]
    },
    {
      actividad: "Evaluación, diseño y/o rediseño de programas académicos", 
      documento: "Constancia emitida por la DEMS, DES o SIP.", 
      up: ['Coordinador "Evaluación o Rediseño": Plan de Estudio (Programa Académico) 10.00 U.P.', 'Participante "Evaluación o Rediseño": Plan de Estudio (Programa Académico) 3.00 U.P.', 'Coordinador "Diseño": Plan de Estudio (Programa Académico) 20.00 U.P.', 'Participante "Diseño": Plan de Estudio (Programa Académico) 10.00 U.P.', 'Coordinador "Evaluación o Rediseño": Programa de Estudio de una Unidad de Aprendizaje 5.00 U.P.', 'Participante "Evaluación o Rediseño": Programa de Estudio de una Unidad de Aprendizaje 3.00 U.P', 'Coordinador "Diseño": Programa de Estudio de una Unidad de Aprendizaje 8.00 U.P', 'Participante "Diseño": Programa de Estudio de una Unidad de Aprendizaje 4.00 U.P'], 
      condiciones: [
        'El programa debe estar aprobado y validado por la instancia correspondiente.'
      ]
    },
    {
      actividad: "Elaboración de software educativo", 
      documento: "Constancia emitida por la DEMS, DES o SIP.", 
      up: ['Simulador Complejo e Integrado 15.00 U.P.', 'Sistema Complejo e Integrado 15.00 U.P.', 'Tutorial Interactivo Complejo e Integrado 10.00 U.P.', 'Simulador Modular 10.00 U.P.', 'Sistema Modular 10.00 U.P.', 'Tutorial Interactivo Modular 5.00 U.P.'], 
      condiciones: [
        'El software debe estar aprobado y validado por la institución correspondiente.'
      ]
    },
    {
      actividad: "Elaboración de hardware", 
      documento: "Constancia emitida por la DEMS, DES o SIP.", 
      up: ['75.00 U.P. excelente calidad.', '55.00 U.P. buena calidad.', '35.00 U.P. regular calidad.'], 
      condiciones: [
        'El hardware debe ser aprobado por las instancias correspondientes.'
      ]
    },
    {
      actividad: "Producción de Unidades de Aprendizaje en línea", 
      documento: "Constancia emitida por la UPEV con el visto bueno de la DEMS, DES o SIP.", 
      up: ['Profesor-autor 8.00 U.P.', 'Diseñador 8.00 U.P.', 'Comunicólo 5.00 U.P.', 'Programador web 5.00 U.P.', 'Diseñador gráfico 5.00 U.P.', 'Supervisor 3.00 U.P.'], 
      condiciones: [
        'La unidad de aprendizaje debe estar aprobada por la UPEV y las instancias académicas correspondientes.'
      ]
    },
    {
      actividad: "Proyecto Aula", 
      documento: "Constancia emitida por la DEMS.", 
      up: ['5.00 U.P. por proyecto semestral.'], 
      condiciones: [
        'El proyecto debe estar registrado y aprobado por las instancias académicas.'
      ]
    },
    {
      actividad: "Certificación de laboratorios y validación de pruebas de laboratorio", 
      documento: "Certificado emitido por una entidad reconocida y constancia del titular del centro de trabajo.", 
      up: ['20.00 U.P. para certificación de laboratorios.', '5.00 U.P. para validación de pruebas de laboratorio'], 
      condiciones: [
        'La certificación debe estar avalada por una entidad oficial.'
      ]
    }
  ],
  investigacion: [//OK
    {
      actividad: "Proyectos de investigación con financiamiento interno", 
      documento: "Constancia emitida por la SIP.", 
      up: ['5.00 U.P. con el 20% de avance inicial como director.', '3.00 U.P. con el 20% de avance inicial como participante.', '25.00 U.P. por proyecto terminado como director.', '15.00 U.P. por proyecto terminado como participante.', 'Máximo 2 proyectos como director y 3 proyectos como participante por periodo de promoción.'], 
      condiciones: [
        'El proyecto debe estar registrado y validado por la SIP.'
      ]
    },
    {
      actividad: "Proyectos vinculados con financiamiento externo", 
      documento: "Contrato o convenio, carta de aceptación del informe final o carta de finiquito, informe técnico.", 
      up: ['25.00 U.P. como director por proyecto terminado.', '15.00 U.P. como participante por proyecto terminado.'], 
      condiciones: [
        'El proyecto debe estar avalado por el titular del centro de trabajo.'
      ]
    },
    {
      actividad: "Publicación de artículos científicos y técnicos", 
      documento: "Constancia de validación emitida por la SIP.", 
      up: ['3.00 U.P. por artículo de circulación institucional.', '5.00 U.P. por artículo de circulación nacional.', '10.00 U.P. por artículo de circulación nacional con jurado.', '20.00 U.P. por artículo de circulación internacional.', 'Máximo 5 publicaciones por periodo de promoción.'], 
      condiciones: [
        'El artículo debe estar publicado en una revista de reconocido prestigio.'
      ]
    },
    {
      actividad: "Estancias de Investigación", 
      documento: "Oficio de aceptación para realizar la estancia, dictamen del COTEBAL o de la Coordinación de Proyectos Especiales de la Secretaría Académica, carta de terminación expedida por la institución donde se realizó la estancia.", 
      up: ['15.00 U.P. por estancia de investigación. (1 por año)'], 
      condiciones: [
        'La estancia debe estar avalada por el COTEBAL y ser diferente a las realizadas para impartir clases.'
      ]
    },
    {
      actividad: "Desarrollo de patentes", 
      documento: "Solicitud de registro, resultado del examen de forma, título de la patente.", 
      up: ['40.00 para solicitud de registro de patentes nacionales del IPN.', '50.00 para aprobación del examen de forma.', '60.00 para obtención de patentes nacionales del IPN con registro en el IMPI ', '80.00 para obtención de patentes internacionales del IPN '], 
      condiciones: [
        'El proceso debe estar registrado y aprobado por la instancia correspondiente.'
      ]
    }
  ],
  superacion: [//OK
    {
      actividad: "Otra licenciatura", 
      documento: "Constancia de validación emitida por la DES.", 
      up: ['60.00 U.P. por licenciatura.'], 
      condiciones: [
        'La licenciatura debe ser distinta a la presentada en evaluaciones anteriores y estar validada por la DES.'
      ]
    },
    {
      actividad: "Cursos de actualización, seminarios y talleres", 
      documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE si son impartidos por el IPN; Constancia de validación emitida por la DEMS, DES o SIP si son impartidos por otra institución.", 
      up: ['3.00 con evaluación por cada 15 horas', '1.00 sin evaluación por cada 15 horas', '8.00 con evaluación por cada 20 horas de identidad institucional', 'Máximo 7 cursos por periodo de promoción.'], 
      condiciones: [
        'Los cursos deben estar relacionados con la actividad docente y contar con la validación institucional.'
      ]
    },
    {
      actividad: "Estudios de especialidad, maestría y doctorado", 
      documento: "Constancia de validación emitida por la SIP.", 
      up: ['75.50 U.P. por especialidad.', '88.50 U.P. por maestría.', '108.50 U.P. por doctorado.'], 
      condiciones: [
        'Los estudios deben estar completamente acreditados con el 100% de los créditos aprobados.'
      ]
    },
    {
      actividad: "Cursos de propósito específico", 
      documento: "Constancia emitida por la SIP.", 
      up: ['6.00 U.P. por cada 30 horas de curso.', 'Máximo: 30.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'El curso debe estar orientado a un propósito específico dentro de la enseñanza o investigación.'
      ]
    },
    {
      actividad: "Diplomados", 
      documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", 
      up: ['40.00 U.P. por diplomado de 180 horas.'], 
      condiciones: [
        'Los diplomados deben tener un mínimo de 100 horas y estar validados por la institución correspondiente.'
      ]
    },
    {
      actividad: "Idiomas", 
      documento: "Constancia emitida por la Dirección de Formación en Lenguas Extranjeras y/o certificado emitido por el CENLEX Santo Tomás o Zacatenco.", 
      up: ['8.00 U.P. por expresión oral.', '8.00 U.P. por expresión escrita.', '5.00 U.P. por comprensión de lectura.', '5.00 U.P. por comprensión auditiva.'], 
      condiciones: [
        'El dominio del idioma debe estar certificado por el CENLEX o validado por la Dirección de Formación en Lenguas Extranjeras.'
      ]
    }
  ],
  complementarias: [
    {
      "actividad": "Distinciones académicas",
      "documento": "Constancia de validación emitida por la SIP.",
      "up": [
        {
          "nivel": "I",
          "puntos": "31 - 40",
          "conceptos": [
            "Premio internacional otorgado por instituciones de prestigio en ciencia y tecnología.",
            "Premio nacional de ciencia y artes.",
            "Premios nacionales de academias y colegios de profesionistas (curriculares).",
            "Premio de la Academia Mexicana en Ciencias.",
            "Cátedra patrimonial nivel I (CONACYT)."
          ]
        },
        {
          "nivel": "II",
          "puntos": "26 - 30",
          "conceptos": [
            "Premios a la investigación otorgados por otros organismos nacionales que promueven el desarrollo científico y tecnológico.",
            "Premio Instituto Politécnico Nacional a la investigación.",
            "Presea 'Lázaro Cárdenas' o equivalentes de otras instituciones educativas otorgadas a profesores e investigadores."
          ]
        },
        {
          "nivel": "III",
          "puntos": "21 - 25",
          "conceptos": [
            "Premios otorgados a tesistas por organismos nacionales públicos o privados que promueven el desarrollo científico y tecnológico.",
            "Premios otorgados en certámenes académicos nacionales e internacionales en áreas específicas del conocimiento."
          ]
        },
        {
          "nivel": "IV",
          "puntos": "16 - 20",
          "conceptos": [
            "Menciones honoríficas en tesis de grado.",
            "Premio Instituto Politécnico Nacional a tesis de grado.",
            "Mención honorífica en tesis de licenciatura.",
            "Premio Instituto Politécnico Nacional a tesis de licenciatura.",
            "Premio a la dirección de tesis de nivel posgrado.",
            "Reconocimiento por actividades de investigación realizadas en año sabático."
          ]
        },
        {
          "nivel": "V",
          "puntos": "11 - 15",
          "conceptos": [
            "Presea 'Lázaro Cárdenas' o equivalentes de otras instituciones educativas otorgadas a estudiantes.",
            "Premio de software Instituto Politécnico Nacional.",
            "Premio de hardware Instituto Politécnico Nacional.",
            "Premio al prototipo Instituto Politécnico Nacional.",
            "Premio otorgado por organismos nacionales e internacionales a trabajos académicos que promueven el desarrollo científico y técnico."
          ]
        },
        {
          "nivel": "VI",
          "puntos": "10",
          "conceptos": [
            "Premio al trabajo en congresos nacionales o internacionales (póster, cartel o presentación).",
            "Mejor promedio de una maestría o doctorado.",
            "Mejor promedio de un año."
          ]
        }
      ],
      "condiciones": [
        "La distinción debe estar validada oficialmente por el IPN."
      ]
    },
    
  /*  {
      actividad: "Actividades académico-administrativas y sindicales", 
      documento: "Constancia u oficio de designación y documento que acredite el término del cargo.", 
      up: ['Se otorgan según la función desempeñada en el cargo.'], 
      condiciones: [
        'El cargo debe ser reconocido oficialmente por el IPN.'
      ]
    },*/
    {
      actividad: "Dirección o asesoría de trabajos escritos para titulación", 
      documento: "Oficio, constancia o formato de designación suscrito por el Titular de la unidad académica o autoridad competente.", 
      up: ['5.00 U.P. por trabajo asesorado.', 'Máximo: 20.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'Participación oficial como director o asesor de trabajos de titulación.'
      ]
    },
    {
      actividad: "Jurado de examen profesional o de grado", 
      documento: "Acta de examen profesional o de grado.", 
      up: ['4.00 U.P. por jurado.', 'Máximo: 20.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'Participación en exámenes profesionales o de grado como jurado.'
      ]
    },
    {
      actividad: "Experiencia profesional no docente relevante", 
      documento: "Constancia del trabajo profesional desarrollado fuera del IPN con el aval del Titular de la unidad académica.", 
      up: ['10.00 U.P. al año.', 'Máximo: 20.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'Trabajo profesional relevante fuera del IPN con el aval institucional.'
      ]
    },
    {
      actividad: "Traducciones", 
      documento: "Oficio de reconocimiento emitido por la academia.", 
      up: ['15.00 U.P. por libro traducido.', 'Máximo: 30.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'Traducción de textos académicos avalada por la academia correspondiente.'
      ]
    },
    {
      actividad: "Eventos nacionales e internacionales de ciencia y formación integral", 
      documento: "Constancia emitida por la Subdirección Académica con el visto bueno del Titular de la unidad académica y el aval de la DEMS, DES o SIP.", 
      up: ['5.00 U.P. por evento nacional.', '7.00 U.P. por evento internacional.', 'Máximo: 12.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'Participación como expositor o asistente en eventos académicos nacionales o internacionales.'
      ]
    },
    {
      actividad: "Evaluación de prácticas escolares", 
      documento: "Constancia emitida por el Departamento de Extensión y Apoyos Educativos con el visto bueno del Titular de la unidad académica.", 
      up: ['3.00 U.P. por grupo atendido.', 'Máximo: 6.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'Participación en la evaluación oficial de prácticas escolares.'
      ]
    },
    {
      actividad: "Evaluación de informes de los prestadores de servicio social", 
      documento: "Constancia emitida por el Departamento de Extensión y Apoyos Educativos con el visto bueno del Titular de la unidad académica.", 
      up: ['1.00 U.P. por grupo atendido.', 'Máximo: 2.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'Evaluación formal de los informes de servicio social.'
      ]
    },
    {
      actividad: "Evaluación de certámenes académicos", 
      documento: "Constancia de participación emitida por la instancia correspondiente.", 
      up: ['5.00 U.P. por evento evaluado.', 'Máximo: 15.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'Participación oficial como evaluador en certámenes académicos.'
      ]
    },
    {
      actividad: "Servicio externo por obra puntual, sin compensación económica", 
      documento: "Solicitud del servicio externo, aceptación por el centro de trabajo y constancia de participación.", 
      up: ['2.00 U.P. por cada 80 horas de servicio externo'], 
      condiciones: [
        'El servicio debe ser avalado y solicitado por el centro de trabajo.'
      ]
    },
    {
      actividad: "Ponente en conferencias, videoconferencias y expositor de carteles", 
      documento: "Constancia de participación como conferencista o expositor de carteles.", 
      up: ['Nacional 3.00 por cartel o por conferencia.', 'Nacional 4.00 por videoconferencia.', 'Nacional 6.00 por conferencia magistral.', 'Internacional 6.00 por cartel o por conferencia.', 'Internacional 7.00 por videoconferencia.', 'Internacional 8.00 por conferencia magistral.', 'Máximo: 24.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'Participación oficial en eventos académicos nacionales o internacionales.'
      ]
    },
    {
      actividad: "Expositor y asistente en congresos, simposios, reuniones, mesas redondas, coloquios, encuentros, paneles y foros", 
      documento: "Constancia de participación emitida por la instancia correspondiente.", 
      up: ['2.00 U.P. por asistente en evento nacional.', '4.00 U.P. por expositor en evento nacional.', '3.00 U.P. por asistente en evento internacional.', '7.00 U.P. por expositor en evento internacional.'], 
      condiciones: [
        'Participación como expositor o asistente en eventos nacionales o internacionales.'
      ]
    },
    {
      actividad: "Comisiones de evaluación", 
      documento: "Oficio de designación o constancia emitida por la DEMS, DES o SIP.", 
      up: ['3.00 U.P. por participación en comisiones.', '5.00 U.P. como coordinador.', '3.00 U.P. como analista'], 
      condiciones: [
        'Participación oficial en comisiones de evaluación académica.'
      ]
    },
    {
      actividad: "Programas y proyectos institucionales en áreas centrales", 
      documento: "Constancia de participación emitida por el área correspondiente.", 
      up: ['Programa institucional: 9.00 por coordinador.', 'Programa institucional: 7.00 por analista.', 'Proyecto institucional: 7.00 por coordinador.', 'Proyecto institucional: 5.00 por analista.', 'Proyecto de dependencia: 5.00 por coordinador.', 'Proyecto de dependencia: 3.00 por analista.'], 
      condiciones: [
        'Participación activa en programas y proyectos institucionales aprobados por el IPN.'
      ]
    }
  ],
  extension: [ //OK
    {
      actividad: "Participación en la expo-profesiográfica", 
      documento: "Constancia emitida por la Secretaría Académica o por la DEMS o DES.", 
      up: ['2.00 U.P. por expositor.', '3.00 por atención de talleres o concursos', '3.00 por profesor coordinador'], 
      condiciones: [
        'La actividad debe ser a nivel nacional y contar con el aval oficial del IPN.'
      ]
    },
    {
      actividad: "Encuentros Académicos Interpolitécnicos", 
      documento: "Constancia de participación emitida por el Titular de la unidad académica.", 
      up: ['2.00 U.P. por evento.', 'Máximo: 8.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'El evento debe ser de carácter académico y estar registrado oficialmente en el IPN.'
      ]
    },
    {
      actividad: "Brigadas Multidisciplinarias de Servicio Social", 
      documento: "Constancia de participación emitida por la Dirección de Egresados y Servicio Social.", 
      up: ['8.00 U.P. por coordinador de brigada.', '4.00 U.P. por profesor de brigada.', '4.00 U.P. por responsable del programa.'], 
      condiciones: [
        'Participación activa en las brigadas de servicio social autorizadas por el IPN.'
      ]
    },
    {
      actividad: "Impartición de disciplinas deportivas y/o talleres culturales", 
      documento: "Constancia de participación emitida por la autoridad competente.", 
      up: ['0.50 U.P. por cada hora.'], 
      condiciones: [
        'La actividad debe ser avalada por el IPN y contar con la participación de los estudiantes.'
      ]
    },
  ]

};

function InfoProjection({ userName }) {
  const [openSection, setOpenSection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('docencia'); // Estado para la categoría seleccionada
  const sectionRefs = useRef([]);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const springStyle = (index) => useSpring({
    maxHeight: openSection === index ? sectionRefs.current[index]?.scrollHeight : 0,
    opacity: openSection === index ? 1 : 0,
    overflow: 'hidden',
  });

  const iconSpring = (index) => useSpring({
    transform: openSection === index ? 'rotate(180deg)' : 'rotate(0deg)',
  });

  // Función para manejar la selección de categoría
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Actualiza la categoría seleccionada
    setOpenSection(null); // Cerrar cualquier sección abierta cuando se cambia la categoría
  };

  // Combinar todas las actividades de la categoría seleccionada en una sola lista
  const actividadesSeleccionadas = actividadesPorFuncion[selectedCategory] || [];

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation />
      <hr className="border-t-2 border-black my-4" />
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg shadow-lg">
          <p className="text-lg mt-4 text-white text-justify">
            La documentación para las convocatorias de promoción dentro del Instituto Politécnico Nacional (IPN) debe ser muy detallada, ya que cada actividad 
            realizada por el docente debe estar respaldada por pruebas verificables. Entre los documentos requeridos se encuentran <b>constancias oficiales, registros 
            académicos, contratos, informes técnicos</b>, y otros documentos que avalen la participación en proyectos de investigación, docencia o superación académica. 
            Es fundamental que todos estos documentos estén validados por las autoridades correspondientes, como la DEMS, DES o la SIP, según la actividad a presentar. 
            La falta de estos respaldos o su incorrecta presentación puede resultar en la descalificación o rechazo de la solicitud, por lo que es esencial seguir cuidadosamente
            las indicaciones de la convocatoria, que incluye fechas y formatos específicos.
          </p>

          <p className="text-lg mt-4 text-white text-justify">
            <b>Las actividades y recursos que puedes desarrollar durante el período de 2 años que dispones para acumular unidades son los siguientes, míralas y considera cuales 
            se adecuan más a tus actividades y te resultan más interesante ¡Adelante!</b>
          </p>
        </div>
      </div>

      {/* Selector de categorías */}
      <div className="w-full max-w-screen-xl mx-auto my-6">
        <label className="text-black text-lg">Selecciona una función:</label>
        <select
          className="ml-4 p-2 rounded-lg"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="docencia">Docencia</option>
          <option value="investigacion">Investigación</option>
          <option value="complementarias">Actividades Complementarias</option>
          <option value="superacion">Superación Académica</option>
          <option value="extension">Extensión y Vinculación</option>
        </select>
      </div>

      <div className="container mx-auto mt-8">
        {/* Mostrar todas las actividades de la categoría seleccionada en una sola lista */}
        {actividadesSeleccionadas.length > 0 ? (
          actividadesSeleccionadas.map((actividadItem, actividadIndex) => (
            <div key={actividadIndex} className="bg-gray-800 bg-opacity-40 p-6 rounded-lg shadow-lg mb-8">
              <button
                onClick={() => toggleSection(actividadIndex)}
                className="w-full text-left py-3 text-lg font-semibold flex justify-between items-center focus:outline-none bg-blue-700 hover:bg-blue-600 transition-colors duration-300 text-gray-100 rounded-lg px-4"
              >
                {actividadItem.actividad}
                <span>
                  <FaChevronDown />
                </span>
              </button>

              {openSection === actividadIndex && (
                <div>
                  <div ref={(el) => (sectionRefs.current[actividadIndex] = el)}>
                    <div className="py-3 px-4 text-white rounded-b-lg">
                      {/* Verificamos si es la actividad con niveles */}
                      {actividadItem.actividad === "Distinciones académicas" ? (
                        <div>
                          <p><b>Valoración:</b></p>
                          <ul className="list-disc ml-5">
                            {actividadItem.up.map((nivel, nivelIndex) => (
                              <li key={nivelIndex}>
                                <b>Nivel:</b> {nivel.nivel}, <b>Puntos:</b> {nivel.puntos}
                                <ul className="list-disc ml-5">
                                  {nivel.conceptos.map((concepto, conceptoIndex) => (
                                    <li key={conceptoIndex}>{concepto}</li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        // Renderizado estándar para otras actividades
                        <>
                          <p><b>Valoración:</b></p>
                            <p>
                              {(actividadItem.up || []).join('\n').split('\n').map((linea, index) => (
                                <span key={index}>
                                  {linea}
                                  <br />
                                </span>
                              ))}
                            </p>
                          <p><b>Documento Probatorio:</b> {actividadItem.documento}</p>
                          <p><b>Condiciones:</b></p>
                          <ul className="list-disc ml-5">
                            {actividadItem.condiciones.map((condicion, i) => (
                              <li key={i}>{condicion}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">
            No hay actividades disponibles para la categoría seleccionada.
          </p>
        )}
      </div>
    </main>
  );
}

export default InfoProjection;

