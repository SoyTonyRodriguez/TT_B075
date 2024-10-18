import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, 
  TextInput, Modal, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Toast from 'react-native-toast-message'; 
import LoadingScreen from './LoadingScreen'; // Pantalla de carga
import CustomToast from '../components/CustomToast'; // Toast personalizado

import { AuthContext } from '../components/AuthContext';

import { getTasks, createTask, deleteTask } from '../api/tasks.api';
import { getProduct } from '../api/products.api';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [projections, setProjections] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Media', projection_id: '' });
  const [showTodo, setShowTodo] = useState(false);
  const [showInProcess, setShowInProcess] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [showProjectionModal, setShowProjectionModal] = useState(false); // Estado del modal de proyección
  const [isTaskLoading, setIsTaskLoading] = useState(false);  // Pantalla de carga para tareas (crear/editar)

  const { userId, token } = useContext(AuthContext); // Accede al token y userId del contexto


  const [loading, setLoading] = useState(true); // Estado de carga inicial
  const [loadingMessage, setLoadingMessage] = useState(""); // Mensaje para LoadingScreen

  useEffect(() => {
    setLoadingMessage("Cargando tareas"); // Mensaje de carga
    const fetchTasks = async () => {
      try {
        const response = await getTasks(userId);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudieron obtener las tareas.',
        });
        throw error; // Lanza el error para que `Promise.all` lo detecte
      }
    };

    const fetchProjections = async () => {
      try {
        const response = await getProduct(userId);
        console.log("Respuesta de la API con proyecciones:", response.data);
        setProjections(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudieron obtener los productos.',
        });
        throw error; // Lanza el error para que `Promise.all` lo detecte
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchTasks(), fetchProjections()]); // Ejecuta ambas en paralelo
      } catch (error) {
        console.error('Error in one or both requests:', error);
      } finally {
        setLoading(false); // Finaliza la carga independientemente del resultado
      }
    };

    if (userId) {
      fetchData(); // Llama a la función si existe un `userId`
    }
  }, [userId]); // Se ejecuta cada vez que `userId` cambia

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

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.projection_id) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      setLoadingMessage("Creando tarea..."); // Mensaje de carga
      setIsTaskLoading(true);
      const response = await createTask(newTask);
      setTasks([...tasks, response.data]);
      setNewTask({
        title: '',
        description: '',
        priority: 'Media',
        status: 'todo',
        projection_id: '',
      });
      setIsModalOpen(false);
      Toast.show({
        type: 'success',
        text1: 'Tarea Creada',
        text2: 'La tarea se ha creado correctamente.',
      });
    } catch (error) {
      console.error('Error creando tarea:', error);
      Alert.alert('Error', 'No se pudo crear la tarea.');
    } finally {
      setIsTaskLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    // Almacena las tareas actuales para revertir si la API falla
    const previousTasks = [...tasks];
  
    // Elimina la tarea localmente de inmediato
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  
    try {
      // Intenta eliminar la tarea desde la API
      await deleteTask(taskId);
  
      // Muestra un mensaje de éxito
      Toast.show({
        type: 'success',
        text1: 'Tarea eliminada',
        text2: 'La tarea se eliminó correctamente.',
      });
    } catch (error) {
      console.error('Error eliminando tarea:', error);
  
      // Restaura las tareas originales en caso de error
      setTasks(previousTasks);
  
      // Muestra un mensaje de error
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo eliminar la tarea. Inténtalo de nuevo.',
      });
    }
  };

  const TaskCard = ({ task, onDelete }) => {
    const getPriorityColor = () => {
      switch (task.priority) {
        case 'Alta':
          return 'bg-red-200';
        case 'Media':
          return 'bg-yellow-200';
        case 'Baja':
          return 'bg-blue-200';
        default:
          return 'bg-gray-200';
      }
    };

    // Buscar el nombre de la proyección en base al projection_id
    const projection = projections.find(proj => proj.id === task.projection_id);
    const projectionName = projection ? projection.function : 'Sin proyección';
    const projectionActivity = projection ? projection.activity : 'Sin actividad';
    const projectionColor =  projection ? projection.color : '#f0f0f0'; // Usar el color de la proyección de la API
  
    return (
      <View style={tw`p-4 rounded-md shadow-md mb-3 ${getPriorityColor()} min-h-[120px]`}>
        {/* Botón de eliminar */}
        <TouchableOpacity
          style={tw`absolute top-2 right-2`}
          onPress={() => handleDeleteTask(task.id)}
        >
          <Ionicons name="close-circle" size={24} color="red" />
        </TouchableOpacity>
  
        {/* Contenedor principal de título y fecha */}
        <View style={tw`flex-row justify-between items-center mb-2`}>
          {/* Título */}
          <Text style={tw`text-base font-semibold text-gray-800 flex-shrink`} numberOfLines={1}>
            {task.title}
          </Text>
        </View>
  
        {/* Descripción o proyección */}
        <View
          style={[
            tw`mt-2 px-3 py-2 rounded-md border shadow-sm`,
            { backgroundColor: projectionColor, borderColor: projectionColor },
          ]}
        >
          <Text style={tw`text-xs text-gray-700 italic mb-1`} numberOfLines={1}>
            {projectionActivity}
          </Text>
          <Text style={tw`text-xs text-gray-600 italic`} numberOfLines={1}>
            {projectionName}
          </Text>
        </View>
      </View>
    );
  };

  const priorities = ['Alta', 'Media', 'Baja'];

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}  // Fondo restaurado
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      
      {/* Pantalla de carga */}
      {loading && <LoadingScreen message={loadingMessage} />}
      
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Mi proyección</Text>
        <Ionicons name="glasses-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      <ScrollView style={tw`p-5`}>
        {/* Sección To-Do */}
        <TouchableOpacity onPress={() => setShowTodo(!showTodo)}>
          <View style={tw`bg-yellow-200 p-4 rounded-xl`}>
            <Text style={tw`text-lg font-semibold text-black`}>TO-DO</Text>
          </View>
        </TouchableOpacity>
        {showTodo && (
          <View style={tw`bg-white p-4 rounded-xl mt-2`}>
            {tasks.filter(task => task.status === 'todo').map(task => (
              <TaskCard key={task.id} task={task}  />
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
              <TaskCard key={task.id} task={task}  />
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

              {/* Selector de prioridad */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Prioridad</Text>
              <TouchableOpacity
                onPress={() => setShowPriorityModal(true)}
                style={tw`border border-gray-300 px-4 py-3 rounded-lg mb-4 bg-white`}
              >
                <Text style={tw`text-gray-800 text-lg`}>{newTask.priority}</Text>
              </TouchableOpacity>

              {/* Selector de proyección */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>
                Proyección
              </Text>
              <TouchableOpacity
                onPress={() => setShowProjectionModal(true)}
                style={tw`border border-gray-300 px-4 py-3 rounded-lg mb-4 bg-white`}
              >
                <Text style={tw`text-gray-800 text-lg`}>
                  {newTask.projection_id
                    ? projections.find(
                        (proj) => proj.id === newTask.projection_id
                      )?.activity
                    : 'Selecciona una proyección'}
                </Text>
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
                  onPress={() => {
                    handleCreateTask();
                    setIsModalOpen(false);
                  }}
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

      {/* Modal para seleccionar proyección */}
      {showProjectionModal && (
        <Modal
          transparent={true}
          visible={showProjectionModal}
          onRequestClose={() => setShowProjectionModal(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-4 rounded-lg w-80`}>
              <Text style={tw`text-lg font-semibold mb-4`}>Selecciona una actividad</Text>
              {projections.map((projection) => (
                <TouchableOpacity
                  key={projection.id}
                  onPress={() => {
                    setNewTask({ ...newTask, projection_id: projection.id });
                    setShowProjectionModal(false);
                  }}
                  style={tw`py-2`}
                >
                  <Text style={tw`text-gray-800 text-center`}>{projection.activity}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      )}

      {/* Toast container */}
      <CustomToast />

      {/* Pantalla de carga */}
      {isTaskLoading && <LoadingScreen message={loadingMessage} />}
    </ImageBackground>
  );
};

export default KanbanBoard;
