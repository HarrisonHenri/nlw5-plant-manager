import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';

interface Props extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
}

const PlantCardSecondary: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={50} height={50} />
      <Text style={styles.title}>{data.name}</Text>
      <View style={styles.details}>
        <Text style={styles.timeLabel}>Regar às</Text>
        <Text style={styles.hour}>{data.hour}</Text>
      </View>
    </RectButton>
  );
};

export default PlantCardSecondary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
  },
  title: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: { flex: 1, alignItems: 'flex-end' },
  timeLabel: { fontSize: 16, color: colors.body_light },
  hour: { marginTop: 8, fontSize: 16, color: colors.body_dark },
});
