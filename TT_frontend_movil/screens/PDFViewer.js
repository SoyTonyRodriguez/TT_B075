import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';

export default function PDFViewer({ route }) {
  const { pdfResource } = route.params;

  // Verifica si el PDF es una ruta local (require) o una URI
  const pdfUri = pdfResource.uri || pdfResource;

  if (!pdfUri) {
    return <Text>Error: No se pudo cargar el archivo PDF.</Text>;
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
