import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { Home } from './screens/Home';
import { Login } from './screens/Login';
import { OnBoarding } from './screens/OnBoarding';
import { Register } from './screens/Register';
import { Orgs } from './screens/Orgs';
import StudentScreen from './screens/StudentOrAdminScreen';
import Adminpage from './screens/CocsAdminpage';
import Profile from './screens/Profile';
import ForAllpage from './screens/ForAllpage';
import CocsAdminpage from './screens/CocsAdminpage';
import CocsChat from './screens/CocsChat';

import CocsForAllpage from './screens/UserForAllpage';
import CocsUserChat from './screens/CocsUserChat';
import CocsUserMessage from './screens/CocsUserMessage';
import Create from './features/createpost';
import ProfileS from './screens/StudentProfile';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Orgs: undefined;
  SoA: undefined;
  Adminpage: undefined;
  ProfileStudent: undefined;
  Create: undefined;
  Profile: undefined;
  ForAllpage: undefined;
  CocsAdminpage: undefined;
  CocsChat: undefined;
  CocsUserpage: undefined;
  CocsForAllpage: undefined;
  CocsUserChat: undefined;
  CocsUserMessage: {
    author: string;
    timestamp: string;
    body1: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CocsUserpage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Orgs" component={Orgs} />
        <Stack.Screen name="SoA" component={StudentScreen} />
        <Stack.Screen name="Adminpage" component={Adminpage} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileStudent" component={ProfileS} />
        <Stack.Screen name="CocsAdminpage" component={CocsAdminpage} />
        <Stack.Screen name="CocsChat" component={CocsChat} />
        <Stack.Screen name="CocsForAllpage" component={CocsForAllpage} />
        <Stack.Screen name="CocsUserChat" component={CocsUserChat} />
        <Stack.Screen name="CocsUserMessage" component={CocsUserMessage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
