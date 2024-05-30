import React, {useEffect} from 'react';
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
import AssignDuty from './AssignDuty';
import ResidentCount from './ResidentCount';
import DrawerContent from './DrawerContent';
import SanitaryCheck from './SanitaryCheck';
import ReportList from './ReportList';
import * as Notifications from 'expo-notifications';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
}

registerForPushNotificationsAsync();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Main" component={Main} options={{ title: 'Домашняя страница' }} />
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
        <Stack.Screen name="ResidentCount" component={ResidentCount} options={{ title: 'Проверка численности' }} />
        <Stack.Screen name="SanitaryCheck" component={SanitaryCheck} options={{ title: 'Санитарная проверка' }} />
        <Stack.Screen name="ReportList" component={ReportList} options={{ title: 'Список отчетов' }} />
        <Stack.Screen name="AssignDuty" component={AssignDuty} options={{ title: 'Назначение дежурства' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;