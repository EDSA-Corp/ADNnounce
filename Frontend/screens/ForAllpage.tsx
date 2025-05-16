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
import ForAllCarosel from 'components/ForAllCarosel';
import FloatingMenu from '../components/CocsFloatingMenu';
import ForAllRadialBackground from '../components/ForAllRadialBackground';
import { useNavigation } from '@react-navigation/native';
import Whatsnew from '../components/Whatsnew';
import ForAllpagePost from '../components/ForAllpagePost';

const ForAllpage = () => {
  const navigation = useNavigation();

  const handleNotificationPress = () => {
    console.log('Notification clicked');
    // navigation.navigate('...') // add your navigation here
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <ForAllRadialBackground /> {/* Background Component */}

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleNotificationPress}>
            <View style={styles.notificationContainer}>
              <Image source={require('../assets/noti.png')} style={styles.bellIcon} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleProfilePress}>
            <View style={styles.profileContainer}>
              <Image source={require('../assets/cocs.png')} style={styles.profileImage} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image source={require('../assets/search.png')} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* What's New Section and Carousel */}
        <View style={styles.Feature}>
          <Text style={styles.featureTitle}>What's New</Text>
          <Whatsnew />
          <ForAllCarosel />
        </View>

        {/* Announcements Section */}
        <View style={styles.Announcements}>
          <Text style={styles.featureTitle}>Announcements</Text>
        </View>

        {/* Posts Section */}
        <View style={styles.AllPostshown}>
          <ForAllpagePost
            author="Ateneo COCS"
            timestamp="Posted - 14h ago"
            title="𝐔𝐏𝐃𝐀𝐓𝐄 | 𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐭𝐢𝐨𝐧 for the 𝐇𝐎𝐔𝐒𝐄 𝐎𝐅 𝐂𝐀𝐑𝐃𝐒: 𝐓𝐇𝐄 𝐂𝐂𝐒 𝐈𝐍𝐓𝐑𝐀𝐌𝐔𝐑𝐀𝐋𝐒 is 𝐍𝐎𝐖 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋𝐋𝐘 𝐂𝐋𝐎𝐒𝐄𝐃!"
            body1="For all the official players of the 𝐂𝐂𝐒 𝐈𝐧𝐭𝐫𝐚𝐦𝐮𝐫𝐚𝐥𝐬, there is a probability that you will not be assigned a definite team/color in different events. As much as the staff has tried to keep each player in a specific team or color, assigning players to one team will cause an inadequate number of players to other teams. With this, we advise every player to bring extra shirts with corresponding colors (𝘣𝘭𝘢𝘤𝘬, 𝘣𝘭𝘶𝘦, 𝘳𝘦𝘥, 𝘢𝘯𝘥 𝘸𝘩𝘪𝘵𝘦) to this event’s theme. We will post the official players in each team soonest after our staff have sorted out all the participants in this event."
            body2="Who will claim the 𝐟𝐢𝐧𝐚𝐥 𝐭𝐫𝐢𝐮𝐦𝐩𝐡 among the 𝐇𝐄𝐀𝐑𝐓𝐒, 𝐃𝐈𝐀𝐌𝐎𝐍𝐃𝐒, 𝐒𝐏𝐀𝐃𝐄𝐒, 𝐚𝐧𝐝 𝐂𝐋𝐔𝐁𝐒? ♠︎♥︎♦︎♣︎ Who will stand superior in the 𝐇𝐨𝐮𝐬𝐞 𝐨𝐟 𝐂𝐚𝐫𝐝𝐬? Gear yourselves up as the 𝐆𝐀𝐌𝐄𝐒 𝐖𝐈𝐋𝐋 𝐂𝐎𝐌𝐌𝐄𝐍𝐂𝐄 𝐒𝐇𝐎𝐑𝐓𝐋𝐘."
            hashtags={`#houseofcards\n#CollegeofComputeStudies`}

            profileImage={require('../assets/cocs.png')}
            postImage={require('../assets/Regestclose.png')}
          />

          <ForAllpagePost
            author="Liderato kan Nueva Atenista"
            timestamp="Posted - 1 day ago"
            title="𝑴𝒂𝒓𝒂𝒉𝒖𝒚𝒐: 𝑨𝒕𝒆𝒏𝒆𝒐 𝑶𝒑𝒆𝒏 𝑯𝒐𝒖𝒔𝒆 2025 🏛️💫"
            body1='This 𝐌𝐚𝐫𝐜𝐡 26-28, Ateneo de Naga University will be opening its doors once again to all the dreamers, curious-minded, go-getters, and everyone in between! With the theme "𝐈𝐥𝐥𝐮𝐦𝐢𝐧𝐚𝐭𝐢𝐧𝐠 𝐃𝐫𝐞𝐚𝐦𝐬 & 𝐄𝐧𝐜𝐡𝐚𝐧𝐭𝐢𝐧𝐠 𝐁𝐞𝐠𝐢𝐧𝐧𝐢𝐧𝐠𝐬", let this event be a gateway to your future filled with purpose, passion, and possibilities. ✨'
            body2="What are you most excited about in this year's Open House? Let us know in the comments below! 👇🏼"
            hashtags={`#ExperienceExcellence\n#ExperienceAteneo\n#AteneoOpenHouse\n#Marahuyo2025\n#AteneoStudentAmbassadors`}
            profileImage={require('../assets/LKNA.png')}
            postImage={require('../assets/MAOH2025.jpg')}
          />

          <ForAllpagePost
            author="Association of Bicol Business Students - ADNU Chapter"
            timestamp="Posted - 1 day ago"
            title="𝐃𝐚𝐲 𝟐 𝐨𝐟 𝐒𝐋𝐔𝐆𝐅𝐞𝐬𝐭 𝟐𝟎𝟐𝟓 𝐢𝐬 𝐡𝐞𝐫𝐞 𝐰𝐢𝐭𝐡 𝐭𝐫𝐚𝐜𝐤 & 𝐟𝐢𝐞𝐥𝐝, 𝐬𝐡𝐨𝐭 𝐩𝐮𝐭, 𝐝𝐢𝐬𝐜𝐮𝐬, 𝐚𝐧𝐝 𝐣𝐚𝐯𝐞𝐥𝐢𝐧 𝐭𝐡𝐫𝐨𝐰!🏹"
            body1='Uniform exemption for all ABBS Working Committee and players—because on Valentine’s, love and victory go hand in hand (no matching required)!😝Check your team captains for the list🤍 But with all this red, does a red shirt on this day mean ABBS members are taken, or just ready to throw some love into the competition? 😏 Naka-red shirt? In a relationship ka raw! 🙂‍↕️'
            body2={`𝐄𝐯𝐞𝐧𝐭 𝐏𝐚𝐫𝐭𝐧𝐞𝐫𝐬: \n𝗣𝗥𝗘𝗦𝗘𝗡𝗧𝗘𝗥 \n• KD Sportswear and Apparel \n• Blanche Skincare and Laser Clinic \n𝗠𝗔𝗝𝗢𝗥 𝗦𝗣𝗢𝗡𝗦𝗢𝗥 \n• Goddess Touch Beauty Lounge - Naga City Branch \n𝗠𝗜𝗡𝗢𝗥 𝗦𝗣𝗢𝗡𝗦𝗢𝗥 \n• Estudio26 and Cafe \n• Tierra De Ibalon Travel & Tours Inc. \n𝗣𝗔𝗧𝗥𝗢𝗡 \n• Doña Pacita’s Resort \n• Lukkas Barbers`}

            hashtags={`#ABBSSLUGFest2025\n#ABBSync\n#ABBSAdNUChapter`}
            profileImage={require('../assets/ABBS.png')}
            postImage={require('../assets/DAY2SLUGFEST.jpg')}
          />
        </View>
      </ScrollView>

      {/* Floating Menu */}
      <FloatingMenu />
    </View>
  );
};

export default ForAllpage;

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
  Announcements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 16,
  },
  AllPostshown: {
    marginBottom: 40,
  },
});
