import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OrgSelector } from 'components/OrgSelector';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'components/Button';

export const Orgs = () => {
    const route = useRoute();
    const {orgAbbr} = route.params;
    const [decoded, setDecoded]= useState('');
    const navigation = useNavigation()
    const [user, setUser] = useState('johndoe@gmail.com')
    console.log("hi")

    useEffect(() => {
        const getToken = async () => {
          try {
            const token = await AsyncStorage.getItem('authToken');
            if (token !== null) {
              console.log("✅ Successfully retrieved")
              setDecoded(jwtDecode(token))
              alert(jwtDecode(token))
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
      
        getToken().then(res => {
          setUser(res.email)
        })
       
      
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

    

    
  return (
    <SafeAreaView>
      
      {/* Yung parang filter to */}
      <OrgSelector/>
      <Text>Welcome to {orgAbbr}</Text>
      <Text>Email: {user}</Text>
      <Button title='logout' onPress={() => removeToken()}></Button>


      {orgAbbr === 'ANSA' ? <Text>Hello!</Text>: null}

    </SafeAreaView>
  );
};
