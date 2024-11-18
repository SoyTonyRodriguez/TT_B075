import React, { useState } from 'react';
import perfilImage from '../img/perfi.png';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { createAccount } from '../api/accounts.api';
import LoadingAnimation from "../components/LoadingAnimation";  // Importa tu componente de animación


const Registro = () => {

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // Estado para la pantalla de carga
  const [showModal, setShowModal] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);  // Mostrar la pantalla de carga
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
      const response = await createAccount(accountData);
      console.log('Account created:', response.data);
      toast.success('Cuenta creada exitosamente');
      reset();            // Reset form fields after successful submission
      navigate('/login'); // Redirect to login or another page
    } catch (error) {
      console.error('Error creating account:', error);

      // API returns an error response with a 400 status code
      if (error.response && error.response.status === 400) {
        const apiErrors = error.response.data;
        
        if (apiErrors.email) {
          toast.error(apiErrors.email);
        }
      } else {
        toast.error("Error al crear cuenta: " + error.message);
      }
    } finally {
        setLoading(false);  // Ocultar la pantalla de carga tras completar la operación
    }
  });

  if (loading) {
    return <LoadingAnimation />;  // Mostrar la pantalla de carga mientras se procesa el registro
  }

  // Watch the password field to compare with confirm password
  const password = watch('password');  
  
    return (
        <div className="flex flex-col w-3/5 mx-auto p-10 bg-black bg-opacity-40 rounded-3xl shadow-lg mt-10 mb-10">
            <h2 className="text-left text-white text-2xl mb-4">Nuevo Usuario</h2>
            <div className="mx-auto container justify-between items-center bg-white h-0.5 mb-6"></div>
            <form className="w-full" onSubmit={onSubmit}>
    <div className="flex flex-row justify-between items-center mb-6">
        <div className="flex flex-col flex-1 mr-6">
            {/* Campos de entrada */}
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

    <p className="text-white text-lg text-center mb-6">
        <button onClick={() => setShowModal(true)} className="text-blue-400 hover:underline">Conoce los requisitos para participar en el proceso de promoción docente</button>
    </p>

    <div className="flex flex-col sm:flex-row justify-end space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
        <Link
            to="/Login"
            className="bg-red-800 text-white px-6 py-3 rounded-2xl hover:bg-red-600 w-full sm:w-auto min-w-[200px] text-lg flex items-center justify-center"
        >
            Cancelar
        </Link>
        <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 w-full sm:w-auto min-w-[200px] text-lg flex items-center justify-center"
        >
            Ingresar
        </button>
    </div>
</form>
{showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-xl w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Requisitos para la Promoción Docente</h2>
      
      <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
        <li>Poseer plaza en propiedad (en carácter de alta definitiva) de medio, tres cuartos, tiempo completo o con máximo 19 horas de asignatura.</li>
        <li>Tener categoría académica dictaminada con carácter definitivo.</li>
        <li>Haber laborado en la categoría actual cuando menos dos años.</li>
        <li>
          Cumplir con la carga académica frente a grupo establecida en los artículos 49, 50 y 51 del RCITPAIPN en cada uno de los semestres considerados en el periodo de promoción o contar con excepción parcial o total, según sea el caso, desde la fecha de efectos del último Comunicado Oficial a diciembre de 2023.
        </li>
        <li>
          La carga académica y/o sus excepciones, los méritos y actividades contemplados en el RPDIPN y Puntos de Acuerdo de la CCMPPD, corresponderán exclusivamente a los semestres declarados en la solicitud, de acuerdo con la opción de promoción seleccionada.
        </li>
      </ul>

      <div className="flex justify-center mt-6">
        <button 
          onClick={() => setShowModal(false)}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}


        </div>
    );
}

export default Registro;
