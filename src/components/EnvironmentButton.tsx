import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';

interface Props extends RectButtonProps {
  title: string;
  active?: boolean;
}

const EnvironmentButton: React.FC<Props> = ({
  title,
  active = false,
  ...rest
}) => {
  return (
    <RectButton
      style={[styles.container, active && styles.containerActive]}
      {...rest}>
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </RectButton>
  );
};

export default EnvironmentButton;

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.shape,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
  },
  textActive: {
    fontWeight: 'bold',
    color: colors.green,
  },
});
