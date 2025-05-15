import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

const Thepostofpage = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.postContainer}>
      {/* Header */}
      <View style={styles.postHeader}>
        <Image 
          source={require('../assets/cocs.png')}
          style={styles.profileImage} 
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.postAuthor}>Ateneo COCS</Text>
          <Text style={styles.postTimestamp}>Posted 14h ago</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('More options clicked')}>
          <Image 
            source={require('../assets/3dots.png')} 
            style={styles.moreOptionsIcon} 
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.postTitle}>
        𝐔𝐏𝐃𝐀𝐓𝐄 | 𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐭𝐢𝐨𝐧 for the 𝐇𝐎𝐔𝐒𝐄 𝐎𝐅 𝐂𝐀𝐑𝐃𝐒: 𝐓𝐇𝐄 𝐂𝐂𝐒 𝐈𝐍𝐓𝐑𝐀𝐌𝐔𝐑𝐀𝐋𝐒 is 𝐍𝐎𝐖 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋𝐋𝐘 𝐂𝐋𝐎𝐒𝐄𝐃!
      </Text>

      {/* Body */}
      <Text style={styles.postBody}>
        For all the official players of the 𝐂𝐂𝐒 𝐈𝐧𝐭𝐫𝐚𝐦𝐮𝐫𝐚𝐥𝐬, there is a probability that you will not be assigned a definite team/color in different events. As much as the staff has tried to keep each player in a specific team or color, assigning players to one team will cause an inadequate number of players to other teams. With this, we advise every player to bring extra shirts with corresponding colors (𝘣𝘭𝘢𝘤𝘬, 𝘣𝘭𝘶𝘦, 𝘳𝘦𝘥, 𝘢𝘯𝘥 𝘸𝘩𝘪𝘵𝘦) to this event’s theme. We will post the official players in each team soonest after our staff have sorted out all the participants in this event.
      </Text>

      <Text style={styles.postBody}>
        Who will claim the 𝐟𝐢𝐧𝐚𝐥 𝐭𝐫𝐢𝐮𝐦𝐩𝐡 among the 𝐇𝐄𝐀𝐑𝐓𝐒, 𝐃𝐈𝐀𝐌𝐎𝐍𝐃𝐒, 𝐒𝐏𝐀𝐃𝐄𝐒, 𝐚𝐧𝐝 𝐂𝐋𝐔𝐁𝐒? ♠︎♥︎♦︎♣︎ Who will stand superior in the 𝐇𝐨𝐮𝐬𝐞 𝐨𝐟 𝐂𝐚𝐫𝐝𝐬? Gear yourselves up as the 𝐆𝐀𝐌𝐄𝐒 𝐖𝐈𝐋𝐋 𝐂𝐎𝐌𝐌𝐄𝐍𝐂𝐄 𝐒𝐇𝐎𝐑𝐓𝐋𝐘.
      </Text>

      {/* Hashtags */}
      <Text style={styles.postHashtags}>
        #houseofcards{"\n"}
        #CollegeofComputeStudies
      </Text>

      {/* Image */}
      <Image 
        source={require('../assets/Regestclose.png')} 
        style={styles.postImage}
      />

      {/* Actions: Heart, Comment, Save */}
      <View style={styles.commentContainer}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Image 
            source={liked ? require('../assets/fillheart.png') : require('../assets/Heart.png')} 
            style={styles.actionIcon} 
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Commented')}>
          <Image 
            source={require('../assets/comment.png')} 
            style={styles.actionIcon} 
          />
        </TouchableOpacity>

        <TextInput
          placeholder="Write a comment..."
          style={styles.commentInput}
          placeholderTextColor="#999"
        />

        <TouchableOpacity onPress={() => setSaved(!saved)}>
          <Image 
            source={saved ? require('../assets/fillsave.png') : require('../assets/save.png')} 
            style={styles.actionIcon} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  postTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  moreOptionsIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 12,
  },
  postBody: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 12,
    lineHeight: 20,
  },
  postHashtags: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 12,
    resizeMode: 'cover',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  actionIcon: {
    width: 28,  // Increased width for better visibility
    height: 28, // Increased height for better visibility
    tintColor: '#000',
    marginHorizontal: 12, // Increased horizontal margin
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginHorizontal: 8,
  },
});

export default Thepostofpage;
