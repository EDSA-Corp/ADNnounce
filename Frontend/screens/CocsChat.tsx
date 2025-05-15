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
import CocsBG from '../components/CocsRadialBackground';
import CocsChatList from '../components/CocsChatList'; // Adjust path if needed

const CocsChat = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CocsBG />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/arrowleft.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Ateneo COCS</Text>

        <TouchableOpacity>
          <Image
            source={require('../assets/Compost.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/search.png')}
          style={styles.searchIcon}
        />
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
            body1="May single po ba sa 1st..."
            profileImage={require('../assets/pat.png')}
          />
          <CocsChatList
            author="Miguel B. Apawan Jr."
            timestamp="2:10 PM"
            body1="2 new messages"
            profileImage={require('../assets/mig.png')}
          />
          <CocsChatList
            author="Gabriel V. Señar"
            timestamp="2:10 PM"
            body1="4 new messages"
            profileImage={require('../assets/gab.png')}
          />
          <CocsChatList
            author="Simon Antonio D. Almero"
            timestamp="2:10 PM"
            body1="damn"
            profileImage={require('../assets/simon.png')}
          />
          <CocsChatList
            author="Isaiah Leon V. General"
            timestamp="2:10 PM"
            body1="Im gay"
            profileImage={require('../assets/isaiah.png')}
          />
          <CocsChatList
            author="Michael Angelo M. Daanoy"
            timestamp="2:10 PM"
            body1="4 new messages"
            profileImage={require('../assets/micheal.png')}
          />
          <CocsChatList
            author="Jieren Zards A. Dia"
            timestamp="2:10 PM"
            body1="2 new messages"
            profileImage={require('../assets/eren.png')}
          />
          <CocsChatList
            author="Eric Jr. J. Tan"
            timestamp="2:10 PM"
            body1="hey😘😘😘"
            profileImage={require('../assets/eric.png')}
          />
          <CocsChatList
            author="Patrick Nhel L. Estrella"
            timestamp="2:10 PM"
            body1="May single po ba sa 1st..."
            profileImage={require('../assets/pat.png')}
          />
          <CocsChatList
            author="Patrick Nhel L. Estrella"
            timestamp="2:10 PM"
            body1="May single po ba sa 1st..."
            profileImage={require('../assets/pat.png')}
          />
          <CocsChatList
            author="Patrick Nhel L. Estrella"
            timestamp="2:10 PM"
            body1="May single po ba sa 1st..."
            profileImage={require('../assets/pat.png')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CocsChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
