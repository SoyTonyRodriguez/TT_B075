import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import MainContent from "./pages/Main";
import ConocerMas from './pages/ConocerMas'; 
import Nosotros from './pages/Nosotros'; 
import Login from "./pages/Login";
import Registro from './pages/Registro'; 
import RecuperarCuenta from './pages/RecuperarCuenta';
import HomeScreen from './pages/HomeScreen';
import Projection from './pages/Projection';
import KanbanBoard from './pages/KanbanBoard';
import NewProjection from "./pages/NewProjection";
import UnidadesPromocion from './pages/UnidadesPromocion';
import GradoAcademico from './pages/GradoAcademico';
import Links from './pages/Links';
import Documents from './pages/Documents';
import Calendar from './pages/Calendar';
import Account from './pages/Account';
import Guia from './pages/Guia';
import Convocatoria from "./pages/Convocatoria";
import InfoProjection from './pages/InfoProjection';
import Privacidad from './pages/PrivacyScreen';
import Footer from "./components/Footer";
import fondo from './img/BackImage.png';
import ProjectionFirstTime from './pages/Projection_FirstTime';
import CategoryLimits from './pages/CategoryLimits'
import UP_Check from "./pages/UP_Check";
import { Toaster } from "react-hot-toast";

import ExternalRedirect from './components/ExternalRedirect';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
      }}
    >
      <Header />
      <Routes>
        {/* Redirigiendo la pagina principal(/) a /welcome con Navigate */}
        <Route path='/' element={<Navigate to="/welcome" />} />
        <Route path="/admin" element={<ExternalRedirect url="https://tt-b075.onrender.com/admin/" />} />

        {/* Asignando qué páginas mostrar cuando se visite cierta URL */}
        <Route path='/welcome' element={<MainContent className="flex-grow" />} />
        <Route path='/ConocerMas' element={<ConocerMas />} />
        <Route path='/Nosotros' element={<Nosotros />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Registro" element={<Registro/>} />
        <Route path="/RecuperarCuenta" element={<RecuperarCuenta/>} />
        <Route path="/privacidad" element={<Privacidad/>} />

        {/* ProtectedRoute pages, only accessible when logged in */}
        <Route path="/home" element={<ProtectedRoute component={HomeScreen} />} />
        <Route path="/projection" element={<ProtectedRoute component={Projection} />} />
        <Route path="/links" element={<ProtectedRoute component={Links} />} />
        <Route path="/documents" element={<ProtectedRoute component={Documents} />} />
        <Route path="/calendar" element={<ProtectedRoute component={Calendar} />} />
        <Route path="/account" element={<ProtectedRoute component={Account} />} />
        <Route path="/new-projection" element={<ProtectedRoute component={NewProjection} />} />
        <Route path="/unidades-promocion" element={<ProtectedRoute component={UnidadesPromocion} />} />
        <Route path="/promocion-grado" element={<ProtectedRoute component={GradoAcademico} />} />
        <Route path="/Convocatoria" element={<ProtectedRoute component={Convocatoria} />} />
        <Route path="/Guia" element={<ProtectedRoute component={Guia} />} />
        <Route path="/KanbanBoard" element={<ProtectedRoute component={KanbanBoard} />} />
        <Route path="/InfoProjection" element={<ProtectedRoute component={InfoProjection} />} />
        <Route path="/Projection-first" element={<ProtectedRoute component={ProjectionFirstTime} />} />
        <Route path="/CategoryLimits" element={<ProtectedRoute component= {CategoryLimits}/>} />
        <Route path="/unidades" element={<ProtectedRoute component={UP_Check} />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
    </BrowserRouter>
  );
}

export default App;
