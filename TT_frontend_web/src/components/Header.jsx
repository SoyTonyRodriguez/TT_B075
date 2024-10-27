import React, { useState, useEffect, useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import { FiMenu, FiX } from "react-icons/fi"; 
import { motion } from "framer-motion"; 
import logo from "../img/logoescom.png";
import AuthContext from './AuthContext';  // Importa el contexto

function Header() {
  const { isAuthenticated, email, logout } = useContext(AuthContext);  // Consume el contexto
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // // Verificar si el usuario está autenticado y cargar los datos del localStorage
  // useEffect(() => {
  //   const accountData = localStorage.getItem("accountDetails"); 
  //   if (accountData) {
  //     const { email } = JSON.parse(accountData); // Extraer el email de los datos almacenados
  //     setEmail(email); // Establecer el email en el estado
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  // const handleLogout = () => {
  //   // Lógica para cerrar sesión
  //   localStorage.removeItem("token"); 
  //   localStorage.removeItem("accountDetails"); // Eliminar los detalles de la cuenta
  //   // setIsAuthenticated(false); 
  //   setEmail(""); 
  //   setIsMenuOpen(false); 
  //   navigate("/login"); 
  // };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); 
  };

  return (
    <header className="bg-gradient-to-r from-blue-950 via-sky-700 to-sky-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
            <div className="text-3xl font-bold">
                <img className="py-1 w-40 h-auto" src={logo} alt="logo" />
            </div>

            <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-3xl">
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            <nav className="hidden md:flex space-x-8">
                <Link to="/welcome">Inicio</Link>
                <Link to="/ConocerMas">Más información</Link>
                <Link to="/Nosotros">Nosotros</Link>
            </nav>

            {isAuthenticated ? (
                <div className="relative">
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <FaUserCircle className="text-2xl" />
                        <span>{email}</span>
                    </div>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                            <button
                                onClick={() => {
                                    logout();
                                    navigate('/login');
                                }}
                                className="block w-full px-4 py-2 text-left text-gray-700"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/login" className="text-white">Iniciar sesión</Link>
            )}
        </div>

        {isMobileMenuOpen && (
            <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-blue-800 py-2"
            >
                <Link to="/welcome" className="block px-4 py-2">Inicio</Link>
                <Link to="/ConocerMas" className="block px-4 py-2">Más información</Link>
                <Link to="/Nosotros" className="block px-4 py-2">Nosotros</Link>
            </motion.nav>
        )}
    </header>
  );
}

export default Header;
