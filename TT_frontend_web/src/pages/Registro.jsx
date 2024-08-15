import React, { useState } from 'react';
import perfilImage from '../img/perfi.png';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [categoria, setCategoria] = useState('');
    const [numeroEmpleado, setNumeroEmpleado] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ nombre, email, categoria, numeroEmpleado, contrasena, confirmarContrasena });
    };

    return (
        <div className="flex flex-col w-3/5 mx-auto p-10 bg-black bg-opacity-30 rounded-3xl shadow-lg mt-10">
            <h2 className="text-left text-white text-2xl mb-4">Nuevo Usuario</h2>
            <div className="mx-auto container justify-between items-center bg-white h-0.5 mb-6"></div>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-row justify-between items-center mb-6">
                    <div className="flex flex-col flex-1 mr-6">
                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Nombre Completo</label>
                            <input 
                                type="text" 
                                placeholder="Ingresa tu nombre completo" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Email</label>
                            <input 
                                type="email" 
                                placeholder="Ingresa tu correo electrónico" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Selecciona tu categoría</label>
                            <select 
                                value={categoria} 
                                onChange={(e) => setCategoria(e.target.value)} 
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
                        </div>

                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Número de empleado</label>
                            <input 
                                type="text" 
                                placeholder="Ingresa tu número de empleado" 
                                value={numeroEmpleado}
                                onChange={(e) => setNumeroEmpleado(e.target.value)} 
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="Crea tu contraseña" 
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)} 
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-raleway text-white mb-1">Confirma tu contraseña</label>
                            <input 
                                type="password"
                                placeholder="Vuelve a escribir tu contraseña"
                                value={confirmarContrasena}
                                onChange={(e) => setConfirmarContrasena(e.target.value)} 
                                className="w-full p-2 mt-1 rounded border border-gray-300 text-base"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-1 overflow-hidden">
                        <img src={perfilImage} alt="Imagen de perfil" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
                    <button type="button" className="bg-red-800 text-white px-6 py-3 rounded-2xl hover:bg-red-600 w-full sm:w-auto min-w-[200px] text-lg">Cancelar</button>
                    <button type="submit" className="bg-blue-900 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 w-full sm:w-auto min-w-[200px] text-lg">Ingresar</button>
                </div>
            </form>
        </div>
    );
}

export default Registro;
