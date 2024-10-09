import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import perfilImage from '../img/perfi.png'; 
import Navigation from './Navigation/Navigation'; 
import { getAccount } from '../../../api/accounts.api'; // Importa el método para obtener el usuario

function Account() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(perfilImage); 
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Estado para habilitar/deshabilitar la edición
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Obtener el id del usuario desde localStorage
    const userId = localStorage.getItem('userId');
    
    // Si existe el id, obtenemos la información del usuario
    if (userId) {
      getAccount(userId)
        .then((response) => {
          const { userName, fullName, email, category, phone } = response.data;
          setFullName(fullName);
          setEmail(email);
          setCategory(category);
          setPassword(password);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario", error);
        });
    }
  }, []); // Se ejecuta solo una vez al montar el componente


  useEffect(() => {
    try {
      const storedAccountData = localStorage.getItem('accountDetails');
      if (storedAccountData) {
        const { userName, fullName, email, category, phone } = JSON.parse(storedAccountData);
          setFullName(fullName);
        setEmail(email);
        setCategory(category);
      }
    } catch (error) {
      console.error("Error accessing or parsing account details from localStorage:", error);
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

  // Habilitar edición
  const handleEdit = () => {
    setIsEditing(true); // Habilita la edición de los campos
  };

  // Guardar cambios
  const handleSave = async (e) => {
    e.preventDefault();  // Evitar la recarga de la página
  
    const updatedData = {
      fullName,
      email,
      category,
      // Añade otros datos si son necesarios, como current_password o new_password
    };
  
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('No se ha encontrado el ID del usuario.');
      }
  
      const response = await updateAccount(userId, updatedData);
  
      if (response.status !== 200) {
        throw new Error('Error al guardar los cambios');
      }
  
      // Actualiza localStorage con la nueva información (opcional)
      localStorage.setItem('accountDetails', JSON.stringify(updatedData));
  
      // Deshabilita el modo de edición
      setIsEditing(false);
      alert('Cambios guardados correctamente');
    } catch (error) {
      console.error('Error al actualizar la información', error);  // <-- Muestra el error completo en la consola
      alert('Hubo un error al guardar la información.');
    }
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
        </div>
        {/* Formulario de información */}
        <div className="w-2/3 ml-8">
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Nombre Completo</label>
              <input 
                type="text" 
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isEditing} // Deshabilitar si no está en modo de edición
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">E-mail</label>
              <input type="email" 
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing} // Deshabilitar si no está en modo de edición
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Categoría</label>
              <input type="text" 
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={!isEditing} // Deshabilitar si no está en modo de edición
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Contraseña</label>
              <input type="password" className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} disabled={!isEditing} />
            </div>
            <div className="flex justify-end mt-8">
              {!isEditing ? (
                <button type="button" onClick={handleEdit} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
                  Editar información
                </button>
              ) : (
                <>
                  <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
                    Cancelar
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
