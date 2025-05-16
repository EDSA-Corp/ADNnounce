import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  author: string;
  timestamp: string;
  title: string;
  body1: string;
  body2?: string;
  hashtags: string;
  profileImage: ImageSourcePropType;
  postImage: ImageSourcePropType;
};

const ForAllpagePost = ({
  author,
  timestamp,
  title,
  body1,
  body2,
  hashtags,
  profileImage,
  postImage,
}: Props) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.postContainer}>
      {/* Header */}
      <View style={styles.postHeader}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.postAuthor}>{author}</Text>
          <Text style={styles.postTimestamp}>{timestamp}</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('More options clicked')}>
          <Image source={require('../assets/3dots.png')} style={styles.moreOptionsIcon} />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.postTitle}>{title}</Text>

      {/* Body */}
      <Text style={styles.postBody}>{body1}</Text>
      {body2 && <Text style={styles.postBody}>{body2}</Text>}

      {/* Hashtags */}
      <Text style={styles.postHashtags}>{hashtags}</Text>

      {/* Image */}
      <Image source={postImage} style={styles.postImage} />

      {/* Actions */}
      <View style={styles.commentContainer}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Image
            source={liked ? require('../assets/fillheart.png') : require('../assets/Heart.png')}
            style={styles.actionIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Commented')}>
          <Image source={require('../assets/comment.png')} style={styles.actionIcon} />
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
    width: 28,
    height: 28,
    tintColor: '#000',
    marginHorizontal: 12,
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

export default ForAllpagePost;
