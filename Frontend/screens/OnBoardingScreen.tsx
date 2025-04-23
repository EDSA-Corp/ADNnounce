import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { CustomButton } from 'components/CustomButton';
import { Container } from 'components/Container';
import Slider from 'components/Slider';
import { ImageSlider } from 'data/SliderData';

export const OnBoardingScreen = ({ navigation }) => {
  return (
    <View className="flex-1">
      <View style={styles.container}>
        <Slider itemList={ImageSlider} />
      </View>
      <View className="flex-[2.5] bg-[#27408F]">
        <CustomButton
          onPress={() => navigation.navigate('Login')}
          title="Sign In"
          backgroundColor="#E6EBF0"
          titleColor="#00294D"
          height={50}
          width="70%"
          margin={20}
          titleStyle={{ fontWeight: 'bold' }}
        />

        <CustomButton
          onPress={() => navigation.navigate('Student')}
          title="Create New Account"
          backgroundColor="#E6EBF0"
          titleColor="#00294D"
          height={50}
          width="70%"
          titleStyle={{ fontWeight: 'bold' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 7.5,
    backgroundColor: '#27408F',
    justifyContent: 'center',
    //alignItems: "center"
  },
});
