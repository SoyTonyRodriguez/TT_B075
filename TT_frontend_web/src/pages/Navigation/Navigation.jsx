import React, { useState, useEffect, useRef } from 'react'; 
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
  const menuButtonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState(0);
  const [hoveredButton, setHoveredButton] = useState(null);
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
      case '/CategoryLimits':  
        setTitle('Mínimos y máximos de unidades de promoción ');
        setIcon(<IoSchoolOutline size={60} />); 
        break;
      case '/Convocatoria':  
        setTitle('¿En qué consiste la convocatoria?');
        setIcon(<IoSchoolOutline size={60} />); 
        break;
      case '/unidades':  
        setTitle('Desglose de unidades de promoción');
        setIcon(<IoStarOutline size={60} />); 
        break;    
      default:
        setTitle('');
        setIcon(null); 
    }
  }, [location]);

  useEffect(() => {
    // Calcular la posición del menú cuando se abre
    if (menuButtonRef.current) {
      const buttonRect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition(buttonRect.bottom + 8); 
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Variantes para la animación de los botones
  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.95,
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
        <button onClick={toggleMenu} ref={menuButtonRef}>
          {menuOpen ? (
            <IoCloseOutline size={30} className="text-blue-500" />
          ) : (
            <IoMenuOutline size={30} className="text-blue-500" />
          )}
        </button>
      </div>

      {/* Menú desplegable flotante hacia la derecha cuando el menú hamburguesa está abierto */}
      {menuOpen && (
        <div 
          className="fixed right-4 bg-transparent flex flex-col items-end space-y-4 z-50" 
          style={{ top: `${menuPosition}px` }} // Posición dinámica calculada
        >
          {/* Proyección y seguimiento */}
          <motion.div 
            className="flex items-center" // Flex para alinear el texto y el botón horizontalmente
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
            onMouseEnter={() => setHoveredButton('projection')} // Mostrar texto al hacer hover
            onMouseLeave={() => setHoveredButton(null)} // Ocultar texto cuando se retira el cursor
          >
            {hoveredButton === 'projection' && (
              <span className="bg-black text-white px-2 py-1 rounded-md mr-2 w-[120px] text-center">
                Proyección y seguimiento
              </span>
            )}
            <Link to="/projection" className={`${getButtonClass('/projection')} p-2 rounded-full shadow-none w-16 h-16 flex items-center justify-center`}>
              <motion.div variants={iconVariants} whileHover="hover">
                <IoEyeOutline size={30} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Mis documentos */}
          <motion.div 
            className="flex items-center" 
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
            onMouseEnter={() => setHoveredButton('documents')} 
            onMouseLeave={() => setHoveredButton(null)}
          >
            {hoveredButton === 'documents' && (
              <span className="bg-black text-white px-2 py-1 rounded-md mr-2 w-[120px] text-center">
                Mis documentos
              </span>
            )}
            <Link to="/documents" className={`${getButtonClass('/documents')} p-2 rounded-full shadow-none w-16 h-16 flex items-center justify-center`}>
              <motion.div variants={iconVariants} whileHover="hover">
                <IoDocumentTextOutline size={30} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Calendario */}
          <motion.div 
            className="flex items-center" 
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
            onMouseEnter={() => setHoveredButton('calendar')} 
            onMouseLeave={() => setHoveredButton(null)}
          >
            {hoveredButton === 'calendar' && (
              <span className="bg-black text-white px-2 py-1 rounded-md mr-2 w-[120px] text-center">
                Calendario
              </span>
            )}
            <Link to="/calendar" className={`${getButtonClass('/calendar')} p-2 rounded-full shadow-none w-16 h-16 flex items-center justify-center`}>
              <motion.div variants={iconVariants} whileHover="hover">
                <IoCalendarOutline size={30} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Enlaces y bases */}
          <motion.div 
            className="flex items-center" 
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
            onMouseEnter={() => setHoveredButton('links')} 
            onMouseLeave={() => setHoveredButton(null)}
          >
            {hoveredButton === 'links' && (
              <span className="bg-black text-white px-2 py-1 rounded-md mr-2 w-[120px] text-center">
                Enlaces y bases
              </span>
            )}
            <Link to="/links" className={`${getButtonClass('/links')} p-2 rounded-full shadow-none w-16 h-16 flex items-center justify-center`}>
              <motion.div variants={iconVariants} whileHover="hover">
                <IoLinkOutline size={30} />
              </motion.div>
            </Link>
          </motion.div>

          {/* Mi cuenta */}
          <motion.div 
            className="flex items-center" 
            variants={buttonVariants} 
            whileHover="hover" 
            whileTap="tap"
            onMouseEnter={() => setHoveredButton('account')} 
            onMouseLeave={() => setHoveredButton(null)}
          >
            {hoveredButton === 'account' && (
              <span className="bg-black text-white px-2 py-1 rounded-md mr-2 w-[120px] text-center">
                Mi cuenta
              </span>
            )}
            <Link to="/account" className={`${getButtonClass('/account')} p-2 rounded-full shadow-none w-16 h-16 flex items-center justify-center`}>
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
