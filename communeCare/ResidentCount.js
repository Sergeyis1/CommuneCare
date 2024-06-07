import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from './firebaseConfig';
import { Checkbox } from 'expo-checkbox';

const ResidentList = () => {
  const [residents, setResidents] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentsCollection = collection(firestore, 'Residents');
        const snapshot = await getDocs(query(residentsCollection, orderBy('Room', 'asc')));
        const residentList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const initialCheckedState = residentList.reduce((acc, resident) => {
          acc[resident.id] = false;
          return acc;
        }, {});
        setCheckedState(initialCheckedState);
        setResidents(residentList);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };
    fetchResidents();
  }, []);

  const handleCheckboxChange = (id) => {
    setCheckedState(prevState => {
      const updatedState = { ...prevState, [id]: !prevState[id] };
      return updatedState;
    });
  };

  const handleFinishCheck = () => {
    const selectedCount = Object.values(checkedState).filter(Boolean).length;
    setCount(selectedCount);
    setShowModal(true);
  };

  const handleSaveReport = async () => {
    try {
      await addDoc(collection(firestore, 'Reports'), {
        date: serverTimestamp(),
        type: 'Проверка численности',
        results: checkedState,
        count: count
      });
      console.log('Отчет успешно сохранен.');
    } catch (error) {
      console.error('Ошибка при сохранении отчета:', error);
    }
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Список жильцов</Text>
        {residents.map(resident => (
          <View key={resident.id} style={styles.residentContainer}>
            <View style={styles.residentInfo}>
              <Text>Имя: {resident.Name}</Text>
              <Text>Этаж: {resident.Floor}</Text>
              <Text>Комната: {resident.Room}</Text>
            </View>
            <Checkbox
              value={checkedState[resident.id]}
              onValueChange={() => handleCheckboxChange(resident.id)}
              style={styles.checkbox}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFinishCheck}>
          <Text style={styles.buttonText}>Завершить проверку</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Результат подсчета жителей:</Text>
            <Text style={styles.modalCount}>В общежитии {count} человек</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSaveReport}>
                <Text style={styles.buttonText}>Сохранить отчет</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setShowModal(false)}>
                <Text style={styles.buttonText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  residentInfo: {
    flex: 1,
  },
  checkbox: {
    transform: [{ scale: 1.5 }],
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
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  modalCount: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    width: '70%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#e53935',
  },
});
