import React from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import tw from 'twrnc';

const PDFViewer = ({ route }) => {
  const { pdfResource } = route.params; // Recibe el recurso del PDF

  return (
    <View style={tw`flex-1`}>
      <Pdf
        source={pdfResource}
        style={{ flex: 1, width: Dimensions.get('window').width }}
        onLoadComplete={(numberOfPages) => {
          console.log(`Total de páginas: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.error('Error al cargar PDF:', error);
        }}
        loadingIndicator={() => (
          <ActivityIndicator size="large" color="#0000ff" style={tw`mt-10`} />
        )}
      />
    </View>
  );
};

export default PDFViewer;
