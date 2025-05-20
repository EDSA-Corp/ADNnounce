import { Text, TouchableOpacity, View, Image, Alert, TextInput } from 'react-native';
import { useState } from 'react';
import { CustomButton } from 'components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../utils/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingModal from 'components/LoadingModal';

// Images
const logo = require('../assets/logo-2.png');
const google = require('../assets/google.png');

export const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false);

  const ipAdd = API_BASE_URL;
  console.log(API_BASE_URL)

  const sendData = async () => {
    setLoading(true)
    try {
      const res = await axios.post(ipAdd + 'login', {
        email: email,
        password: pass,
      });

      const data = res.data;

      if (data.code !== 'error') {
        const decoded = jwtDecode(data.token);

        await AsyncStorage.setItem('authToken', data.token);
        console.log('✅ Token stored successfully');

        Alert.alert('Success', 'Successful login');
        console.log(decoded);

        navigation.navigate('Home');
        // navigation.navigate('Orgs', { orgAbbr: 'All', orgName: 'All' });
      } else {
        if (data.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          Alert.alert('Error', 'Too many login attempts. Please try again later.');
        } else if (data.message === 'INVALID_LOGIN_CREDENTIALS') {
          Alert.alert('Error', 'Invalid Credentials. Please try again.');
        }if(data.message === 'Credential implementation provided to initializeApp() via the "credential" property failed to fetch a valid Google OAuth2 access token with the following error: "request to https://www.googleapis.com/oauth2/v4/token failed, reason: getaddrinfo ENOTFOUND www.googleapis.com".'){
          Alert.alert('Error', "Internet is Unavailable Please try again later")
        } else {
          Alert.alert('Error', data.message);
        }
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'An unexpected error occurred.');
    }finally{
      setLoading(false)
    }
  };

  if(loading){
    return <LoadingModal></LoadingModal>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Logo (if needed above header) */}
      {/* <Image source={logo} /> */}

      <View style={{ flex: 9, backgroundColor: 'white' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomLeftRadius: 150,
            borderBottomRightRadius: 150,
            backgroundColor: '#003A6C',
          }}>
          {/* Logo */}
          <Image source={logo} style={{ width: 150, height: 150, marginBottom: 20 }} />

          {/* Email */}
          <Text
            style={{ alignSelf: 'flex-start', marginLeft: 40, marginBottom: 5, color: 'white' }}>
            Email
          </Text>
          <TextInput
            style={{
              width: '80%',
              height: 45,
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

          {/* Password */}
          <Text
            style={{ alignSelf: 'flex-start', marginLeft: 40, marginVertical: 10, color: 'white' }}>
            Password
          </Text>
          <TextInput
            style={{
              width: '80%',
              height: 45,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            value={pass}
            onChangeText={setPass}
            placeholder="Enter Password"
            secureTextEntry
          />

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => Alert.alert('Notice', 'This feature is still under development')}
            style={{ alignSelf: 'flex-start', marginLeft: 40, marginTop: 10 }}>
            <Text style={{ color: '#BDC3C7' }}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <CustomButton
              onPress={sendData}
              title="Login"
              backgroundColor="#FFFFFF"
              titleColor="#003A6C"
              height={50}
              width="300"
              borderRadius={20}
            />
          </View>

          {/* Divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View style={{ height: 1, width: '25%', backgroundColor: 'white' }} />
            <Text style={{ color: 'white', marginHorizontal: 10 }}>Or</Text>
            <View style={{ height: 1, width: '25%', backgroundColor: 'white' }} />
          </View>

          {/* Google Button */}
          <View style={{ width: '100%', alignItems: 'center' }}>
            <CustomButton
              onPress={() => Alert.alert('Notice', 'This feature is still under development')}
              title="Continue with Google"
              backgroundColor="#FFFFFF"
              titleColor="#003A6C"
              height={50}
              width="300"
              borderRadius={20}
              icon={<Image source={google} style={{ width: 24, height: 24 }} />}
            />
          </View>
        </View>
      </View>

      {/* Bottom Registration Prompt */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Text>Don't Have An Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SoA')}>
          <Text style={{ textDecorationLine: 'underline' }}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
