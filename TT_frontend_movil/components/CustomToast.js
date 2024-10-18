// CustomToast.js
import React from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'twrnc'; // Utilizando Tailwind para estilos rápidos

const CustomToast = ({ type, title, message }) => (
  <Toast
    config={{
      success: ({ text1, text2 }) => (
        <View style={[styles.toastContainer, tw`bg-green-100`]}>
          <Text style={[styles.toastTitle, tw`text-green-800`]}>{text1}</Text>
          {text2 ? <Text style={styles.toastMessage}>{text2}</Text> : null}
        </View>
      ),
      error: ({ text1, text2 }) => (
        <View style={[styles.toastContainer, tw`bg-red-100`]}>
          <Text style={[styles.toastTitle, tw`text-red-800`]}>{text1}</Text>
          {text2 ? <Text style={styles.toastMessage}>{text2}</Text> : null}
        </View>
      ),
      default: ({ text1, text2 }) => (
        <View style={[styles.toastContainer, tw`bg-gray-100`]}>
          <Text style={[styles.toastTitle, tw`text-gray-800`]}>{text1}</Text>
          {text2 ? <Text style={styles.toastMessage}>{text2}</Text> : null}
        </View>
      ),
    }}
  />
);

const styles = StyleSheet.create({
  toastContainer: {
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  toastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  toastMessage: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
});

export default CustomToast;
