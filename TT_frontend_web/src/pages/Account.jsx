import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import perfilImage from '../img/perfi.png'; // Default profile image
import Projection from '../img/proyeccion.png';
import Links from '../img/enlace.png';
import Documents from '../img/documentos.png';
import Calendar from '../img/calendario.png';
import MenuIcon from '../img/menu-icon.png';

function Account() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(perfilImage); // Initialize with default image
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview selected image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = () => {
    if (imagePreview) {
      setProfileImage(imagePreview); // Save selected image as profile picture
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); // Simulate click on hidden file input
  };

  return (
    <div className="min-h-screen bg-cover bg-center">
      {/* Navegación Secundaria */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-0">Mi perfil</h2>
        <div className="hidden md:flex space-x-4">
          <Link to="/projection" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Projection} alt="Proyección y seguimiento" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Proyección y seguimiento</p>
          </Link>
          <Link to="/links" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Enlaces y bases</p>
          </Link>
          <Link to="/documents" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Documents} alt="Mis documentos" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Mis documentos</p>
          </Link>
          <Link to="/calendar" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
            <img src={Calendar} alt="Calendario" className="w-12 h-12 mb-2" />
            <p className="text-sm font-semibold">Calendario</p>
          </Link>
        </div>

        {/* Botón Compacto para pantallas pequeñas */}
        <div className="md:hidden relative">
          <button
            onClick={toggleMenu}
            className="text-white p-4 transition-transform transform hover:scale-125 w-30 h-30 flex items-center justify-center"
          >
            <img src={MenuIcon} alt="Menú" className="w-10 h-10" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg">
              <div className="p-4 flex flex-col space-y-4">
                <Link to="/projection" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center">
                  <img src={Projection} alt="Proyección y seguimiento" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Proyección y seguimiento</p>
                </Link>
                <Link to="/links" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Links} alt="Enlaces y bases" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Enlaces y bases</p>
                </Link>
                <Link to="/documents" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Documents} alt="Mis documentos" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Mis documentos</p>
                </Link>
                <Link to="/calendar" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex flex-col items-center justify-center">
                  <img src={Calendar} alt="Calendario" className="w-12 h-12 mb-2" />
                  <p className="text-sm font-semibold">Calendario</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Línea de separación */}
      <hr className="border-t-2 border-black my-4" />

      {/* Sección de Perfil */}
      <div className="bg-gray-700 text-white p-8 rounded-lg shadow-md max-w-4xl mx-auto flex items-center">
        {/* Imagen de perfil */}
        <div className="w-1/3 flex flex-col items-center">
          <div className="bg-blue-400 rounded-full h-40 w-40 flex items-center justify-center text-white text-4xl mb-4">
            <img src={imagePreview || profileImage} alt="Perfil" className="h-40 w-40 rounded-full object-cover" />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button onClick={triggerFileInput} className="text-blue-300 hover:underline">
            Cambiar imagen
          </button>
          <button onClick={handleImageSave} className="text-blue-300 hover:underline mt-2">
            Guardar imagen
          </button>
          <div className="mt-8 flex items-center">
            <input type="checkbox" className="mr-2" checked />
            <label className="text-sm">Recibir notificaciones</label>
          </div>
          <div className="mt-4">
            <label className="block text-sm mb-2">Celular</label>
            <input type="text" className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value="" />
          </div>
        </div>
        {/* Formulario de información */}
        <div className="w-2/3 ml-8">
          <form>
            <div className="mb-4">
              <label className="block text-sm mb-2">Nombre Completo</label>
              <input type="text" className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value="" disabled />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">E-mail</label>
              <input type="email" className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value="" disabled />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Categoría</label>
              <input type="text" className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value="" disabled />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Contraseña</label>
              <input type="password" className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value="" />
            </div>
            <div className="flex justify-end mt-8">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">Editar información</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;