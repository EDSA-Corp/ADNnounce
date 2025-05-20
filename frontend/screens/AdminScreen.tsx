import { CustomButton } from 'components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import NotificationIcon from '../assets/notif.svg';
import { Input } from 'components/Input';
import { BottomNav, BottomNavAdmin } from 'components/BottomNavAdmin';

import SearchIcon from '../assets/searchIcon.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from 'utils/config';
import LoadingModal from 'components/LoadingModal';


export const AdminScreen = ({ org, decoded }) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  console.log(org)

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}adminPosts?org=${org.OrgAbbr}`);
        const data = res.data.data;
        setPosts(data); // Set the posts data
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return <LoadingModal />;
  }

  const sortedPosts = [...posts].sort((a, b) => {
    const getTime = (date) =>
      date
        ? date.toDate
          ? date.toDate().getTime()
          : date._seconds
            ? date._seconds * 1000
            : 0
        : 0;
    return getTime(b.date) - getTime(a.date);
  });

  return (
    <LinearGradient
      colors={[org.profileStyles.backgroundColor, '#D9D9D9']}
      start={[0, 0]}
      end={[0, 1.8]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Top Section */}
        <SafeAreaView>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {/* Notification Icon */}
            <TouchableOpacity>
              <View
                className="bg-white w-[42px] justify-center items-center"
                style={{ borderRadius: '43%', width: 40, height: 30 }}
              >
                <NotificationIcon width={25} height={25} />
              </View>
            </TouchableOpacity>

            {/* Profile Icon */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AdminProfile', { org: org, token: decoded });
              }}
            >
              <Image
                source={{ uri: ( org.profileStyles.profileImg||'https://www.micropulse.in/wp-content/uploads/2021/10/blank-profile-picture-973460_640.png') }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'white',
                }}
                className="rounded-full"
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 20,
              backgroundColor: 'white',
              paddingHorizontal: 10,
              height: 50,
            }}
          >
            <SearchIcon width={20} height={20} />
            <TextInput
              placeholder="Enter text here"
              placeholderTextColor="#999"
              style={{
                flex: 1,
                marginLeft: 10,
                height: '100%',
              }}
            />
          </View>

          <Text style={{ color: 'white' }}>Featured</Text>
          <Text style={{ color: 'white', textAlign: 'center' }}>Carousel here</Text>

          <Text style={{ color: 'white', marginBottom: 20 }}>Announcement</Text>
        </SafeAreaView>

        {/* Posts Section */}
        {sortedPosts.map((e, index) => {
          if (!e) return null; // Skip if e is undefined/null
          return (
            <View
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 15,
                marginBottom: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              {/* Profile Section */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Image
                  source={{ uri: (org.profileStyles.profileImg||'https://www.micropulse.in/wp-content/uploads/2021/10/blank-profile-picture-973460_640.png') }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'white',
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{org.OrgName}</Text>
                  <Text style={{ color: '#8E98A8' }}>
                    {e.date
                      ? (e.date.toDate
                          ? e.date.toDate().toLocaleString()
                          : e.date._seconds
                            ? new Date(e.date._seconds * 1000).toLocaleString()
                            : 'No Date Provided')
                      : 'No Date Provided'}
                  </Text>
                </View>
              </View>

              {/* Post Title */}
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{e.title || 'No Title'}</Text>

              {/* Post Content */}
              <Text style={{ marginBottom: 10 }}>
                {e.body || 'No content available for this post.'}
              </Text>

              {/* Post Image Carousel */}
              {e.images && e.images.length > 0 && (
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                  <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                      const scrollPosition = event.nativeEvent.contentOffset.x;
                      const currentIndex = Math.round(scrollPosition / 250); // Assuming each image is 250px wide
                      setCurrentIndex(currentIndex); // Update the current index
                    }}
                    scrollEventThrottle={20}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    {e.images.map((element, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setModalImage(element)} // Open modal with the clicked image
                      >
                        <Image
                          source={{ uri: element }}
                          style={{
                            width: 300,
                            height: 300,
                            marginHorizontal: 20,
                            borderRadius: 10,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  {/* Button Tracker */}
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    {e.images.map((_, index) => (
                      <View
                        key={index}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: currentIndex === index ? 'black' : '#ccc',
                          marginHorizontal: 5,
                        }}
                      />
                    ))}
                  </View>

                  {/* Modal for Zoomable Image */}
                  <Modal
                    visible={!!modalImage}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalImage(null)} // Close modal on back press
                  >
                    <TouchableWithoutFeedback onPress={() => setModalImage(null)}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: 'rgba(0, 0, 0, 0.9)',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          source={{ uri: modalImage }}
                          style={{
                            width: '90%',
                            height: '70%',
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <BottomNavAdmin org={org} posts={posts}  setPosts={setPosts}></BottomNavAdmin>
      
    </LinearGradient>
  );
};
