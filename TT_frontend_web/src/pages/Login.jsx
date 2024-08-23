import React from 'react';
<<<<<<< HEAD

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-md max-w-md w-full">
        <h2 className="text-center text-2xl font-bold text-white mb-6">Inicio de sesión</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white text-sm font-bold mb-2">
=======
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-black bg-opacity-40 p-12 rounded-3xl shadow-lg max-w-lg w-full">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Inicio de sesión</h2>
        <form>
          <div className="mb-6">
            <label htmlFor="username" className="block text-white text-sm font-bold mb-3">
>>>>>>> a616ad00ee63b913a8c658c45b0a199a640fb990
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ingrese su número de empleado"
<<<<<<< HEAD
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
=======
              className="w-full px-5 py-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-3">
>>>>>>> a616ad00ee63b913a8c658c45b0a199a640fb990
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
<<<<<<< HEAD
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <a href="#RecuperarContraseña" className="text-blue-100 hover:text-blue-800 text-sm float-left mt-2">
=======
              className="w-full px-5 py-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <a href="#RecuperarContraseña" className="text-blue-100 hover:text-blue-800 text-sm float-left mt-3">
>>>>>>> a616ad00ee63b913a8c658c45b0a199a640fb990
              ¿Olvidó su contraseña?
            </a>
          </div>
          <button
            type="submit"
<<<<<<< HEAD
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mt-2"
=======
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg mt-4"
>>>>>>> a616ad00ee63b913a8c658c45b0a199a640fb990
          >
            Ingresar
          </button>
        </form>
<<<<<<< HEAD
        <div className="text-center mt-4 text-white">
          ¿Aún no tiene una cuenta?{' '}
          <a href="#" className="text-blue-300 hover:text-blue-500">
            Registrarse
          </a>
        </div>
      </div>
      <div className="text-center mt-8 text-white max-w-2xl mx-4">
        <h3 className="text-xl font-bold mb-2">¿Por qué tener una cuenta?</h3>
      </div>
    <div>
        <p className="text-justified text-white max-w-4xl">
        El propósito de crear una cuenta en este sistema es para tener acceso a las funcionalidad,
         un mejor control de la información y obtener un poco de ayuda extra para este proceso que 
         puede llegar a ser muy pesado. Con una cuenta se podrá tener acceso a las funciones de creación 
         de proyecciones para la promoción y acompañamiento; así como un puntaje aproximado de las unidades 
         de promoción con base en esta proyección, reunión de documentos para este mismo proceso y recordatorios 
         para no olvidar los puntos más importantes del proceso.
        </p>
    </div>
=======
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
>>>>>>> a616ad00ee63b913a8c658c45b0a199a640fb990
    </div>
  );
}

export default Login;
