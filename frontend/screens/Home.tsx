import { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'
import { Button } from 'components/Button';
import axios from 'axios';

export const Home = () => {
  const navigation = useNavigation();
  const [decoded, setDecoded] = useState({})

  const orgs = ['COCS', 'ABBS', 'AJMA', 'APSA'];



  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token !== null) {
          console.log("✅ Successfully retrieved")
          setDecoded(jwtDecode(token))
          return jwtDecode(token);
        }
      } catch (error) {
        alert('No tokens provided')
           navigation.dispatch( CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}]
          }))
      }
    };
  
    getToken()
   
  
  },[])


  

  

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setDecoded({});
      console.log('✅ Token removed successfully');
    } catch (error) {
      console.error('❌ Failed to remove token', error);
    }
  };
  

    //DITO LANG FRONT END 
  return (
    <SafeAreaView  >
        <Text className='text-4xl text-center'>This is home screen</Text>
        <Text>Email: {decoded.email}</Text>
        <Button title='HOME' onPress={() => {navigation.navigate('Home')} }></Button>
        <Button title='OTHERS' onPress={() => {navigation.navigate('Orgs', {orgId: 'All', OrgAbbr:'All'})}}></Button>

        <Button title='Logout' onPress={() => {
          removeToken();
        }}></Button>
    </SafeAreaView>
  );
};
