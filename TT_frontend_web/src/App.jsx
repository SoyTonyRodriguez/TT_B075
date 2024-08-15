import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import MainContent from "./pages/Main";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainContent className="flex-grow" />
      <Footer />
      <Routes>
      <Route path="/Login" element={<Login/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
