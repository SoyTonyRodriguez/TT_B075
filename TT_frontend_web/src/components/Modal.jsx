import React from 'react';

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg">
        <button onClick={onClose} className="text-red-500 hover:text-red-700">Cerrar</button>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
