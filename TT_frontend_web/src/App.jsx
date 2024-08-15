import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import MainContent from "./pages/Main";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Registro from './pages/Registro'; 

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-400 to-purple-600">
      <Header />
      <Routes>
        // Redirigiendo la pagina principar(/) a /welcome con Navigate
        <Route path='/' element={<Navigate to="/welcome" />} />

        // Asignando que paginas mostrar cuando se visite cierta url
        <Route path='/welcome' element={<MainContent className="flex-grow" />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Registro" element={<Registro />} />

      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
