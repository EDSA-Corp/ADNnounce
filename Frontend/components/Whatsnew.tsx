import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  ALL: undefined;
  ABBS: undefined;
  AJMA: undefined;
  ANSA: undefined;
  APSA: undefined;
  JPIA: undefined;
};

const Whatsnew = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const categories: (keyof RootStackParamList)[] = ['ALL', 'ABBS', 'AJMA', 'ANSA', 'APSA', 'JPIA'];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate(item)}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Whatsnew;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
});