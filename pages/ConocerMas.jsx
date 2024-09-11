import React from 'react';

const ConocerMas = () => {
  const items = [
    { title: "Noticia", subtitle: "Mario Barbosa", type: "noticia" },
    { title: "¿Conoces las condiciones para que acepten tu promoción?", subtitle: "Leer", type: "texto" },
    { title: "Noticia", subtitle: "You Safe", type: "noticia" },
    { title: "¿Sabes las condiciones sobre tutorados para ser válidas?", subtitle: "Leer", type: "texto" },
    { title: "Artículo", subtitle: "Liferay", type: "noticia" },
    { title: "Docentes aceptados durante los procesos de años anteriores", subtitle: "Leer", type: "texto" },
    { title: "Base", subtitle: "Alianza", type: "noticia" },
    { title: "Reglamento de promoción docente", subtitle: "Leer", type: "texto" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Más información</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`w-full h-32 md:h-48 rounded-lg p-4 shadow-lg ${item.type === "noticia" ? "bg-blue-800 text-white" : "bg-white text-blue-800 border border-blue-400"}`}
          >
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="mt-2">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConocerMas;


