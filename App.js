import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import Header from './components/Header'
import Gameboard from './components/Gameboard'
import Footer from './components/Footer'
import styles from './style/style'
import Scoreboard from './components/Scoreboard';
import BottomNavigator from './components/BottomNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <Footer />
        <BottomNavigator />
      </View>
    </NavigationContainer>
  )
};
