import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import tw from 'twrnc';

export default function PDFViewerScreen({ route }) {
  const { title, uri } = route.params;

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`px-5 py-4 bg-gray-200`}>
        <Text style={tw`text-2xl font-bold`}>{title}</Text>
      </View>
      {uri ? (
        <WebView
          style={tw`flex-1`}
          source={{ uri }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.log('WebView error:', nativeEvent);
          }}
        />
      ) : (
        <Text style={tw`text-center text-red-500 m-5`}>No se pudo cargar el archivo PDF</Text>
      )}
    </View>
  );
}
