import React, { useState } from 'react';
import { IoSchoolOutline, IoStarOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import LoadingAnimation from "../components/LoadingAnimation";  

import { createProjection } from '../../../api/projections.api'; // Asegúrate de que esta función esté correctamente implementada para hacer el POST

function ProjectionFirstTime() {
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate(); // Para navegar después de crear la proyección

  const handleCreateProjection = async () => {
    setLoading(true); // Activar estado de carga
    try {
      // Crear la proyección enviando un request POST
      const response = await createProjection({
        products: [] // Asegúrate de rellenar esto con los datos adecuados
      });

      if (response.status === 200 || response.status === 201) {
        // Obtener el projection_id del response
        const projectionId = response.data.id; // Asegúrate de que el campo 'id' sea correcto en tu API

        // Actualizar el localStorage con el projection_id
        const accountDetails = JSON.parse(localStorage.getItem('accountDetails')) || {};
        accountDetails.projection_id = projectionId;
        localStorage.setItem('accountDetails', JSON.stringify(accountDetails));

        navigate('/new-projection'); // Redirigir después de crear la proyección
      } else {
        alert('Error al crear la proyección');
      }
    } catch (error) {
      console.error('Error creando la proyección:', error);
    } finally {
      setLoading(false); // Desactivar estado de carga
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

      {/* Contenedor Principal */}
      <div className="container mx-auto mt-4 mb-4 p-4 bg-gray-800 bg-opacity-40 rounded-lg shadow-lg">

        {/* Título e Icono */}
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

        {/* Secciones Informativas con Recuadros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Docencia */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <IoSchoolOutline size={28} color="#fff" className="mr-2" />
              <h2 className="text-xl font-bold text-white">Docencia (carga académica y otras actividades)</h2>
            </div>
            <p className="text-gray-300">
              La docencia es el pilar de tu labor en el IPN. Planifica tu carga académica, tutorías y creación de materiales didácticos para asegurar que cumples con los objetivos clave.
            </p>
          </div>

          {/* Investigación */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <IoSchoolOutline size={28} color="#fff" className="mr-2" />
              <h2 className="text-xl font-bold text-white">Investigación</h2>
            </div>
            <p className="text-gray-300">
              La investigación es fundamental para el avance académico. Proyecta tus actividades de investigación para cumplir con los hitos en tus proyectos y publicaciones.
            </p>
          </div>

          {/* Superación académica */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <IoSchoolOutline size={28} color="#fff" className="mr-2" />
              <h2 className="text-xl font-bold text-white">Superación Académica</h2>
            </div>
            <p className="text-gray-300">
              La superación académica incluye cursos de actualización, diplomados o posgrados. Proyecta estos estudios para continuar tu crecimiento profesional y acumular U.P.
            </p>
          </div>

          {/* Actividades complementarias de apoyo */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <IoSchoolOutline size={28} color="#fff" className="mr-2" />
              <h2 className="text-xl font-bold text-white">Actividades complementarias de apoyo a la docencia y a la investigación</h2>
            </div>
            <p className="text-gray-300">
              Participa en comités, dirige tesis y evalúa prácticas académicas. Estas actividades enriquecen tu experiencia y suman U.P.
            </p>
          </div>

          {/* Extensión e integración */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <IoSchoolOutline size={28} color="#fff" className="mr-2" />
              <h2 className="text-xl font-bold text-white">Extensión, integración y difusión de la ciencia y la cultura</h2>
            </div>
            <p className="text-gray-300">
              Las actividades de extensión permiten que el conocimiento trascienda el aula. Participar en eventos científicos o culturales contribuye a tu crecimiento y acumula U.P.
            </p>
          </div>
        </div>

        {/* Conclusión */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCreateProjection} // Manejador de clic
            className={`bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600`}
          >
            Acepta y crea tu proyección
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectionFirstTime;
