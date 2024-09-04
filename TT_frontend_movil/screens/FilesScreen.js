import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [documents, setDocuments] = useState([{ id: '1', name: 'Documento 1' }, { id: '2', name: 'Documento 2' }]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDocument, setNewDocument] = useState('');
  const [editingDocument, setEditingDocument] = useState(null);

  // Agregar documento
  const addDocument = () => {
    if (newDocument) {
      setDocuments([...documents, { id: Date.now().toString(), name: newDocument }]);
      setNewDocument('');
      setIsModalVisible(false);
    }
  };

  // Editar documento
  const editDocument = () => {
    setDocuments(documents.map(doc => (doc.id === editingDocument.id ? { ...doc, name: newDocument } : doc)));
    setEditingDocument(null);
    setNewDocument('');
    setIsModalVisible(false);
  };

  // Borrar documento
  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  // Abrir modal para editar/agregar documento
  const openModal = (document = null) => {
    setNewDocument(document ? document.name : '');
    setEditingDocument(document);
    setIsModalVisible(true);
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Mis documentos</Text>
        <Ionicons name="document" size={40} color="black" style={styles.documentIcon} />
      </View>
      
      {/* Lista de documentos */}
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.documentItem}>
            <Text style={styles.documentText}>{item.name}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => openModal(item)}>
                <Ionicons name="create" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteDocument(item.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Botón para agregar un nuevo documento */}
      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Agregar documento</Text>
      </TouchableOpacity>

      {/* Modal para agregar/editar documento */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              value={newDocument}
              onChangeText={setNewDocument}
              placeholder="Nombre del documento"
              style={styles.input}
            />
            <Button
              title={editingDocument ? "Editar Documento" : "Agregar Documento"}
              onPress={editingDocument ? editDocument : addDocument}
            />
            <Button title="Cancelar" onPress={() => setIsModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  documentIcon: {
    marginLeft: 10,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  documentText: {
    fontSize: 18,
    color: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
