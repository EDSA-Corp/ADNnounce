import { Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EditIcon from '../assets/editIcon.svg';
import LogoutIcon from '../assets/LogoutIcon.svg';
import BackIcon from '../assets/BackIcon.svg'

export const AdminProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { org, token } = route.params;

  return (
    <LinearGradient
      colors={[org.profileStyles.backgroundColor, '#D9D9D9']} // Gradient colors
      start={[0, 0]}
      end={[0, 1.8]}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 2 }}>
          <View className="mb-2 self-start pt-5 pl-3">
            {/* Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon width={30} height={40} ></BackIcon>
                </TouchableOpacity>
          </View>

          <View className="items-center">
            {/* Profile Section */}
            <Image
              source={{ uri: (org.profileStyles.profileImg||'https://www.micropulse.in/wp-content/uploads/2021/10/blank-profile-picture-973460_640.png') }}  
              className="rounded-full border-2 border-yellow-600"
              style={{ width: 100, height: 100 }}
            />
            <Text className="color-white font-bold text-xl">{org.OrgName}</Text>

            <TouchableOpacity
              style={{
                width: 120,
                padding: 3,
                height: 35,
                backgroundColor: 'black',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 25,
                borderRadius: 10,
              }}
            >
              <EditIcon style={{ width: 20, height: 20 }} />
              <Text className="color-white font-bold ml-1">Edit Page</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ backgroundColor: org.profileStyles.backgroundColor }}
            className="w-[90%] h-full rounded-t-[20px]"
          >
            {/* Support Section */}
            <View className="mb-[90%]">
              <View className="px-5">
                <Text className="font-extrabold color-white p-2">Support</Text>
              </View>

              {/* Horizontal Line */}
              <View className="w-full h-1 bg-white"></View>

              <View className="px-1">
                {/* Help */}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 5,
                  }}
                  onPress={() => Alert.alert('Feature is under construction')}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold' }}>Help</Text>
                  </View>
                  <Text style={{ color: 'white' }}>></Text>
                </TouchableOpacity>

                {/* Privacy Center */}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 5,
                  }}
                  onPress={() => Alert.alert('Feature is under construction')}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold' }}>
                      Privacy Center
                    </Text>
                  </View>
                  <Text style={{ color: 'white' }}>></Text>
                </TouchableOpacity>

                {/* About */}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 5,
                  }}
                  onPress={() => Alert.alert('Feature is under construction')}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold' }}>About</Text>
                  </View>
                  <Text style={{ color: 'white' }}>></Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom Part */}
            <View className="w-full h-1 bg-white"></View>

            <View>
              {/* Logout */}
              <TouchableOpacity className="p-2 flex-row items-center justify-between m-2" onPress={ async () => {
                await AsyncStorage.removeItem('token').then(res=> {
                  Alert.alert("Logged out")
                  navigation.replace('Login')
                })
                console.log("Logged out")
              }}>
                <View className="flex-row items-center">
                  <LogoutIcon width="20" height="20" />
                  <Text style={{ color: '#DE4343', marginLeft: 10, fontWeight: 'bold' }}>
                    Logout
                  </Text>
                </View>
                <View>
                  <Text style={{ color: '#DE4343' }} className="font-bold">
                    >
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>


      </SafeAreaView>
    </LinearGradient>
  );
};
