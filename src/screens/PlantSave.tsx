import React, { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useRoute, useNavigation } from '@react-navigation/core';
import { format, isBefore } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Plant, savePlant } from '../libs/storage';
import colors from '../styles/colors';

import WaterDrop from '../assets/waterdrop.png';
import Button from '../components/Button';

interface Params {
  plant: Plant;
}

const PlantSave: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { plant } = route.params as Params;
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const handleChangeTime = useCallback((_, dateTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(old => !old);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰');
    }

    setSelectedDateTime(dateTime ?? new Date());
  }, []);

  const handleOpenDateTimePickerForAndroid = useCallback(() => {
    setShowDatePicker(old => !old);
  }, []);

  const handlePlantSave = useCallback(async () => {
    navigation.navigate('Confirmation', {
      title: 'Tudo certo',
      subtitle:
        'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha.',
      buttonTitle: 'Começar',
      icon: 'hug',
      nextScreen: 'MyPlants',
    });
    try {
      await savePlant({ ...plant, dateTimeNotification: selectedDateTime });
    } catch {
      Alert.alert('Não foi possível salver');
    }
  }, [navigation, plant, selectedDateTime]);

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={WaterDrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>
        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="clock"
            onChange={handleChangeTime}
          />
        )}
        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}>
            <Text style={styles.dateTimePickerText}>{`Mudar ${format(
              selectedDateTime,
              'HH:mm',
            )}`}</Text>
          </TouchableOpacity>
        )}
        <Button title="Cadastrar planta" onPress={handlePlantSave} />
      </View>
    </View>
  );
};

export default PlantSave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  plantName: { fontSize: 24, color: colors.heading, marginTop: 16 },
  plantAbout: {
    textAlign: 'center',
    color: colors.heading,
    fontSize: 16,
    marginTop: 10,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 40,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 17,
    textAlign: 'justify',
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
  },
  alertLabel: {
    textAlign: 'center',
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
});
