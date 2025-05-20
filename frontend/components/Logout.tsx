import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';


export const Logout = async ({setDecoded}) => {

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
      

  return (
    <SafeAreaView>
      
    </SafeAreaView>
  );
};
