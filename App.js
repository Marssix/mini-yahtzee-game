import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './style/style'
import BottomNavigator from './components/BottomNavigator';
import { horizontalScale, verticalScale, moderateScale } from './components/Metrics';


export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header style={{ width: horizontalScale(100), height: verticalScale(50) }} />
        <Footer style={{ marginBottom: moderateScale(20) }} />
        <BottomNavigator />
      </View>
    </NavigationContainer>
  )
};
