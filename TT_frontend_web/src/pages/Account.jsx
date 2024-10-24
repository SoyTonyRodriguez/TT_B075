import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import perfilImage from '../img/perfi.png';
import Navigation from './Navigation/Navigation';
import { updateAccount } from '../../../api/accounts.api';

function Account() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(perfilImage);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // Cargar los datos desde el localStorage
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
      localStorage.removeItem('accountDetails');
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);  // Habilitar modo edición
  };

  // Función para decodificar el token JWT manualmente
  const decodeToken = (token) => {
    const base64Url = token.split('.')[1]; // Extraer el payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplazar caracteres para base64url
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');  // Obtener el token del localStorage
  
    if (!token) {
      console.error("Token no encontrado");
      return;
    }
  
    // Decodificar el token manualmente
    const decodedToken = decodeToken(token);
    const userId = decodedToken.user_id;  // Obtenemos el user_id del payload
  
    console.log(`UserID: ${userId}`);
    console.log(`Token: ${token}`);
  
    // Actualizar los nombres de los campos según lo que el backend espera
    const updatedData = {
      name: fullName,  // El backend espera "name" en lugar de "full_name"
      email: email,    // Este está bien
      category: category,  // Este está bien
      // Puedes añadir "employee_number" si lo necesitas
    };
  
    console.log('Datos enviados:', updatedData);
  
    try {
      console.log(`URL: http://192.168.100.97:8000/api/v1/account/${userId}/`);
  
      const response = await updateAccount(userId, token, updatedData);  // Llamada a la API para actualizar la cuenta
      console.log('Respuesta del servidor:', response);
      
      setIsEditing(false);  // Desactivar modo edición
      navigate('/home');  // Redirigir a otra página existente, como la pantalla de inicio
    } catch (error) {
      console.error("Error actualizando la cuenta:", error.response ? error.response.data : error.message);
    }
  };
  
  

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
          <div className="mt-8 flex items-center">
            <input type="checkbox" className="mr-2" checked />
            <label className="text-sm">Recibir notificaciones</label>
          </div>
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
            <div className="mb-4">
              <label className="block text-sm mb-2">Teléfono</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
