import React, { useState, useEffect } from 'react';
import {get_Check_Products} from '../api/check_products.api';
import LoadingAnimation from "../components/LoadingAnimation";
import {jwtDecode} from 'jwt-decode';

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
    <div className="max-w-5xl mx-auto px-4 py-10 font-sans text-gray-100 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Desglose de UP</h1>

      {/* Tarjeta con el total de UP */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-500 rounded-full">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-300">Total UP</h2>
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
            <div key={categoryName} className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                {/* Ícono de categoría: modificar según la categoría si se desea */}
                <div className="p-2 bg-purple-500 rounded-full">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-purple-300">{categoryName}</h3>
              </div>

              <div>
                <p className="text-gray-300 mb-2">Total: {total} UP</p>
                <div className="w-full bg-gray-700 h-2 rounded">
                  <div
                    className="bg-purple-500 h-2 rounded"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {subcategories.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-gray-200">Subcategorías:</h4>
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
                <p className="text-gray-400 italic">No hay subcategorías en esta sección.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UP_Check;