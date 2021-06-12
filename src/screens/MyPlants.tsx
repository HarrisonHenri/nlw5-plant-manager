import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { formatDistance } from 'date-fns/esm';
import { pt } from 'date-fns/locale';
import { loadPlants, Plant } from '../libs/storage';
import colors from '../styles/colors';

import Header from '../components/Header';
import WaterDrop from '../assets/waterdrop.png';
import PlantCardPrimary from '../components/PlantCardPrimary';
import PlantCardSecondary from '../components/PlantCardSecondary';

const MyPlants: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextSprinkle, setNextSprinkle] = useState('');

  useEffect(() => {
    async function loadStorageData() {
      const myPlants = await loadPlants();

      const nextTime = formatDistance(
        new Date(myPlants[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt },
      );

      setNextSprinkle(
        `Não esqueça de regar a ${myPlants[0].name} às ${nextTime} horas`,
      );
      setPlants(myPlants);
      setLoading(false);
    }
    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spolight}>
        <Image source={WaterDrop} style={styles.spolightImage} />
        <Text style={styles.spolightText}>{nextSprinkle}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas Regadas</Text>
        <FlatList
          data={plants}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <PlantCardSecondary data={item} />}
        />
      </View>
    </View>
  );
};

export default MyPlants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: 32,
    backgroundColor: colors.background,
  },
  spolight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
  },
  spolightImage: { width: 60, height: 60 },
  spolightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 8,
  },
  plants: { flex: 1, width: '100%' },
  plantsTitle: { fontSize: 24, color: colors.heading },
});
