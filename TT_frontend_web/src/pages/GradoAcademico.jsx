import React, { useState, useEffect } from 'react';  
import { IoSchoolOutline, IoChevronDown} from "react-icons/io5";
import Navigation from './Navigation/Navigation'; 
import LoadingAnimation from "../components/LoadingAnimation";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { createProduct } from '../api/products.api';

export default function ProyeccionGrado() {
  const navigate = useNavigate();

  const [grado, setGrado] = useState('');
  const [documentoRequerido, setDocumentoRequerido] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [gradoError, setGradoError] = useState(false);
  const [projection_id, setProjectionId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const documentosPorGrado = {
    pasante: 'Copia cotejada del original de la carta de pasante o en su caso, del original de la boleta de calificaciones con el 100% de los créditos. \nConstancia de realización de servicio social.',
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

  useEffect(() => {
    // Verify if the userName is stored in the localStorage
    const storedAccountData = localStorage.getItem('accountDetails');

    // If the account is stored, set data and skip loading animation
    if (storedAccountData) {
      const { projection_id } = JSON.parse(storedAccountData);
      setProjectionId(projection_id);
    } else {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.user_id);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    if (!grado) {
      setGradoError(true);
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const documentsList = documentoRequerido.split('\n').map(doc => doc.trim()).filter(doc => doc);
    const documentsCount = documentsList.length;

    // Preparar los datos para la proyección
    const projectionData = {
      function: grado,
      activity: grado,
      role: '',
      scope: '',
      documents_required: documentoRequerido,
      documents_number: documentsCount,
      units: 100,
      tasks,
      projection_id,
      documents_uploaded: [],
      type: "Grado Académico"
    };
    console.log(projectionData);

    try {
      setLoading(true);
      await createProduct(projectionData);
      toast.success('Producto creado exitosamente');
      navigate('/KanbanBoard');
    } catch (error) {
      toast.error('Error al crear el producto');
      console.log('Error al crear el producto:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

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
            <span>{grado || 'Seleccione grado'}</span>
            <IoChevronDown size={24} />
          </button>
          {gradoError && <span className="text-red-500">Por favor, seleccione un grado académico.</span>}
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
                    setGrado(option.label);  // Guardar el label en lugar del value
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
                <label className="block text-white text-sm font-semibold mb-2">Documento(s) requeridos</label>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-lg">
                  <ul className="list-disc pl-6 text-gray-800">
                    {documentoRequerido.split('\n').map((doc, index) => (
                      <li key={index} className="mb-2">
                        {doc.trim() || 'Seleccione un grado académico para ver el documento requerido.'}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

        {/* Botón de Agregar */}
        <button
          className="w-full bg-blue-800 text-white p-4 rounded-lg mt-8 hover:bg-blue-600 transition"
          onClick={handleSubmit}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
