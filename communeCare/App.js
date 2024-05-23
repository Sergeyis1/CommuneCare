import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import WelWin from './WelWin';
import Login from './Login';
import Main from './Main';
import AboutUs from './AboutUs';
import Post from './Post';
import Settings from './Settings';
import TaskList from './TaskList';
import DrawerContent from './DrawerContent';
import { initializeApp } from 'firebase/app';
import { Ionicons } from '@expo/vector-icons';

const firebaseConfig = {
  apiKey: "AIzaSyDjpaGjVPhkTe-EYaT9cGPtUg_q5VfTnYU",
  authDomain: "communecare121.firebaseapp.com",
  projectId: "communecare121",
  storageBucket: "communecare121.appspot.com",
  messagingSenderId: "476585888476",
  appId: "1:476585888476:Android:3e5c9f7b73b5ffd1908219"
};
const app = initializeApp(firebaseConfig);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Main" component={Main} options={{ title: 'Домашняя странца' }} />
      <Drawer.Screen name="TaskList" component={TaskList} options={{ title: 'Список задач' }} />
      <Drawer.Screen name="Post" component={Post} options={{ title: 'Должность' }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ title: 'Настройки' }} />
      <Drawer.Screen name="AboutUs" component={AboutUs} options={{ title: 'О нас' }} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelWin">
        <Stack.Screen name="WelWin" component={WelWin} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
