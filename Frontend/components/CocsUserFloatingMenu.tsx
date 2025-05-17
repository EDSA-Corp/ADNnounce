import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FloatingMenu = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.menuBox}>
        <TouchableOpacity onPress={() => navigation.navigate('CocsUserpage')}>
          <Image source={require('../assets/homeimg.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Need gumawa don sa home navigate tas pwede na magay dito san pupunta */}
        <TouchableOpacity onPress={() => navigation.navigate('CocsForAllpage')}>
          <Image source={require('../assets/showall.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Need gumawa don sa home navigate tas pwede na magay dito san pupunta */}
        <TouchableOpacity onPress={() => navigation.navigate('/')}>
          <Image source={require('../assets/Heart.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Need gumawa don sa home navigate tas pwede na magay dito san pupunta */}
        <TouchableOpacity onPress={() => navigation.navigate('CocsUserChat')}>
          <Image source={require('../assets/message.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Need gumawa don sa home navigate tas pwede na magay dito san pupunta */}
        <TouchableOpacity onPress={() => navigation.navigate('/')}>
          <Image source={require('../assets/save.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>


    </View>
  );
};

export default FloatingMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '95%',
    height: 60,
    borderRadius: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    gap: 20,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
