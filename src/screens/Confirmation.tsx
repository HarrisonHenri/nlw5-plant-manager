import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TextInput } from 'react-native';
import colors from '../styles/colors';

import Button from '../components/Button';

const Confirmation: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState('');

  const handleNavigation = useCallback(() => {}, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setName(value);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😃</Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subtitle}>
          Agora vamos cuidar das suas plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button title="Confirmar" />
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