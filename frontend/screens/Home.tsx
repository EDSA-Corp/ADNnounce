import { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'
import { Button } from 'components/Button';
import axios from 'axios';
import { API_BASE_URL } from 'utils/config';
import { UserScreen } from './UserScreen';
import { AdminScreen } from './AdminScreen';
import LoadingModal from 'components/LoadingModal';

export const Home = () => {
  const navigation = useNavigation();
  const [decoded, setDecoded] = useState({})
  const [org, setOrg] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getToken = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token !== null) {
          console.log("✅ Successfully retrieved")
          setDecoded(jwtDecode(token))
          console.log(token)
          return jwtDecode(token);
        }
      } catch (error) {
        alert('No tokens provided')
           navigation.dispatch( CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}]
          }))
      }finally{
        setLoading(false)
      }
    };

    
  
    getToken().then(res => {
      console.log('hello', res)
      const getUserOrg = async () => {
        axios.get(`${API_BASE_URL}userOrg?orgAbbr=${res.organization.orgAbbr}`)
         .then(res => {
          console.log("Successfully retrieved organization✅")
          setOrg(res.data.data)
         })
         .catch(err => {
          console.log(err)
         })
      }


    getUserOrg();

    })
  },[])


  if (loading) {
    return <LoadingModal isVisible={loading} />;
  }

  console.log(org)
  let admin = false;

  try{
    console.log(org)
    org.OrgAdmins.forEach(e => {
      console.log(e)
      if(e === decoded.email){
        admin= true;
        return;
      } 
    })
  }catch(err){
    console.log(err)
  }


  //Logout
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setDecoded({});
      console.log('✅ Token removed successfully');
      alert('Logged Out')
    } catch (error) {
      console.error('❌ Failed to remove token', error);
    }
  };

  console.log('---------------', decoded, decoded.hasOwnProperty('key'))

  return(decoded.hasOwnProperty('key') && (admin === true) ? <AdminScreen org={org} decoded={decoded}/> : <UserScreen org={org} decoded={decoded}/> )




};
