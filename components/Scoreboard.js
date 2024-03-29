import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, Alert } from 'react-native';
import styles from '../style/style';
import { useRoute, useFocusEffect } from '@react-navigation/native'; // Importing hooks from React Navigation
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCOREBOARD_SIZE = 5; // Constant for scoreboard size

const Scoreboard = () => {
    const [scoreboard, setScoreboard] = useState([]); // State to store the scoreboard data

    // Function to fetch scoreboard data from AsyncStorage
    const fetchScoreboard = async () => {
        try {
            const scoreboardData = await AsyncStorage.getItem('scoreboard'); // Get scoreboard data from AsyncStorage
            console.log('Scoreboard data:', scoreboardData); // Log the scoreboard data
            if (scoreboardData) {
                setScoreboard(prevScoreboard => {
                    const updatedScoreboard = JSON.parse(scoreboardData); // Parse the scoreboard data
                    console.log('Scoreboard updated:', updatedScoreboard); // Log the updated scoreboard data
                    return updatedScoreboard; // Update the scoreboard state
                });
            } else {
                setScoreboard([]); // If no data found, set scoreboard state to an empty array
            }
        } catch (error) {
            console.error('Error loading scoreboard:', error); // Log error if scoreboard data loading fails
            Alert.alert('Error', 'Failed to load scoreboard. Please try again later.'); // Show an alert for error
        }
    };

    // Function to clear scoreboard data
    const clearScores = async () => {
        try {
            await AsyncStorage.removeItem('scoreboard'); // Remove scoreboard data from AsyncStorage
            setScoreboard([]); // Update scoreboard state to an empty array
        } catch (error) {
            console.error('Error clearing scoreboard:', error); // Log error if clearing scoreboard fails
            Alert.alert('Error', 'Failed to clear scoreboard. Please try again later.'); // Show an alert for error
        }
    };

    // useEffect hook with useFocusEffect to fetch scoreboard data when the component is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchScoreboard(); // Fetch scoreboard data
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.topScoresText}>Top {SCOREBOARD_SIZE} Scores</Text>
            <View style={styles.scoreboardContainer}>
                <View style={styles.scoreHeader}>
                    <Text style={styles.scoreLabel}>Player</Text>
                    <Text style={styles.scoreLabel}>Date</Text>
                    <Text style={styles.scoreLabel}>Score</Text>
                </View>
                {scoreboard.length > 0 ? (
                    scoreboard.map((entry, index) => (
                        <View key={index} style={[styles.scoreboardEntry, styles.horizontal]}>
                            <Text style={[styles.scoreboardText, { paddingLeft: 20 }]}>{entry.playerName + "        "}</Text>
                            <Text style={[styles.scoreboardText, { paddingLeft: 10 }]}>{entry.scoreTime + "       "}</Text>
                            <Text style={[styles.scoreboardText, { paddingLeft: 30 }]}>
                                {entry.totalScore}
                            </Text>
                        </View>

                    ))
                ) : (
                    <Text style={[styles.scoreLabel, { textAlign: 'center' }]}>No scores yet.</Text>
                )}
                <Pressable style={[styles.clearButton, styles.dropShadow]} onPress={clearScores}>
                    <Text style={styles.clearButtonText}>Clear Scores</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Scoreboard;
