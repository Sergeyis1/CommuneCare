import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Post = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Текущая должность</Text>
      <Text style={styles.text}>Ваша должность: ...</Text>
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
  },
});

export default Post;
