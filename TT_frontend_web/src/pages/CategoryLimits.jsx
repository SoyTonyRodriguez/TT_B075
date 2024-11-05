import React, { useState } from 'react';
import Navigation from './Navigation/Navigation';

const data = [
  {
    categoria: 'Técnico Doc. Auxiliar "A", "B", "C"',
    cargaAcademica: {
      medioTiempo: { horas: '10 a 12', up: '25 - 30' },
      tresCuartosTiempo: { horas: '12 a 20', up: '30 - 50' },
      tiempoCompleto: { horas: '12 a 22', up: '30 – 55' }
    },
    otrasActividades: { min: 10, max: 70 },
    investigacion: 'EXENTO',
    superacionAcademica: { min: 10, max: 88.5 },
    actividadesComplementarias: { min: 0, max: 60 },
    actividadesExtension: { min: 0, max: 10 },
    totalRequerido: 100
  },
  {
    categoria: 'Técnico Doc. Asociado "A", "B", "C"',
    cargaAcademica: {
      medioTiempo: { horas: '9 a 12', up: '22.5 - 30' },
      tresCuartosTiempo: { horas: '9 a 14', up: '22.5 - 35' },
      tiempoCompleto: { horas: '9 a 18', up: '22.5 – 45' }
    },
    otrasActividades: { min: 10, max: 70 },
    investigacion: 'EXENTO',
    superacionAcademica: { min: 20, max: 88.5 },
    actividadesComplementarias: { min: 0, max: 60 },
    actividadesExtension: { min: 0, max: 10 },
    totalRequerido: 100
  },
  {
    categoria: 'Técnico Doc. Titular "A"',
    cargaAcademica: {
      medioTiempo: { horas: '6 a 10', up: '15 - 25' },
      tresCuartosTiempo: { horas: '6 a 14', up: '15 - 35' },
      tiempoCompleto: { horas: '6 a 12', up: '15 – 30' }
    },
    otrasActividades: { min: 10, max: 70 },
    investigacion: '25 -------------------------- 88.5',
    superacionAcademica: { min: 25, max: 88.5 },
    actividadesComplementarias: { min: 0, max: 60 },
    actividadesExtension: { min: 0, max: 10 },
    totalRequerido: 100
  },
  {
    categoria: 'Profesor Asistente "A", "B", "C"',
    cargaAcademica: {
      medioTiempo: { horas: '10 a 12', up: '25 - 30' },
      tresCuartosTiempo: { horas: '12 a 20', up: '30 - 50' },
      tiempoCompleto: { horas: '12 a 22', up: '30 – 55' }
    },
    otrasActividades: { min: 10, max: 70 },
    investigacion: 'EXENTO',
    superacionAcademica: { min: 20, max: 88.5 },
    actividadesComplementarias: { min: 0, max: 60 },
    actividadesExtension: { min: 0, max: 10 },
    totalRequerido: 100
  },
  {
    categoria: 'Profesor Asociado "A", "B", "C"',
    cargaAcademica: {
      medioTiempo: { horas: '9 a 12', up: '22.5 - 30' },
      tresCuartosTiempo: { horas: '9 a 14', up: '22.5 - 35' },
      tiempoCompleto: { horas: '9 a 18', up: '22.5 – 45' }
    },
    otrasActividades: { min: 10, max: 70 },
    investigacion: '25 -------------------------- 88.5',
    superacionAcademica: { min: 25, max: 88.5 },
    actividadesComplementarias: { min: 0, max: 60 },
    actividadesExtension: { min: 0, max: 10 },
    totalRequerido: 100
  },
  {
    categoria: 'Profesor Titular "A", "B"',
    cargaAcademica: {
      medioTiempo: { horas: '6 a 10', up: '15 - 25' },
      tresCuartosTiempo: { horas: '6 a 14', up: '15 - 35' },
      tiempoCompleto: { horas: '6 a 12', up: '15 – 30' }
    },
    otrasActividades: { min: 10, max: 70 },
    investigacion: '25 -------------------------- 88.5',
    superacionAcademica: { min: 25, max: 88.5 },
    actividadesComplementarias: { min: 0, max: 60 },
    actividadesExtension: { min: 0, max: 10 },
    totalRequerido: 100
  },
  {
    categoria: 'Profesor Asignatura "A"',
    cargaAcademica: {
      medioTiempo: 'CUBRIR LA CARGA ACADÉMICA ASOCIADA A SU NOMBRAMIENTO',
      tresCuartosTiempo: 'CUBRIR LA CARGA ACADÉMICA ASOCIADA A SU NOMBRAMIENTO',
      tiempoCompleto: 'CUBRIR LA CARGA ACADÉMICA ASOCIADA A SU NOMBRAMIENTO'
    },
    otrasActividades: { min: 10, max: 70 },
    investigacion: '0 -------------------------- 88.5',
    superacionAcademica: { min: 0, max: 88.5 },
    actividadesComplementarias: { min: 0, max: 60 },
    actividadesExtension: { min: 0, max: 10 },
    totalRequerido: 100
  },
  {
    categoria: 'Técnico Doc. Asignatura "A" y "B"',
    cargaAcademica: {
      medioTiempo: 'CUBRIR LA CARGA ACADÉMICA ASOCIADA A SU NOMBRAMIENTO',
      tresCuartosTiempo: 'CUBRIR LA CARGA ACADÉMICA ASOCIADA A SU NOMBRAMIENTO',
      tiempoCompleto: 'CUBRIR LA CARGA ACADÉMICA ASOCIADA A SU NOMBRAMIENTO'
    },
    otrasActividades: { min: 10, max: 70 },
    investigacion: '0 -------------------------- 88.5',
    superacionAcademica: { min: 0, max: 88.5 },
    actividadesComplementarias: { min: 0, max: 60 },
    actividadesExtension: { min: 0, max: 10 },
    totalRequerido: 100
  }
];

