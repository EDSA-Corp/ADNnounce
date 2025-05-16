import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import FeaturedCarousel from '../components/CocsFeaturedCarousel';
import FloatingMenu from '../components/CocsFloatingMenu';
import RadialBackground from '../components/CocsRadialBackground';
import { useNavigation } from '@react-navigation/native';
import Thepostofpage from 'components/CocsThepostofpage';

const Adminpage = () => {
  const navigation = useNavigation();

  const handleNotificationPress = () => {
    console.log('Notification clicked');
    //navigation.navigate(''); pag nagawa na page pa lagay dito
  };

  const handleProfilePress = () => {
    console.log('Profile clicked');
    //navigation.navigate(''); pag nagawa na page pa lagay dito
  };

  const handleManagePostPress = () => {
    console.log('Manage Post clicked');
    //navigation.navigate(''); pag nagawa na page pa lagay dito
  };

  return (
    <View style={styles.container}>
      <RadialBackground /> {/* Background Component */}
      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}>
        {/* Top bar with notification and profile */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleNotificationPress}>
            <View style={styles.notificationContainer}>
              <Image source={require('../assets/noti.png')} style={styles.bellIcon} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.profileContainer}>
              <Image source={require('../assets/cocs.png')} style={styles.profileImage} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image source={require('../assets/search.png')} style={styles.searchIcon} />
          <TextInput placeholder="Search" placeholderTextColor="#999" style={styles.searchInput} />
        </View>

        {/* si Carousel */}
        <View style={styles.Feature}>
          <Text style={styles.featureTitle}>Feature</Text>
          <FeaturedCarousel />
        </View>

        {/* Announcements Section with Manage Post Button */}
        <View style={styles.Announcements}>
          <Text style={styles.featureTitle2}>Announcements</Text>

          {/* Manage Post Button */}
          <TouchableOpacity onPress={handleManagePostPress} style={styles.managePostButton}>
            <Image source={require('../assets/setting.png')} style={styles.managePostIcon} />
            <Text style={styles.managePostText}>Manage Post</Text>
          </TouchableOpacity>
        </View>

        {/* dito lalagay si mga post para ma show i lalagay ko sya sa components ulit para di masadong sabog ang code */}
        <View style={styles.AllPostshown}>
          <Thepostofpage />
        </View>
      </ScrollView>
      {/* Floating Menu */}
      <FloatingMenu />
    </View>
  );
};

export default Adminpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  notificationContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bellIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  Feature: {
    marginTop: 30,
  },
  featureTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  featureTitle2: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  Announcements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 16,
  },
  managePostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingHorizontal: 5,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  managePostIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  managePostText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  AllPostshown: {},
});
