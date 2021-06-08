import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import colors from '../styles/colors';
import api from '../services/api';

import Header from '../components/Header';
import EnvironmentButton from '../components/EnvironmentButton';
import PlantCardPrimary from '../components/PlantCardPrimary';
import Load from '../components/Load';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  photo: string;
  about: string;
  environments: string[];
  frequency: { name: string; repeat_every: string };
}

const PlantSelect: React.FC = () => {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  const fetchPlants = useCallback(async () => {
    const { data } = await api.get<PlantProps[]>(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`,
    );

    if (!data) {
      return setLoadedAll(true);
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
  }, [fetchPlants]);

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>vocês quer colocar sua planta</Text>
      </View>
      <View>
        <FlatList
          data={environments}
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
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
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
    paddingBottom: 8,
    paddingHorizontal: 30,
  },
  plants: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
  },
});
