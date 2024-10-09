import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, TextInput, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message'; 
import { createTask, getTasks, updateTask, deleteTask } from "../api/tasks.api";  
import { getProjection, updateProjection } from '../api/projections.api';  

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [projections, setProjections] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', end_date: '', priority: 'Media', projection_id: '' });
  const [showTodo, setShowTodo] = useState(false);
  const [showInProcess, setShowInProcess] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);  // Carga para el spinner

  useEffect(() => {
    fetchTasks();
    fetchProjections();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasks();  // API para obtener tareas
      setTasks(fetchedTasks);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error al obtener tareas', text2: error.message });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjections = async () => {
    setLoading(true);
    try {
      const fetchedProjections = await getProjection();  // API para obtener proyecciones
      setProjections(fetchedProjections);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error al obtener proyecciones', text2: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    setLoading(true);
    try {
      await createTask(newTask);  // API para crear tarea
      fetchTasks();
      setIsModalOpen(false);
      Toast.show({ type: 'success', text1: 'Tarea creada con éxito' });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error al crear tarea', text2: error.message });
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={tw`text-center text-white`}>Crear Nueva Tarea</Text>
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
              <Text style={tw`text-2xl font-bold mb-6 text-center text-gray-800`}>Crear Nueva Tarea</Text>

              {/* Campo del título */}
              <TextInput
                placeholder="Título de la tarea"
                value={newTask.title}
                onChangeText={(text) => handleTaskChange('title', text)}
                style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4`}
              />

              {/* Campo de la descripción */}
              <TextInput
                placeholder="Descripción"
                value={newTask.description}
                onChangeText={(text) => handleTaskChange('description', text)}
                style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4`}
              />

              {/* Campo de fecha de vencimiento */}
              <TextInput
                placeholder="Fecha de Vencimiento"
                value={newTask.end_date}
                onChangeText={(text) => handleTaskChange('end_date', text)}
                style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4`}
              />

              {/* Selector de prioridad */}
              <Picker
                selectedValue={newTask.priority}
                onValueChange={(itemValue) => handleTaskChange('priority', itemValue)}
                style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4`}
              >
                <Picker.Item label="Alta" value="Alta" />
                <Picker.Item label="Media" value="Media" />
                <Picker.Item label="Baja" value="Baja" />
              </Picker>

              {/* Selector de proyección */}
              <Picker
                selectedValue={newTask.projection_id}
                onValueChange={(itemValue) => handleTaskChange('projection_id', itemValue)}
                style={tw`border border-gray-300 rounded-lg px-4 py-2 mb-4`}
              >
                <Picker.Item label="Selecciona una proyección" value="" />
                {projections.map((projection) => (
                  <Picker.Item key={projection.id} label={projection.activity} value={projection.id} />
                ))}
              </Picker>

            {/* Botones para cancelar o crear */}
            <View style={tw`flex-row justify-between mt-4`}>
              <TouchableOpacity
                onPress={closeModal}
                style={tw`bg-gray-500 px-4 py-2 rounded-lg`}
              >
                <Text style={tw`text-white`}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCreateTask}
                style={tw`bg-green-500 px-4 py-2 rounded-lg`}
              >
                <Text style={tw`text-white`}>Crear</Text>
              </TouchableOpacity>
            </View>
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
