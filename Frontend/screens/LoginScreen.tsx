import { Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { CustomButton } from 'components/CustomButton';
import { useState, useEffect } from 'react';
import { auth, signInWithCustomToken, signInWithEmailAndPassword } from '../firebase';
import Modal from 'react-native-modal';
const logo = require('../assets/logo-2.png');
const google = require('../assets/google.png');

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !pass.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      console.log('Logging in with:', email, pass);
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), pass.trim());

      console.log('Login Successful:', userCredential.user);

      // Fetch Firebase ID Token
      const idToken = await userCredential.user.getIdToken();
      console.log('Firebase ID Token:', idToken);

      // Send Token to Backend
      const response = await fetch('http://192.168.1.21:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Logged in successfully');
        console.log('Backend Token:', data.token);
        navigation.reset({
          index: 0, // Make sure to reset the stack to the first screen
          routes: [{ name: 'Home' }], // Navigate to Home after successful login
        });
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      console.error('Firebase Login Error:', error.code, error.message);

      let errorMessage = 'Login failed. Please try again.';
      if (error.code === 'auth/invalid-credential') errorMessage = 'Invalid email or password.';
      else if (error.code === 'auth/user-not-found') errorMessage = 'User does not exist.';
      else if (error.code === 'auth/wrong-password') errorMessage = 'Incorrect password.';
      else if (error.code === 'auth/too-many-requests')
        errorMessage = 'Too many failed attempts. Try again later.';

      Alert.alert('Login Error', errorMessage);
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-[9] bg-white">
        <View className="h-full w-full items-center justify-center rounded-b-[150px] bg-darkBlue">
          {/* Logo Section */}
          <View>
            <Image source={logo} style={{ width: 150, height: 150 }} />
          </View>

          {/* Email Input */}
          <Text className="mx-12 my-3 self-start text-[14px] color-white">Email</Text>
          <TextInput
            style={{
              width: '80%',
              height: '7%',
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
          />

          {/* Password Input */}
          <Text className="mx-12 my-3 self-start text-[14px] color-white">Password</Text>
          <TextInput
            style={{
              width: '80%',
              height: '7%',
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            placeholder="Enter Password"
            value={pass}
            onChangeText={setPass}
            secureTextEntry={true}
          />

          {/* Forgot Password */}
          <TouchableOpacity
            className="mx-12 my-3 self-start"
            onPress={() => Alert.alert('Notice', 'This feature is still under development')}>
            <Text style={{ color: '#BDC3C7' }}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <View className="w-full">
            <CustomButton
              onPress={() => handleLogin()}
              title="Login"
              backgroundColor="#FFFFFF"
              titleColor="#003A6C"
              height={40}
              width="80%"
              margin={10}
            />
          </View>

          {/* Divider */}

          <View className="my-4 flex-row items-center">
            <View className="h-px w-1/4 bg-white" />
            <Text className="mx-2 text-sm text-white">Or</Text>
            <View className="h-px w-1/4 bg-white" />
          </View>

          {/* Google Button */}
          <View className="w-full">
            <CustomButton
              onPress={() => handleLogin()}
              title="Continue with Google"
              backgroundColor="#FFFFFF"
              titleColor="#003A6C"
              height={40}
              width="80%"
              margin={10}
              icon={<Image source={google} style={{ width: 24, height: 24 }} />}
            />
          </View>
        </View>
      </View>

      <View className="flex-[1] flex-row items-center justify-center bg-white">
        <Text>Don't Have An account? </Text>
        <TouchableOpacity className="mx-1" onPress={() => navigation.navigate('Student')}>
          <Text style={{ textDecorationLine: 'underline' }}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
