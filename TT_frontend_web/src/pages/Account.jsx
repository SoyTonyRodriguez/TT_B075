import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Projection from '../img/proyeccion.png';
import Documents from '../img/documentos.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';

function Profile() {
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [profile, setProfile] = useState({
    name: 'Manuel Alejandro Soto Ramos',
    email: 'xxxxxxxxx@ipn.mx',
    category: 'Profesor titular A',
    phone: '5555555555',
    notifications: true,
    password: '**********',
  });

  const [profileImage, setProfileImage] = useState(null); // Profile image state
  const [imagePreview, setImagePreview] = useState('https://via.placeholder.com/100'); // Default profile image

  // Handle text input and checkbox changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Toggle between edit and view mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save profile data (and possibly send API call)
  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved:', profile);
    // Implement the API logic to save the profile changes here
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Show image preview
      };
      reader.readAsDataURL(file); // Convert the file to base64 string for preview
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center">
      {/* Navegación Secundaria */}
      <div className="p-4 flex justify-end space-x-4 mr-14">
        <Link
          to="/projection"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Projection} alt="Proyección y seguimiento" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Proyección y seguimiento</p>
        </Link>
        <Link
          to="/documents"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Documents} alt="Mis documentos" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Mis documentos</p>
        </Link>
        <Link
          to="/calendar"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Calendar} alt="Calendario" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Calendario</p>
        </Link>
        <Link
          to="/account"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 w-36 h-36 flex flex-col items-center justify-center"
        >
          <img src={Account} alt="Mi cuenta" className="w-12 h-12 mb-2" />
          <p className="text-sm font-semibold">Mi cuenta</p>
        </Link>
      </div>

      {/* Profile Form Section */}
      <div className="flex justify-center mt-10">
        <div className="bg-gray-800 rounded-lg p-8 w-3/4 lg:w-2/4 shadow-lg">
          {/* Profile Image Section */}
          <div className="flex items-center justify-center mb-6">
            <img
              src={imagePreview} // Display the selected or default image
              alt="User Avatar"
              className="rounded-full w-24 h-24"
            />
          </div>
          <div className="text-center text-white">
            <label className="text-blue-300 hover:underline cursor-pointer">
              Cambiar imagen
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Fields */}
          <div className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="text-white">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full mt-2 p-2 border rounded-lg text-black"
                />
              </div>
              <div>
                <label className="text-white">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full mt-2 p-2 border rounded-lg text-black"
                />
              </div>
              <div>
                <label className="text-white">Categoría</label>
                <input
                  type="text"
                  name="category"
                  value={profile.category}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full mt-2 p-2 border rounded-lg text-black"
                />
              </div>
              <div>
                <label className="text-white">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full mt-2 p-2 border rounded-lg text-black"
                />
              </div>
              <div>
                <label className="text-white">Celular</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full mt-2 p-2 border rounded-lg text-black"
                />
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={profile.notifications}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mr-2"
                />
                <label className="text-white">Recibir notificaciones</label>
              </div>
            </div>

            {/* Edit and Save Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleEdit}
                className="bg-gray-300 text-black p-3 rounded-lg shadow-lg hover:bg-gray-400"
              >
                {isEditing ? 'Cancelar' : 'Editar información'}
              </button>
              <button
                onClick={handleSave}
                disabled={!isEditing}
                className={`${
                  isEditing
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-500 cursor-not-allowed'
                } text-white p-3 rounded-lg shadow-lg`}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
