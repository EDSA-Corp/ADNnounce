import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

// Reusable Input component
export const Input = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
};

// Parent component
export const MyComponent = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter some text"
        onChangeText={setText}
        value={text}
      />
      <Text>You typed: {text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 10,
  },
});
