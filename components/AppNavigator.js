import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Gameboard from './Gameboard';
import Scoreboard from './Scoreboard';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Gameboard" component={Gameboard} />
        <Stack.Screen name="Scoreboard" component={Scoreboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
