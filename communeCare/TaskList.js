import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

const TaskList = () => {
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const usersCollection = collection(firestore, 'Users');
          const q = query(usersCollection, where('Почта', '==', user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserRole(userData.Должность || 'Должность не указана');
          } else {
            setUserRole('Пользователь не найден');
          }
        }
      } catch (error) {
        console.error('Ошибка при получении должности пользователя:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [auth]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваш список задач:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ResidentCount')}
        >
          <Text style={styles.buttonText}>Проверка численности</Text>
        </TouchableOpacity>
        {userRole !== 'Воспитатель' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SanitaryCheck')}
          >
            <Text style={styles.buttonText}>Санитарная проверка</Text>
          </TouchableOpacity>
        )}
        {userRole === 'Воспитатель' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AssignDuty')}
          >
            <Text style={styles.buttonText}>Назначить дежурство</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ReportList')}
        >
          <Text style={styles.buttonText}>Список отчетов</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  button: {
    width: '90%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskList;
