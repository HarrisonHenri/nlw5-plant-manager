import AsyncStorage from '@react-native-community/async-storage';
import { format } from 'date-fns';

export interface Plant {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: { name: string; repeat_every: string };
  dateTimeNotification: Date;
  hour: string;
}

interface StoragePlant {
  [id: string]: {
    data: Plant;
  };
}

export const savePlant = async (plant: Plant): Promise<void> => {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlant) : {};
    const newPlant = {
      [plant.id]: {
        data: plant,
      },
    };

    AsyncStorage.setItem(
      '@plantmanager:plants',
      JSON.stringify({ ...newPlant, ...oldPlants }),
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const loadPlants = async (): Promise<Plant[]> => {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlant) : {};

    const plantsSorted = Object.keys(plants)
      .map(plant => ({
        ...plants[plant].data,
        hour: format(
          new Date(plants[plant].data.dateTimeNotification),
          'HH:mm',
        ),
      }))
      .sort(
        (a, b) =>
          Math.floor(new Date(a.dateTimeNotification).getTime() / 1000) -
          Math.floor(new Date(b.dateTimeNotification).getTime() / 1000),
      );

    return plantsSorted as Plant[];
  } catch (error) {
    throw new Error(error);
  }
};

export const removePlant = async (plantId: string): Promise<void> => {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlant) : {};

    delete plants[plantId];

    AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({ ...plants }));
  } catch (error) {
    throw new Error(error);
  }
};
