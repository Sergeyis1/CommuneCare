import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('./assets/Icon.jpeg')} style={styles.icon} />
      <Text style={styles.heading}>Добро пожаловать в CommuneCare</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100, // Укажите ширину изображения
    height: 100, // Укажите высоту изображения
    marginBottom: 20, // Добавьте отступ, если необходимо
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default Main;
