import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';

import PlantSelect from '../screens/PlantSelect';
import MyPlants from '../screens/MyPlants';

const TabRoutes = createBottomTabNavigator();

const AppTabRoutes: React.FC = () => (
  <TabRoutes.Navigator
    tabBarOptions={{
      activeTintColor: colors.green,
      inactiveTintColor: colors.heading,
      labelPosition: 'beside-icon',
      style: {
        height: 64,
        alignItems: 'center',
      },
    }}>
    <TabRoutes.Screen
      name="Nova Planta"
      component={PlantSelect}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons size={size} color={color} name="add-circle-outline" />
        ),
      }}
    />
    <TabRoutes.Screen
      name="Minhas Plantas"
      component={MyPlants}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons
            size={size}
            color={color}
            name="format-list-bulleted"
          />
        ),
      }}
    />
  </TabRoutes.Navigator>
);

export default AppTabRoutes;
