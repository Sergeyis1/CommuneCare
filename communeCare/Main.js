import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, BackHandler, Modal, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Main = ({ navigation }) => {
  const [exitModalVisible, setExitModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        setExitModalVisible(true);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  const handleExit = () => {
    BackHandler.exitApp();
  };

  const handleCancel = () => {
    setExitModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/IconLogo.png')} style={styles.icon} />

      <Modal
        visible={exitModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Вы хотите выйти из приложения?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.exitButton]} onPress={handleExit}>
                <Text style={styles.buttonText}>Да</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Нет</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  icon: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  exitButton: {
    backgroundColor: '#d9534f',
  },
  cancelButton: {
    backgroundColor: '#5bc0de',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Main;
