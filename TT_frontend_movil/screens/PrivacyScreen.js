import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; 

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PrivacyScreen = () => {
  const [expandedSection, setExpandedSection] = useState(null); // Controla qué sección está expandida

  // Función para alternar el estado de una sección
  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fondo.jpg')} 
      style={tw`flex-1 w-full h-full`}
      resizeMode="cover"
    >
      <View style={tw`flex-1 pt-12 px-5`}>
        {/* Título de Privacidad y el ícono */}
        <View style={tw`flex-row justify-between items-center mb-5`}>
          <Text style={tw`text-2xl font-bold text-black`}>Privacidad y seguridad</Text>
          <Ionicons name="lock-closed-outline" size={40} color="#000" />
        </View>

        <ScrollView>
          {/* Sección 1: Datos Personales Recabados */}
          <TouchableOpacity onPress={() => toggleSection(1)} style={tw`flex-row justify-between items-center py-3 border-b border-gray-300`}>
            <Text style={tw`text-lg font-bold text-black`}>Datos Personales Recabados</Text>
            <Ionicons name={expandedSection === 1 ? "chevron-up-outline" : "chevron-down-outline"} size={24} color="black" />
          </TouchableOpacity>
          {expandedSection === 1 && (
            <View style={tw`p-4`}>
              <Text style={tw`text-base text-black mb-3 text-justify`}>
                Los datos personales que recabamos de usted serán utilizados únicamente para los fines relacionados con el "Proceso de Promoción Docente".
                Los datos que pueden ser recabados incluyen: nombre completo, información académica, evaluaciones de desempeño, y más.
              </Text>
            </View>
          )}

          {/* Sección 2: Finalidad del Tratamiento de Datos */}
          <TouchableOpacity onPress={() => toggleSection(2)} style={tw`flex-row justify-between items-center py-3 border-b border-gray-300`}>
            <Text style={tw`text-lg font-bold text-black`}>Finalidad del Tratamiento de Datos</Text>
            <Ionicons name={expandedSection === 2 ? "chevron-up-outline" : "chevron-down-outline"} size={24} color="black" />
          </TouchableOpacity>
          {expandedSection === 2 && (
            <View style={tw`p-4`}>
              <Text style={tw`text-base text-black mb-3 text-justify`}>
              Los datos personales recabados serán tratados de manera encriptada y segura, de modo que no tendremos acceso directo a ellos. Su propósito exclusivo será facilitar que los docentes mantengan un mejor control de sus documentos y del proceso de promoción docente
              </Text>
            </View>
          )}

          {/* Sección 6: Modificaciones al Aviso de Privacidad */}
          <TouchableOpacity onPress={() => toggleSection(6)} style={tw`flex-row justify-between items-center py-3 border-b border-gray-300`}>
            <Text style={tw`text-lg font-bold text-black`}>Modificaciones al Aviso de Privacidad</Text>
            <Ionicons name={expandedSection === 6 ? "chevron-up-outline" : "chevron-down-outline"} size={24} color="black" />
          </TouchableOpacity>
          {expandedSection === 6 && (
            <View style={tw`p-4`}>
              <Text style={tw`text-base text-black mb-3 text-justify`}>
                Cualquier modificación será notificada a través de la aplicación con anticipación para que sea de su consentimiento.
              </Text>
            </View>
          )}

          {/* Sección 7: Consentimiento */}
          <TouchableOpacity onPress={() => toggleSection(7)} style={tw`flex-row justify-between items-center py-3 border-b border-gray-300`}>
            <Text style={tw`text-lg font-bold text-black`}>Consentimiento</Text>
            <Ionicons name={expandedSection === 7 ? "chevron-up-outline" : "chevron-down-outline"} size={24} color="black" />
          </TouchableOpacity>
          {expandedSection === 7 && (
            <View style={tw`p-4`}>
              <Text style={tw`text-base text-black mb-3 text-justify`}>
                Al proporcionar sus datos personales, usted acepta los términos de este aviso de privacidad y otorga su consentimiento para el tratamiento de los mismos conforme a las finalidades descritas.
              </Text>
            </View>
          )}

          {/* Sección 8: Base Legal */}
          <TouchableOpacity onPress={() => toggleSection(8)} style={tw`flex-row justify-between items-center py-3 border-b border-gray-300`}>
            <Text style={tw`text-lg font-bold text-black`}>Base Legal</Text>
            <Ionicons name={expandedSection === 8 ? "chevron-up-outline" : "chevron-down-outline"} size={24} color="black" />
          </TouchableOpacity>
          {expandedSection === 8 && (
            <View style={tw`p-4`}>
              <Text style={tw`text-base text-black mb-3 text-justify`}>
                Este aviso se fundamenta en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y sus disposiciones reglamentarias en México.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default PrivacyScreen;