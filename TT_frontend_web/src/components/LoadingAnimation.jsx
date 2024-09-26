// src/components/LoadingAnimation.jsx
import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-between bg-black bg-opacity-40 p-6 rounded-lg shadow-lg">
        <div className="flex-1 mr-4 min-h-screen flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-36 w-36 border-t-8 border-b-8 border-blue-500"></div>
                <p className="text-white leading-relaxed text-center justify-center text-3xl font-semibold mt-4 animate-pulse">
                  Cargando, por favor espera...</p>
            </div>
    </div>
  );
};

export default LoadingAnimation;
