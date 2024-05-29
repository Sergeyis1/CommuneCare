import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const AboutUs = () => {
  const handlePress = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  const handleEmailPress = () => {
    const email = 'forcebeet1@gmail.com';
    const subject = 'Contact Us';
    const body = 'Здравствуйте, ';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>О нас</Text>
      <Text style={styles.contactText}>Для связи с нами, пишите на:</Text>
      <TouchableOpacity onPress={handleEmailPress}>
        <Text style={styles.email}>forcebeet1@gmail.com</Text>
      </TouchableOpacity>
      
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => handlePress('https://t.me/givefuck0ff')} style={styles.iconButton}>
          <FontAwesome5 name="telegram" size={30} color="#0088cc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('https://vk.com/givefuck1')} style={styles.iconButton}>
          <Ionicons name="logo-vk" size={30} color="#4c75a3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    color: '#1e90ff',
    textDecorationLine: 'underline',
    marginBottom: 20,
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconButton: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 50,
  },
});

export default AboutUs;
