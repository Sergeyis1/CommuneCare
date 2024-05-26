import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from './App';

const ResidentList = () => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        // Получаем все документы из коллекции "Residents"
        const residentsCollection = collection(firestore, 'Residents');
        const snapshot = await getDocs(query(residentsCollection, orderBy('Room', 'asc')));
        
        // Преобразуем данные в массив объектов
        const residentList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Обновляем состояние
        setResidents(residentList);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Список жильцов</Text>
      {residents.map(resident => (
        <View key={resident.id} style={styles.residentContainer}>
          <Text>Имя: {resident.Name}</Text>
          <Text>Этаж: {resident.Floor}</Text>
          <Text>Комната: {resident.Room}</Text>
          {/* Дополнительные данные о жильце, если необходимо */}
        </View>
      ))}
    </ScrollView>
  );
};

export default ResidentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  residentContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

