import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import tw from 'twrnc';

const HomeScreen = () => {
  const [documents, setDocuments] = useState([]); // Lista de documentos
  const [selectedDocuments, setSelectedDocuments] = useState([]); // Documentos seleccionados
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal de agregar/editar
  const [newDocument, setNewDocument] = useState(''); // Nombre del documento en edición
  const [editingDocument, setEditingDocument] = useState(null); // Documento en edición
  const [isSortModalVisible, setIsSortModalVisible] = useState(false); // Modal de clasificación
  const [sortOption, setSortOption] = useState(''); // Opción de clasificación
  const [selectedCategory, setSelectedCategory] = useState(''); // Categoría seleccionada para documentos

  // Categorías definidas
  const categories = [
    { label: "Todas las categorías", value: "" },
    { label: "Docencia", value: "docencia" },
    { label: "Investigación", value: "investigacion" },
    { label: "Superación académica", value: "superacion" },
    { label: "Complementarias", value: "complementarias" },
    { label: "Extensión", value: "extension" }
  ];

  // Seleccionar documento del dispositivo
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type === 'success') {
      const newDoc = {
        id: Date.now().toString(),
        name: result.name,
        uri: result.uri,
        createdAt: new Date(),
        category: selectedCategory || 'docencia' // Si no se selecciona una categoría, se asigna "docencia"
      };
      setDocuments([...documents, newDoc]); // Añadir nuevo documento sin filtrar ni clasificar
    }
  };

  // Editar documento
  const editDocument = () => {
    const updatedDocuments = documents.map(doc => 
      doc.id === editingDocument.id ? { ...doc, name: newDocument, category: selectedCategory || 'docencia' } : doc
    );
    setDocuments(updatedDocuments); // Actualizar documentos sin filtrar ni clasificar
    setEditingDocument(null);
    setNewDocument('');
    setIsModalVisible(false);
  };

  // Borrar documento
  const deleteDocument = (id) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments); // Actualizar documentos sin filtrar ni clasificar
    setSelectedDocuments(selectedDocuments.filter(docId => docId !== id));
  };

  // Abrir modal para editar/agregar documento
  const openModal = (document = null) => {
    setNewDocument(document ? document.name : '');
    setEditingDocument(document);
    setSelectedCategory(document ? document.category : 'docencia');
    setIsModalVisible(true);
  };

  // Seleccionar documento
  const toggleSelectDocument = (id) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter(docId => docId !== id));
    } else {
      setSelectedDocuments([...selectedDocuments, id]);
    }
  };

  // Clasificar documentos según la opción seleccionada
  const sortDocuments = () => {
    let sortedDocuments = [...documents];
    
    if (sortOption === 'name') {
      sortedDocuments.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'createdAt') {
      sortedDocuments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'category') {
      sortedDocuments.sort((a, b) => a.category.localeCompare(b.category));
    }
    
    setDocuments(sortedDocuments); // Actualizar la lista de documentos clasificados
    setIsSortModalVisible(false); // Cerrar el modal de clasificación
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-row justify-between items-center px-5 mt-10 mb-5`}>
        <Text style={tw`text-2xl font-bold text-black`}>Mis documentos</Text>
        <Ionicons name="document" size={40} color="black" />
      </View>

      {/* Botón para abrir el modal de clasificación */}
      <TouchableOpacity 
        style={tw`flex-row justify-center items-center bg-green-500 p-3 rounded-lg mx-5 mb-5`}
        onPress={() => setIsSortModalVisible(true)}
      >
        <Ionicons name="filter" size={24} color="white" />
        <Text style={tw`text-white font-bold ml-3`}>Clasificar documentos</Text>
      </TouchableOpacity>

      {/* FlatList para mostrar todos los documentos sin clasificar */}
      <FlatList
        data={documents} // No filtramos ni clasificamos hasta que el usuario lo decida
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              tw`flex-row justify-between items-center py-2 px-5 border-b border-gray-300`,
              selectedDocuments.includes(item.id) ? tw`bg-blue-100` : null
            ]}
            onPress={() => toggleSelectDocument(item.id)}
          >
            <Text style={tw`text-lg text-black`}>{item.name}</Text>
            <View style={tw`flex-row justify-between w-18`}>
              <TouchableOpacity onPress={() => openModal(item)}>
                <Ionicons name="create" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteDocument(item.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Botón para seleccionar y agregar un nuevo documento */}
      <TouchableOpacity 
        style={tw`flex-row justify-center items-center bg-blue-500 p-3 rounded-lg mx-5 mt-5`}
        onPress={pickDocument}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={tw`text-white font-bold ml-3`}>Seleccionar y agregar documento</Text>
      </TouchableOpacity>

      {/* Modal para agregar/editar documento */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
          <View style={tw`w-4/5 bg-white p-5 rounded-lg`}>
            <TextInput
              value={newDocument}
              onChangeText={setNewDocument}
              placeholder="Nombre del documento"
              style={tw`border-b border-gray-300 mb-5 px-2`}
            />
            <Picker
              selectedValue={selectedCategory}
              style={tw`bg-white rounded-lg mb-5`}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              {categories.map((category, index) => (
                <Picker.Item key={index} label={category.label} value={category.value} />
              ))}
            </Picker>
            <Button
              title={editingDocument ? "Editar Documento" : "Agregar Documento"}
              onPress={editingDocument ? editDocument : pickDocument}
            />
            <Button title="Cancelar" onPress={() => setIsModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>

      {/* Modal para clasificación y ordenación */}
      <Modal visible={isSortModalVisible} animationType="slide" transparent={true}>
        <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
          <View style={tw`w-4/5 bg-white p-5 rounded-lg`}>
            <Text style={tw`text-lg font-bold mb-3`}>Ordenar por:</Text>
            <TouchableOpacity 
              style={tw`p-3 mb-3 bg-gray-200 rounded-lg`} 
              onPress={() => setSortOption('name')}
            >
              <Text style={tw`text-black`}>Nombre</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`p-3 bg-gray-200 rounded-lg`} 
              onPress={() => setSortOption('createdAt')}
            >
              <Text style={tw`text-black`}>Fecha de creación</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`p-3 bg-gray-200 rounded-lg`} 
              onPress={() => setSortOption('category')}
            >
              <Text style={tw`text-black`}>Categoría</Text>
            </TouchableOpacity>
            <Button title="Aplicar" onPress={sortDocuments} />
            <Button title="Cancelar" onPress={() => setIsSortModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default HomeScreen;

