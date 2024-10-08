import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import { FiMenu, FiX } from "react-icons/fi"; 
import { motion } from "framer-motion"; 
import logo from "../img/logoescom.png";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado y cargar los datos del localStorage
  useEffect(() => {
    const accountData = localStorage.getItem("accountDetails"); 
    if (accountData) {
      const { email } = JSON.parse(accountData); // Extraer el email de los datos almacenados
      setEmail(email); // Establecer el email en el estado
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem("token"); 
    localStorage.removeItem("accountDetails"); // Eliminar los detalles de la cuenta
    setIsAuthenticated(false); 
    setEmail(""); 
    setIsMenuOpen(false); 
    navigate("/login"); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); 
  };

  return (
    <header className="bg-gradient-to-r from-blue-950 via-sky-700 to-sky-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        <div className="text-3xl font-bold">
          <img className="py-1 w-40 h-auto" src={logo} alt="logo" />
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-3xl focus:outline-none">
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Menú de navegación principal */}
        <nav className="hidden md:flex space-x-8 mx-auto">
          <Link to="/welcome" className="hover:underline transition duration-300 ease-in-out">
            Inicio
          </Link>
          <Link to="/ConocerMas" className="hover:underline transition duration-300 ease-in-out">
            Más información
          </Link>
          <Link to="/Nosotros" className="hover:underline transition duration-300 ease-in-out">
            Nosotros
          </Link>
        </nav>

        {/* Mostrar al usuario si está autenticado */}
        {isAuthenticated && (
          <div className="relative hidden md:inline-block text-left">
            <div
              className="flex items-center cursor-pointer space-x-2 hover:bg-blue-800 px-3 py-1 rounded-lg transition duration-300 ease-in-out"
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
            >
              <FaUserCircle className="text-2xl" />
              <span>{email}</span>
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out">
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

      {/* Menú responsivo */}
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden bg-blue-800 py-2 space-y-2 shadow-md"
        >
          <Link to="/welcome" className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition duration-300 ease-in-out">
            Inicio
          </Link>
          <Link to="/ConocerMas" className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition duration-300 ease-in-out">
            Más información
          </Link>
          <Link to="/Nosotros" className="block px-4 py-2 text-white hover:bg-blue-700 rounded transition duration-300 ease-in-out">
            Nosotros
          </Link>
          {isAuthenticated && (
            <div className="block px-4 py-2 text-white flex items-center space-x-2 cursor-pointer">
              <FaUserCircle className="text-xl" />
              <span>{email}</span>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-100 hover:bg-blue-700 rounded transition duration-300 ease-in-out"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </motion.nav>
      )}

      <div className="mx-auto container justify-between items-center bg-white h-0.5"></div>
    </header>
  );
}

export default Header;
