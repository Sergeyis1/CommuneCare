import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebaseConfig';



const Post = () => {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (user) {
          const usersCollection = collection(firestore, 'Users');
          const q = query(usersCollection, where('Почта', '==', user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setRole(userData.Должность || 'Должность не указана');
          } else {
            setRole('Пользователь не найден');
          }
        }
      } catch (error) {
        console.error('Ошибка при получении должности пользователя:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);



  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Текущая должность</Text>
      <Text style={styles.text}>Ваша должность: {role}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Post;
