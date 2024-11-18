import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import perfilImage from '../img/perfi.png';
import Navigation from './Navigation/Navigation';
import { updateAccount } from '../api/accounts.api';
import LoadingAnimation from "../components/LoadingAnimation";

function Account() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(perfilImage);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Cargar los datos desde el localStorage
  useEffect(() => {
    try {
      const storedAccountData = localStorage.getItem('accountDetails');
      if (storedAccountData) {
        const { userName, fullName, email, category } = JSON.parse(storedAccountData);
        setUserName(userName);
        setFullName(fullName);
        setEmail(email);
        setCategory(category);
      }
    } catch (error) {
      console.error('Error accessing or parsing account details from localStorage:', error);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true); // Habilitar modo edición
  };

  // Función para decodificar el token JWT manualmente
  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Obtener el token del localStorage

    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    const decodedToken = decodeToken(token);
    const userId = decodedToken.user_id;

    const updatedData = {
      name: fullName,
      email: email,
      category: category,
    };

    try {
      setLoading(true); // Activar el indicador de carga
      const response = await updateAccount(userId, token, updatedData); // Llamada a la API para actualizar la cuenta
      console.log('Respuesta del servidor:', response);

      // Actualizar `localStorage` con los datos actualizados
      const storedAccountData = JSON.parse(localStorage.getItem('accountDetails')) || {};
      const updatedAccountData = {
        ...storedAccountData, // Mantener datos existentes
        userName: userName,   // Actualizar con nuevos valores
        fullName: fullName,
        email: email,
        category: category,
      };
      localStorage.setItem('accountDetails', JSON.stringify(updatedAccountData));
      console.log('Datos actualizados en localStorage:', updatedAccountData);

      setIsEditing(false); // Desactivar modo edición
      navigate('/home'); // Redirigir a otra página existente, como la pantalla de inicio
    } catch (error) {
      console.error('Error actualizando la cuenta:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Desactivar el indicador de carga
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = () => {
    if (imagePreview) {
      setProfileImage(imagePreview);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-cover bg-center">
      <Navigation />
      <hr className="border-t-2 border-black my-4" />
      <div className="bg-gray-700 text-white p-8 rounded-lg shadow-md max-w-4xl mx-auto flex items-center">
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

        </div>
        <div className="w-2/3 ml-8">
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Nombre Completo</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">E-mail</label>
              <input
                type="email"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Categoría</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="flex justify-end mt-8">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                >
                  Editar información
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Guardar
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
