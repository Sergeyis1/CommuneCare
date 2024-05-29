import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Settings = () => {
  const [themeColor, setThemeColor] = useState('blue');
  const [textSize, setTextSize] = useState('medium');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const navigation = useNavigation();

  const handleThemeChange = (color) => {
    setThemeColor(color);
    // Здесь можно сохранить цвет темы в AsyncStorage или другом месте для сохранения состояния
  };

  const handleTextSizeChange = (size) => {
    setTextSize(size);
    // Здесь можно сохранить размер текста в AsyncStorage или другом месте для сохранения состояния
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
    // Здесь можно сохранить состояние уведомлений в AsyncStorage или другом месте для сохранения состояния
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColor === 'blue' ? '#cce7ff' : themeColor === 'green' ? '#ccffcc' : '#ffcccc' }]}>
      <Text style={styles.title}>Настройки</Text>
      
      <Text style={styles.label}>Цвет темы настроек</Text>
      <Picker
        selectedValue={themeColor}
        style={styles.picker}
        onValueChange={(itemValue) => handleThemeChange(itemValue)}
      >
        <Picker.Item label="Синий" value="blue" />
        <Picker.Item label="Зеленый" value="green" />
        <Picker.Item label="Красный" value="red" />
      </Picker>

      <Text style={styles.label}>Размер текста</Text>
      <Picker
        selectedValue={textSize}
        style={styles.picker}
        onValueChange={(itemValue) => handleTextSizeChange(itemValue)}
      >
        <Picker.Item label="Маленький" value="small" />
        <Picker.Item label="Средний" value="medium" />
        <Picker.Item label="Большой" value="large" />
      </Picker>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Уведомления</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleToggleNotifications}
        />
      </View>
      
      <Button
        title="Сохранить"
        onPress={() => alert('Настройки сохранены!')}
        color={themeColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default Settings;
