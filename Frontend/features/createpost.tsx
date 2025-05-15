import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardEvent,
  TouchableOpacity,
} from 'react-native';
import CreatePost from 'components/CreatPost';
import RadialBackground from 'components/CocsRadialBackground';

export default function Create() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <RadialBackground style={StyleSheet.absoluteFill} />
          <CreatePost />

          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Image source={require('../assets/Vector.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={require('../assets/Vector (1).png')} style={styles.icon} />
            </TouchableOpacity>
          </View>

          {!keyboardVisible && (
            <View style={styles.profileContainer}>
              <Image source={require('../assets/cocs.png')} style={styles.profileImage} />
              <Text style={{ color: 'white' }}>ATENEO COCS</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    marginRight: 8,
    resizeMode: 'contain',
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    bottom: 250,
    gap: 10, // works in React Native 0.71+ for spacing between icons
    // If gap is not supported, use marginRight on icon except last one
  },
  icon: {
    width: 24, // Adjust size as needed
    height: 24,
    resizeMode: 'contain',
  },
});
