import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CocsRadialBackground from '../components/CocsRadialBackground';

const CocsUserMessage = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { author, timestamp, body1 } = route.params as {
    author: string;
    timestamp: string;
    body1: string;
  };

  return (
    <View style={styles.container}>
      <CocsRadialBackground />
      <StatusBar barStyle="light-content" />

      {/* Top Chat Header */}
      <View style={styles.topBar}>
        <Text style={styles.chatsTitle}>Chats</Text>
        <Image source={require('../assets/pat.png')} style={styles.userIcon} />
      </View>

      {/* Ateneo COCS Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={require('../assets/CocsB.jpg')}
            style={styles.headerLogo}
          />
          <Text style={styles.headerTitle}>Ateneo COCS</Text>
        </View>

        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Center Profile */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/CocsB.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Ateneo COCS</Text>
        <Text style={styles.profileEmail}>tactics_org@gbox.adnu.edu.ph</Text>

        {/* Message display box */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageSender}>{author}</Text>
          <Text style={styles.messageText}>{body1}</Text>
          <Text style={styles.messageTimestamp}>{timestamp}</Text>
        </View>
      </View>

      {/* Bottom Input Bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity>
          <Feather name="plus" size={20} color="black" style={{ marginHorizontal: 5 }} />
        </TouchableOpacity>
        <TextInput
          placeholder="Type Message..."
          placeholderTextColor="#777"
          style={styles.input}
        />
        <TouchableOpacity>
          <Ionicons name="send" size={22} color="black" style={{ marginHorizontal: 5 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CocsUserMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatsTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 8,
    marginRight: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
  },
  profileName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  profileEmail: {
    color: 'black',
    fontSize: 14,
    marginTop: 5,
  },
  messageContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginTop: 20,
    borderRadius: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  messageSender: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: 'black',
  },
});
