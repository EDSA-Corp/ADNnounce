import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import RadialBackground from 'components/CocsRadialBackground';
import ProfilePic from 'components/Profile';
import Support from 'components/support';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <RadialBackground />
      <ProfilePic />
      <Text style={styles.text}>Ateneo COCS</Text>
      <Text style={styles.gbox}>tactics_org.gbox.adnu.edu.ph</Text>

      {/* TouchableOpacity now holds the editButton style */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditPageScreen')}>
        <Image source={require('../assets/edit.png')} style={styles.editIcon} />
        <Text style={styles.editText}>Edit Page</Text>
      </TouchableOpacity>

      {/* Profile Container */}
      <View style={styles.support}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Support</Text>
        <View style={styles.divider} />

        {/* Help */}
        <TouchableOpacity style={styles.optionRow}>
          <Image source={require('../assets/help.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>

        {/* Privacy */}
        <TouchableOpacity style={styles.optionRow}>
          <Image source={require('../assets/privacy.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity style={styles.optionRow}>
          <Image source={require('../assets/about.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>About</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        <Text style={{ color: 'white', fontWeight: 'bold' }}> Login</Text>
        <View style={styles.divider} />

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.optionRow}>
          <Image source={require('../assets/logout.png')} style={styles.optionIcon} />
          <Text style={styles.optionText2}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  about: {
    color: 'white',
    flexDirection: 'row',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
  },
  gbox: {
    opacity: 0.6,
    color: 'white',
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row', // icons + text in a row
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  editIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8, // space between icon and text
  },
  editText: {
    color: 'white',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#444', // or 'white' with opacity for lighter tone
    marginVertical: 12,
  },
  support: {
    padding: 20,
    height: 450,
    width: 320,
    margin: 16,
    backgroundColor: 'black',
    borderRadius: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  optionText2: {
    color: '#DE4343',
    fontSize: 16,
  },
});