const Categorias = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(data[0]);

  const handleCategoriaChange = (e) => {
    const categoria = data.find((item) => item.categoria === e.target.value);
    setCategoriaSeleccionada(categoria);
  };

   // Verifica si la carga académica es un texto en lugar de un objeto
  const renderCargaAcademica = (carga) => {
    if (typeof carga === 'string') {
      return <p>{carga}</p>;
    }
    return (
      <>
        <p>Horas: {carga.horas}</p>
        <p>U.P.: {carga.up}</p>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-between">
      <Navigation />

      <hr className="border-t-2 border-black my-4" />

      <div className="container mx-auto mt-8 mb-8">
        <label className="block text-black text-lg font-bold mb-2">
          Selecciona una categoría:
        </label>
        <select
          onChange={handleCategoriaChange}
          className="w-full p-2 border rounded-lg"
          value={categoriaSeleccionada.categoria}
        >
          {data.map((item, index) => (
            <option key={index} value={item.categoria}>
              {item.categoria}
            </option>
          ))}
        </select>

        <div className="mt-8 bg-gray-800 bg-opacity-40 shadow-lg rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">{categoriaSeleccionada.categoria}</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Carga Académica (½ Tiempo):</h3>
              {renderCargaAcademica(categoriaSeleccionada.cargaAcademica.medioTiempo)}
            </div>
            <div>
              <h3 className="font-semibold">Carga Académica (¾ Tiempo):</h3>
              {renderCargaAcademica(categoriaSeleccionada.cargaAcademica.tresCuartosTiempo)}
            </div>
            <div>
              <h3 className="font-semibold">Carga Académica (Tiempo Completo):</h3>
              {renderCargaAcademica(categoriaSeleccionada.cargaAcademica.tiempoCompleto)}
            </div>
            <div>
              <h3 className="font-semibold">Otras Actividades:</h3>
              <p>Mín: {categoriaSeleccionada.otrasActividades.min}</p>
              <p>Máx: {categoriaSeleccionada.otrasActividades.max}</p>
            </div>
            <div>
              <h3 className="font-semibold">Investigación:</h3>
              <p>{categoriaSeleccionada.investigacion}</p>
            </div>
            <div>
              <h3 className="font-semibold">Superación Académica:</h3>
              <p>Mín: {categoriaSeleccionada.superacionAcademica.min}</p>
              <p>Máx: {categoriaSeleccionada.superacionAcademica.max}</p>
            </div>
            <div>
              <h3 className="font-semibold">Actividades Complementarias:</h3>
              <p>Mín: {categoriaSeleccionada.actividadesComplementarias.min}</p>
              <p>Máx: {categoriaSeleccionada.actividadesComplementarias.max}</p>
            </div>
            <div>
              <h3 className="font-semibold">Actividades de Extensión:</h3>
              <p>Mín: {categoriaSeleccionada.actividadesExtension.min}</p>
              <p>Máx: {categoriaSeleccionada.actividadesExtension.max}</p>
            </div>
            <div>
              <h3 className="font-semibold">Total Requerido para la Promoción:</h3>
              <p>{categoriaSeleccionada.totalRequerido}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorias;