import AsyncStorage from '@react-native-community/async-storage';
import { format } from 'date-fns';
import PushNotification from 'react-native-push-notification';

export interface Plant {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: { times: number; repeat_every: string };
  dateTimeNotification: Date;
  hour: string;
}

interface StoragePlant {
  [id: string]: {
    data: Plant;
    notificationId: number;
  };
}

const CHANNEL = 'PLANT_MANAGER_CHANNEL';

export const savePlant = async (plant: Plant): Promise<void> => {
  try {
    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();
    const { times, repeat_every } = plant.frequency;

    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
    } else {
      nextTime.setDate(now.getDate() + 1);
    }

    const milliseconds = Math.abs(
      Math.floor(now.getTime()) - Math.floor(nextTime.getTime()),
    );

    PushNotification.createChannel(
      {
        channelId: CHANNEL,
        channelName: CHANNEL,
      },
      () => {},
    );

    const notificationId = Math.floor(Math.random() * 1e9);

    PushNotification.localNotificationSchedule({
      id: notificationId,
      channelId: CHANNEL,
      title: 'Heeey, 🌴',
      message: `Está na hora de cuidar da sua ${plant.name}`,
      date: new Date(Date.now() + milliseconds),
      playSound: true,
    });

    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlant) : {};
    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId,
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

    PushNotification.cancelLocalNotifications({
      id: String(plants[plantId].notificationId),
    });

    delete plants[plantId];

    AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({ ...plants }));
  } catch (error) {
    throw new Error(error);
  }
};
