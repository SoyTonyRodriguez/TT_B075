import React, { useState } from 'react';
import Navigation from './Navigation/Navigation';

function GuidePage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [filter, setFilter] = useState('Todos');

  // Información detallada de todas las tarjetas
  const guideCards = [
    {
      id: 1,
      icon: '🎓',
      imgSrc: '/src/img/Grado.png',
      title: 'Promoción por Grado Académico',
      description: 'Conoce cómo puedes avanzar con la obtención de un nuevo grado académico.',
      details: 'Este proceso se da cuando el docente busca promoverse al obtener un grado académico superior. Se requiere presentar documentación que acredite la obtención del grado y cumplir con los requisitos establecidos por la normativa interna.',
      filter: 'Promoción por Grado Académico',
    },
    {
      id: 2,
      icon: '📈',
      imgSrc: '/src/img/UP.png',
      title: 'Acumulación de Unidades de Promoción',
      description: 'Aprende cómo acumular unidades para mejorar tu posición.',
      details: 'Esta opción te permitirá acumular unidades de promoción en diferentes campos. Podrás elegir funciones y actividades que se alineen con tus intereses y habilidades. A medida que acumulas unidades, podrás medir tu progreso y alcanzar tus metas de promoción.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 3,
      icon: '💼',
      imgSrc: '/src/img/Funcion.png',
      title: 'Función',
      description: 'Selecciona las funciones que deseas realizar según tus intereses.',
      details: 'Esta opción despliega las funciones disponibles que están asociadas a la acumulación de unidades de promoción. Escoge las funciones que deseas realizar y que mejor se alineen con tus objetivos de desarrollo.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 4,
      icon: '⚙️',
      imgSrc: '/src/img/Actividad.png',
      title: 'Actividad',
      description: 'Descubre las actividades disponibles para acumular unidades.',
      details: 'Las actividades variarán según la función seleccionada. Cada actividad tiene diferentes parámetros que debes considerar antes de incluirlas en tu proyección. Asegúrate de entender qué se espera de cada actividad para cumplir adecuadamente.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 5,
      icon: '📅',
      imgSrc: '/src/img/Limite.png',
      title: 'Límite de Fechas',
      description: 'Consulta las fechas límite para cada período.',
      details: 'Durante cada período, se mostrará la información referente a las fechas límite para la acumulación de unidades de promoción. Consulta este módulo regularmente para no perder de vista los objetivos y aprovechar tu tiempo disponible.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 6,
      icon: '🔢',
      imgSrc: '/src/img/Acumuladas.png',
      title: 'Unidades Acumuladas',
      description: 'Mantente al tanto de tus unidades acumuladas.',
      details: 'Podrás visualizar en todo momento las unidades que has acumulado. Esta vista te permitirá tener un control de tu progreso y saber cuántas unidades necesitas para cumplir con los requisitos.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 7,
      icon: '📊',
      imgSrc: '/src/img/UPS_A.png',
      title: 'Unidades a Obtener',
      description: 'Visualiza los valores en U.P. que puedes obtener según tu participación.',
      details: 'Para cada actividad, podrás ver los valores en Unidades de Promoción (U.P.) que te puede aportar según tu rol. Asegúrate de elegir la opción que mejor se ajuste a tu participación.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 8,
      icon: '🚫',
      imgSrc: '/src/img/MAX.png',
      title: 'Máximo Permitido',
      description: 'Conoce los límites establecidos en cada actividad.',
      details: 'Algunas actividades tienen un límite permitido respecto a las unidades que puedes acumular. Asegúrate de no exceder estos límites para que tu proyección sea válida y puedas seguir acumulando unidades correctamente.',
      filter: 'Promoción por Unidades de Promoción',
    },
    {
      id: 9,
      icon: '⏱️',
      imgSrc: '/src/img/Hrs.png',
      title: 'Horas de Trabajo',
      description: 'Registra las horas de trabajo necesarias para cada actividad.',
      details: 'Para las actividades que requieren tiempo, deberás ingresar las horas de trabajo dedicadas. Ingresa un valor correcto para asegurar que acumules unidades correctamente. Las horas serán validadas conforme al reglamento, y pueden variar según criterios específicos.',
      filter: 'Promoción por Unidades de Promoción',
    },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filtrar las tarjetas según el filtro seleccionado
  const filteredCards = guideCards.filter((card) => {
    if (filter === 'Todos') {
      return true;
    }
    return card.filter === filter;
  });

  return (
    <div className="min-h-screen bg-cover bg-center mb-10">
      {/* Navegación fija */}
      <Navigation />
      <hr className="border-t-2 border-gray-700 my-4" />

      <div className="container mx-auto mt-8 mb-8 bg-black bg-opacity-40 p-6 rounded-lg shadow-lg">
        <h1 className="text-xl text-white leading-relaxed text-center mb-4">
          Encuentra toda la información que necesitas para tu desarrollo académico y profesional.
        </h1>
        <p className="text-lg text-white leading-relaxed text-center mb-4">
          Al comenzar la creación de una proyección se te presentarán dos opciones, por unidades de promoción y por obtención de grado académico. 
          Selecciona la opción que más se ajuste a tus necesidades y comienza a acumular unidades de promoción. Para la opción por acumulación de unidades 
          de promoción, se te presentarán diferentes campos y opciones que debes completar, algunas de ellas son las siguientes, en caso de que tengas duda 
          sobre su significado puedes consultar este apartado para conocer más detalles de su funcionamiento.
        </p>

        <p className="text-lg text-white leading-relaxed text-center mb-8">
          Crear una proyección te permitirá establecer y controlar todas aquellas actividades que te propongas cumplir en un
          periodo de 2 años, tomando en cuenta todas las condiciones que aquí condensamos de una manera más ligera y directa,
          así como la disposición del calendario de la convocatoria para que no olvides ninguna fecha.
        </p>

        {/* Filtros de tarjetas */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded-lg ${filter === 'Todos' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => handleFilterChange('Todos')}
          >
            Todos
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${filter === 'Promoción por Grado Académico' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => handleFilterChange('Promoción por Grado Académico')}
          >
            Promoción por Grado Académico
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${filter === 'Promoción por Unidades de Promoción' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => handleFilterChange('Promoción por Unidades de Promoción')}
          >
            Promoción por Unidades de Promoción
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${filter === 'Tablero Kanban' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => handleFilterChange('Tablero Kanban')}
          >
            Tablero Kanban
          </button>
        </div>
      </div>

      {/* Sección de Tarjetas */}
      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer flex flex-col items-center"
            onClick={() => handleCardClick(card)}
          >
            <div className="text-6xl mb-4">{card.icon}</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{card.title}</h2>
            <p className="text-gray-600 text-center mb-4">{card.description}</p>
            <button
              className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={() => handleCardClick(card)}
            >
              Más información
            </button>
          </div>
        ))}
      </div>

      {/* Modal de Información Expandida */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedCard.title}</h2>
            <img
              src={selectedCard.imgSrc}
              alt={selectedCard.title}
              className="w-full h-48 object-cover rounded-md mb-6"
            />
            <p className="text-gray-700 mb-6">{selectedCard.details}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuidePage;
