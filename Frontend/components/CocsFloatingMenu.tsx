import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FloatingMenu = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.menuBox}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/homeimg.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Need gumawa don sa home navigate tas pwede na magay dito san pupunta */}
        <TouchableOpacity onPress={() => navigation.navigate('/')}>
          <Image source={require('../assets/Heart.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Need gumawa don sa home navigate tas pwede na magay dito san pupunta */}
        <TouchableOpacity onPress={() => navigation.navigate('/')}>
          <Image source={require('../assets/message.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Need gumawa don sa home navigate tas pwede na magay dito san pupunta */}
        <TouchableOpacity onPress={() => navigation.navigate('/')}>
          <Image source={require('../assets/save.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Create')}>
        <Image source={require('../assets/add.png')} style={styles.plusIcon} />
      </TouchableOpacity>
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
    width: 250,
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
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  plusIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  addButton: {
    marginLeft: 10,
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
});
