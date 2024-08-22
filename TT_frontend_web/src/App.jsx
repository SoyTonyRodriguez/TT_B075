import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import MainContent from "./pages/Main";
import ConocerMas from './pages/ConocerMas'; 
import Nosotros from './pages/Nosotros'; 
import Login from "./pages/Login";
import Registro from './pages/Registro'; 
import HomeScreen from './pages/HomeScreen';
import Projection from './pages/Projection';
import NewProjection from "./pages/NewProjection";
import UnidadesPromocion from './pages/UnidadesPromocion';
import Links from './pages/Links';
import Documents from './pages/Documents';
import Calendar from './pages/Calendar';
import Account from './pages/Account';
import Footer from "./components/Footer";
import fondo from './img/BackImage.png';

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      <Routes>
        // Redirigiendo la pagina principal(/) a /welcome con Navigate
        <Route path='/' element={<Navigate to="/welcome" />} />

        // Asignando que paginas mostrar cuando se visite cierta url
        <Route path='/welcome' element={<MainContent className="flex-grow" />} />
        <Route path='/ConocerMas' element={<ConocerMas />} />
        <Route path='/Nosotros' element={<Nosotros />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Registro" element={<Registro/>} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/projection" element={<Projection />} />
        <Route path="/links" element={<Links />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/account" element={<Account />} />
        <Route path="/new-projection" element={<NewProjection />} />
        <Route path="/unidades-promocion" element={<UnidadesPromocion />} />

      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
