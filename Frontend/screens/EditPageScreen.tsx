import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import RadialBackground from 'components/CocsRadialBackground';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function EditPage() {
  const profileImage = 'https://i.ibb.co/p6JytXJq/img1.jpg';
  const navigation = useNavigation();

  const featuredImages = [
    'https://i.ibb.co/JwmfRXP/pic1.png',
    'https://i.ibb.co/jvZpYQ6/pic2.png',
    'https://i.ibb.co/jZ9M61p/pic3.png',
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <RadialBackground />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Page</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CocsAdminpage')}
          style={styles.closeButton}>
          <Ionicons name="close-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        {/* Edit Page Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Edit Icon</Text>
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={18} color="white" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} resizeMode="cover" />
          </View>
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={18} color="white" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Featured Images Overlapping Stack - UPDATED */}
          <View style={styles.featuredImagesContainer}>
            {/* Left image (back) */}
            <Image
              source={{ uri: featuredImages[0] }}
              style={[styles.stackedImage, styles.leftImage]}
              resizeMode="cover"
            />

            {/* Middle image (front) */}
            <Image
              source={{ uri: featuredImages[1] }}
              style={[styles.stackedImage, styles.middleImage]}
              resizeMode="cover"
            />

            {/* Right image (back) */}
            <Image
              source={{ uri: featuredImages[2] }}
              style={[styles.stackedImage, styles.rightImage]}
              resizeMode="cover"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  closeButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#293a5c',
  },

  featuredImagesContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  stackedImage: {
    position: 'absolute',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  leftImage: {
    width: width * 0.6,
    height: 140,
    left: 20,
    zIndex: 1,
    opacity: 0.8,
    transform: [{ translateX: -width * 0 }],
  },
  middleImage: {
    width: 160,
    height: 160,
    zIndex: 3,
  },
  rightImage: {
    width: width * 0.6,
    height: 140,
    right: 20,
    zIndex: 1,
    opacity: 0.8,
    transform: [{ translateX: width * 0 }],
  },
});
