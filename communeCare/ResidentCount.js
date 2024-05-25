import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firestore } from './App';
import { collection, getDocs } from 'firebase/firestore';

const ResidentCount = () => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentsCollection = collection(firestore, 'Residents');
        const residentSnapshot = await getDocs(residentsCollection);
        const residentCount = residentSnapshot.size; // Получаем количество документов в коллекции

        setCount(residentCount);
      } catch (error) {
        setError('Error fetching residents');
        console.error('Error fetching residents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Общее количество жителей:</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

export default ResidentCount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
  count: {
    fontSize: 48,
    color: 'black',
  },
});
