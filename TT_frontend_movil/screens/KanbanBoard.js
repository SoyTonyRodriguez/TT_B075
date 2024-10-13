import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, TextInput, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Toast from 'react-native-toast-message'; 

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [projections, setProjections] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', end_date: '', priority: 'Media', projection_id: '' });
  const [showTodo, setShowTodo] = useState(false);
  const [showInProcess, setShowInProcess] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);  // Carga para el spinner
  const [showPriorityModal, setShowPriorityModal] = useState(false);

  const handleTaskChange = (name, value) => {
    setNewTask({ ...newTask, [name]: value });
  };

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para crear nueva tarea
  const handleCreateTask = () => {
    if (!newTask.title || !newTask.description || !newTask.end_date || !newTask.projection_id) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor, llena todos los campos',
      });
      return;
    }

    // Agregar la nueva tarea al estado de tareas
    setTasks([...tasks, { ...newTask, id: Date.now(), status: 'todo' }]);

    // Limpiar el formulario
    setNewTask({ title: '', description: '', end_date: '', priority: 'Media', projection_id: '' });

    // Cerrar el modal
    closeModal();

    Toast.show({
      type: 'success',
      text1: 'Tarea creada',
      text2: 'La tarea ha sido creada exitosamente.',
    });
  };

  const priorities = ['Alta', 'Media', 'Baja'];

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}  // Fondo restaurado
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Mi proyección</Text>
        <Ionicons name="glasses-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      <ScrollView style={tw`p-5`}>
        {/* Mostrar loader si está cargando */}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {/* Sección To-Do */}
        <TouchableOpacity onPress={() => setShowTodo(!showTodo)}>
          <View style={tw`bg-yellow-200 p-4 rounded-xl`}>
            <Text style={tw`text-lg font-semibold text-black`}>TO-DO</Text>
          </View>
        </TouchableOpacity>
        {showTodo && (
          <View style={tw`bg-white p-4 rounded-xl mt-2`}>
            {tasks.filter(task => task.status === 'todo').map(task => (
              <Text key={task.id} style={tw`text-gray-600`}>{task.title}</Text>
            ))}
          </View>
        )}

        {/* Sección In-Progress */}
        <TouchableOpacity onPress={() => setShowInProcess(!showInProcess)}>
          <View style={tw`bg-blue-200 p-4 mt-5 rounded-xl`}>
            <Text style={tw`text-lg font-semibold text-black`}>IN PROGRESS</Text>
          </View>
        </TouchableOpacity>
        {showInProcess && (
          <View style={tw`bg-white p-4 rounded-xl mt-2`}>
            {tasks.filter(task => task.status === 'in-progress').map(task => (
              <Text key={task.id} style={tw`text-gray-600`}>{task.title}</Text>
            ))}
          </View>
        )}

        {/* Sección Done */}
        <TouchableOpacity onPress={() => setShowDone(!showDone)}>
          <View style={tw`bg-green-200 p-4 mt-5 rounded-xl`}>
            <Text style={tw`text-lg font-semibold text-black`}>DONE</Text>
          </View>
        </TouchableOpacity>
        {showDone && (
          <View style={tw`bg-white p-4 rounded-xl mt-2`}>
            {tasks.filter(task => task.status === 'done').map(task => (
              <Text key={task.id} style={tw`text-gray-600`}>{task.title}</Text>
            ))}
          </View>
        )}

        {/* Botón para crear nueva tarea */}
        <TouchableOpacity
          onPress={openModal}
          style={tw`bg-blue-500 text-white px-4 py-2 rounded-lg mt-8`}
        >
          <Text style={tw`text-center text-white font-semibold`}>Crear Nueva Tarea</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para crear tarea */}
      {isModalOpen && (
        <Modal
          transparent={true}
          visible={isModalOpen}
          onRequestClose={closeModal}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-8 rounded-lg shadow-xl w-96`}>
              <Text style={tw`text-3xl font-bold mb-6 text-center text-gray-800`}>Crear Nueva Tarea</Text>

              {/* Campo del título */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Título de la tarea</Text>
              <TextInput
                placeholder="Escribe el título"
                value={newTask.title}
                onChangeText={(text) => handleTaskChange('title', text)}
                style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white`}
                placeholderTextColor="#999"
              />

              {/* Campo de la descripción */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Descripción</Text>
              <TextInput
                placeholder="Escribe la descripción"
                value={newTask.description}
                onChangeText={(text) => handleTaskChange('description', text)}
                style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white`}
                placeholderTextColor="#999"
              />

              {/* Campo de fecha de vencimiento */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Fecha de Vencimiento</Text>
              <TextInput
                placeholder="dd/mm/aaaa"
                value={newTask.end_date}
                onChangeText={(text) => handleTaskChange('end_date', text)}
                style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white`}
                placeholderTextColor="#999"
              />

              {/* Selector de prioridad */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Prioridad</Text>
              <TouchableOpacity
                onPress={() => setShowPriorityModal(true)}
                style={tw`border border-gray-300 px-4 py-3 rounded-lg mb-4 bg-white`}
              >
                <Text style={tw`text-gray-800 text-lg`}>{newTask.priority}</Text>
              </TouchableOpacity>

              {/* Selector de proyección (sin funcionalidad por ahora) */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Proyección</Text>
              <TouchableOpacity
                style={tw`border border-gray-300 px-4 py-3 rounded-lg mb-4 bg-white`}
                disabled={true}
              >
                <Text style={tw`text-gray-500 text-lg`}>Selecciona una proyección (no disponible)</Text>
              </TouchableOpacity>

              {/* Botones para cancelar o crear */}
              <View style={tw`flex-row justify-between mt-6`}>
                <TouchableOpacity
                  onPress={closeModal}
                  style={tw`bg-gray-500 px-4 py-2 rounded-lg shadow-lg`}
                >
                  <Text style={tw`text-white font-semibold`}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCreateTask}
                  style={tw`bg-green-500 px-4 py-2 rounded-lg shadow-lg`}
                >
                  <Text style={tw`text-white font-semibold`}>Crear</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal de selección de prioridad */}
      {showPriorityModal && (
        <Modal
          transparent={true}
          visible={showPriorityModal}
          onRequestClose={() => setShowPriorityModal(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-4 rounded-lg w-80`}>
              <Text style={tw`text-lg font-semibold mb-4`}>Selecciona la prioridad</Text>
              {priorities.map((priority, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleTaskChange('priority', priority);
                    setShowPriorityModal(false);
                  }}
                  style={tw`py-2`}
                >
                  <Text style={tw`text-gray-800 text-center`}>{priority}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      )}

      {/* Toast container */}
      <Toast />
    </ImageBackground>
  );
};

export default KanbanBoard;
