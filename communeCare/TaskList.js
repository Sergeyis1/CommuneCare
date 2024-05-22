import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Список задач</Text>
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
  },
});

export default TaskList;