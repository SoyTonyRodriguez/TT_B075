import React from 'react';

const LoadingSpinner = ({ message = "Guardando los cambios..." }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-36 w-36 border-t-8 border-b-8 border-blue-500"></div>
                <p className="text-white text-3xl font-semibold mt-4 animate-pulse text-center">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;