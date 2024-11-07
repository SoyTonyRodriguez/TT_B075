import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export default function PDFViewer({ route }) {
  const { pdfResource } = route.params;
  const [pdfUri, setPdfUri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        // Carga el archivo usando Asset de Expo si es un recurso local
        const asset = Asset.fromModule(pdfResource);
        await asset.downloadAsync();
        
        // Copia el archivo a un directorio accesible y establece la URI
        const localUri = `${FileSystem.documentDirectory}${asset.name}`;
        await FileSystem.copyAsync({
          from: asset.localUri,
          to: localUri,
        });

        setPdfUri(localUri);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el PDF:', error);
        Alert.alert('Error', 'No se pudo cargar el archivo PDF.');
      }
    };

    loadPdf();
  }, [pdfResource]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando PDF...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: pdfUri }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
