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
        setToken(storedToken);
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.user_id);
      }
    } catch (error) {
      console.error('Error loading token:', error);
    }
  };

  useEffect(() => {
    loadToken(); // Cargar el token al montar el contexto
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
