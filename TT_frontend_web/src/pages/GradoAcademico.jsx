import React, { useState } from 'react';  
import { IoSchoolOutline, IoChevronDown} from "react-icons/io5";
import Navigation from './Navigation/Navigation'; 

export default function ProyeccionGrado() {
  const [grado, setGrado] = useState('');
  const [documentoRequerido, setDocumentoRequerido] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [fecha, setFecha] = useState('');

  const documentosPorGrado = {
    pasante: 'Copia cotejada del original de la carta de pasante o en su caso, del original de la boleta de calificaciones con el 100% de los créditos y de la constancia de realización de servicio social.',
    licenciatura: 'Copia cotejada del original del título de licenciatura o en su caso, del original del acta de examen profesional.',
    maestria: 'Copia cotejada del original del diploma de grado o en su caso, del original del acta de examen de grado.',
    doctorado: 'Copia cotejada del original del diploma de grado o en su caso, del original del acta de examen de grado.'
  };

  const gradoOptions = [
    { label: 'Pasantía de Licenciatura', value: 'pasante' },
    { label: 'Título de Licenciatura', value: 'licenciatura' },
    { label: 'Maestría', value: 'maestria' },
    { label: 'Doctorado', value: 'doctorado' },
  ];

  const onDateChange = (event) => {
    setFecha(event.target.value);
  };

  return (
    <div className="min-h-screen bg-cover bg-center">

      <Navigation />

      <hr className="border-t-2 border-black my-4" />

      {/* Contenido principal */}
      <div className="w-full max-w-2xl bg-gray-800 bg-opacity-40 rounded-lg shadow-lg p-8 mt-8 mx-auto mb-8"> 
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Obtención grado académico</h1>
          <IoSchoolOutline size={40} color="#fff" />
        </div>

        {/* Selector de Grado Académico */}
        <div className="mb-4">
          <label className="text-lg font-semibold text-white">Seleccione su grado académico obtenido</label>
          <button 
            className="w-full p-4 border border-gray-400 rounded-lg mt-2 flex justify-between items-center bg-white"
            onClick={() => setModalVisible(true)}
          >
            <span>{grado ? gradoOptions.find(option => option.value === grado)?.label : 'Seleccione grado'}</span>
            <IoChevronDown size={24} />
          </button>
        </div>

        {/* Seleccionamos el grado academico obtenido */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Seleccione su grado</h2>
              {gradoOptions.map((option) => (
                <div
                  key={option.value}
                  className="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setGrado(option.value);
                    setDocumentoRequerido(documentosPorGrado[option.value]); 
                    setModalVisible(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
              <button
                className="mt-4 w-full bg-gray-200 p-2 rounded-lg text-center"
                onClick={() => setModalVisible(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Muestra documento a presentar */}
        <div className="mb-4">
          <label className="text-lg font-semibold text-white">Documento a presentar</label>
          <div className="w-full p-4 border border-gray-400 rounded-lg mt-2 bg-white">
            {documentoRequerido || 'Seleccione un grado académico para ver el documento requerido.'}
          </div>
        </div>

        {/* Selector de Fecha */}
        <div className="mb-4">
          <label className="text-lg font-semibold text-white">Seleccione la fecha de obtención</label>
          <div className="w-full p-4 border border-gray-400 rounded-lg mr-2 bg-white">
            <input
              type="date"
              value={fecha}
              onChange={onDateChange}
              className="w-full bg-white"
            />
          </div>
        </div>

        {/* Botón de Agregar */}
        <button
          className="w-full bg-blue-800 text-white p-4 rounded-lg mt-8 hover:bg-blue-600 transition"
          onClick={() => console.log(`Nombre: ${nombre}, Grado: ${grado}, Fecha: ${fecha}`)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
