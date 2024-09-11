import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const CrearProyeccionScreen = () => {
  const [prioridad, setPrioridad] = useState('');
  const [fechaProyectada, setFechaProyectada] = useState('');
  const [funcion, setFuncion] = useState('');
  const [rolParticipacion, setRolParticipacion] = useState('');
  const [alcance, setAlcance] = useState('');
  const [actividad, setActividad] = useState('');
  const [documentoRequerido, setDocumentoRequerido] = useState('');
  const [up, setUp] = useState('');

  // Opciones de actividades por función con documentos requeridos y U.P
  const actividadesPorFuncion = {
    docencia: [
      { actividad: "Carga académica", documento: "Registro Único de Actividades Académicas (RUAA) o constancia de carga académica suscrita por las autoridades competentes.", up: 1.25 },
      { actividad: "Elaboración e Impartición de acciones de formación", documento: "Constancia emitida por la DEMS, DES, SIP o CGFIE.", up: 4.5 },
      { actividad: "Programa de inducción", documento: "Constancia de validación emitida por la DEMS, DES o SIP.", up: 5 },
      { actividad: "Tutorías", documento: "Constancia emitida por la CITP.", up: 5 },
      { actividad: "Diseño y planeación didáctica en el aula", documento: "Constancia emitida por la DEMS, DES o SIP.", up: 20 },
      { actividad: "Elaboración de material didáctico", documento: "Constancia emitida por el presidente de la academia.", up: 25 },
      { actividad: "Autoría de libros", documento: "Constancia emitida por la DEMS, DES o SIP.", up: 6 },
      { actividad: "Elaboración de software educativo", documento: "Constancia emitida por la DEMS, DES o SIP.", up: 5 },
      { actividad: "Producción de Unidades de Aprendizaje en línea", documento: "Constancia emitida por la UPEV.", up: 0 }
    ],
    investigacion: [
      { actividad: "Proyectos de investigación con financiamiento interno", documento: "Constancia emitida por la SIP.", up: 50.00 },
      { actividad: "Proyectos vinculados con financiamiento externo", documento: "Contrato o convenio, carta de aceptación del informe final.", up: 25.00 },
      { actividad: "Publicación de artículos científicos", documento: "Constancia emitida por la SIP.", up: 20.00 },
      { actividad: "Estancias de Investigación", documento: "Oficio de aceptación para realizar la estancia.", up: 15.00 },
      { actividad: "Desarrollo de patentes", documento: "Solicitud de registro, título de la patente.", up: 80.00 }
    ],
    superacion: [
      { actividad: "Otra licenciatura", documento: "Constancia emitida por la DES.", up: 60.00 },
      { actividad: "Cursos de actualización, seminarios y talleres", documento: "Constancia emitida por DEMS, DES o SIP.", up: 8.00 },
      { actividad: "Estudios de especialidad, maestría y doctorado", documento: "Constancia emitida por la SIP.", up: 108.50 },
      { actividad: "Cursos de propósito específico", documento: "Constancia emitida por la SIP.", up: 30.00 },
      { actividad: "Diplomados", documento: "Constancia emitida por la DEMS, DES o SIP.", up: 40.00 },
      { actividad: "Idiomas", documento: "Constancia emitida por la Dirección de Formación en Lenguas Extranjeras.", up: 8.00 }
    ],
    complementarias: [
      { actividad: "Distinciones académicas", documento: "Constancia emitida por la SIP.", up: 0 },
      { actividad: "Actividades académico-administrativas", documento: "Constancia u oficio de designación.", up: 0 },
      { actividad: "Dirección o asesoría de trabajos escritos", documento: "Oficio o constancia de designación.", up: 20 },
      { actividad: "Jurado de examen profesional", documento: "Acta de examen profesional.", up: 20 },
      { actividad: "Experiencia profesional relevante", documento: "Constancia del trabajo.", up: 20 },
      { actividad: "Traducciones", documento: "Oficio de reconocimiento emitido por la academia.", up: 30 },
      { actividad: "Eventos nacionales e internacionales", documento: "Constancia emitida por la Subdirección Académica.", up: 12 },
      { actividad: "Evaluación de prácticas escolares", documento: "Constancia emitida por el Departamento de Extensión y Apoyos Educativos.", up: 6.00}
    ],
    extension: [
      { actividad: "Participación en la expoprofesiográfica", documento: "Constancia emitida por la Secretaría Académica.", up: 3.00 },
      { actividad: "Encuentros Académicos Interpolitécnicos", documento: "Constancia emitida por la unidad académica.", up: 8.00 },
      { actividad: "Brigadas multidisciplinarias de servicio social", documento: "Constancia emitida por la Dirección de Egresados.", up: 8.00 },
      { actividad: "Impartición de disciplinas deportivas", documento: "Constancia emitida por la autoridad competente.", up: 0.50 }
    ],
  };

  const handleFuncionChange = (value) => {
    setFuncion(value);
    setActividad('');
    setDocumentoRequerido('');
    setUp('');
  };

  const handleActividadChange = (value) => {
    setActividad(value);
    const actividadInfo = actividadesPorFuncion[funcion].find(item => item.actividad === value);
    if (actividadInfo) {
      setDocumentoRequerido(actividadInfo.documento);
      setUp(actividadInfo.up.toString());
    } else {
      setDocumentoRequerido('');
      setUp('');
    }
  };

  const getColorForPriority = (priority) => {
    switch (priority) {
      case 'Baja':
        return styles.priorityLow;
      case 'Media':
        return styles.priorityMedium;
      case 'Alta':
        return styles.priorityHigh;
      default:
        return styles.priorityDefault;
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')} // Ruta de la imagen de fondo
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título */}
        <Text style={styles.title}>Crear Proyección</Text>

        {/* Función */}
        <Text style={styles.label}>Función</Text>
        <Picker
          selectedValue={funcion}
          style={styles.input}
          onValueChange={handleFuncionChange}
          enabled={!!funcion} 
        >
          <Picker.Item label="Selecciona una función" value="" />
          <Picker.Item label="Docencia" value="docencia" />
          <Picker.Item label="Investigación" value="investigacion" />
          <Picker.Item label="Superación académica" value="superacion" />
          <Picker.Item label="Complementarias" value="complementarias" />
          <Picker.Item label="Extensión" value="extension" />
        </Picker>

        {/* Actividad */}
        <Text style={styles.label}>Actividad</Text>
        <Picker
          selectedValue={actividad}
          style={styles.input}
          onValueChange={handleActividadChange}
          enabled={!!funcion}
        >
          <Picker.Item label="Selecciona una actividad" value="" />
          {funcion && actividadesPorFuncion[funcion].map((item, index) => (
            <Picker.Item key={index} label={item.actividad} value={item.actividad} />
          ))}
        </Picker>

        {/* Fecha Proyectada */}
        <Text style={styles.label}>Fecha Proyectada de Inicio</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={fechaProyectada}
          onChangeText={setFechaProyectada}
        />

        {/* Rol de Participación */}
        <Text style={styles.label}>Rol de Participación</Text>
        <Picker
          selectedValue={rolParticipacion}
          style={styles.input}
          onValueChange={(value) => setRolParticipacion(value)}
        >
          <Picker.Item label="Selecciona un rol" value="" />
          <Picker.Item label="Expositor" value="expositor" />
          <Picker.Item label="Asistente" value="asistente" />
          <Picker.Item label="Organizador" value="organizador" />
        </Picker>

        {/* Alcance */}
        <Text style={styles.label}>Alcance</Text>
        <Picker
          selectedValue={alcance}
          style={styles.input}
          onValueChange={(value) => setAlcance(value)}
        >
          <Picker.Item label="Selecciona el alcance" value="" />
          <Picker.Item label="Nacional" value="nacional" />
          <Picker.Item label="Internacional" value="internacional" />
        </Picker>

        {/* Documento Requerido */}
        {documentoRequerido ? (
          <View style={styles.documentContainer}>
            <Text style={styles.label}>Documento Requerido</Text>
            <Text style={styles.documentText}>{documentoRequerido}</Text>
          </View>
        ) : null}

        {/* U.P. Aproximadas */}
        {up ? (
          <View style={styles.upContainer}>
            <Text style={styles.label}>U.P. Aproximadas</Text>
            <TextInput style={styles.input} value={up} editable={false} />
          </View>
        ) : null}

        {/* Prioridad */}
        <Text style={styles.label}>Prioridad</Text>
        <TouchableOpacity style={[styles.priorityButton, getColorForPriority(prioridad)]}>
          <Text style={styles.priorityText}>{prioridad || "Selecciona prioridad"}</Text>
          <Ionicons name="chevron-down-outline" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Botón Agregar */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  documentContainer: {
    marginBottom: 15,
  },
  documentText: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  upContainer: {
    marginBottom: 15,
  },
  priorityButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priorityLow: {
    backgroundColor: '#2196F3',
  },
  priorityMedium: {
    backgroundColor: '#FFEB3B',
  },
  priorityHigh: {
    backgroundColor: '#F44336',
  },
  priorityDefault: {
    backgroundColor: '#D3D3D3',
  },
  addButton: {
    backgroundColor: '#0288d1',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CrearProyeccionScreen;
