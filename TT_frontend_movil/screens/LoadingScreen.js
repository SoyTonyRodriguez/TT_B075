import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoadingScreen = ({ message = "Cargando..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#003366" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    position: 'absolute',
    zIndex: 1000, // Make sure it's above other components
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  }
});

export default LoadingScreen;
