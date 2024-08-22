import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-black bg-opacity-40 p-12 rounded-3xl shadow-lg max-w-lg w-full">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Inicio de sesión</h2>
        <form>
          <div className="mb-6">
            <label htmlFor="username" className="block text-white text-sm font-bold mb-3">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ingrese su número de empleado"
              className="w-full px-5 py-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-3">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className="w-full px-5 py-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <a href="#RecuperarContraseña" className="text-blue-100 hover:text-blue-800 text-sm float-left mt-3">
              ¿Olvidó su contraseña?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg mt-4"
          >
            Ingresar
          </button>
        </form>
        <div className="text-center mt-6 text-white">
          ¿Aún no tiene una cuenta?{' '}
          <Link to="/Registro" className="text-blue-300 hover:text-blue-500">
            Registrarse
          </Link>
        </div>
      </div>
      <div className="text-center mt-10 text-black max-w-2xl mx-4">
        <h3 className="text-xl font-bold mb-4">¿Por qué tener una cuenta?</h3>
      </div>
      <div className="max-w-4xl mx-4 text-black">
        <p className="text-justify leading-relaxed">
          El propósito de crear una cuenta en este sistema es para tener acceso a las funcionalidades,
          un mejor control de la información y obtener un poco de ayuda extra para este proceso que 
          puede llegar a ser muy pesado. Con una cuenta se podrá tener acceso a las funciones de creación 
          de proyecciones para la promoción y acompañamiento; así como un puntaje aproximado de las unidades 
          de promoción con base en esta proyección, reunión de documentos para este mismo proceso y recordatorios 
          para no olvidar los puntos más importantes del proceso.
        </p>
      </div>
    </div>
  );
}

export default Login;
