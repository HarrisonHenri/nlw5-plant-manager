import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

import Button from '../components/Button';
import AsyncStorage from '@react-native-community/async-storage';

const UserIdentification: React.FC = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState('');

  const handleNavigation = useCallback(async () => {
    if (name !== '') {
      navigation.navigate('Confirmation');
      await AsyncStorage.setItem('@plantmanager:user', name);
    } else {
      Alert.alert('Me diz como chamar você 😢');
    }
  }, [navigation, name]);

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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <Text style={styles.emoji}>
                {name.length === 0 ? '😃' : '😉'}
              </Text>
              <Text style={styles.title}>Como podemos {'\n'} chamar você?</Text>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || name.length > 0) && {
                    borderColor: colors.green,
                  },
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleNavigation} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserIdentification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    lineHeight: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.heading,
  },
  emoji: {
    fontSize: 44,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 20,
  },
});
