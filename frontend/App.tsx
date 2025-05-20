import './global.css';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { Home } from './screens/Home';
import { Login } from 'screens/Login';
import { OnBoarding } from 'screens/OnBoarding';
import { Register } from 'screens/Register';
import { Orgs } from 'screens/Orgs';
import StudentScreen from 'screens/StudentOrAdminScreen';
import { AdminProfile } from 'screens/AdminProfile';
import { UserProfile } from 'screens/UserProfile';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Orgs" component={Orgs} options={{ headerShown: false }} />
        <Stack.Screen name="SoA" component={StudentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminProfile" component={AdminProfile} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
