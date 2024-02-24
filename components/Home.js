import React, { useState, useRef, useEffect } from 'react';
import { Pressable, View, Text, TextInput, Button, Keyboard, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, MIN_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from './Gameboard'; // Importing constants from Gameboard
import styles from '../style/style' // Importing styles

const Home = ({ }) => {
  const [playerName, setPlayerName] = useState(''); // State to store the player's name
  const [showRules, setShowRules] = useState(false); // State to control the visibility of the rules
  const inputRef = useRef(null); // Ref for the TextInput
  const navigation = useNavigation(); // Navigation hook

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleNext = () => {
    // Close the keyboard
    Keyboard.dismiss();
    // Show the rules if the player name is not empty
    if (playerName.trim()) {
      setShowRules(true);
    } else {
      // If the player name is empty, display an error alert
      Alert.alert('Error', 'Please enter a valid player name.');
    }
  };

  const handlePlay = () => {
    navigation.navigate('Gameboard', { playerName: playerName }); // Navigate to the Gameboard screen with the player's name
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {showRules ? ( // Show rules if showRules is true
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.welcomeText}>Welcome, {playerName}!</Text>
          <Text style={styles.rulesText}>Rules of the Game</Text>
          <Text style={styles.rulesText}>
            THE GAME: Upper section of the classic Yahtzee dice game. You have {NBR_OF_DICES} dices and for every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in order to get the same dice spot counts as many as possible. At the end of the turn, you must select your points from {MIN_SPOT} to {MAX_SPOT}. The order for selecting those is free.
          </Text>
          <Text style={styles.rulesText}>
            POINTS: After each turn, the game calculates the sum for the dices you selected. Only the dices having the same spot count are calculated. Inside the game, you cannot select the same points from {MIN_SPOT} to {MAX_SPOT} again.
          </Text>
          <Text style={[styles.rulesText, { marginBottom: 60 }]}>
            GOAL: To get as many points as possible. {BONUS_POINTS_LIMIT} points is the limit of getting a bonus, which gives you {BONUS_POINTS} points more.
          </Text>
          <Pressable style={[styles.button, styles.dropShadow]} onPress={handlePlay}>
            <Text style={styles.buttonText}>Play</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[styles.rulesText, { paddingBottom: 20 }]}>Please enter your name:</Text>
          <TextInput
            ref={inputRef}
            style={styles.nameInput}
            onChangeText={text => setPlayerName(text)}
            value={playerName}
          />
          <Button
            title="Next"
            onPress={handleNext}
            disabled={!playerName.trim()} // Disable the Next button if player name is empty
            titleStyle={{ textAlign: 'center' }}
          />
        </View>
      )}
    </View>
  );
};

export default Home;
