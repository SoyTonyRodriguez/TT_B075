import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logoescom.png";


function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-950 via-sky-700  to-sky-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center w-5/6 mx-auto">
        <div className="text-3xl font-bold">
          <img className="py-1 w-40 h-25 inline-block" src={logo} alt="logo" />
        </div>
        <nav className="space-x-8">
          {/* Link to para enlazar con Route */}
          <Link to='/welcome' className="hover:underline">
            Inicio
          </Link>
          <Link to='/ConocerMas' className="hover:underline">
            Conocer más
          </Link>
          <Link to='/Nosotros' className="hover:underline">
            Nosotros
          </Link>
        </nav>
        <Link to= "/Login" className="bg-black px-4 py-2 rounded-3xl hover:bg-gray-800">
          Iniciar Sesión
        </Link>
      </div>
      <div className="mx-auto container justify-between items-center bg-white h-0.5"></div>
      {/* White underline */}
    </header>
  );
}

export default Header;
