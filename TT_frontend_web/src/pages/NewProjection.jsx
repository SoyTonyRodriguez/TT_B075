import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoStarOutline, IoSchoolOutline, IoWarningOutline } from "react-icons/io5";
import Navigation from './Navigation/Navigation'; 
import LoadingAnimation from "../components/LoadingAnimation";
import { jwtDecode } from "jwt-decode";

import { getProjection } from '../api/projections.api';


function NewProjection() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [projectionType, setProjectionType] = useState(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          try {
              const decodedToken = jwtDecode(token);
              setUserId(decodedToken.user_id);
          } catch (error) {
              console.error('Invalid token:', error);
          }
      } else {
          setLoading(false); // Stop loading if no token is found
      }
    
    }, []);

    useEffect(() => {

      const fetchProjection = async (userId) => {
        try {
          setLoading(true);
          const response = await getProjection(userId); // Llamada a la API
          setProjectionType(response.data[0].type); // Almacenar los datos recibidos
          console.log('Datos recibidos:', response.data[0].type);
        } catch (error) {
          console.error('Error al obtener datos:', error);
          setError('No se pudo cargar la información.'); // Mostrar mensaje de error
        } finally {
          setLoading(false);
        }
      };
  
      if (userId) {
        fetchProjection(userId);
      }
    }, [userId]);

    if (loading) {
      return <LoadingAnimation />;
    }

    return (
        <div className="min-h-screen bg-cover bg-center">
          
          {/* navegación fija */}
          <Navigation />

          <hr className="border-t-2 border-black my-4" />
    
          {/* Contenido Principal */}
          <div className="container mx-auto mt-8 mb-8">
            <div className="grid grid-cols-1 gap-6">
              {/* Por unidades de promoción */}
              <div className="flex items-center justify-between bg-black bg-opacity-40 p-6 rounded-lg shadow-lg">
                <div className="flex-1 mr-4">
                  <p className="text-lg text-white leading-relaxed text-center justify-center">
                    En el Instituto Politécnico Nacional (IPN), las unidades de promoción (U.P.) son un sistema de reconocimiento al desempeño docente. Se otorgan a los profesores por realizar actividades que van más allá de sus obligaciones básicas.
                  </p>
                  {projectionType === "Grado Académico" && (
                      <div className="flex items-center mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                          <IoWarningOutline className="h-6 w-6 mr-2" />
                          <span>Este botón está deshabilitado porque ya tiene una proyección de "grado académico".</span>
                      </div>
                  )}
                </div>
                <Link
                  to={projectionType === "Grado Académico" ? "#" : "/unidades-promocion"}
                  className={`p-10 rounded-lg shadow-lg w-56 h-56 flex flex-col items-center justify-center ${
                      projectionType === "Grado Académico" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 transition-transform transform hover:scale-105"
                    }`}
                  disabled={projectionType === "Grado Académico"}
                  onClick={(e) => projectionType === "Grado Académico" && e.preventDefault()}
                >
                  <IoStarOutline className="mb-2 w-24 h-24" /> {/* Icono Unidades de Promoción */}
                  <p className="text-center text-lg font-semibold">Por unidades de promoción</p>
                </Link>
              </div>

              {/* Por obtención de grado académico */}
              <div className="flex items-center justify-between bg-black bg-opacity-40 p-6 rounded-lg shadow-lg">
                <div className="flex-1 mr-4">
                  <p className="text-lg text-white leading-relaxed text-center justify-center">
                    La obtención del grado de maestro o doctor concede al académico la promoción al nivel inmediato superior. Cuando el académico no se haya promovido en cuatro o más años y al solicitar la promoción presente los grados de maestría y doctorado, podrá ascender dos niveles.
                  </p>
                  {projectionType === "Unidades de Promoción" && (
                      <div className="flex items-center mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                          <IoWarningOutline className="h-6 w-6 mr-2" />
                          <span>Este botón está deshabilitado porque ya tiene una proyección de "unidades de promoción".</span>
                      </div>
                  )}
                </div>
                <Link
                  to={projectionType === "Unidades de Promoción" ? "#" : "/promocion-grado"}
                  className={`p-10 rounded-lg shadow-lg w-56 h-56 flex flex-col items-center justify-center ${
                      projectionType === "Unidades de Promoción" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 transition-transform transform hover:scale-105"
                  }`}
                  disabled={projectionType === "Unidades de Promoción"}
                  onClick={(e) => projectionType === "Unidades de Promoción" && e.preventDefault()}
                >
                  <IoSchoolOutline className="mb-2 w-24 h-24" /> {/* Icono Grado Académico */}
                  <p className="text-center text-lg font-semibold">Por obtención de grado académico</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default NewProjection;

