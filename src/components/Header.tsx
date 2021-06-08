import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import colors from '../styles/colors';

import Avatar from '../assets/13942973.png';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Harrison</Text>
      </View>
      <Image style={styles.image} source={Avatar} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontWeight: 'bold',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
