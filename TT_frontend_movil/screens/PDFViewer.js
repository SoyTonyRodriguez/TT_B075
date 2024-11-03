import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import tw from 'twrnc';

const PDFViewer = ({ route }) => {
  const { pdfUri } = route.params;  // Recibe la URI del PDF desde la navegación

    return (
        <View style={tw`flex-1`}>
        <WebView
            source={{ uri: pdfUri }}
            style={{ flex: 1 }}
            startInLoadingState={true}
            renderLoading={() => (
            <ActivityIndicator size="large" color="#0000ff" style={tw`mt-10`} />
            )}
        />
        </View>
    );
    };

export default PDFViewer;