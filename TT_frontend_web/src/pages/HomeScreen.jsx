import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Projection from '../img/proyeccion.png';
import Links from '../img/enlace.png';
import Documents from '../img/documentos.png';
import Calendar from '../img/calendario.png';
import Account from '../img/miPerfil.png';
import LoadingAnimation from "../components/LoadingAnimation";  

import { jwtDecode } from "jwt-decode";
import { getAccount } from "../../../api/accounts.api";


function MainContent() {
    // Get user ID from the token
    const [userId, setUserId] = useState(null);

      // Store data account
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [phone, setPhone] = useState('');

    // Loading state
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
      // Verify if the userName is stored in the localStorage
      const storedAccountData = localStorage.getItem('accountDetails');

      // If the account is stored, set data and skip loading animation
      if (storedAccountData) {
        const { userName, fullName, email, category, phone } = JSON.parse(storedAccountData);
        setUserName(userName);
        setFullName(fullName);
        setEmail(email);
        setCategory(category);
        setPhone(phone);
        setLoading(false);
      } else {
          const token = localStorage.getItem('token');
          if (token) {
              try {
                  const decodedToken = jwtDecode(token);
                  setUserId(decodedToken.user_id);
              } catch (error) {
                  console.error('Invalid token:', error);
              }
          }
      }
    }, []);

    useEffect(() => {
      if (userId && !userName) {
          const fetchAccountDetails = async () => {
              try {
                  const response = await getAccount(userId);
                  const fullName = response.data.name;
                  const firstName = fullName.split(' ')[0];
                  const email = response.data.email;
                  const category = response.data.category;
                  const phone = response.data.phone;

                  // Store the account details in the state
                  setUserName(firstName);
                  setFullName(fullName);
                  setEmail(email);
                  setCategory(category);
                  setPhone(phone);

                  // Create an object with the account details
                  const accountDetails = {
                      userName: firstName,
                      fullName,
                      email,
                      category,
                      phone
                  };

                  // Save the account details in the localStorage
                  localStorage.setItem('accountDetails', JSON.stringify(accountDetails));
              } catch (error) {
                  console.error('Error fetching account details:', error);
                  if (error.response && error.response.status === 401) {
                      console.error('Unauthorized: Invalid or expired token');
                  }
              } finally {
                  setLoading(false);
              }
          };
          fetchAccountDetails();
      }
  }, [userId, userName]);

    // Show loading animation while fetching the account details
    if (loading) {
        return <LoadingAnimation />;
    }
    
  return (
    <main className="min-h-screen bg-cover bg-center">
      <div className="container mx-auto p-8">
        <div className="text-center mt-16">
          <h1 className="text-5xl font-bold mb-12">Bienvenido {`${userName}`}</h1>
        </div>

        <div className="flex flex-wrap justify-center mb-12 mt-16 gap-8">
          <Link to="/projection" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-48 h-48 flex flex-col items-center justify-center">
            <img src={Projection} alt="Proyección y seguimiento" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Proyección y seguimiento</p>
          </Link>
          <Link to="/links" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-48 h-48 flex flex-col items-center justify-center">
            <img src={Links} alt="Enlaces y bases" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Enlaces y bases</p>
          </Link>
          <Link to="/documents" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-48 h-48 flex flex-col items-center justify-center">
            <img src={Documents} alt="Mis documentos" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Mis documentos</p>
          </Link>
          <Link to="/calendar" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-48 h-48 flex flex-col items-center justify-center">
            <img src={Calendar} alt="Calendario" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Calendario</p>
          </Link>
          <Link to="/account" className="bg-blue-500 text-white p-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-48 h-48 flex flex-col items-center justify-center">
            <img src={Account} alt="Mi cuenta" className="mb-4 w-20 h-20" />
            <p className="text-center text-lg font-semibold">Mi cuenta</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
