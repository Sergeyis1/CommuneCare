import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebaseConfig';
import withPullToRefresh from './withPullToRefresh';

const fetchUserRole = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const usersCollection = collection(firestore, 'Users');
    const q = query(usersCollection, where('Почта', '==', user.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData.Должность || 'Должность не указана';
    } else {
      return 'Пользователь не найден';
    }
  } else {
    return null;
  }
};

const TaskList = ({ userRole, setUserRole }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await fetchUserRole();
        setUserRole(role);
      } catch (error) {
        console.error('Ошибка при получении должности пользователя:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [setUserRole]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!userRole || userRole === 'Должность не указана' || userRole === 'Пользователь не найден') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Вы не обладаете нужными правами доступа! Обратитесь к администратору.</Text>
      </View>
    );
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

const TaskListWithPullToRefresh = withPullToRefresh((props) => {
  const [userRole, setUserRole] = useState(null);

  return <TaskList {...props} userRole={userRole} setUserRole={setUserRole} />;
});

export default TaskListWithPullToRefresh;
