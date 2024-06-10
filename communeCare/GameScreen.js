import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const GameScreen = () => {
  const [clickCount, setClickCount] = useState(0);
  const [speed, setSpeed] = useState(1000); // Начальная скорость перемещения (в мс)
  const [position, setPosition] = useState(new Animated.ValueXY({ x: width / 2 - 50, y: height / 2 - 50 }));

  useEffect(() => {
    const interval = setInterval(() => {
      moveLogo();
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  useEffect(() => {
    if (clickCount >= 80) {
      setSpeed(500);
    } else if (clickCount >= 40) {
      setSpeed(750);
    } else if (clickCount >= 20) {
      setSpeed(900);
    }
  }, [clickCount]);

  const moveLogo = () => {
    const newX = Math.random() * (width - 100);
    const newY = Math.random() * (height - 100);
    Animated.spring(position, {
      toValue: { x: newX, y: newY },
      useNativeDriver: false,
    }).start();
  };

  const handleLogoPress = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, position.getLayout()]}>
        <TouchableOpacity onPress={handleLogoPress}>
          <View style={styles.logo} />
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.clickCountText}>Клики: {clickCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    position: 'absolute',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007BFF',
  },
  clickCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
});

export default GameScreen;
