import React, { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web'; 
import { FaChevronDown } from 'react-icons/fa';

const PrivacyScreen = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Función para calcular la altura dinámica
  const springStyle = (section, ref) => {
    return useSpring({
      from: { height: 0, opacity: 0 },
      to: expandedSection === section 
        ? { height: ref.current.scrollHeight, opacity: 1 } 
        : { height: 0, opacity: 0 },
      config: { tension: 280, friction: 20 },
    });
  };

  // Icono animado
  const iconSpring = (section) => useSpring({
    transform: expandedSection === section ? 'rotate(180deg)' : 'rotate(0deg)',
    config: { tension: 300, friction: 15 },
  });

  // Secciones con refs para controlar el tamaño
  const sectionRefs = {
    1: useRef(),
    2: useRef(),
    3: useRef(),
    4: useRef(),
    5: useRef(),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 font-sans text-gray-100">
      <h1 className="text-4xl font-bold text-center text-black mb-10">Privacidad y Seguridad</h1>

      {/* Sección 1: Datos Personales Recabados */}
      <div className="border-b border-gray-700 mb-5">
        <button
          onClick={() => toggleSection(1)}
          className="w-full text-left py-3 text-lg font-semibold flex justify-between items-center focus:outline-none bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-gray-100"
        >
          Datos Personales Recabados
          <animated.span style={iconSpring(1)}>
            <FaChevronDown />
          </animated.span>
        </button>
        <animated.div style={springStyle(1, sectionRefs[1])}>
          <div ref={sectionRefs[1]}>
            <p className="py-3 px-4 bg-gray-800 text-gray-300">
              Los datos personales que recabamos de usted serán utilizados únicamente para los fines relacionados con el "Proceso de Promoción Docente". Los datos incluyen: nombre completo, información académica, evaluaciones de desempeño, etc.
            </p>
          </div>
        </animated.div>
      </div>

      {/* Sección 2: Finalidad del Tratamiento de Datos */}
      <div className="border-b border-gray-700 mb-5">
        <button
          onClick={() => toggleSection(2)}
          className="w-full text-left py-3 text-lg font-semibold flex justify-between items-center focus:outline-none bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-gray-100"
        >
          Finalidad del Tratamiento de Datos
          <animated.span style={iconSpring(2)}>
            <FaChevronDown />
          </animated.span>
        </button>
        <animated.div style={springStyle(2, sectionRefs[2])}>
          <div ref={sectionRefs[2]}>
            <p className="py-3 px-4 bg-gray-800 text-gray-300">
              Los datos personales recabados serán tratados de manera encriptada y segura. Su propósito es facilitar que los docentes mantengan un control de sus documentos y del proceso de promoción docente.
            </p>
          </div>
        </animated.div>
      </div>

      {/* Sección 3: Modificaciones al Aviso de Privacidad */}
      <div className="border-b border-gray-700 mb-5">
        <button
          onClick={() => toggleSection(3)}
          className="w-full text-left py-3 text-lg font-semibold flex justify-between items-center focus:outline-none bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-gray-100"
        >
          Modificaciones al Aviso de Privacidad
          <animated.span style={iconSpring(3)}>
            <FaChevronDown />
          </animated.span>
        </button>
        <animated.div style={springStyle(3, sectionRefs[3])}>
          <div ref={sectionRefs[3]}>
            <p className="py-3 px-4 bg-gray-800 text-gray-300">
              Cualquier modificación será notificada a través de la aplicación con anticipación para su consentimiento.
            </p>
          </div>
        </animated.div>
      </div>

      {/* Sección 4: Consentimiento */}
      <div className="border-b border-gray-700 mb-5">
        <button
          onClick={() => toggleSection(4)}
          className="w-full text-left py-3 text-lg font-semibold flex justify-between items-center focus:outline-none bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-gray-100"
        >
          Consentimiento
          <animated.span style={iconSpring(4)}>
            <FaChevronDown />
          </animated.span>
        </button>
        <animated.div style={springStyle(4, sectionRefs[4])}>
          <div ref={sectionRefs[4]}>
            <p className="py-3 px-4 bg-gray-800 text-gray-300">
              Al proporcionar sus datos personales, acepta los términos de este aviso de privacidad y otorga su consentimiento para el tratamiento de los mismos conforme a las finalidades descritas.
            </p>
          </div>
        </animated.div>
      </div>

      {/* Sección 5: Base Legal */}
      <div className="border-b border-gray-700 mb-5">
        <button
          onClick={() => toggleSection(5)}
          className="w-full text-left py-3 text-lg font-semibold flex justify-between items-center focus:outline-none bg-gray-800 hover:bg-gray-700 transition-colors duration-300 text-gray-100"
        >
          Base Legal
          <animated.span style={iconSpring(5)}>
            <FaChevronDown />
          </animated.span>
        </button>
        <animated.div style={springStyle(5, sectionRefs[5])}>
          <div ref={sectionRefs[5]}>
            <p className="py-3 px-4 bg-gray-800 text-gray-300">
              Este aviso se fundamenta en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y sus disposiciones reglamentarias en México.
            </p>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default PrivacyScreen;
