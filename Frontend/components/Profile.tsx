import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

type Props = {
  imageSource: any; // Use ImageSourcePropType for stronger typing
  size?: number;
  showLabel?: boolean;
  label?: string;
};

export default function ProfilePicture({
  imageSource,
  size = 100,
  showLabel = false,
  label = 'Your Name',
}: Props) {
  return (
    <View style={styles.wrapper}>
      <Image
        source={imageSource}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
      />
      {showLabel && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  image: {
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});
