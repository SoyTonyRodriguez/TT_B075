import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Icono de usuario
import logo from "../img/logoescom.png";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú desplegable
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado y cargar los datos del localStorage
  useEffect(() => {
    const accountData = localStorage.getItem("accountDetails"); // Obtiene los datos almacenados en 'accountDetails'
    if (accountData) {
      const { email } = JSON.parse(accountData); // Extraer el email de los datos almacenados
      setEmail(email); // Establecer el email en el estado
      setIsAuthenticated(true); // Si hay datos, el usuario está autenticado
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem("token"); // Eliminar token si se usa
    localStorage.removeItem("accountDetails"); // Eliminar los detalles de la cuenta
    setIsAuthenticated(false); // Cambiar el estado de autenticación
    setEmail(""); // Limpiar el estado del email
    setIsMenuOpen(false); // Cerrar el menú
    navigate("/login"); // Redirigir al login
  };

  return (
    <header className="bg-gradient-to-r from-blue-950 via-sky-700 to-sky-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center w-5/6 mx-auto">
        <div className="text-3xl font-bold">
          <img className="py-1 w-40 h-25 inline-block" src={logo} alt="logo" />
        </div>
        <nav className="space-x-8 mx-auto">
          <Link to="/welcome" className="hover:underline">
            Inicio
          </Link>
          <Link to="/ConocerMas" className="hover:underline">
            Más información
          </Link>
          <Link to="/Nosotros" className="hover:underline">
            Nosotros
          </Link>
        </nav>

        {/* Mostrar el ícono y el email del usuario si está autenticado */}
        {isAuthenticated && (
          <div className="relative inline-block text-left">
            <div
              className="flex items-center cursor-pointer space-x-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Alternar el menú al hacer clic
            >
              <FaUserCircle className="text-2xl" />
              <span>{email}</span>
            </div>

            {/* Menú desplegable solo si isMenuOpen es true */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mx-auto container justify-between items-center bg-white h-0.5"></div>
    </header>
  );
}

export default Header;
