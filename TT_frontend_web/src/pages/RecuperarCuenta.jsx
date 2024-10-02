import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  // Validación del correo
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Manejar la recuperación de contraseña
  const handleRecover = () => {
    if (!validateEmail(email)) {
      alert('Por favor, introduce un correo electrónico válido');
      return;
    }

    // Lógica placeholder para recuperación de contraseña
    alert('Se ha enviado un correo con instrucciones para restablecer tu contraseña.');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Cuadro de recuperación de contraseña */}
      <div className="bg-black bg-opacity-40 p-12 rounded-3xl shadow-lg max-w-lg w-full">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Recuperar cuenta</h2>
        <div className="mb-6">
          <label htmlFor="email" className="block text-white text-sm font-bold mb-3">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Texto explicativo */}
        <p className="text-center text-sm text-gray-300 mb-6">
          Te enviaremos un correo con indicaciones para restablecer tu contraseña.
        </p>

        {/* Enlace que actúa como botón para enviar correo de recuperación */}
        <Link
          onClick={handleRecover}
          className="block text-center w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg"
          to="#"
        >
          Enviar correo de recuperación
        </Link>

        {/* Enlace para volver a iniciar sesión */}
        <div className="text-center mt-6 text-white">
          ¿Recordaste tu contraseña?{' '}
          <Link to="/login" className="text-blue-300 hover:text-blue-500">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
