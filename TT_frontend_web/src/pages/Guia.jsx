import React, { useState } from 'react';
import Navigation from './Navigation/Navigation'; 

function GuidePage() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Actualizamos las rutas a las imágenes según tu estructura
  const images = [
    {
      src: '/src/img/Grado.png', // Ruta relativa desde src
      title: 'Promoción por obtención de grado', // Título de la imagen
      description: 'Este proceso se da cuando el docente busca promoverse al obtener un grado académico superior. Se requiere presentar documentación que acredite la obtención del grado y cumplir con los requisitos establecidos por la normativa interna.', // Descripción detallada de la imagen
    },
    {
      src: '/src/img/UP.png', // Ruta relativa desde src
      title: 'Promoción por acumulación de Unidades de Promoción', // Título de la imagen
      description: 'Descripción detallada de la imagen 2. Añade información relevante para que los usuarios comprendan.',
    },
    {
      src: '/src/img/Funcion.png', // Ruta relativa desde src
      title: 'Función',
      description: 'Esta opción despliega las funciones según los diferentes rubros establecidos para la acumulación de unidades de promoción. Selecciona la función que deseas realizar según tus intereses y campos de desarrollo.',
    },
    {
      src: '/src/img/Actividad.png', // Ruta relativa desde src
      title: 'Actividad',
      description: 'Esta lista varía según la función que sea seleccionada, cada una tendrá diferentes parámetros que debes de tomar en cuenta para añadirlas a tu proyección. Contiene las actividades que puedes realizar para acumular unidades de promociónn.',
    },
    {
      src: '/src/img/Limite.png', // Ruta relativa desde src
      title: 'Límite',
      description: 'Durante cada período este aviso contendrá la información referente a las fechas en las que se llevará a cabo la acumulación de unidades, puedes consultarla siempre que accedas al módulo de creación de proyección para no perder de vista tus objetivos y tu tiempo disponible.',
    },
    {
      src: '/src/img/Acumuladas.png', // Ruta relativa desde src
      title: 'Unidades Acumuladas',
      description: 'Todo el tiempo que estés dentro de la plataforma podrás visualizar las unidades que has acumulado, esto te permitirá tener un control de tu progreso y saber cuántas unidades te faltan para cumplir con los requisitos establecidos.',
    },
        {
      src: '/src/img/UPS_A.png', // Ruta relativa desde src
      title: 'Unidades a obtener',
      description: 'Para cada actividad podrás visualizar esta lista, corresponde a los diferentes valores en U.P que te puede aportar según tu rol de participación o responsabilidad en la actividad. Asegúrate de seleccionar la que más se ajuste a tu participación.',
    },
    {
      src: '/src/img/MAX.png', // Ruta relativa desde src
      title: 'Máximo permitido',
      description: 'En ciertas actividades existe un límite permito con respectoi a las unidades que puedes acumular, asegúrate de no exceder este límite para que puedas acumular las unidades de manera correcta y no tengas problemas al momento de validar tu proyección.',
    },
    {
      src: '/src/img/Hrs.png', // Ruta relativa desde src
      title: 'Horas de trabajo',
      description: 'Para las actividades que implican un tiempo de trabajo, se te solicitará que ingreses el número de horas que dedicarás a la actividad. Asegúrate de ingresar un valor correcto para que puedas acumular las unidades de manera correcta. Este valor será calculado de acuerdo al reglamento, recuerda que puede cambiar según los criterios de la mesa evaludora .',
    },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    
    <div className="min-h-screen bg-cover bg-center">
      {/* Navegación fija */}
      <Navigation />

      <hr className="border-t-2 border-black my-4" />

      {/* Título principal */}
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        ¿Crear proyección?
      </h1>
      <div className="container mx-auto mt-8 mb-8 flex items-center justify-between bg-black bg-opacity-40 p-6 rounded-lg shadow-lg">
      <p className="text-lg text-white leading-relaxed text-center justify-center">
                    Al comenzar la creación de una proyección se te presentarán dos opciones, por unidades de promoción y por obtención de grado académico. Selecciona la opción que más se ajuste a tus necesidades y comienza a acumular unidades de promoción.
                    Para la opción por acumulación de unidades de promoción, se te presentarán diferentes campos y opciones que debes completar, algunas de ellas son las siguientes, en caso de que tengas duda sobre su significado puedes consultar este apartado para 
                    conocer más detalles de su funcionamiento.
                  </p>
      </div>
      {/* Sección de imágenes */}
      <div className="max-w-7xl mx-auto grid grid-cols-6 sm:grid-cols-2 md:grid-cols-3 gap-x-[120px] gap-y-[50px]">
  {images.map((image, index) => (
    <div
      key={index}
      className="bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center"
    >
      <img
        src={image.src}
        alt={image.title}
        className="w-full h-[200px] object-cover rounded-lg mb-3"
        onClick={() => handleImageClick(image)} // Mostrar información al hacer clic en la imagen
      />
      <p className="text-center mt-2 font-semibold text-white">{image.title}</p>
      {/* Botón dinámico */}
      <button
        className="bg-green-500 px-3 py-1 rounded-full mt-2 text-white text-sm flex items-center hover:bg-green-700 transition-colors hover:scale-105"
        onClick={() => handleImageClick(image)} // Mostrar información al hacer clic en el botón
      >
        Ver más
      </button>
    </div>
  ))}
</div>



      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedImage.title}</h2>
            <p className="text-gray-600 mb-6">{selectedImage.description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
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
