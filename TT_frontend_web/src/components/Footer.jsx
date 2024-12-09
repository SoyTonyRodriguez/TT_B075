import React from 'react';
import { Link } from 'react-router-dom';  

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-500 text-white w-full">
      <div className="relative w-full h-full overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-auto"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#005eac"
            d="M0,320L80,277.3C160,235,320,149,480,122.7C640,96,800,128,960,160C1120,192,1280,224,1360,240L1440,256V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"
          />
        </svg>
      </div>
      <div className="relative container mx-auto py-10 flex flex-col items-center w-5/6">
        <div className="flex flex-col md:flex-row justify-between items-center w-full text-center md:text-left">
          <p className="text-sm">
            Sitio web para apoyo a docentes del IPN en procesos de promoción académica
          </p>
          <div className="mt-4 md:mt-0 md:self-center flex items-center">
            <span className="text-sm">TT 2024-B075</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 w-full text-center">
          <p className="text-sm mb-2 md:mb-0">© 2024 Todos los derechos reservados</p>
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <a href="https://github.com/SoyTonyRodriguez/TT_B075.git" className="text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.309 3.438 9.795 8.207 11.384.6.11.823-.261.823-.578 0-.285-.01-1.043-.015-2.047-3.338.727-4.042-1.61-4.042-1.61C4.77 18.07 4 17.64 4 17.64c-1.09-.745.082-.73.082-.73 1.206.085 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.304 3.493.997.108-.774.419-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.926 0-1.31.468-2.382 1.236-3.22-.124-.303-.536-1.527.117-3.18 0 0 1.01-.324 3.304 1.233.958-.266 1.985-.399 3.006-.404 1.02.005 2.048.138 3.006.404 2.293-1.557 3.303-1.233 3.303-1.233.654 1.653.243 2.877.119 3.18.77.838 1.236 1.91 1.236 3.22 0 4.604-2.804 5.617-5.475 5.912.431.371.816 1.102.816 2.22 0 1.604-.015 2.896-.015 3.292 0 .32.222.694.826.576C20.565 21.793 24 17.308 24 12 24 5.373 18.627 0 12 0z" />
              </svg>
            </a>
          </div>
          <Link to="/privacidad" className="hover:underline text-white">
            Privacidad y seguridad
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
