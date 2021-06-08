import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';

interface Props extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

const PlantCardPrimary: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.title}>{data.name}</Text>
    </RectButton>
  );
};

export default PlantCardPrimary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10,
  },
  title: {
    color: colors.green_dark,
    fontWeight: 'bold',
  },
});
