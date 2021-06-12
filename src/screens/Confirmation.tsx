import React, { useCallback } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../styles/colors';

import Button from '../components/Button';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😃',
};

const Confirmation: React.FC = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const { title, subtitle, buttonTitle, icon, nextScreen } =
    routes.params as Params;

  const handleNavigation = useCallback(() => {
    navigation.navigate(nextScreen);
  }, [navigation, nextScreen]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleNavigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginTop: 15,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 32,
    marginTop: 8,
    textAlign: 'center',
    color: colors.heading,
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 44,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
