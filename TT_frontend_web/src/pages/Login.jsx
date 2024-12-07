import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar íconos para mostrar/ocultar contraseña

// new path:
import { login as apiLogin, getAccount } from '../api/accounts.api'; // Llamada a la API

import LoadingAnimation from "../components/LoadingAnimation";  

import AuthContext from '../components/AuthContext';  // Importa el contexto de autenticación

function Login() {
    const { login } = useContext(AuthContext);  // Obtén la función `login` del contexto
    const [loading, setLoading] = useState(false); // Loading state
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

    const onSubmit = handleSubmit(async (data) => {
        setLoading(true); // Set loading to true when the form is submitted

        try {
            const response = await apiLogin(data);  // Llamada a la API
            toast.success('Inicio de sesión exitoso');
            console.log('Respuesta de login:', response.data);

            // Save the token or user data as needed
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);

            // Decode the token to get the user ID
            let userId;
            if (response.data.access) {
                try {
                    const decodedToken = jwtDecode(response.data.access);
                    userId = decodedToken.user_id;  // Extraer el user ID directamente
                    console.log('User ID:', userId);
                } catch (error) {
                    console.error('Invalid token:', error);
                    toast.error("Error en el token");
                    return;  // Salir si el token no es válido
                }
            }

            // Obtener datos de la cuenta usando el userId extraído
            const responseAccount = await getAccount(userId);
            const fullName = responseAccount.data.name;
            const firstName = fullName.split(' ')[0];
            const email = responseAccount.data.email;
            const category = responseAccount.data.category;
            const units_projection = responseAccount.data.units_projection;
            const projection_id = responseAccount.data.projection_id;

            const accountData = { 
                email,
                userName: firstName,
                fullName,
                category,
                units_projection,
                projection_id,
            };

            localStorage.setItem('accountDetails', JSON.stringify(accountData));
            login(accountData);  // Actualiza el estado global con el contexto
            
            navigate('/home'); // Redirect to the home page
        } catch (error) {
            console.error('Error during login:', error);
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
                            placeholder="Ingrese su correo electrónico"
                            {...register('email', { required: "Este campo es obligatorio" })}
                            className="w-full px-5 py-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="mb-8 relative">
                      <label htmlFor="password" className="block text-white text-sm font-bold mb-3">
                          Contraseña
                      </label>
                      <div className="relative flex items-center">
                          <input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Contraseña"
                              {...register('password', { required: "Este campo es obligatorio" })}
                              className="w-full px-5 py-3 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                          />
                          <span
                              className="absolute right-4 flex items-center justify-center text-gray-400 cursor-pointer text-2xl"
                              onClick={() => setShowPassword(!showPassword)}
                          >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                      </div>
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
}

export default Login;
