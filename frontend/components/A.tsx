import { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export const A = ({onPress, color='black', fontSize=16, textAlign='left', value='text here'}) => {


    const style = StyleSheet.create({
        text: {
            color: color,
            fontSize: fontSize,
            textAlign: textAlign
        }
    })

  return (
    <TouchableOpacity
        onPress={onPress}
    >
        <Text style={style.text}>{value}</Text>
      
    </TouchableOpacity>
  );

  
};


