import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Plant } from '../libs/storage';
import colors from '../styles/colors';
import api from '../services/api';

import Header from '../components/Header';
import EnvironmentButton from '../components/EnvironmentButton';
import PlantCardPrimary from '../components/PlantCardPrimary';
import Load from '../components/Load';
import { useNavigation } from '@react-navigation/core';

interface EnvironmentProps {
  key: string;
  title: string;
}

const PlantSelect: React.FC = () => {
  const navigation = useNavigation();
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPlants = useCallback(async () => {
    const { data } = await api.get<Plant[]>(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`,
    );

    if (!data) {
      return setLoading(true);
    }
    if (page > 1) {
      setPlants(old => [...old, ...data]);
      setFilteredPlants(old => [...old, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setLoading(false);
    setLoadingMore(false);
  }, [page]);

  const handleEnvironmentSelected = useCallback(
    (environment: string) => {
      setEnvironmentSelected(environment);
      if (environment === 'all') {
        setFilteredPlants(plants);
      } else {
        setFilteredPlants(
          plants.filter(plant => plant.environments.includes(environment)),
        );
      }
    },
    [plants],
  );

  const handleFetchMore = useCallback(
    (distance: number) => {
      if (distance < 1) {
        return;
      }
      setLoadingMore(true);
      setPage(old => old + 1);
      fetchPlants();
    },
    [fetchPlants],
  );

  const handleNavigation = useCallback(
    (plant: Plant) => navigation.navigate('PlantSave', { plant }),
    [navigation],
  );

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get<EnvironmentProps[]>(
        'plants_environments?_sort=title&_order=asc',
      );
      setEnvironments([{ key: 'all', title: 'Todos' }, ...data]);
    }
    fetchEnvironments();
  }, []);

  useEffect(() => {
    fetchPlants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta</Text>
      </View>
      <View>
        <FlatList
          data={environments}
          keyExtractor={item => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={handleEnvironmentSelected.bind(null, item.key)}
            />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={handleNavigation.bind(null, item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  );
};

export default PlantSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 16,
    color: colors.heading,
    fontWeight: 'bold',
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    marginVertical: 8,
    paddingHorizontal: 30,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
});
