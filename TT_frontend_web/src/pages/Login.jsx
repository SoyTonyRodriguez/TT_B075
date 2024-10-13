import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

// new path:
import { login } from '../../../api/accounts.api';

import LoadingAnimation from "../components/LoadingAnimation";  


function Login() {
    const [loading, setLoading] = useState(false); // Loading state
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        setLoading(true); // Set loading to true when the form is submitted

        try {
            const response = await login(data);
            toast.success('Inicio de sesión exitoso');
            console.log('Respuesta de login:', response.data);

            // Save the token or user data as needed
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            
            navigate('/home'); // Redirect to the home
        } catch (error) {
            console.error('Error during login:', error);
            // Handle error response from the API
            if (error.response && error.response.status === 400) {
                toast.error('Credenciales incorrectas');
            } else {
                toast.error("Error al iniciar sesión: " + error.message);
            }
        } finally {
            setLoading(false); // Set loading to false after the operation is complete
        }
    });

    if (loading) {
      return <LoadingAnimation />;
    }
    
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
              placeholder="Ingrese su correo electronico"
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
            <Link to="/RecuperarCuenta" className="text-blue-100 hover:text-blue-800 text-sm float-left mt-3">
              ¿Olvidó su contraseña?
            </Link>
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
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