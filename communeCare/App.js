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
import { NotificationsProvider } from './NotificationsProvider';
export const projectId = "5db8dd84-c55c-4d58-b1f3-4623992891cc";

export async function getOrRegisterPushToken() {
  
  const { status } = await Notifications.getPermissionsAsync()
  console.log('====================================');
  console.log(status);
  console.log('====================================');
  if (status === "granted") {
    alert("asdjakl")
      const token = await Notifications.getExpoPushTokenAsync({
          projectId
      });
      console.log('====================================');
      console.log(token);
      console.log('====================================');
      //const token = await Notifications.getDevicePushTokenAsync()
      return token.data;
  }
  return false
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const initNotificationChannel = () => {
  if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
      });
  }
}
export const initNotificationsListen = () => {
  Notifications.setNotificationHandler({
      handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
      }),
  });
  Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
  initNotificationChannel()
}

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
      <NotificationsProvider/>
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
