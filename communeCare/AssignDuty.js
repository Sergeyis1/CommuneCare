import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Button, TouchableOpacity, TextInput } from 'react-native';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from './firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const AssignDuty = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleAssignDuty = async () => {
    try {
      await addDoc(collection(firestore, 'Duties'), {
        room: selectedRoom,
        startDate: startDate,
        endDate: endDate,
        timestamp: serverTimestamp(),
      });

      scheduleNotification(selectedRoom, startDate, endDate);

      console.log('Дежурство успешно назначено.');
    } catch (error) {
      console.error('Ошибка при назначении дежурства:', error);
    }
    setShowModal(false);
  };

  const scheduleNotification = (room, startDate, endDate) => {
    const notificationTime = new Date(endDate);
    notificationTime.setHours(14, 12, 0, 0); // Установить время на 21:00

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Напоминание о дежурстве',
        body: `Комната ${room} должна продежурить с ${startDate.toLocaleDateString()} по ${endDate.toLocaleDateString()}.`,
      },
      trigger: notificationTime,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Назначение дежурства</Text>
      <ScrollView>
        {rooms.map(room => (
          <TouchableOpacity
            key={room}
            style={styles.roomContainer}
            onPress={() => {
              setSelectedRoom(room);
              setShowModal(true);
            }}
          >
            <Text style={styles.roomText}>Комната: {room}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {showModal && (
        <Modal
        visible={showModal}
        transparent={true}
        animationType="fade" // Изменить тип анимации на fade
        onRequestClose={() => setShowModal(false)}
      >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Назначение дежурства для комнаты {selectedRoom}</Text>
              <View style={styles.datePickerContainer}>
                <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                  <Text style={styles.datePickerText}>Дата начала: {startDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showStartPicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      setShowStartPicker(false);
                      if (date) setStartDate(date);
                    }}
                  />
                )}
              </View>
              <View style={styles.datePickerContainer}>
                <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                  <Text style={styles.datePickerText}>Дата окончания: {endDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showEndPicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      setShowEndPicker(false);
                      if (date) setEndDate(date);
                    }}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
              <Button title="Назначить" onPress={handleAssignDuty} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Отмена" onPress={() => setShowModal(false)} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff', // Изменить цвет фона на белый
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000', // Добавить цвет тени
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 10, // Добавить отступ сверху
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default AssignDuty;
