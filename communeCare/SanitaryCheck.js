import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Button } from 'react-native';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from './firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'expo-checkbox';

const SanitaryCheck = () => {
  const [rooms, setRooms] = useState([]);
  const [ratings, setRatings] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reasons, setReasons] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const residentsCollection = collection(firestore, 'Residents');
        const snapshot = await getDocs(residentsCollection);
        const roomList = snapshot.docs.map(doc => doc.data().Room);
        setRooms([...new Set(roomList)].sort());
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const handleRatingChange = (room, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [room]: rating
    }));
    if (rating < 5) {
      setSelectedRoom(room);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleReasonChange = (reason) => {
    setReasons(prevReasons => {
      const newReasons = [...prevReasons];
      if (newReasons.includes(reason)) {
        return newReasons.filter(r => r !== reason);
      } else {
        return [...newReasons, reason];
      }
    });
  };

  const handleSaveReport = async () => {
    try {
      await addDoc(collection(firestore, 'Reports'), {
        date: serverTimestamp(),
        type: 'Санитарная проверка',
        ratings: ratings,
        reasons: reasons
      });
      console.log('Отчет успешно сохранен.');
    } catch (error) {
      console.error('Ошибка при сохранении отчета:', error);
    }
    setShowSaveModal(false);
  };

  const handleFinishCheck = () => {
    setShowSaveModal(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Санитарная проверка</Text>
        {rooms.map(room => (
          <View key={room} style={styles.roomContainer}>
            <Text style={styles.roomText}>Комната: {room}</Text>
            <Picker
              selectedValue={ratings[room]}
              style={styles.picker}
              onValueChange={(itemValue) => handleRatingChange(room, itemValue)}
            >
              <Picker.Item label="5" value={5} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="1" value={1} />
            </Picker>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Завершить проверку" onPress={handleFinishCheck} />
      </View>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Причина снижения оценки для комнаты {selectedRoom}</Text>
            <Text style={styles.modalText}>Пожалуйста, выберите причину снижения оценки:</Text>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={reasons.includes("Грязная комната")}
                onValueChange={() => handleReasonChange("Грязная комната")}
              />
              <Text style={styles.checkboxLabel}>Грязная комната</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={reasons.includes("Неприятный запах")}
                onValueChange={() => handleReasonChange("Неприятный запах")}
              />
              <Text style={styles.checkboxLabel}>Неприятный запах</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={reasons.includes("Наличие мусора")}
                onValueChange={() => handleReasonChange("Наличие мусора")}
              />
              <Text style={styles.checkboxLabel}>Наличие мусора</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={reasons.includes("Плохая вентиляция")}
                onValueChange={() => handleReasonChange("Плохая вентиляция")}
              />
              <Text style={styles.checkboxLabel}>Плохая вентиляция</Text>
            </View>
            <Button title="Подтвердить" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
      <Modal
        visible={showSaveModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Завершить проверку</Text>
            <Text style={styles.modalText}>Вы уверены, что хотите завершить проверку и сохранить отчет?</Text>
            <Button title="Сохранить отчет" onPress={handleSaveReport} />
            <Button title="Отмена" onPress={() => setShowSaveModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SanitaryCheck;

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
  roomContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roomText: {
    flex: 1,
  },
  picker: {
    width: 100,
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
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
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
});
