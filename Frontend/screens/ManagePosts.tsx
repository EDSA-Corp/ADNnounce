import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import RadialBackground from 'components/CocsRadialBackground';
import { useNavigation } from '@react-navigation/native';
export default function ManagePostsScreen() {
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const posts = [
    { id: '1', image: 'https://i.ibb.co/JwmfRXP/pic1.png' },
    { id: '2', image: 'https://i.ibb.co/jvZpYQ6/pic2.png' },
    { id: '3', image: 'https://i.ibb.co/jZ9M61p/pic3.png' },
    { id: '4', image: 'https://i.ibb.co/8Dcv9DQJ/pic4.png' },
    { id: '5', image: 'https://i.ibb.co/gb9vcGFC/pic5.png' },
    { id: '6', image: 'https://i.ibb.co/9mwBHLcL/pic6.png' },
  ];
  const navigation = useNavigation();

  const togglePostSelection = (postId) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };

  const clearSelections = () => {
    setSelectedPosts([]);
  };

  const handleNext = () => {
    console.log('Moving to next step with selected posts:', selectedPosts);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <RadialBackground />
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage posts</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CocsAdminpage')}
          style={styles.closeButton}>
          <Ionicons name="close-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Selection label and filter */}

      <View style={styles.selectionContainer}>
        <Text style={styles.selectionText}>Select the posts you want to manage:</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter" size={18} color="#fff" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Month label */}
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>February 2025</Text>
        <TouchableOpacity style={styles.selectAllContainer}>
          <Text style={styles.selectAllText}>Select all</Text>
        </TouchableOpacity>
      </View>

      {/* Posts grid */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.postsGrid}>
          {posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postContainer}
              onPress={() => togglePostSelection(post.id)}>
              <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
              {selectedPosts.includes(post.id) && (
                <View style={styles.selectedOverlay}>
                  <Ionicons name="checkmark-circle" size={30} color="#6bb0ff" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom selection bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.selectionCount}>{selectedPosts.length}/50</Text>
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.clearButton} onPress={clearSelections}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nextButton, selectedPosts.length === 0 && styles.nextButtonDisabled]}
            disabled={selectedPosts.length === 0}
            onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#374b73',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
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
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectionText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  filterText: {
    color: 'white',
    marginLeft: 5,
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  monthText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  selectAllContainer: {
    padding: 5,
  },
  selectAllText: {
    color: '#6bb0ff',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  postContainer: {
    width: '50%',
    aspectRatio: 1,
    padding: 5,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#293a5c',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'black',
  },
  selectionCount: {
    color: 'white',
    fontSize: 16,
  },
  bottomButtons: {
    flexDirection: 'row',
  },
  clearButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  nextButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
