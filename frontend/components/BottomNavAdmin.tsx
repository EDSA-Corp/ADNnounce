import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Alert, Button, ScrollView, TextInput, FlatList } from 'react-native';
import NotificationIcon from '../assets/notif.svg'; // Import the SVG icon
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import ImageUpload from '../assets/imageUpload.svg'
import { CustomButton } from './CustomButton';
import { API_BASE_URL } from 'utils/config';
import * as FileSystem from 'expo-file-system';
import { useNavigation, useRoute } from '@react-navigation/native';




export const BottomNavAdmin = ({ org, posts, setPosts }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]);
  const [text, setText] = useState([]);
  const [title, setTitle] = useState('')


  console.log(posts.length)

  console.log(images)

 const submit = async () => {
  const formData = new FormData();

  // Add your text fields
  formData.append('title', title);
  formData.append('text', text);
formData.append('org', JSON.stringify(org));
formData.append('postCount', posts.length)
  // Add image files
  images.forEach((uri, index) => {
    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename || '');
    const ext = match?.[1]?.toLowerCase();
    const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';

    formData.append('images', {
      uri,
      name: filename || `image${index}.${ext}`,
      type: mimeType,
    });
  });

  try {
    const response = await fetch(API_BASE_URL + 'posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    const result = await response.json();
    console.log(result)
    if(result.code ==='Success'){
      setPosts((prevPosts) => [result.post, ...prevPosts]);
      navigation.replace(route.name)

    }

  } catch (err) {
    console.error('Upload failed:', err.message);
  }
};



  const pickImages = async () => {
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'We need access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      base64:false
    });

    if (!result.canceled) {
      const validImages = result.assets.filter(asset => {
        const ext = asset.uri.split('.').pop().toLowerCase();
        return ext === 'jpg' || ext === 'jpeg' || ext === 'png';
      });

      if (validImages.length !== result.assets.length) {
        Alert.alert('Some files skipped', 'Only JPEG or PNG images are allowed.');
      }

      setImages(validImages.map(asset => asset.uri));
    }
  };

  return (
    <View>

      {modal && (



        <View>
          <View style={{
            backgroundColor: 'rgba(255,255,255, 0.4)',
            position: 'absolute',
            bottom: 0,
            width: "5000",
            height: 5000,

          }}>

          </View>
          <View style={{

            position: 'absolute',
            left: "9%",
            bottom: 200,
            justifyContent: 'center', // Center vertically
            alignItems: 'center', // Center horizontally
          }}>
            <View style={{
              width: 330,
              height: 450,
              backgroundColor: 'white',
              borderRadius: 50,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5, // For Android shadow
              paddingHorizontal: 20
            }}>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '900', color: '#363636', marginBottom: 10 }}>Create Post</Text>
              {/* Profile of the page */}
              <View className='flex-row items-center'>
                <Image
                  source={{ uri: org.profileStyles.profileImg||'https://www.micropulse.in/wp-content/uploads/2021/10/blank-profile-picture-973460_640.png' }}
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    borderColor: 'white',
                    marginRight: 5
                  }}
                  className="rounded-full"
                />
                <Text className='font-semibold text-lg'>{org.OrgName}</Text>
              </View>

              {/* for the body */}
              <View>
                  <TextInput placeholder={'Title here'}
                  value={title}
                  onChangeText={setTitle}
                  style={{
                    borderColor:'#ccc',
                    borderWidth:1,
                    marginTop:5
                  }}></TextInput>

                <TextInput
                  value={text}
                  onChangeText={setText}
                  placeholder="Write something..."
                  multiline
                  numberOfLines={5}
                  style={{
                    marginTop: 5,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    padding: 10,
                    textAlignVertical: 'top', // ensures text starts at the top
                    height: 150,
                    marginBottom: 10
                  }}
                />

                <View className='flex-row justify-between my-5'>
                  {/* <Button title="Select Images" onPress={pickImages} /> */}
                  <TouchableOpacity>
                    {images.length !== 0 && <Text>Uploaded images: {images.length}</Text>}
                  </TouchableOpacity>
                  <TouchableOpacity className='px-5' onPress={pickImages}>
                      <ImageUpload width={25} height={25} ></ImageUpload>
                  </TouchableOpacity>

                </View>
                  <CustomButton title='Post' height={50} width='280' backgroundColor='#363636' onPress={() => {
                    submit()
                  }}></CustomButton>

               
              </View>

            </View>
          </View>
        </View>)}
      <View>

        <View
          style={{
            position: 'absolute',
            bottom: 30, // Floating above the bottom edge
            left: 20,
            right: 100,
            backgroundColor: 'white',
            borderRadius: 30,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5, // For Android shadow
          }}
        >
          {/* Icon 1 */}
          <TouchableOpacity onPress={() => console.log('Icon 1 pressed')}>
            <NotificationIcon width={24} height={24} />
          </TouchableOpacity>
          {/* Icon 2 */}
          <TouchableOpacity onPress={() => console.log('Icon 2 pressed')}>
            <NotificationIcon width={24} height={24} />
          </TouchableOpacity>
          {/* Icon 3 */}
          <TouchableOpacity onPress={() => console.log('Icon 3 pressed')}>
            <NotificationIcon width={24} height={24} />
          </TouchableOpacity>
          {/* Icon 4 */}
          <TouchableOpacity onPress={() => console.log('Icon 4 pressed')}>
            <NotificationIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            left: '75%',
            bottom: 30, // Fixed bottom positioning
            backgroundColor: 'white',
            width: 80, // Set width for the circle
            height: 80, // Set height equal to width
            borderRadius: 40, // Half of the width/height to make it a perfect circle
            justifyContent: 'center', // Center the "+" text vertically
            alignItems: 'center', // Center the "+" text horizontallym
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5, // For Android shadow
          }}
          onPress={() => {
            console.log("add button pressed")
            modal ? setModal(false) : setModal(true);
          }}
        >

          <Text style={{ fontSize: 60, fontWeight: 'bold', color: 'white', color: org.profileStyles.backgroundColor }}>+</Text>
        </TouchableOpacity>
      </View>
  
    </View>
  );
};