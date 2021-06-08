import React, { useCallback } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../styles/colors';

import Background from '../assets/watering.png';

const Welcome: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigation = useCallback(() => {
    navigation.navigate('UserIdentification');
  }, [navigation]);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            Gerencie {'\n'} suas plantas de {'\n'} forma fácil
          </Text>

          <Image
            source={Background}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.subtitle}>
            Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
            sempre que precisar.
          </Text>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleNavigation}>
            <Icon name="chevron-right" size={18} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.heading,
    paddingHorizontal: 20,
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    margin: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  },
});
