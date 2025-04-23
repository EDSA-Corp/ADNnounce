import React from 'react';
import { View, Text, Image } from 'react-native';
import { CustomButton } from 'components/CustomButton';

const ask = require('../assets/ask.png');

export default function StudentScreen({ navigation }) {
  return (
    <View className="flex-1">
      <View className="flex-[9] bg-white">
        <View className="h-full w-full items-center justify-center rounded-b-[150px] bg-darkBlue pt-40">
          <Image source={ask} style={{ paddingBottom: 15 }} />
          <Text
            style={{
              paddingTop: 5,
              paddingBottom: 20,
              color: 'white',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            To personalize your experience, {'\n'}
            let us know your role.
          </Text>

          {/* Student */}
          <View className="w-full">
            <CustomButton
              onPress={() => navigation.navigate('Register')}
              title="Student"
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

          {/* Admin */}
          <View className="w-full">
            <CustomButton
              onPress={() => navigation.navigate('AdminRegister')}
              title="Admin"
              backgroundColor="#FFFFFF"
              titleColor="#003A6C"
              height={40}
              width="80%"
              margin={10}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
