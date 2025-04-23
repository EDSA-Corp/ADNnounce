import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './global.css';
import { HomeScreen } from 'screens/HomeScreen';
import { LoginScreen } from 'screens/LoginScreen';
import { RegisterAdminScreen } from 'screens/RegisterAdminScreen';
import { OnBoardingScreen } from 'screens/OnBoardingScreen';
import { RegisterScreen } from 'screens/RegisterScreen';
import StudentScreen from 'screens/StudentOrAdminScreen';

import { auth, onAuthStateChanged } from './firebase';
import React, { useState, useEffect } from 'react';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // to manage loading state

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log('User is logged in:', user.email);
      } else {
        setUser(null);
      }
      setLoading(false); // set loading to false after auth state is determined
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Optionally return a loading screen or just null
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // If user is logged in, show HomeScreen
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // If user is not logged in, show OnBoarding, Login, or Register
          <>
            <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="AdminRegister" component={RegisterAdminScreen} />
            <Stack.Screen name="Student" component={StudentScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
