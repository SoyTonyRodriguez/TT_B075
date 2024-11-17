import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../img/logoescom.png";
import AuthContext from "./AuthContext";
import { FaUserCircle, FaRegStar } from "react-icons/fa"; // Importa el icono adicional


function Header() {
    const { isAuthenticated, email, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [unitsProjection, setUnitsProjection] = useState(0); // Agrega el estado para las unidades

    const navigate = useNavigate();
    const location = useLocation();

    // Obtener el valor de units_projection de localStorage al cargar el componente
    useEffect(() => {
        const updateUnitsProjection = () => {
            const accountDetails = JSON.parse(localStorage.getItem("accountDetails"));
            if (accountDetails && accountDetails.units_projection !== undefined) {
                // Si units_projection es 0, lo convertimos en la cadena "0"
                const projectionValue =
                    accountDetails.units_projection === 0
                        ? "0"
                        : accountDetails.units_projection;
                setUnitsProjection(projectionValue);
            }
        };
    
        // Llama a la función al cargar el componente
        updateUnitsProjection();
    
        // Comprueba periódicamente si hay cambios en el localStorage
        const interval = setInterval(() => {
            updateUnitsProjection();
        }, 1000); // Verifica cada segundo
    
        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, []);

  // Cerrar el menú móvil al cambiar de ruta
useEffect(() => {
    setIsMobileMenuOpen(false);
}, [location]);

const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

const handleLogout = () => {
    logout();
    navigate("/login");
};

return (
    <header className="bg-gradient-to-r from-blue-950 via-sky-700 to-sky-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
            {/* Logo */}
            <div className="flex-shrink-0">
            <img className="w-40 h-auto" src={logo} alt="Logo ESCOM" />
            </div>

            {/* Menú principal para pantallas grandes */}
            <nav className="flex-1 hidden md:flex justify-center gap-8 items-center text-center">
            <AnimatedLink to="/welcome">Inicio</AnimatedLink>
            <AnimatedLink to="/ConocerMas">Más información</AnimatedLink>
            <AnimatedLink to="/Nosotros">Nosotros</AnimatedLink>
            </nav>

            {/* Botón de usuario / Login */}
            <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
                        <div className="flex items-center space-x-2 bg-sky-600 p-2 rounded-lg shadow-md">
                            <FaRegStar className="text-yellow-300 text-xl" />
                            <span className="text-white font-medium">
                                U.P. acumuladas: {unitsProjection}
                            </span>
                        </div>
                    )}
            {isAuthenticated ? (
                <UserButton
                email={email}
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                handleLogout={handleLogout}
                />
            ) : (
                <Link to="/login" className="text-white hover:underline">
                Iniciar sesión
                </Link>
            )}
            </div>

            {/* Botón hamburguesa para móviles */}
            <div className="md:hidden">
            <button
                onClick={toggleMobileMenu}
                className="text-3xl"
                aria-label="Abrir menú"
            >
                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
            </div>
        </div>

        {/* Menú responsivo para dispositivos móviles */}
        {isMobileMenuOpen && (
            <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-blue-500 py-4 text-center"
            >
            {/* Enlaces del menú */}
            <Link to="/welcome" className="block px-4 py-2 text-white hover:bg-blue-700">
                Inicio
            </Link>
            <Link to="/ConocerMas" className="block px-4 py-2 text-white hover:bg-blue-700">
                Más información
            </Link>
            <Link to="/Nosotros" className="block px-4 py-2 text-white hover:bg-blue-700">
                Nosotros
            </Link>

            {isAuthenticated && (
                <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-white mt-4 bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                <FaUserCircle className="inline-block mr-2" /> Cerrar sesión
                </button>
            )}
            </motion.nav>
        )}
        </header>
    );
    }

    // Componente del enlace con animación
    function AnimatedLink({ to, children }) {
    return (
        <Link
        to={to}
        className="relative text-white transition duration-300 ease-in-out hover:text-sky-300"
        >
        {children}
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-sky-300 scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100 origin-left"></span>
        </Link>
    );
    }

    // Componente del botón de usuario con desplegable
    function UserButton({ email, isOpen, setIsOpen, handleLogout }) {
    const buttonRef = useRef();

    // Cerrar el menú si se hace clic fuera del componente
    useEffect(() => {
        function handleClickOutside(event) {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsOpen]);

    return (
        <div className="relative" ref={buttonRef}>
        <div
            className="flex items-center space-x-2 bg-blue-500 px-4 py-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
            onClick={() => setIsOpen(!isOpen)}
        >
            <FaUserCircle className="text-white text-2xl" />
            <span className="text-white font-medium">{email}</span>
        </div>

        {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
            <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-red-400 transition"
            >
                Cerrar sesión
            </button>
            </div>
        )}
        </div>
    );
}

export default Header;
