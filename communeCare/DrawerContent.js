import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.drawerTitle}>CommuneCare</Text>
        <DrawerItemList {...props} />
        <Text style={styles.version}>Версия 1.0.0</Text>
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
  version: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
});

export default DrawerContent;
