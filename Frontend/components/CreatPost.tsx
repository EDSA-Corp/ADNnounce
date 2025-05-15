import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { CustomButton } from './CustomButton';

const CreatePost = () => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) {
      Alert.alert('Validation Error', 'Post content cannot be empty.');
      return;
    }
    Alert.alert('Success', 'Post submitted!');
    setContent('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="What's on your mind?"
          multiline={true}
          scrollEnabled={true}
          style={styles.textArea}
          textAlignVertical="top"
          autoCorrect={false}
          autoCapitalize="none"
          backgroundColor="#FFFFFF"
          titleColor="#003A6C"
        />

        <View style={styles.buttonWrapper}>
          <CustomButton
            title="Post"
            onPress={handleSubmit}
            backgroundColor="black"
            titleColor="white"
          />
        </View>
        {/* Icon container absolutely positioned */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 25, // IMPORTANT: no flex-grow to avoid resizing
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textArea: {
    width: 350,
    height: 400, // FIXED height — this stops resizing
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'transparent',
    padding: 16,
    marginBottom: 15,
  },
  buttonWrapper: {
    width: 350,
  },
  icon: {
    width: 24, // Adjust size as needed
    height: 24,
    resizeMode: 'contain',
    marginRight: 10, // spacing between icons if gap not supported
  },
});

export default CreatePost;
