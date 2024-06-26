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
import GameScreen from './GameScreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



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
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Игра' }} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
