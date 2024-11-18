import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, 
  TextInput, Modal, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Toast from 'react-native-toast-message'; 
import LoadingScreen from './LoadingScreen'; // Pantalla de carga
import CustomToast from '../components/CustomToast'; // Toast personalizado
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import {jwtDecode} from 'jwt-decode';
import { ProgressBar } from 'react-native-paper'; // Usa una librería de barra de progreso

import { getTasks, createTask, deleteTask, updateTask } from '../api/tasks.api';
import { getProduct, updateProduct, deleteProduct } from '../api/products.api';
import { get_Check_Products } from '../api/check_products.api';
//import DraggableFlatList from 'react-native-draggable-flatlist';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [projections, setProjections] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: '', projection_id: '' });
  const [showTodo, setShowTodo] = useState(false);
  const [showInProcess, setShowInProcess] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [showProjectionModal, setShowProjectionModal] = useState(false); // Estado del modal de proyección
  const [showStatusModal, setShowStatusModal] = useState(false); // Controla el modal de status
  const [isTaskLoading, setIsTaskLoading] = useState(false);  // Pantalla de carga para tareas (crear/editar)
  const [activeSection, setActiveSection] = useState(null); // para que solo una seccion este abierya 
  const [taskToEdit, setTaskToEdit] = useState(null); // Nueva tarea para editar
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado del modal de edición

  const [loading, setLoading] = useState(true); // Estado de carga inicial
  const [loadingMessage, setLoadingMessage] = useState(""); // Mensaje para LoadingScreen

  const [userId, setUserId] = useState(''); // Accede al token y userId del contexto

  const [expandedProjectionId, setExpandedProjectionId] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log('Token decodificado:', decodedToken.user_id);
          setUserId(decodedToken.user_id);
        }
      } catch (error) {
        console.error('Error al obtener token:', error);
      }
    }
    fetchToken();

  }, [userId]);

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
  
  const safeParseJSON = (jsonString) => {
    try {
        // Reemplazar comillas simples con comillas dobles si es necesario
        const fixedString = jsonString.replace(/'/g, '"');
        return JSON.parse(fixedString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return []; // Devuelve un array vacío si el JSON no es válido
    }
  };

  const calculateProgress = (projectionId) => {
    const projectionTasks = tasks.filter((task) => task.projection_id === projectionId);
    const doneTasks = projectionTasks.filter((task) => task.status === 'done');

    const progress = projectionTasks.length
      ? (doneTasks.length / projectionTasks.length) * 100
      : 0;

    const projection = projections.find((proj) => proj.id === projectionId);
    
    const projectionDocuments = Array.isArray(projection.documents_uploaded)
    ? projection.documents_uploaded // Ya es un array, úsalo directamente
    : safeParseJSON(projection.documents_uploaded || '[]');

    const documentsUploadedCount = projectionDocuments.length;
    const documentsRequiredCount = projection.documents_number || 0;

    return {
      progress: documentsUploadedCount < documentsRequiredCount
        ? Math.min(progress, 100)
        : Math.round(progress),
      documentsUploadedCount,
      documentsRequiredCount,
      tasksCount: projectionTasks.length,
      doneTasksCount: doneTasks.length,
    };
  };

  const toggleExpand = (projectionId) => {
    setExpandedProjectionId(expandedProjectionId === projectionId ? null : projectionId);
  };

  const updateProjectionProgress = async (projectionId) => {
    const { progress } = calculateProgress(projectionId);
    try {
      await updateProduct(projectionId, { progress });
      setProjections((prev) =>
        prev.map((proj) => (proj.id === projectionId ? { ...proj, progress } : proj))
      );
    } catch (error) {
      console.error('Error updating projection progress:', error);
    }
  };

  const ProjectionCard = ({ projection }) => {
    const {
      progress,
      documentsUploadedCount,
      documentsRequiredCount,
      tasksCount,
      doneTasksCount,
    } = calculateProgress(projection.id);

    return (
      <View style={[tw`bg-white p-4 mb-4 rounded-xl shadow-lg`, { borderColor: projection.color || '#ccc', borderWidth: 2 }]}>        
        <View style={tw`flex-row justify-between items-center mb-2`}>
          {/* Nombre de la actividad */}
          <Text
            style={tw`text-lg font-bold text-gray-800 flex-1`}
            numberOfLines={1} // Limita a una línea y agrega ellipsis
          >
            {projection.activity}
          </Text>
          <Text style={tw`text-sm text-gray-500`}>({progress}%)</Text>
        </View>

        {/* Barra de progreso */}
        <ProgressBar
          progress={progress / 100}
          color={progress === 100 ? 'green' : 'blue'}
          style={tw`h-3 rounded-lg`}
        />

        <View style={tw`flex-row justify-between mt-2`}>
          <Text style={tw`text-xs text-gray-600`}>Documentos: {documentsUploadedCount}/{documentsRequiredCount}</Text>
          <Text style={tw`text-xs text-gray-600`}>Tareas: {doneTasksCount}/{tasksCount}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleExpand(projection.id)}>
            <Text style={tw`text-blue-500 text-sm`}>
              {expandedProjectionId === projection.id ? 'Ocultar documentos' : 'Mostrar documentos'}
            </Text>
          </TouchableOpacity>
        {expandedProjectionId === projection.id && (
          <View style={tw`mt-4`}>
            <Text style={tw`text-sm text-gray-700 font-bold`}>Documentos requeridos:</Text>
            <View style={tw`mt-2`}>
              {(projection.documents_required || '').split('\n').map((doc, index) => (
                <Text key={index} style={tw`text-xs text-gray-700`}>
                  - {doc.trim()}
                </Text>
              ))}
            </View>

            {documentsUploadedCount < documentsRequiredCount && (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Subir documento', 'Redirige al módulo de documentos.');
                }}
                style={tw`bg-blue-500 mt-4 px-4 py-2 rounded-lg`}>
                <Text style={tw`text-white text-center text-sm`}>Subir Documentos</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };


  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setTaskToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateTask = async () => {
    try {
      setLoadingMessage("Actualizando tarea...");
      setIsTaskLoading(true);
  
      // Validar que no se pueda marcar como 100% si faltan documentos
      if (taskToEdit.status === 'done' && taskToEdit.projection_id) {
        const projection = projections.find(
          (proj) => proj.id === taskToEdit.projection_id
        );
  
        if (projection) {
          const documentsUploaded = safeParseJSON(projection.documents_uploaded || "[]");
          const documentsRequired = projection.documents_number || 0;
  
          const projectionTasks = tasks.map((task) =>
            task.id === taskToEdit.id ? { ...task, ...taskToEdit } : task
          ).filter((task) => task.projection_id === taskToEdit.projection_id);
  
          const doneTasks = projectionTasks.filter((task) => task.status === "done");
          const progress =
            projectionTasks.length > 0
              ? (doneTasks.length / projectionTasks.length) * 100
              : 0;
  
          if (progress === 100 && documentsUploaded.length < documentsRequired) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "No puedes completar esta proyección sin subir todos los documentos requeridos.",
              visibilityTime: 2000,
            });
            setIsTaskLoading(false); // Termina la carga si no cumple la validación
            return;
          }
        }
      }
  
      // Actualiza la tarea en la API
      await updateTask(taskToEdit.id, taskToEdit);
  
      // Actualiza localmente la lista de tareas
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskToEdit.id ? { ...task, ...taskToEdit } : task
        )
      );
  
      // Recalcula y actualiza el progreso si pertenece a una proyección
      if (taskToEdit.projection_id) {
        await updateProjectionProgress(taskToEdit.projection_id);
      }
  
      Toast.show({
        type: "success",
        text1: "Tarea actualizada",
        visibilityTime: 1000,
      });
  
      closeEditModal();
    } catch (error) {
      console.error("Error updating task:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo actualizar la tarea.",
        visibilityTime: 1000,
      });
    } finally {
      setIsTaskLoading(false);
    }
  };

  const handleTaskChange = (name, value) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };  

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setNewTask({
      title: '',
      description: '',
      priority: '', // Restablece la prioridad
      projection_id: '',
    });
    setIsModalOpen(false);
  };
  

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.projection_id) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }
  
    try {
      setLoadingMessage("Creando tarea...");
      setIsTaskLoading(true);
  
      // Crear la tarea en la API
      const response = await createTask(newTask);
      const createdTask = response.data;
  
      // Actualizar las tareas localmente
      const updatedTasks = [...tasks, createdTask];
      setTasks(updatedTasks);
  
      // Recalcular y actualizar el progreso en la base de datos
      if (createdTask.projection_id) {
        const projectionTasks = updatedTasks.filter(
          (task) => task.projection_id === createdTask.projection_id
        );
  
        const doneTasks = projectionTasks.filter((task) => task.status === "done");
  
        const progress =
          projectionTasks.length > 0
            ? (doneTasks.length / projectionTasks.length) * 100
            : 0;
  
        const projection = projections.find(
          (proj) => proj.id === createdTask.projection_id
        );
  
        const documentsUploaded = safeParseJSON(projection.documents_uploaded || "[]");
        const documentsRequired = projection.documents_number || 0;
  
        const adjustedProgress =
          documentsUploaded.length < documentsRequired
            ? Math.min(progress, 99)
            : Math.round(progress);
  
        await updateProduct(createdTask.projection_id, { progress: adjustedProgress });
  
        // Actualizar las proyecciones localmente
        setProjections((prevProjections) =>
          prevProjections.map((proj) =>
            proj.id === createdTask.projection_id
              ? { ...proj, progress: adjustedProgress }
              : proj
          )
        );
      }
  
      // Resetear el estado de la nueva tarea
      setNewTask({
        title: "",
        description: "",
        priority: "",
        status: "todo",
        projection_id: "",
      });
  
      setIsModalOpen(false);
  
      Toast.show({ type: "success", text1: "Tarea Creada", visibilityTime: 1000 });
    } catch (error) {
      console.error("Error creando tarea:", error);
      Alert.alert("Error", "No se pudo crear la tarea.");
    } finally {
      setIsTaskLoading(false);
    }
  };
  

  const handleDeleteTask = async (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    const previousTasks = [...tasks]; // Almacenar las tareas actuales por si hay un error
  
    try {
      // Actualizar tareas localmente eliminando la tarea
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
  
      // Llamar a la API para eliminar la tarea
      await deleteTask(taskId);
  
      // Si la tarea pertenece a una proyección, recalcular el progreso
      if (taskToDelete.projection_id) {
        const projectionTasks = updatedTasks.filter(
          (task) => task.projection_id === taskToDelete.projection_id
        );
  
        const doneTasks = projectionTasks.filter((task) => task.status === "done");
  
        const progress =
          projectionTasks.length > 0
            ? (doneTasks.length / projectionTasks.length) * 100
            : 0;
  
        const projection = projections.find(
          (proj) => proj.id === taskToDelete.projection_id
        );
  
        const documentsUploaded = safeParseJSON(projection.documents_uploaded || "[]");
        const documentsRequired = projection.documents_number || 0;
  
        const adjustedProgress =
          documentsUploaded.length < documentsRequired
            ? Math.min(progress, 99)
            : Math.round(progress);
  
        await updateProduct(taskToDelete.projection_id, { progress: adjustedProgress });
  
        // Actualizar las proyecciones localmente
        setProjections((prevProjections) =>
          prevProjections.map((proj) =>
            proj.id === taskToDelete.projection_id
              ? { ...proj, progress: adjustedProgress }
              : proj
          )
        );
      }
  
      Toast.show({
        type: "success",
        text1: "Tarea eliminada",
        visibilityTime: 1000,
      });
    } catch (error) {
      console.error("Error eliminando tarea:", error);
  
      // Revertir cambios locales en caso de error
      setTasks(previousTasks);
  
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo eliminar la tarea. Inténtalo de nuevo.",
        visibilityTime: 1000,
      });
    }
  };

  const handleEditTaskChange = (name, value) => {
    setTaskToEdit({ ...taskToEdit, [name]: value });
  };

  const toggleSection = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  const TaskCard = ({ task }) => {
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
    const projection = projections.find((proj) => proj.id === task.projection_id);
    const projectionName = projection ? projection.function : 'Sin proyección';
    const projectionActivity = projection ? projection.activity : 'Sin actividad';
    const projectionColor = projection ? projection.color : '#f0f0f0'; // Usar el color de la proyección de la API
  
      const confirmDelete = (taskId) => {
        Alert.alert(
          "Confirmar eliminación",
          "¿Estás seguro de que deseas eliminar la actividad?",
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Eliminar", style: "destructive", onPress: () => handleDeleteTask(taskId) },
          ],
          { cancelable: true }
        );
      };

    return (    
      <View style={tw`p-4 rounded-md shadow-md mb-3 ${getPriorityColor()} min-h-[120px] relative`}>
        
        {/* Botón de eliminar, mejorado visualmente */}
        <TouchableOpacity
          style={tw`absolute -top-3 -right-3 bg-red-100 rounded-full shadow-lg p-1`}
          onPress={() => confirmDelete(task.id)}
        >
          <Ionicons name="close-circle" size={36} color="red" style={tw`shadow-sm`} />
        </TouchableOpacity>

        {/* Tarjeta de tarea editable */}
        <TouchableOpacity onPress={() => openEditModal(task)} style={tw`flex-1`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
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
        </TouchableOpacity>
      </View>
    );
  };

  const priorities = ['Alta', 'Media', 'Baja'];
  const statuses = ['todo', 'in-progress', 'done']; // Lista de estados
  const statusTranslations = {
    'todo': 'Por hacer',
    'in-progress': 'En progreso',
    'done': 'Hecho',
  };
  
  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}  
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      
      {/* Pantalla de carga */}
      {loading && <LoadingScreen message={loadingMessage} />}
      
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Mi proyección</Text>
        <Ionicons name="glasses-outline" size={40} color="#000" style={tw`ml-2`} />
      </View>

      <ScrollView style={tw`p-5 mb-15`}>
        {/* Sección To-Do */}
        <TouchableOpacity onPress={() => toggleSection('todo')}>
          <View style={tw`bg-blue-900 p-4 rounded-xl`}>
            <Text style={tw`text-lg font-semibold text-white`}>POR HACER</Text>
          </View>
        </TouchableOpacity>
        {activeSection === 'todo' && (
          <View style={tw`bg-white p-4 rounded-xl mt-2`}>
            {tasks.filter(task => task.status === 'todo').map(task => (
              <TaskCard key={task.id} task={task}  />
            ))}
          </View>
        )}

        {/* Sección In-Progress */}
        <TouchableOpacity onPress={() => toggleSection('in-progress')}>
          <View style={tw`bg-blue-900 p-4 mt-5 rounded-xl`}>
            <Text style={tw`text-lg font-semibold text-white`}>EN PROGRESO</Text>
          </View>
        </TouchableOpacity>
        {activeSection === 'in-progress' && (
          <View style={tw`bg-white p-4 rounded-xl mt-2`}>
            {tasks.filter(task => task.status === 'in-progress').map(task => (
              <TaskCard key={task.id} task={task}  />
          ))}
          </View>
        )}

        {/* Sección Done */}
        <TouchableOpacity onPress={() => toggleSection('done')}>
          <View style={tw`bg-blue-900 p-4 mt-5 rounded-xl`}>
            <Text style={tw`text-lg font-semibold text-white`}>HECHO</Text>
          </View>
        </TouchableOpacity>
        {activeSection === 'done' && (
          <View style={tw`bg-white p-4 rounded-xl mt-2`}>
            {tasks.filter(task => task.status === 'done').map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </View>
        )}

      {/* Sección Progresos */}
      <TouchableOpacity onPress={() => toggleSection('progress')}>
        <View style={tw`bg-blue-900 p-4 mt-5 rounded-xl`}>
          <Text style={tw`text-lg font-semibold text-white`}>PROGRESOS</Text>
        </View>
      </TouchableOpacity>
      {activeSection === 'progress' && (
        <View style={tw`bg-white p-4 rounded-xl mt-2`}>
          {projections.map((projection) => (
            <ProjectionCard key={projection.id} projection={projection} />
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
            <View style={tw`bg-white p-8 rounded-lg shadow-xl w-90`}>
              <Text style={tw`text-2xl font-bold mb-6 text-center text-gray-800`}>Crear nueva tarea</Text>

              {/* Campo del título */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Título de la tarea</Text>
              <TextInput
                placeholder="Escribe el título"
                value={newTask.title}
                onChangeText={(text) => handleTaskChange('title', text)}
                style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white text-lg`}
                placeholderTextColor="#999"
              />

              {/* Campo de la descripción */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Descripción</Text>
              <TextInput
                placeholder="Escribe la descripción"
                value={newTask.description}
                onChangeText={(text) => handleTaskChange('description', text)}
                style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white text-lg`}
                placeholderTextColor="#999"
              />

              {/* Selector de prioridad */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Prioridad</Text>
              <TouchableOpacity
                onPress={() => setShowPriorityModal(true)}
                style={tw`border border-gray-300 px-4 py-3 rounded-lg mb-4 bg-white flex-row justify-between items-center`}
              >
                <Text style={tw`text-gray-800 text-lg`}>
                  {newTask.priority || "Selecciona una prioridad"} {/* Asegúrate de que aquí esté mostrando el valor correcto */}
                </Text>
                <Text style={tw`text-gray-800`}>
                  <FontAwesome name="chevron-down" style={tw`text-gray-500`} />
                </Text>
              </TouchableOpacity>

              {/* Selector de proyección con ícono */}
              <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Proyección</Text>
              <TouchableOpacity
                onPress={() => setShowProjectionModal(true)}
                style={tw`border border-gray-300 px-4 py-3 rounded-lg mb-4 bg-white flex-row justify-between items-center`}
              >
                <Text style={tw`text-gray-800 text-lg`}>
                  {newTask.projection_id
                    ? projections.find((proj) => proj.id === newTask.projection_id)?.activity
                    : 'Selecciona una proyección'}
                </Text>
                <Text style={tw`text-gray-800`}>
                  <FontAwesome name="chevron-down" style={tw`text-gray-500`} />
                </Text>
              </TouchableOpacity>

              {/* Botones para cancelar o crear */}
              <View style={tw`flex-row justify-between mt-6`}>
                <TouchableOpacity
                  onPress={closeModal}
                  style={tw`bg-gray-500 px-6 py-3 rounded-lg shadow-lg`}
                >
                  <Text style={tw`text-white font-semibold text-lg`}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleCreateTask();
                    setIsModalOpen(false);
                  }}
                  style={tw`bg-green-500 px-6 py-3 rounded-lg shadow-lg`}
                >
                  <Text style={tw`text-white font-semibold text-lg`}>Crear</Text>
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
                    if (isEditModalOpen) {
                      setTaskToEdit({ ...taskToEdit, priority }); // Actualiza `taskToEdit`
                    } else {
                      handleTaskChange('priority', priority); // Actualiza `newTask`
                    }
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

      {/* Modal de selección de status */}
      {showStatusModal && (
        <Modal
          transparent={true}
          visible={showStatusModal}
          onRequestClose={() => setShowStatusModal(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-4 rounded-lg w-80`}>
              <Text style={tw`text-lg font-semibold mb-4`}>Selecciona el estado</Text>
              {statuses.map((status, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleEditTaskChange('status', status);
                    setShowStatusModal(false);
                  }}
                  style={tw`py-2`}
                >
                  <Text style={tw`text-gray-800 text-center`}>{statusTranslations[status]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
    )}

      {/* Modal para editar tarea */}
      <Modal
        transparent={true}
        visible={isEditModalOpen}
        onRequestClose={closeEditModal}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-8 rounded-lg shadow-xl w-90`}>
            <Text style={tw`text-3xl font-bold mb-6 text-center text-gray-800`}>Editar tarea</Text>

            {/* Campo del título */}
            <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Título de la tarea</Text>
            <TextInput
              placeholder="Escribe el título"
              value={taskToEdit?.title || ''}
              onChangeText={(text) => setTaskToEdit({ ...taskToEdit, title: text })}
              style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white text-lg`}
              placeholderTextColor="#999"
            />

            {/* Campo de la descripción */}
            <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Descripción</Text>
            <TextInput
              placeholder="Escribe la descripción"
              value={taskToEdit?.description || ''}
              onChangeText={(text) => setTaskToEdit({ ...taskToEdit, description: text })}
              style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white text-lg`}
              placeholderTextColor="#999"
            />

            {/* Selector de prioridad */}
            <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Prioridad</Text>
            <TouchableOpacity
              onPress={() => setShowPriorityModal(true)}
              style={tw`border border-gray-300 px-4 py-3 rounded-lg mb-4 bg-white flex-row justify-between items-center`}
            >
              <Text style={tw`text-gray-800 text-lg`}>{taskToEdit?.priority || 'Selecciona una prioridad'}</Text>
              <Text style={tw`text-gray-800`}>
                <FontAwesome name="chevron-down" style={tw`text-gray-500 text-lg`} />
              </Text>
            </TouchableOpacity>

            {/* Selector de estado */}
            <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Estado</Text>
            <TouchableOpacity
              onPress={() => setShowStatusModal(true)}
              style={tw`border border-gray-300 px-4 py-3 rounded-lg mb-4 bg-white flex-row justify-between items-center`}
            >
              <Text style={tw`text-gray-800 text-lg`}>{taskToEdit?.status || 'Selecciona un estado'}</Text>
              <Text style={tw`text-gray-800`}>
                <FontAwesome name="chevron-down" style={tw`text-gray-500 text-lg`} />
              </Text>
            </TouchableOpacity>

            {/* Selector de proyección */}
            <Text style={tw`text-lg mb-2 font-semibold text-gray-800`}>Proyección</Text>
            <TouchableOpacity
              onPress={() => setShowProjectionModal(true)}
              style={tw`border border-gray-300 px-4 py-3 rounded-lg mb-4 bg-white flex-row justify-between items-center`}
              disabled={true}
            >
              <Text style={tw`text-gray-800 text-lg`}>
                {taskToEdit?.projection_id
                  ? projections.find((proj) => proj.id === taskToEdit.projection_id)?.activity
                  : 'Selecciona una proyección'}
              </Text>
            </TouchableOpacity>

            {/* Botones para cancelar o guardar */}
            <View style={tw`flex-row justify-between mt-6`}>
              <TouchableOpacity
                onPress={closeEditModal}
                style={tw`bg-gray-500 px-6 py-3 rounded-lg shadow-lg`}
              >
                <Text style={tw`text-white font-semibold text-lg`}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleUpdateTask();
                  setIsEditModalOpen(false);
                }}
                style={tw`bg-green-500 px-6 py-3 rounded-lg shadow-lg`}
              >
                <Text style={tw`text-white font-semibold text-lg`}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Toast container */}
      <CustomToast />

      {/* Pantalla de carga */}
      {isTaskLoading && <LoadingScreen message={loadingMessage} />}
      
    </ImageBackground>
  );
};

export default KanbanBoard;
