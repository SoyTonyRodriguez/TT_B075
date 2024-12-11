import React, { useState, useEffect } from 'react';
import {get_Check_Products} from '../api/check_products.api';
import LoadingAnimation from "../components/LoadingAnimation";
import { IoStarOutline } from 'react-icons/io5'; 
import { FaMicroscope, FaBook, FaChalkboardTeacher, FaBullhorn, FaCertificate } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode';
import Navigation from './Navigation/Navigation';

const categoryIcons = {
  docencia: <FaChalkboardTeacher className="h-6 w-6 text-white" />,
  investigacion: <FaMicroscope className="h-6 w-6 text-white" />,
  superacion_academica: <FaBook className="h-6 w-6 text-white" />,
  actividades_complementarias: <IoStarOutline className="h-6 w-6 text-white" />,
  extension_difusion: <FaBullhorn className="h-6 w-6 text-white" />,
  eventos_actualizacion: <FaCertificate className="h-6 w-6 text-white" />,
};

const UP_Check = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user_id);
      } catch (error) {
        console.error('Token inválido:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchCheckProducts = async (userId) => {
      try {
        setLoading(true);
        const response = await get_Check_Products(userId);
        setData(response.data);
        console.log('Datos recibidos:', response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError('No se pudo cargar la información.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCheckProducts(userId);
    }
  }, [userId]);


  if (loading) {
    return <LoadingAnimation />;
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 font-sans text-red-300">
        {error || 'Error al obtener datos.'}
      </div>
    );
  }

  const { id, account_id, total_up, ...categories } = data;

  return (
    <div className="font-sans space-y-8 mb-10">
      {/* Navegación fija */}
      <Navigation />
      <hr className="border-t-2 border-gray-700 my-4" />

      <div className="max-w-5xl mx-auto space-y-8 px-4">
      {/* Tarjeta con el total de UP */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-500 rounded-full">
              <IoStarOutline className="h-10 w-10 text-yellow-400" /> 
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Total UP</h2>
              <p className="text-gray-200 text-lg">{total_up} UP</p>
              {/* <p className="text-sm text-gray-400">ID: {id} | Account: {account_id}</p> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(categories).map(([categoryName, categoryValue]) => {
            const subcategories = Object.entries(categoryValue).filter(
              ([key]) => key !== 'total'
            );
            const total = categoryValue.total || 0;

            // Opcional: Podríamos calcular un ancho relativo de una barra de progreso.
            // Por ejemplo, usando total/total_up * 100, pero sólo si queremos una proporción.
            const progressPercent = total_up > 0 ? (total / total_up) * 100 : 0;

            return (
              <div key={categoryName} className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500 rounded-full">
                    {categoryIcons[categoryName] || <FaChalkboardTeacher className="h-10 w-10 text-yellow-400" />}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-300">{categoryName}</h3>
                </div>
                
                <div>
                  <p className="text-gray-300 mb-2">Total: {total} UP</p>
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <div
                      className="bg-blue-500 h-2 rounded transition-all"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {subcategories.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-200">Actividad(es):</h4>
                    <ul className="space-y-1 ml-4 list-disc list-inside text-gray-200">
                      {subcategories.map(([subName, subValue]) => (
                        <li key={subName}>
                          {subName}: {subValue.up} UP (elementos: {subValue.length})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {subcategories.length === 0 && (
                  <p className="text-gray-400 italic">No hay actividades en esta sección.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UP_Check;