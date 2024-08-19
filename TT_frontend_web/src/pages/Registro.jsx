import React, { useEffect } from 'react';
import perfilImage from '../img/perfi.png';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createAccount } from "../api/accounts.api";

const Registro = () => {

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const password = data.password;
    const confirmPassword = data.confirmar_password;

    // Check if passwords match
    if (password !== confirmPassword) {
        setError("confirmar_password", {
            type: "manual",
            message: "Las contraseñas no coinciden",
        });
        return;
    }

    // Remove confirmar_password before sending to the API
    const { confirmar_password, ...accountData } = data;

      try {
          await createAccount(accountData);
          toast.success('Cuenta creada exitosamente');
          reset();            // Reset form fields after successful submission
          navigate('/Login'); // Redirect to login or another page
      } catch (error) {
        console.error('Error creating account:', error);

        // API returns an error response with a 400 status code
        if (error.response && error.response.status === 400) {
          const apiErrors = error.response.data;
          
          if (apiErrors.email) {
            toast.error(apiErrors.email)
          }
        } else {
          toast.error('Error al crear la cuenta. Inténtalo nuevamente.');
        }
      }
  });

  // Watch the password field to compare with confirm password
  const password = watch('password');  
  
    return (
        <div className="flex flex-col w-3/5 mx-auto p-10 bg-black bg-opacity-40 rounded-3xl shadow-lg mt-10">
            <h2 className="text-left text-white text-2xl mb-4">Nuevo Usuario</h2>
            <div className="mx-auto container justify-between items-center bg-white h-0.5 mb-6"></div>
            <form className="w-full" onSubmit={onSubmit}>
                <div className="flex flex-row justify-between items-center mb-6">
                    <div className="flex flex-col flex-1 mr-6">
                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Nombre Completo</label>
                            <input 
                                type="text" 
                                placeholder="Ingresa tu nombre completo" 
                                {...register('name', { required: true })}
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            />
                            {errors.name && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Email</label>
                            <input 
                                type="email" 
                                placeholder="Ingresa tu correo electrónico" 
                                {...register('email', { required: true })}
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            />
                            {errors.email && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Selecciona tu categoría</label>
                            <select 
                                {...register('category', { required: true })}
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            >
                                {/* Opciones del select */}
                                <option value="Técnico Docente de Asignatura A">Técnico Docente de Asignatura A</option>
                                <option value="Técnico Docente de Asignatura B">Técnico Docente de Asignatura B</option>
                                <option value="Técnico Docente Auxiliar A">Técnico Docente Auxiliar A</option>
                                <option value="Técnico Docente Auxiliar B">Técnico Docente Auxiliar B</option>
                                <option value="Técnico Docente Auxiliar C">Técnico Docente Auxiliar C</option>
                                <option value="Técnico Docente Asociado A">Técnico Docente Asociado A</option>
                                <option value="Técnico Docente Asociado B">Técnico Docente Asociado B</option>
                                <option value="Técnico Docente Asociado C">Técnico Docente Asociado C</option>
                                <option value="Técnico Docente Titular A">Técnico Docente Titular A</option>
                                <option value="Profesor de Asignatura A">Profesor de Asignatura A</option>
                                <option value="Profesor Asistente A">Profesor Asistente A</option>
                                <option value="Profesor Asistente B">Profesor Asistente B</option>
                                <option value="Profesor Asistente C">Profesor Asistente C</option>
                                <option value="Profesor Asociado A">Profesor Asociado A</option>
                                <option value="Profesor Asociado B">Profesor Asociado B</option>
                                <option value="Profesor Asociado C">Profesor Asociado C</option>
                                <option value="Profesor Titular A">Profesor Titular A</option>
                                <option value="Profesor Titular B">Profesor Titular B</option>
                            </select>
                            {errors.category && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Número de empleado</label>
                            <input 
                                type="text" 
                                placeholder="Ingresa tu número de empleado" 
                                {...register('employee_number', { required: true })}
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            />
                            {errors.employee_number && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="Crea tu contraseña" 
                                {...register('password', { required: true })}
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            />
                            {errors.password && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Confirma tu contraseña</label>
                            <input 
                                type="password"
                                placeholder="Vuelve a escribir tu contraseña"
                                {...register('confirmar_password', {
                                    required: true,
                                    validate: value => value === password || 'Las contraseñas no coinciden',
                                })}
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            />
                            {errors.confirmar_password && <span className="text-red-500">{errors.confirmar_password.message}</span>}

                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-1 overflow-hidden">
                        <img src={perfilImage} alt="Imagen de perfil" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
                <Link
                    to="/Login"
                    className="bg-red-800 text-white px-6 py-3 rounded-2xl hover:bg-red-600 w-full sm:w-auto min-w-[200px] text-lg flex items-center justify-center"
                >
                    Cancelar
                </Link>
                <Link
                        to="/home"
                        className="bg-blue-900 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 w-full sm:w-auto min-w-[200px] text-lg flex items-center justify-center"
                    >
                        Ingresar
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Registro;
