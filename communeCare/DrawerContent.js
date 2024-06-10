import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.drawerTitle}>CommuneCare</Text>
        <DrawerItemList {...props} style={styles.drawerItemList} />
        <Text style={styles.version}>Версия 1.0.1</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  drawerTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  drawerItemList: {
    marginBottom: 20, // Увеличиваем отступ снизу
  },
  version: {
    position: 'absolute',
    bottom: -1, // Расположить текст версии немного выше, чтобы он не был прямо у края экрана
    left: 16,
  },
});

export default DrawerContent;
