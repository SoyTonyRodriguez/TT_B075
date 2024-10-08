import React from 'react';

function nosotros() {
  return (
    <main>
        <div className="bg-black bg-opacity-10 rounded-lg shadow-lg p-8 text-black text-lg leading-relaxed space-y-6 mb-40"> {/* Agregué mb-10 */}
      <h1 className="text-center text-4xl font-bold mt-2">Sobre este proyecto</h1>
      <p className="text-3xl text-justify mt-4">
        Este proyecto fue desarrollado como parte del proceso de titulación por Trabajo Terminal 
        bajo el nombre clave <b>TT-B075</b>  por los alumnos de la Escuela Superior de Cómputo Casaos Tabaco Luis Ángel, 
        García Montiel Gustavo y Rodríguez Flores Antonio.
      </p>

      <p className="text-3xl text-justify mt-4"> 
        Como parte de las limitaciones para este proyecto fue el desarrollo principal sobre plataformas 
        y marcos gratuitos, lo que limita y estandariza este sistema dentro de lo que servicios de este 
        tipo confiere.
      </p>
      <p className="text-3xl text-justify mt-4"> 
        Este proyecto fue presentado el DD/MM/AAAA como parte de la presentación para su evaluación ante 
        el grupo de sinodales cuyo dictamen permite el progreso del desarrollo.
      </p>
      <p className=" text-3xl text-justify mt-4"> 
        Toda la documentación técnica sobre las herramientas y marcos de trabajo programáticos se encuentran 
        disponibles en el manual técnico de este sistema.
      </p>
      <p className="text-3xl text-justify mt-4"> 
        El propósito de todo este sistema web junto con su simíl para plataformas móviles de android es brindar 
        aplicaciones auxiliares que guíen a los docentes, además de ser gestoras de archivos de índole personal, 
        académica y laboral; deben contar con los enlaces e información relevante sobre cada proceso a seguir 
        dentro del sistema, lo que implica incluir vínculos oficiales, enlaces externos del instituto y los 
        candados de seguridad pertinentes a la ley de protección de datos.
      </p>
    </div>
    </main>
  );
}

export default nosotros;
