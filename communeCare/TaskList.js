import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const TaskList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Список задач</Text>
    </View>
  );
};

const getResidentData = async (residentID) => {
  try {
    const residentDoc = await firestore().collection('Residents').doc(residentID).get();
    const residentData = residentDoc.data();

    const floorRef = residentData.Floors;
    const roomRef = residentData.Room;

    const floorDoc = await floorRef.get();
    const roomDoc = await roomRef.get();

    console.log('Resident Data:', residentData);
    console.log('Floor Data:', floorDoc.data());
    console.log('Room Data:', roomDoc.data());
  } catch (error) {
    console.error('Error getting documents:', error);
  }
};

getResidentData('residentID_1');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default TaskList;