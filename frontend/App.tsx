import './global.css';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { Home } from './screens/Home';
import { Login } from 'screens/Login';
import { OnBoarding } from 'screens/OnBoarding';
import { Register } from 'screens/Register';
import { Orgs } from 'screens/Orgs';
import StudentScreen from 'screens/StudentOrAdminScreen';
import Adminpage from 'screens/CocsAdminpage';
import Profile from 'screens/Profile';
import ForAllpage from 'screens/ForAllpage';
import CocsAdminpage from 'screens/CocsAdminpage';
import CocsChat from 'screens/CocsChat';

import Create from 'features/createpost';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Adminpage">
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Orgs" component={Orgs} options={{ headerShown: false }} />
        <Stack.Screen name="SoA" component={StudentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Adminpage" component={Adminpage} options={{ headerShown: false }} />
        <Stack.Screen name="Create" component={Create} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="ForAllpage" component={ForAllpage} options={{ headerShown: false }} />
        <Stack.Screen name="CocsAdminpage" component={CocsAdminpage} options={{ headerShown: false }} />
        <Stack.Screen name="CocsChat" component={CocsChat} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
