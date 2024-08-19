import React from 'react';
import promoImage from '../img/ipn-main.webp'; // Import your image here
import enlace from '../img/enlace.png';
import fondo from '../img/BackImage.png';
import Main_1 from '../img/Main_1.jpg';
import Convocatoria from '../img/megafono.png';
import Nosotros from '../img/usuarios.png';
import login from '../img/cuenta.png';

function MainContent() {
  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">BIENVENIDO</h1>
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
            <img src={enlace} alt="Enlaces oficiales" className="mb-4 w-12 mx-auto" />
            <p>Enlaces oficiales</p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
             <img src={Convocatoria} alt="Convocatoria" className="mb-4 w-12 mx-auto" />
            <p>Convocatoria</p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          <img src={Nosotros} alt="Nosotros" className="mb-4 w-12 mx-auto" />
            <p>Nuestro Proyecto</p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
          <img src={login} alt="Inicio de sesion en el sitio" className="mb-4 w-12 mx-auto" />
            <p>Iniciar sesión</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-2/3 mb-8">
            <img src={promoImage} alt="Promoción docente" className="w-full h-auto mb-4 rounded-lg shadow-lg" />
            <h2 className="text-3xl font-bold text-center mb-4">Promoción docente en el Instituto Politécnico Nacional</h2>
            <p className="text-gray-700 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo urna sed lacus accumsan, et luctus felis imperdiet.
              Aenean elit dui, hendrerit et blandit pellentesque, ultrices eu eros. Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Suspendisse tempor pretium lacus, eu varius mi tempor eget. Cras placerat arcu libero, in hendrerit turpis porttitor nec.
              Quisque venenatis ultrices semper. Morbi vel condimentum mauris, et dignissim est. Quisque egestas ante a massa imperdiet volutpat.
              Sed pretium tellus at commodo consectetur, sem neque ullamcorper lorem, sit amet auctor nisl enim fermentum mauris.
              Maecenas feugiat mattis vulputate.
            </p>
          </div>
          <aside className="w-full md:w-1/3 pl-0 md:pl-8">
            <img src={Main_1} alt="¿Qué es este sitio?" className="mb-4 rounded-lg shadow-lg" />
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Sobre este sistema</h3>
              <hr className="border-t border-black mb-4" />
              <p>
                Este sitio junto con su versión móvil tienen el propósito de guiar y asistir a los docentes
                en su proceso de promoción académica con funciones y acceso a la información de una manera más cómoda y visual.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg mb-6">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius sapien congue, ultrices lorem in.</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg mb-6">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo urna sed lacus accumsan.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
