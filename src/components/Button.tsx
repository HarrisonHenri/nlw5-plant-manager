import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import colors from '../styles/colors';

interface Props extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<Props> = ({ title, activeOpacity = 0.7, ...rest }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={activeOpacity}
      {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    margin: 10,
    height: 56,
  },
  buttonText: {
    color: colors.white,
  },
});
