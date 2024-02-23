import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import styles from '../style/style';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCOREBOARD_SIZE = 5;

const Scoreboard = () => {
    const [scoreboard, setScoreboard] = useState([]);
    const route = useRoute();
    const { playerName } = route.params || {};

    useEffect(() => {
        if (playerName) {
            loadScoreboard();
        }
    }, [playerName]);

    const loadScoreboard = async () => {
        try {
            const scoreboardData = await AsyncStorage.getItem('scoreboard');
            if (scoreboardData) {
                setScoreboard(JSON.parse(scoreboardData));
            } else {
                setScoreboard([]);
            }
        } catch (error) {
            console.error('Error loading scoreboard:', error);
            Alert.alert('Error', 'Failed to load scoreboard. Please try again later.');
        }
    };
    
    const clearScores = async () => {
        try {
            await AsyncStorage.removeItem('scoreboard');
            setScoreboard([]);
        } catch (error) {
            console.error('Error clearing scoreboard:', error);
            Alert.alert('Error', 'Failed to clear scoreboard. Please try again later.');
        }
    };

    console.log('Scoreboard:', scoreboard); // Add this line to log scoreboard state

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top {SCOREBOARD_SIZE} Scores</Text>
            <View style={styles.scoreboardContainer}>
                {scoreboard.length > 0 ? (
                    scoreboard.map((entry, index) => (
                        <Text key={index} style={styles.scoreboardText}>
                            {entry.playerName}: {entry.score} (Time: {entry.time})
                        </Text>
                    ))
                ) : (
                    <Text style={styles.scoreboardText}>No scores yet.</Text>
                )}
            </View>
            <Button title="Clear Scores" onPress={clearScores} />
        </View>
    );
};

export default Scoreboard;

