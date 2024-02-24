import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import Gameboard from './Gameboard';
import Scoreboard from './Scoreboard';
import Home from './Home'; 

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'skyblue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: route.name === 'Home' ? 'none' : 'flex' // Hide tab bar on the Home screen
        }
      })}
    >
      <Tab.Screen
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Gameboard"
        component={Gameboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="gamepad" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Scoreboard"
        component={Scoreboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
