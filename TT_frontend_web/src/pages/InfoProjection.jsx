import React, { useState, useRef } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { useSpring, animated } from 'react-spring';
import Navigation from './Navigation/Navigation';

const actividadesPorFuncion = {
  docencia: [
    { 
      actividad: "Carga académica", 
      documento: "Registro Único de Actividades Académicas (RUAA) o constancia de carga académica emitida por las autoridades competentes, especificando la cantidad de horas y el nivel educativo​.", 
      up: ['1.00 U.P. por hora impartida frente a grupo en enseñanza media superior y superior.', '1.25 U.P. por hora impartida en posgrado.'], 
      condiciones: [
        'Debe completarse la carga académica mínima requerida por semestre o año.',
        'Las horas se calculan por semana y se deben cumplir los requisitos establecidos para docencia presencial o a distancia.'
      ] 
    },
    { 
      actividad: "Tutorías", 
      documento: "Constancia emitida por la Coordinación Institucional de Tutoría Politécnica (CITP) que avale las tutorías realizadas​.", 
      up: [
        '1.00 U.P. por hora de tutoría individual a la semana durante el semestre (máximo 5.00 U.P.).',
        '1.00 U.P. por hora de tutoría grupal a la semana durante el semestre (máximo 5.00 U.P.).',
        '3.00 U.P. por unidad de aprendizaje en tutoría de regularización por semestre.',
        '5.00 U.P. en tutoría de recuperación académica por semestre.'
      ], 
      condiciones: [
        'Las tutorías pueden ser individuales o grupales.',
        'Se deben impartir regularmente, cumpliendo con las horas estipuladas por semana y registrarlas oficialmente en el centro de trabajo.','Máximo 5.00 U.P. por tutoría individual y grupal en el semestre.'
      ] 
    },
    { 
      actividad: "Elaboración de Material Didáctico", 
      documento: "Constancia emitida por el presidente de la academia con aval de los integrantes y visto bueno del Subdirector Académico​.", 
      up: [
        '5.00 U.P. por transparencias, acetatos o rotafolios.',
        '8.00 U.P. por antología de asignatura.',
        '10.00 U.P. por problemario o reactivos de evaluación.',
        '15.00 U.P. por modelos tridimensionales.',
        '18.00 U.P. por audiovisuales o diaporamas.',
        '20.00 U.P. por prototipos.',
      ], 
      condiciones: [
        'Máximo: 25.00 U.P. por periodo de promoción, prorrateado entre los coautores.',
        'El material debe ser aprobado y utilizado en las actividades de enseñanza.',
        'Se debe contar con la validación del presidente de la academia correspondiente y el Subdirector Académico.'
      ] 
    },
    { 
      actividad: "Autoría de Libros", 
      documento: "Constancia de validación emitida por la DEMS, DES o SIP​.", 
      up: [
        '80.00 U.P. si es evaluado como excelente.',
        '50.00 U.P. si es evaluado como bueno.',
        '20.00 U.P. si es evaluado como regular.'
      ], 
      condiciones: [
        'Los libros deben ser reconocidos y utilizados en el ámbito académico.',
        'La evaluación del libro debe ser realizada por las instancias académicas correspondientes.'
      ] 
    },
    { 
      actividad: "Traducción de Libros", 
      documento: "Oficio de reconocimiento emitido por la academia​.", 
      up: ['15.00 U.P. por libro traducido.', 'Máximo: 30.00 U.P. por periodo de promoción.'], 
      condiciones: [
        'Máximo de 30.00 U.P. acumuladas por periodo de promoción.',
        'Aplicable a la traducción de libros relevantes para la enseñanza o la investigación en el IPN.',
        'Debe ser una traducción validada por la academia correspondiente.'
      ] 
    },
    { 
      actividad: "Evaluación y Rediseño de Programas Académicos", 
      documento: "Constancia emitida por DEMS, DES o SIP​.", 
      up: ['U.P. asignadas de acuerdo al nivel de rediseño y su impacto en los programas académicos.'], 
      condiciones: [
        'Los programas académicos deben ser aprobados y reestructurados formalmente.'
      ] 
    },
    { 
      actividad: "Elaboración de Software Educativo", 
      documento: "Constancia emitida por DEMS, DES o SIP​.", 
      up: ['8.00 U.P. como profesor-autor o diseñador didáctico.','5.00 U.P. como comunicólogo educativo, programador web o diseñador gráfico.','3.00 U.P. como supervisor editorial o corrector de estilo.'], 
      condiciones: [
        'El software debe ser elaborado con fines educativos y estar aprobado para su uso en actividades académicas.'
      ] 
    },
    { 
      actividad: "Producción de Unidades de Aprendizaje en Línea", 
      documento: "Constancia emitida por UPEV, avalada por DEMS, DES o SIP​.", 
      up: ['8.00 U.P. como profesor-autor o diseñador didáctico.','5.00 U.P. como comunicólogo educativo o programador web.','3.00 U.P. como supervisor editorial o corrector de estilo.'], 
      condiciones: [
        'Las unidades de aprendizaje deben ser validadas por las autoridades académicas y utilizadas en programas de enseñanza a distancia.'
      ] 
    },
    {
      actividad: "Elaboración de Material Didáctico Digital", 
      documento: "Constancia emitida por DEMS, DES o SIP​.", 
      up: ['Varía dependiendo del tipo de material didáctico digital (p. ej., poli-libros, cursos en línea).'], 
      condiciones: [
      'El material debe ser desarrollado y aprobado para su uso en actividades educativas dentro del IPN.'
    ] 
  },
  {
    actividad: "Proyectos de Aula", 
    documento: "Constancia emitida por DEMS que indique la participación como coordinador del Proyecto Aula​.​.", 
    up: ['5.00 U.P. por semestre como coordinador.'], 
    condiciones: [
    'Los docentes deben coordinar el proyecto y cumplir con las responsabilidades académicas en el aula, con un enfoque en el aprendizaje práctico y colaborativo.'
  ] 
}
  ],
  investigacion:
  [
    {
    actividad: "Participación en Proyectos de Investigación (Financiamiento Interno)", 
    documento: "Constancia emitida por SIP, indicando el avance del proyecto y su culminación​​.", 
    up: ['5.00 U.P. por el 20% de avance inicial como director.','3.00 U.P. por el 20% de avance inicial como participante.','25.00 U.P. por proyecto terminado como director.','15.00 U.P. por proyecto terminado como participante.'], 
    condiciones: [
      'Máximo: 2 proyectos como director y 3 proyectos como participante por periodo de promoción.', 'Los proyectos deben estar aprobados y financiados por el IPN.'
    ]
  }, 
  {
    actividad: " Participación en Proyectos de Investigación (Financiamiento Externo)", 
    documento: "Carta de aceptación del informe final o carta de finiquito, junto con el contrato o convenio firmado​​.", 
    up: ['25.00 U.P. por proyecto terminado como director.','15.00 U.P. por proyecto terminado como participante.'], 
    condiciones: [
      'El proyecto debe estar vinculado a un financiamiento externo, con contrato o convenio firmado.','Se requiere un informe técnico avalado por el titular del centro de trabajo.'
    ]
  },
  {
    actividad: "Desarrollo de Patentes", 
    documento: "Solicitud de registro de patente, resultado del examen de forma, o título de la patente emitido por el IMPI​.", 
    up: ['40.00 U.P. por la solicitud de registro de patentes nacionales del IPN.',
      '50.00 U.P. por la aprobación del examen de forma.','60.00 U.P. por la obtención de patentes nacionales con registro en el IMPI.','80.00 U.P. por la obtención de patentes internacionales'
    ], 
    condiciones: [
      'Las U.P. dependen de las distintas etapas del desarrollo y registro de la patente.',
      'El desarrollo de patentes debe estar relacionado con actividades de innovación académica o de investigación.'
    ]
  },
  {
    actividad: "Estancias de Investigación", 
    documento: "Carta de terminación emitida por la institución donde se realizó la estancia​.", 
    up: ['15.00 U.P. por año de estancia de investigación.'
    ], 
    condiciones: [
      'La estancia debe ser realizada en una institución reconocida, nacional o internacional, y debe estar alineada con los objetivos de investigación del IPN.',
    ]
  }
  ],
  complementarias: [
    { 
      actividad: "Jurado de Examen Profesional o de Grado", 
      documento: "Acta de examen profesional o de grado​.", 
      up: ['4.00 U.P. por cada participación como jurado en examen profesional o de grado.'], 
      condiciones: [
        'Máximo: 20.00 U.P. por periodo de promoción.',
        'Se otorgan las U.P. por cada participación, y deben ser registradas oficialmente en la unidad académica.'
      ] 
    },
    {
      actividad: "Certificación de Laboratorios", 
      documento: "Certificado emitido por la entidad certificadora, con constancia de participación emitida por el titular del centro de trabajo​.", 
      up: ['20.00 U.P. por la certificación de laboratorios.','5.00 U.P. por la validación de pruebas de laboratorio.'], 
      condiciones: [
        'La certificación debe ser realizada por una entidad reconocida, y las pruebas de laboratorio deben ser validadas por una autoridad competente.'
      ] 
    },
    {
      actividad: "Dirección o Asesoría de Tesis", 
      documento: "Oficio o constancia de designación emitida por la unidad académica​..", 
      up: ['5.00 U.P. por trabajo asesorado.'], 
      condiciones: [
         'Máximo: 20.00 U.P. por periodo de promoción.',
        'Aplica para la dirección o asesoría de tesis de licenciatura, maestría o doctorado.'
      ] 
    },
    {
      actividad: "Dirección o Asesoría de Trabajos Escritos para Titulación", 
      documento: "Oficio o constancia de designación emitida por la unidad académica​..", 
      up: ['5.00 U.P. por cada trabajo asesorado.'], 
      condiciones: [
         'Máximo: 20.00 U.P. por periodo de promoción.',
        'El docente debe estar designado oficialmente como asesor o director del trabajo de titulación.',
        'Los trabajos deben concluirse exitosamente con la titulación del estudiante.'
      ] 
    }
  ],
  superacion: [
    { 
      actividad: "Diplomados", 
      documento: "Constancia emitida por DEMS, DES, SIP o CGFIE​.", 
      up: ['40.00 U.P. por diplomado de al menos 180 horas. Si el diplomado tiene menos horas, se otorgará la parte proporcional.'], 
      condiciones: [
        'Los diplomados deben cumplir un mínimo de horas para la acumulación total de U.P.',
        'El diplomado debe estar alineado con la mejora académica del docente y ser aprobado por el IPN o por una institución externa reconocida.',
        'Diplomados reconocidos e impartidos por el IPN o por instituciones externas con validación del IPN.'
      ] 
    },
    { 
      actividad: "Estudios de Especialización, Maestría y Doctorado", 
      documento: "Constancia emitida por SIP que acredite el cumplimiento del 100% de los créditos​.", 
      up: [
        '75.50 U.P. por especialización.',
        '88.50 U.P. por maestría.',
        '108.50 U.P. por doctorado (con el 100% de créditos aprobados).'
      ], 
      condiciones: [
        'Deben ser estudios reconocidos por el IPN y cumplir con el 100% de los créditos correspondientes.'
      ] 
    },
    { 
      actividad: "Cursos de Propósito Específico", 
      documento: "Constancia emitida por SIP​.", 
      up: ['6.00 U.P. por cada 30 horas de cursos.'], 
      condiciones: [
        'Máximo: 30.00 U.P. por periodo de promoción.',
        'Los cursos deben estar alineados con los fines académicos del IPN y deben ser acreditados oficialmente.'
      ] 
    },
    {
      actividad: "Cursos de Actualización, Seminarios y Talleres", 
      documento: "Constancia emitida por DEMS, DES, SIP o CGFIE, según corresponda​.​.", 
      up: ['3.00 U.P. por cada 15 horas de curso con evaluación.', '1.00 U.P. por cada 15 horas de curso sin evaluación.','8.00 U.P. por cada 20 horas de cursos de identidad institucional con evaluación.'], 
      condiciones: [
        'Máximo de 7 cursos acumulables por periodo de promoción.',
        'El docente debe cumplir con todas las horas del curso y, si aplica, presentar una evaluación.',
        'Los cursos deben estar alineados con la función docente o de investigación, y ser impartidos o validados por el IPN.'
      ]
    }
  ],
  extension: [
    {
    actividad: "Ponente en Conferencias, Videoconferencias o Expositor de Carteles", 
    documento: "Constancia de participación emitida por la instancia organizadora​.", 
    up: ['3.00 U.P. por cartel o conferencia nacional.', '6.00 U.P. por conferencia magistral nacional.','6.00 U.P. por conferencia magistral nacional.','8.00 U.P. por conferencia magistral internacional.','Máximo: 24.00 U.P. por periodo de promoción.'], 
    condiciones: [
      'Participación en eventos académicos nacionales o internacionales.'
    ]
   },
  {
   actividad: "Participación en Encuentros Académicos Interpolitécnicos", 
   documento: "Constancia de participación emitida por el Titular de la unidad académica​.", 
   up: ['2.00 U.P. por encuentro.', '6.00 U.P. por conferencia magistral nacional.','Máximo: 8.00 U.P. por periodo de promoción.'], 
   condiciones: [
     'Los encuentros deben ser de carácter académico y estar registrados oficialmente.'
   ]
  },
  {
    actividad: "Participación en Brigadas Multidisciplinarias de Servicio Social", 
    documento: "Constancia de participación emitida por la Dirección de Egresados y Servicio Social​", 
    up: ['8.00 U.P. por coordinador de brigada.', '4.00 U.P. por profesor de brigada.','4.00 U.P. por responsable del programa.'], 
    condiciones: [
      'Participación activa en las brigadas de servicio social autorizadas por el IPN.'
    ]
  }
  ]
};

