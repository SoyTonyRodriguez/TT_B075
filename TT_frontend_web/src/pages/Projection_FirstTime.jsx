import React, { useState, useEffect } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline, IoSchoolOutline, IoStarOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import LoadingAnimation from "../components/LoadingAnimation";
import { createProjection } from '../api/projections.api';

function ProjectionFirstTime() {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar el índice del carrusel
  const navigate = useNavigate();

  const handleCreateProjection = async () => {
    setLoading(true);
    try {
      const response = await createProjection({ products: [] });
      if (response.status === 200 || response.status === 201) {
        const projectionId = response.data.id;
        const accountDetails = JSON.parse(localStorage.getItem('accountDetails')) || {};
        accountDetails.projection_id = projectionId;
        localStorage.setItem('accountDetails', JSON.stringify(accountDetails));
        navigate('/new-projection');
      } else {
        alert('Error al crear la proyección');
      }
    } catch (error) {
      console.error('Error creando la proyección:', error);
    } finally {
      setLoading(false);
    }
  };

  // Datos de las secciones del carrusel
  const sections = [
    {
      title: "Docencia (carga académica y otras actividades)",
      description: "La docencia es el pilar de tu labor en el IPN. Planifica tu carga académica, tutorías y creación de materiales didácticos para asegurar que cumples con los objetivos clave.",
    },
    {
      title: "Investigación",
      description: "La investigación es fundamental para el avance académico. Proyecta tus actividades de investigación para cumplir con los hitos en tus proyectos y publicaciones.",
    },
    {
      title: "Superación Académica",
      description: "La superación académica incluye cursos de actualización, diplomados o posgrados. Proyecta estos estudios para continuar tu crecimiento profesional y acumular U.P.",
    },
    {
      title: "Actividades complementarias de apoyo a la docencia y a la investigación",
      description: "Participa en comités, dirige tesis y evalúa prácticas académicas. Estas actividades enriquecen tu experiencia y suman U.P.",
    },
    {
      title: "Extensión, integración y difusión de la ciencia y la cultura",
      description: "Las actividades de extensión permiten que el conocimiento trascienda el aula. Participar en eventos científicos o culturales contribuye a tu crecimiento y acumula U.P.",
    },
  ];

  // Efecto para cambiar de sección automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sections.length]);

  // Función para moverse a la siguiente diapositiva
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };

  // Función para moverse a la diapositiva anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sections.length) % sections.length);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-cover bg-center">
      {/* Navegación */}
      <Navigation />

      {/* Línea de separación */}
      <hr className="border-t-2 border-black my-4" />

      {/* Contenedor principal */}
      <div className="container mx-auto mt-10 mb-5 py-8 p-4 bg-gray-800 bg-opacity-40 rounded-lg shadow-lg">
        {/* Título e icono */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">¿Por qué necesitas una proyección?</h1>
          <IoStarOutline size={36} color="#fff" />
        </div>

        {/* Resumen sobre la importancia de la proyección */}
        <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-6">
          <p className="text-gray-300 mb-2">
            Crear una proyección te permite planificar y organizar tus actividades académicas y profesionales de manera estructurada para los próximos dos años. Es fundamental porque:
          </p>
          <ul className="list-disc list-inside text-gray-300">
            <li><strong>Acumulación de Unidades de Promoción (U.P.):</strong> Las U.P. son esenciales para avanzar en tu carrera, y cada actividad que realices te ayudará a sumar los puntos necesarios.</li>
            <li><strong>Balance de responsabilidades:</strong> Planificar evita la sobrecarga y te permite enfocarte en actividades de mayor impacto.</li>
            <li><strong>Reconocimiento de esfuerzos:</strong> Un plan bien estructurado asegura que todas tus actividades sean valoradas y cuenten para tu promoción.</li>
            <li><strong>Desarrollo continuo:</strong> Facilita el seguimiento de tu progreso en docencia, investigación y superación académica, maximizando tu crecimiento profesional.</li>
          </ul>
          <p className="text-gray-300 mt-4">
            Con una proyección adecuada, puedes asegurarte de que cada esfuerzo que realices te acerque a tus metas de promoción, potenciando tu desarrollo académico y profesional.
          </p>
        </div>

        {/* Carrusel de secciones */}
        <div className="relative">
          {/* Botón para moverse a la diapositiva anterior */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600"
          >
            <IoChevronBackOutline size={24} />
          </button>

          {/* Sección actual */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md text-center">
            <div className="flex items-center justify-center mb-2">
              <IoSchoolOutline size={28} color="#fff" className="mr-2" />
              <h2 className="text-xl font-bold text-white">{sections[currentIndex].title}</h2>
            </div>
            <p className="text-gray-300">{sections[currentIndex].description}</p>
          </div>

          {/* Botón para moverse a la siguiente diapositiva */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600"
          >
            <IoChevronForwardOutline size={24} />
          </button>

          <div className="flex justify-center mt-4 space-x-4">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

        {/* Conclusión */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCreateProjection}
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Acepta y crea tu proyección
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectionFirstTime;
