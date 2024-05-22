import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Ionicons 
        name="menu" 
        size={32} 
        color="black" 
        onPress={() => navigation.toggleDrawer()} 
        style={styles.menuButton} 
      />
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
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default Main;
