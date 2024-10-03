import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import perfilImage from '../img/perfi.png'; 
import Navigation from './Navigation/Navigation'; 

function Account() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(perfilImage); // Initialize with default image
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');

  // Load account data from localStorage on component mount
  useEffect(() => {
    try {
      const storedAccountData = localStorage.getItem('accountDetails');
      if (storedAccountData) {
        const { userName, fullName, email, category, phone } = JSON.parse(storedAccountData);
        setUserName(userName);
        setFullName(fullName);
        setEmail(email);
        setCategory(category);
        setPhone(phone);
      }
    } catch (error) {
      console.error("Error accessing or parsing account details from localStorage:", error);
      // You can clear invalid data if necessary
      localStorage.removeItem('accountDetails');
    }
  }, []);

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
      {/* navegación fija */}
      <Navigation />

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
          {/* <div className="mt-4">
            <label className="block text-sm mb-2">Celular</label>
            <input type="text" 
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={phone} />
          </div> */}
        </div>
        {/* Formulario de información */}
        <div className="w-2/3 ml-8">
          <form>
            <div className="mb-4">
              <label className="block text-sm mb-2">Nombre Completo</label>
              <input type="text" 
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={fullName} disabled />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">E-mail</label>
              <input type="email" 
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email} disabled />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Categoría</label>
              <input type="text" 
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={category} disabled />
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