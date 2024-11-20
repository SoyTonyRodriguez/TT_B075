import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoEyeOutline, IoLinkOutline, IoDocumentTextOutline, IoCalendarOutline, IoPersonOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import LoadingAnimation from "../components/LoadingAnimation";  

import { jwtDecode } from "jwt-decode";
import { getConditions } from '../api/conditions.api';
import { getConditionsMax } from '../api/conditions_max.api';


function MainContent() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [units_projection, setUnitsProjection] = useState('');
  const [projection_id, setProjectionId] = useState('');
  const [loading, setLoading] = useState(true); 
  const [conditions, setConditions] = useState(null);
  const [conditions_max, setConditionsMax] = useState(null);

  // Actualiza los detalles de la cuenta desde localStorage
  const updateAccountDetails = () => {
    const storedAccountData = localStorage.getItem('accountDetails');
    if (storedAccountData) {
      const { userName, fullName, email, category, phone, units_projection, projection_id } = JSON.parse(storedAccountData);
      setUserName(userName);
      setFullName(fullName);
      setEmail(email);
      setCategory(category);
      setPhone(phone);
      setUnitsProjection(units_projection);
      setProjectionId(projection_id);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateAccountDetails(); // Cargar los detalles al iniciar el componente

    // Escuchar cambios en localStorage
    window.addEventListener('storage', updateAccountDetails);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('storage', updateAccountDetails);
    };
  }, []);

  const fetchConditions = async () => {
    try {
      const response = await getConditions();
      setConditions(response.data[0]);
      localStorage.setItem('conditions', JSON.stringify(response.data[0]));
    } catch (error) {
      console.error('Error fetching conditions:', error);
    }
  };

  const fetchConditionsMax = async () => {
    try {
      const response = await getConditionsMax();
      if (response && response.data) {
        setConditionsMax(response.data);
        localStorage.setItem('conditions_max', JSON.stringify(response.data));
      } else {
        console.warn('No se encontraron datos para conditions_max.');
      }
    } catch (error) {
      console.error('Error fetching conditions_max:', error);
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  const iconVariants = {
    hover: { scale: 1.1, rotate: 6, color: "#ADD8E6" },
    tap: { scale: 0.9, opacity: 1 },
  };

  return (
    <main className="min-h-screen bg-cover bg-center">
      <div className="container mx-auto p-8">
        <div className="text-center mt-16">
          <h1 className="text-5xl font-bold mb-12">Bienvenido {`${userName}`}</h1>
        </div>

        <div className="flex flex-wrap justify-center mb-12 mt-16 gap-8">
          <Link to="/projection">
            <motion.div
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-48 h-48 flex flex-col items-center justify-center"
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
            >
              <IoEyeOutline className="mb-4 w-16 h-16" />
              <p className="text-center text-lg font-semibold">Proyección y seguimiento</p>
            </motion.div>
          </Link>

          <Link to="/links">
            <motion.div
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-48 h-48 flex flex-col items-center justify-center"
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
            >
              <IoLinkOutline className="mb-4 w-16 h-16" />
              <p className="text-center text-lg font-semibold">Enlaces y bases</p>
            </motion.div>
          </Link>

          <Link to="/documents">
            <motion.div
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-48 h-48 flex flex-col items-center justify-center"
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
            >
              <IoDocumentTextOutline className="mb-4 w-16 h-16" />
              <p className="text-center text-lg font-semibold">Mis documentos</p>
            </motion.div>
          </Link>

          <Link to="/calendar">
            <motion.div
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-48 h-48 flex flex-col items-center justify-center"
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
            >
              <IoCalendarOutline className="mb-4 w-16 h-16" />
              <p className="text-center text-lg font-semibold">Calendario</p>
            </motion.div>
          </Link>

          <Link to="/account">
            <motion.div
              className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-48 h-48 flex flex-col items-center justify-center"
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
            >
              <IoPersonOutline className="mb-4 w-16 h-16" />
              <p className="text-center text-lg font-semibold">Mi cuenta</p>
            </motion.div>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