function InfoProjection({ userName }) {
  const [openSection, setOpenSection] = useState(null);
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

  return (
<main className="min-h-screen relative overflow-hidden">
<Navigation />
      <hr className="border-t-2 border-black my-4" />
      <div className="container mx-auto mt-8 overflow-hidden">

      <div className="flex items-center justify-between bg-black bg-opacity-40 p-6 rounded-lg shadow-lg">
      <p className="text-xl text-white leading-relaxed text-justified justify-center">
        La documentación para las convocatorias de promoción dentro del Instituto Politécnico Nacional (IPN) debe ser muy detallada, ya que cada actividad 
        realizada por el docente debe estar respaldada por pruebas verificables. Entre los documentos requeridos se encuentran <b>constancias oficiales, registros 
        académicos, contratos, informes técnicos</b>, y otros documentos que avalen la participación en proyectos de investigación, docencia o superación académica. 
        Es fundamental que todos estos documentos estén validados por las autoridades correspondientes, como la DEMS, DES o la SIP, según la actividad a presentar. 
        La falta de estos respaldos o su incorrecta presentación puede resultar en la descalificación o rechazo de la solicitud, por lo que es esencial seguir cuidadosamente
        las indicaciones de la convocatoria, que incluye fechas y formatos específicos.
        </p>
      </div>
      <div className="flex items-center justify-between p-6 rounded-lg shadow-lg">
      <p className="text-3xl text-grey leading-relaxed text-center justify-center">
          <b>Las actividades y recursos que puedes desarrollar durante el período de 2 años que dispones para acumular unidades son los siguientes, míralas y considera cuales 
          se adecuan más a tus actividades y te resultan más interesante ¡Adelante!</b>
        </p>
      </div>
    </div>

      <div className="container mx-auto mt-8">
        {Object.entries(actividadesPorFuncion).map(([categoria, actividades], index) => (
          <div key={categoria} className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-bold mb-4 capitalize">{categoria}</h3>
            {actividades.map((actividadItem, actividadIndex) => (
              <div key={actividadIndex} className=" border-gray-700 mb-6">
                <button
                  onClick={() => toggleSection(`${categoria}-${actividadIndex}`)}
                  className="w-full text-left py-3 text-lg font-semibold flex justify-between items-center focus:outline-none bg-blue-700 hover:bg-blue-600 transition-colors duration-300 text-gray-100 rounded-lg px-4"
                >
                  {actividadItem.actividad}
                  <animated.span style={iconSpring(`${categoria}-${actividadIndex}`)}>
                    <FaChevronDown />
                  </animated.span>
                </button>
                <animated.div style={springStyle(`${categoria}-${actividadIndex}`)}>
                  <div ref={(el) => sectionRefs.current[`${categoria}-${actividadIndex}`] = el}>
                    <div className="py-3 px-4 bg-gray-800 text-gray-300 rounded-b-lg">
                      <p>
                        <b>Valoración:</b>
                        <ul className="list-disc ml-5">
                          {actividadItem.up.map((valor, i) => (
                            <li key={i}>{valor}</li>
                          ))}
                        </ul>
                        <b>Documento Probatorio:</b> {actividadItem.documento}
                      </p>
                      <p><b>Condiciones:</b></p>
                      <ul className="list-disc ml-5">
                        {actividadItem.condiciones.map((condicion, i) => (
                          <li key={i}>{condicion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </animated.div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

export default InfoProjection;
