import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firestore } from './App';
import { doc, getDoc } from 'firebase/firestore';

const TaskList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем документ жителя
        const residentDoc = await getDoc(doc(firestore, 'Residents', 'residentID_3'));
        if (!residentDoc.exists()) {
          console.log('No such resident!');
          return;
        }
        
        const residentData = residentDoc.data();
        const floorId = residentData.Floor;
        const roomId = residentData.Room;

        // Получаем документ этажа
        const floorDoc = await getDoc(doc(firestore, 'Floors', floorId));
        if (!floorDoc.exists()) {
          console.log('No such floor!');
          return;
        }

        // Получаем документ комнаты
        const roomDoc = await getDoc(doc(firestore, 'Rooms', roomId));
        if (!roomDoc.exists()) {
          console.log('No such room!');
          return;
        }

        // Объединяем данные
        setData({
          resident: residentData,
          floor: floorDoc.data(),
          room: roomDoc.data(),
        });
      } catch (error) {
        console.error('Error getting documents:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Resident: {data.resident.Name}</Text>
      <Text>Floor: {data.floor.Num}</Text>
      <Text>Room: {data.room.Num}</Text>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  // Add your styles here if needed
});
