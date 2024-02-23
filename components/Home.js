import React, { useState, useRef, useEffect } from 'react';
import { Pressable, View, Text, TextInput, Button, Keyboard, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = ({}) => {
  const [playerName, setPlayerName] = useState('');
  const [showRules, setShowRules] = useState(false);
  const inputRef = useRef(null);
  const navigation = useNavigation();

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
      navigation.navigate('Gameboard', { playerName: playerName }); // Navigate to the Gameboard screen
    } else {
      // If the player name is empty, display an error alert
      Alert.alert('Error', 'Please enter a valid player name.');
    }
  };

  const handleLogout = () => {
    setShowRules(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {showRules ? (
        <View>
          <Text>Rules of the Game</Text>
          {/* Your rules content */}
          <Button title="Log out" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <Text>Please enter your name:</Text>
          <TextInput
            ref={inputRef}
            style={{ height: 40, width: 200, borderWidth: 1, marginBottom: 20 }}
            onChangeText={text => setPlayerName(text)}
            value={playerName}
          />
          <Button
            title="Next"
            onPress={handleNext}
            disabled={!playerName.trim()} // Disable button if input is empty
          />
        </View>
      )}
    </View>
  );
};

export default Home;
