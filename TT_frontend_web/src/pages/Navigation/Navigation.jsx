import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  IoLinkOutline, 
  IoDocumentTextOutline, 
  IoCalendarOutline, 
  IoPersonOutline, 
  IoEyeOutline, 
  IoStarOutline, 
  IoSchoolOutline, IoCreateOutline, IoGlassesOutline, IoHelpCircleOutline, IoMenuOutline, IoCloseOutline
} from 'react-icons/io5';
import { motion } from 'framer-motion';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState(null); 

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/links':
        setTitle('Enlaces y bases');
        setIcon(<IoLinkOutline size={60} />); 
        break;
      case '/documents':
        setTitle('Mis documentos');
        setIcon(<IoDocumentTextOutline size={60} />); 
        break;
      case '/calendar':
        setTitle('Calendario');
        setIcon(<IoCalendarOutline size={60} />); 
        break;
      case '/account':
        setTitle('Mi cuenta');
        setIcon(<IoPersonOutline size={60} />); 
        break;
      case '/projection':
        setTitle('Proyección y seguimiento');
        setIcon(<IoEyeOutline size={60} />); 
        break;
      case '/new-projection':
        setTitle('Crear proyección');
        setIcon(<IoCreateOutline size={60} />); 
        break;
      case '/KanbanBoard':
        setTitle('Ver mi proyección');
        setIcon(<IoGlassesOutline size={60} />); 
        break;
      case '/Guia':
        setTitle('Guía');
        setIcon(<IoHelpCircleOutline size={60} />); 
        break;
      case '/unidades-promocion':  
        setTitle('Por unidades de promoción');
        setIcon(<IoStarOutline size={60} />); 
        break;
      case '/promocion-grado':  
        setTitle('Por obtención de grado académico');
        setIcon(<IoSchoolOutline size={60} />); 
        break;
      case '/InfoProjection':  
        setTitle('¿Qué puedes proyectar?');
        setIcon(<IoSchoolOutline size={60} />); 
        break;
      default:
        setTitle('');
        setIcon(null); 
    }
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Variantes para la animación de los botones
  const buttonVariants = {
    hover: {
      scale: 1.1, // Escalado al hacer hover
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Sombra sutil
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.95, // Animación al hacer clic
    },
  };

  // Variantes para animar los íconos de forma más llamativa
  const iconVariants = {
    hover: {
      color: "#FFD700", 
      rotate: 15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  // Estilo para los botones activos
  const getButtonClass = (path) => {
    return location.pathname === path 
      ? 'bg-blue-700 text-white' 
      : 'bg-blue-500 text-white'; 
  };

  return (
    <div className="p-4 flex justify-between items-center">
      {/* Animación del Título con Ícono */}
      {title && (
        <motion.div 
          className="flex items-center space-x-10 text-2xl md:text-3xl font-bold mb-0" 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          key={title}
        >
          <h2>{title}</h2>
          {icon && <motion.div>{icon}</motion.div>} 
        </motion.div>
      )}

      {/* Botones grandes para pantallas grandes */}
      <div className="hidden lg:flex space-x-4">
        {/* Proyección y seguimiento */}
        <motion.div 
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
        >
          <Link to="/projection" className={`${getButtonClass('/projection')} p-4 rounded-lg shadow-lg w-36 h-36 flex flex-col items-center justify-center`}>
            <motion.div variants={iconVariants} whileHover="hover">
              <IoEyeOutline size={48} className="mb-2" />
            </motion.div>
            <p className="text-sm font-semibold">Proyección y seguimiento</p>
          </Link>
        </motion.div>

        {/* Mis documentos */}
        <motion.div 
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
        >
          <Link to="/documents" className={`${getButtonClass('/documents')} p-4 rounded-lg shadow-lg w-36 h-36 flex flex-col items-center justify-center`}>
            <motion.div variants={iconVariants} whileHover="hover">
              <IoDocumentTextOutline size={48} className="mb-2" />
            </motion.div>
            <p className="text-sm font-semibold">Mis documentos</p>
          </Link>
        </motion.div>

        {/* Calendario */}
        <motion.div 
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
        >
          <Link to="/calendar" className={`${getButtonClass('/calendar')} p-4 rounded-lg shadow-lg w-36 h-36 flex flex-col items-center justify-center`}>
            <motion.div variants={iconVariants} whileHover="hover">
              <IoCalendarOutline size={48} className="mb-2" />
            </motion.div>
            <p className="text-sm font-semibold">Calendario</p>
          </Link>
        </motion.div>

        {/* Enlaces y bases */}
        <motion.div 
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
        >
          <Link to="/links" className={`${getButtonClass('/links')} p-4 rounded-lg shadow-lg w-36 h-36 flex flex-col items-center justify-center`}>
            <motion.div variants={iconVariants} whileHover="hover">
              <IoLinkOutline size={48} className="mb-2" />
            </motion.div>
            <p className="text-sm font-semibold">Enlaces y bases</p>
          </Link>
        </motion.div>

        {/* Mi cuenta */}
        <motion.div 
          variants={buttonVariants} 
          whileHover="hover" 
          whileTap="tap"
        >
          <Link to="/account" className={`${getButtonClass('/account')} p-4 rounded-lg shadow-lg w-36 h-36 flex flex-col items-center justify-center`}>
            <motion.div variants={iconVariants} whileHover="hover">
              <IoPersonOutline size={48} className="mb-2" />
            </motion.div>
            <p className="text-sm font-semibold">Mi cuenta</p>
          </Link>
        </motion.div>
      </div>

      {/* Menú hamburguesa para pantallas pequeñas */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <IoCloseOutline size={30} className="text-blue-500" />
          ) : (
            <IoMenuOutline size={30} className="text-blue-500" />
          )}
        </button>
      </div>

      {/* Menú desplegable flotante hacia la derecha cuando el menú hamburguesa está abierto */}
      {menuOpen && (
        <div className="absolute top-0 right-0 mt-12 mr-4 bg-transparent flex flex-col items-end space-y-2 z-50 lg:hidden">
          {/* Proyección y seguimiento */}
          <motion.div 
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
          >
            <Link to="/projection" className={`${getButtonClass('/projection')} p-2 rounded-full shadow-lg w-16 h-16 flex items-center justify-center`}>
              <motion.div variants={iconVariants} whileHover="hover">
                <IoEyeOutline size={30} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Mis documentos */}
          <motion.div 
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
          >
            <Link to="/documents" className={`${getButtonClass('/documents')} p-2 rounded-full shadow-lg w-16 h-16 flex items-center justify-center`}>
              <motion.div variants={iconVariants} whileHover="hover">
                <IoDocumentTextOutline size={30} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Calendario */}
          <motion.div 
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
          >
            <Link to="/calendar" className={`${getButtonClass('/calendar')} p-2 rounded-full shadow-lg w-16 h-16 flex items-center justify-center`}>
              <motion.div variants={iconVariants} whileHover="hover">
                <IoCalendarOutline size={30} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Enlaces y bases */}
          <motion.div 
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
          >
            <Link to="/links" className={`${getButtonClass('/links')} p-2 rounded-full shadow-lg w-16 h-16 flex items-center justify-center`}>
              <motion.div variants={iconVariants} whileHover="hover">
                <IoLinkOutline size={30} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Mi cuenta */}
          <motion.div 
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
          >
            <Link to="/account" className={`${getButtonClass('/account')} p-2 rounded-full shadow-lg w-16 h-16 flex items-center justify-center`}>
              <motion.div variants={iconVariants} whileHover="hover">
                <IoPersonOutline size={30} />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Navigation;


