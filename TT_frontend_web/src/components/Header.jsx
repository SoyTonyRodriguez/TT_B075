import React, { useState, useContext, useEffect, useRef } from "react"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../img/estudiar.png";
import AuthContext from "./AuthContext";
import { FaUserCircle, FaRegStar } from "react-icons/fa"; // Importa el icono adicional
import { jwtDecode } from "jwt-decode";
import { getAccount } from '../api/accounts.api'; // Llamada a la API
import LoadingAnimation from "./LoadingAnimation"; // Importa el componente de animación de carga

function Header() {
    const { isAuthenticated, email, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [unitsProjection, setUnitsProjection] = useState(0); // Agrega el estado para las unidades
    const [showUnits, setShowUnits] = useState(false); // Para mostrar las unidades acumuladas al hacer clic en la estrella
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.user_id);
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchUnitsProjection = async () => {
            if (!userId) return; // No llama a la API si userId no está disponible
    
            try {
                setLoading(true);
                const response = await getAccount(userId); // Llama a la API con el userId
                console.log("Respuesta de getAccount:", response.data);
    
                if (response.data) {
                    const projectionValue = response.data.units_projection === 0
                        ? "0"
                        : response.data.units_projection;
    
                    setUnitsProjection(projectionValue);
    
                    // Actualiza localStorage
                    const accountDetails = JSON.parse(localStorage.getItem("accountDetails")) || {};
                    accountDetails.units_projection = projectionValue;
                    localStorage.setItem("accountDetails", JSON.stringify(accountDetails));
                }
            } catch (error) {
                console.error("Error al obtener las unidades de promoción:", error);
            } finally {
                setLoading(false);
            }
        };
    
        if (userId) {
            fetchUnitsProjection(); // Llama a la función solo si userId está definido
        }
    }, [userId]); // Ejecuta el efecto solo cuando userId cambia
    

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
        }, 600); // Verifica cada segundo
    
        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, []);

    // Cerrar el menú móvil al cambiar de ruta
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    if (loading) {
        return <LoadingAnimation />;
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-gradient-to-r from-blue-950 via-sky-700 to-sky-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 relative md:w-full">
                
                {/* Vista móvil: Exclusivamente para pantallas pequeñas */}
                <div className="md:hidden flex items-center w-full px-4">
                    {/* Botón hamburguesa a la izquierda para móviles */}
                    <button
                        onClick={toggleMobileMenu}
                        className="text-3xl"
                        aria-label="Abrir menú"
                    >
                        <FiMenu />
                    </button>

                    {/* Logo centrado en móviles */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <img className="w-16 h-auto md:w-16" src={logo} alt="Logo ESCOM" />
                    </div>

                    {/* Estrella de U.P. acumuladas a la derecha */}
                    {isAuthenticated && (
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="cursor-pointer ml-auto"
                        >
                            <Link to="/unidades"> 
                                <FaRegStar className="text-yellow-400 text-3xl" />
                            </Link>
                        </motion.div>
                    )}

                    {/* Mostrar unidades acumuladas al hacer clic en la estrella */}
                    {isAuthenticated && showUnits && (
                        <div className="absolute top-16 right-4 flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-sky-600 p-3 rounded-lg shadow-md">
                            <span className="text-white font-semibold">
                                U.P. acumuladas: {unitsProjection}
                            </span>
                        </div>
                    )}

                    {/* Icono de perfil en la vista móvil */}
                    {isAuthenticated && (
                        <div
                            className="ml-4 flex items-center bg-blue-500 p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <FaUserCircle className="text-white text-3xl" />
                        </div>
                    )}

                    {isAuthenticated && isMenuOpen && (
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute top-16 right-4 w-64 bg-gradient-to-r from-blue-600 to-sky-500 rounded-lg shadow-md z-50"
                        >
                            <div className="flex flex-col items-start p-4">
                                <span className="text-white font-medium text-base">Correo: {email}</span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Vista de escritorio: Sin ningún cambio */}
                <div className="hidden md:flex items-center justify-between w-full">
                    {/* Logo en la vista de escritorio */}
                    <div className="flex-shrink-0">
                        <img className="w-20 h-auto md:w-20" src={logo} alt="Logo ESCOM" />
                    </div>

                    {/* Menú principal para pantallas grandes */}
                    <nav className="flex justify-center items-center gap-4 text-center">
                        <AnimatedLink to="/welcome">Inicio</AnimatedLink>
                        <AnimatedLink to="/ConocerMas">Más información</AnimatedLink>
                        <AnimatedLink to="/Nosotros">Nosotros</AnimatedLink>
                    </nav>
                    {/* Botón de usuario / Login para pantallas grandes */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated && (
                            <Link 
                                to="/unidades"
                                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-sky-600 p-2 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-lg"
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    <FaRegStar className="text-yellow-400 text-2xl" />
                                </motion.div>
                                <span className="text-white font-semibold">
                                    U.P. acumuladas: {unitsProjection}
                                </span>
                            </Link>
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
                </div>
            </div>

            {/* Menú responsivo para dispositivos móviles */}
            {isMobileMenuOpen && (
                <motion.nav
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-y-0 left-0 w-1/2 bg-blue-500 p-4 text-white z-50"  
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Menú</h2>
                        <button onClick={toggleMobileMenu} aria-label="Cerrar menú">
                            <FiX className="text-3xl" />
                        </button>
                    </div>
                    {/* Enlaces del menú */}
                    <Link to="/welcome" className="block px-4 py-2 text-white hover:bg-blue-700" onClick={toggleMobileMenu}>
                        Inicio
                    </Link>
                    <Link to="/ConocerMas" className="block px-4 py-2 text-white hover:bg-blue-700" onClick={toggleMobileMenu}>
                        Más información
                    </Link>
                    <Link to="/Nosotros" className="block px-4 py-2 text-white hover:bg-blue-700" onClick={toggleMobileMenu}>
                        Nosotros
                    </Link>

                    {/* Botón para iniciar sesión */}
                    {!isAuthenticated && (
                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-800 transition"
                                onClick={toggleMobileMenu}
                            >
                                Iniciar sesión
                            </Link>
                        </div>
                    )}

                    {/* Botón de cerrar sesión en menú móvil */}
                    {isAuthenticated && (
                        <motion.div 
                            whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="mt-4"
                        >
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-sky-500 rounded-lg shadow-md hover:bg-blue-800 transition"
                            >
                                <FaUserCircle className="text-white text-3xl" />
                                <span className="text-white font-medium">Cerrar sesión</span>
                            </button>
                        </motion.div>
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
