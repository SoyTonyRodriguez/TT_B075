import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login } from "../api/accounts.api"; // You need to create this API function

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await login(data);
      const token = response.data.token; // Assuming the token is in response.data.token
      toast.success('Inicio de sesión exitoso');
      
      // Store the token in localStorage
      localStorage.setItem('token', token);
      
      // Redirect the user to the home page
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
  
      // Handle the error appropriately
      if (error.response && error.response.status === 401) {
        toast.error('Credenciales incorrectas');
      } else {
        toast.error("Error al iniciar sesión: " + error.message);
      }
    }
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-black bg-opacity-40 p-12 rounded-3xl shadow-lg max-w-lg w-full">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Inicio de sesión</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-3">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingrese su correo electrónico"
              {...register('email', { required: "Este campo es obligatorio" })}
              className="w-full px-5 py-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-3">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              {...register('password', { required: "Este campo es obligatorio" })}
              className="w-full px-5 py-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
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
    </div>
  );
};

export default Login;
