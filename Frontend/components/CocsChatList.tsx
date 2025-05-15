import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';

type Props = {
  author: string;
  timestamp: string;
  body1: string;
  profileImage: ImageSourcePropType;
  onPress?: () => void;
};

const CocsChatList = ({ author, timestamp, body1, profileImage, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={profileImage} style={styles.profileImage} />

      <View style={styles.textContainer}>
        <View style={styles.topRow}>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.timestamp}>{`\u2022 ${timestamp}`}</Text>
        </View>
        <Text style={styles.preview} numberOfLines={1}>
          {body1}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'black',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    maxWidth: '70%',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  preview: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default CocsChatList;
