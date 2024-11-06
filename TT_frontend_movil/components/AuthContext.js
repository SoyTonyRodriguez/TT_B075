import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        updateToken(storedToken);
      }
    } catch (error) {
      console.error('Error loading token:', error);
    }
  };

  const updateToken = async (newToken) => {
    try {
      if (newToken) {
        await AsyncStorage.setItem('token', newToken);
        setToken(newToken);
        const decoded = jwtDecode(newToken);
        setUserId(decoded.user_id);
      } else {
        await AsyncStorage.removeItem('token');
        setToken(null);
        setUserId(null);
      }
    } catch (error) {
      console.error('Error updating token:', error);
    }
  };

  // Función de cierre de sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');  // Remover el token de AsyncStorage
      setToken(null);                          // Resetear token en el contexto
      setUserId(null);                         // Resetear userId en el contexto
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, setToken: updateToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
