import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CocsBG from '../components/CocsRadialBackground';
import CocsChatList from '../components/CocsChatList';

const CocsChat = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <CocsBG />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrowleft.png')} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.title}>Ateneo COCS</Text>

        <TouchableOpacity>
          <Image source={require('../assets/Compost.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image source={require('../assets/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>

      {/* Scrollable List */}
      <ScrollView>
        <View style={styles.AllMessageshown}>
          <CocsChatList
            author="Patrick Nhel L. Estrella"
            timestamp="2:10 PM"
            body1="You: May single po ba sa 1st..."
            profileImage={require('../assets/cocs.png')}
            onPress={() =>
              navigation.navigate('CocsUserMessage', {
                author: 'Ateneo COCS',
                timestamp: '2:10 PM',
                body1: 'You: May single po ba sa 1st...',
              })
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CocsChat;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 40,
  },
  searchIcon: {
    width: 16,
    height: 16,
    tintColor: '#999',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
  AllMessageshown: {
    marginBottom: 10,
  },
});
