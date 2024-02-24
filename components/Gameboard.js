import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

// Constants for game logic
export const NBR_OF_DICES = 5;
export const NBR_OF_THROWS = 3;
export const BONUS_POINTS_LIMIT = 63;
export const BONUS_POINTS = 50;
export const MIN_SPOT = 1;
export const MAX_SPOT = 6;

const SCOREBOARD_SIZE = 5;

// Initial state for the game
const initialState = {
    board: [],
    nbrSum: Array(6).fill(0),
    nbrSelectPossible: false,
    diceSelectPossible: false,
    throwPossible: true,
    getBonus: false,
    gameOver: false,
    nbrOfThrowsLeft: NBR_OF_THROWS,
    sum: 0,
    status: '',
    selectedDices: Array(NBR_OF_DICES).fill(false),
    usedNbrs: Array(6).fill(false),
    gameOver: false // Duplicate key, consider removing
};

export const Gameboard = ({ route }) => {
    const { playerName } = route.params;
    const [state, setState] = useState(initialState);
    const [totalScore, setTotalScore] = useState(0);
    const [scoreTime, setScoreTime] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        checkGameStatus(); // Check the game status
        let total = state.sum;
        if (total >= BONUS_POINTS_LIMIT) { // Check if the total score is greater than or equal to the bonus points limit
            setState(prevState => ({ ...prevState, getBonus: true })); // Update state to indicate bonus eligibility
            total += BONUS_POINTS; // Add bonus points to the total score
        }
        setTotalScore(total); // Set the total score
        if (state.gameOver) { // Check if the game is over
            const currentDate = new Date();
            const formattedTime = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
            setScoreTime(formattedTime); // Set the score time
            addScoreToScoreboard(total, formattedTime); // Add the score to the scoreboard
            Alert.alert("Your total score was: " + total); // Show an alert with the total score
        }
        setLoading(false); // Set loading state to false
    }, [state.sum, state.getBonus, state.nbrOfThrowsLeft, state.gameOver]);
    

    const { board, selectedDices, usedNbrs, nbrOfThrowsLeft, gameOver, sum } = state;

    // Function to add score to scoreboard
    const addScoreToScoreboard = async (totalScore, scoreTime) => {
        try {
            const scoreboardData = await AsyncStorage.getItem('scoreboard');
            let scoreboard = [];
            if (scoreboardData !== null) {
                scoreboard = JSON.parse(scoreboardData);
            }
    
            const newScoreboardEntry = { playerName, totalScore, scoreTime }; // Create a new scoreboard entry
            const newScoreboard = [...scoreboard, newScoreboardEntry];
            newScoreboard.sort((a, b) => b.totalScore - a.totalScore); // Sort the scoreboard entries by total score
            const updatedScoreboard = newScoreboard.slice(0, SCOREBOARD_SIZE); // Get the top entries up to the scoreboard size
            await AsyncStorage.setItem('scoreboard', JSON.stringify(updatedScoreboard)); // Update the scoreboard in AsyncStorage
            console.log(updatedScoreboard);
        } catch (error) {
            console.error('Error adding score to scoreboard:', error);
        }
    };

    const checkGameStatus = () => {
        if (nbrOfThrowsLeft === 0) {
            setState(prevState => ({ ...prevState, status: 'Select a number.', throwPossible: false, nbrSelectPossible: true }));
        } else if (nbrOfThrowsLeft < NBR_OF_THROWS) {
            setState(prevState => ({ ...prevState, status: 'Throw again or select a number', throwPossible: true, nbrSelectPossible: true, diceSelectPossible: true }));
        } else if (nbrOfThrowsLeft === NBR_OF_THROWS && !usedNbrs.every(x => x === true)) {
            setState(prevState => ({ ...prevState, status: 'Throw the dices.', throwPossible: true, nbrSelectPossible: false, diceSelectPossible: false }));
        } else if (nbrOfThrowsLeft === NBR_OF_THROWS && usedNbrs.every(x => x === true)) {
            setState(prevState => ({ ...prevState, status: 'Game over! All points selected.', throwPossible: false, diceSelectPossible: false, nbrSelectPossible: false, gameOver: true }));
        }

        if (sum >= BONUS_POINTS_LIMIT && !state.getBonus) {
            setState(prevState => ({ ...prevState, getBonus: true }));
        }
    };

    const selectDice = (i) => {
        const clickedDiceValue = parseInt(board[i].match(/(\d+)/)[0]); // Get the value of the clicked dice
        const dices = [...selectedDices]; // Create a copy of the selectedDices array
    
        // If the clicked dice is already selected, toggle its selection
        if (dices[i]) {
            dices[i] = false; // Deselect the clicked dice
    
            // Unselect all dices with the same value as the clicked dice
            for (let j = 0; j < NBR_OF_DICES; j++) {
                const diceValue = parseInt(board[j].match(/(\d+)/)[0]);
                if (diceValue === clickedDiceValue) {
                    dices[j] = false; // Deselect the dice with the same value
                }
            }
        } else {
            // Clear the selection of all dices
            dices.fill(false);
            
            // Select all dices with the same value as the clicked dice
            for (let j = 0; j < NBR_OF_DICES; j++) {
                const diceValue = parseInt(board[j].match(/(\d+)/)[0]);
                if (diceValue === clickedDiceValue) {
                    dices[j] = true; // Set to true if dice value matches clicked dice value
                }
            }
        }
    
        setState(prevState => ({ ...prevState, selectedDices: dices }));
    };
    
    

    const throwDices = () => {
        if (state.throwPossible && !gameOver) {
            const newBoard = [...board];
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    const randomNumber = Math.floor(Math.random() * 6 + 1);
                    newBoard[i] = 'dice-' + randomNumber;
                }
            }
            setState(prevState => ({ ...prevState, board: newBoard, nbrOfThrowsLeft: nbrOfThrowsLeft - 1 }));
        } else if (gameOver) {
            newGame();
        }
    };

    const useNbr = (i) => {
        const nbrs = [...usedNbrs];
        if (nbrOfThrowsLeft === 0 && state.nbrSelectPossible && !nbrs[i]) {
            if (i >= MIN_SPOT - 1 && i <= MAX_SPOT - 1) {
                nbrs[i] = true;
                let tempSum = 0;
                for (let x = 0; x < selectedDices.length; x++) {
                    const diceVal = parseInt(board[x].match(/(\d+)/)[0]);
                    if (diceVal - 1 === i && selectedDices[x]) {
                        tempSum += diceVal;
                    }
                }
                const newSum = sum + tempSum;
                const newNbrSum = [...state.nbrSum];
                newNbrSum[i] = tempSum;
                setState(prevState => ({ ...prevState, usedNbrs: nbrs, sum: newSum, nbrSum: newNbrSum, selectedDices: Array(NBR_OF_DICES).fill(false), nbrOfThrowsLeft: NBR_OF_THROWS }));
            } else {
                setState(prevState => ({ ...prevState, status: "Selected number is out of range." }));
            }
        } else if (nbrs[i]) {
            setState(prevState => ({ ...prevState, status: "You already selected points for " + (i + 1) }));
        } else {
            setState(prevState => ({ ...prevState, status: "You cannot select a score until you have no throws left." }));
        }
    };
    

    const checkBonus = () => {
        if (sum >= BONUS_POINTS_LIMIT) {
            return "You got the Bonus!";
        } else {
            return "You are " + (BONUS_POINTS_LIMIT - sum) + " points away from bonus.";
        }
    };

    const newGame = () => {
        setState(initialState);
        throwDices();
    };

    const renderDiceRow = () => {
        let diceRow = [];
        for (let i = 0; i < NBR_OF_DICES; i++) {
            diceRow.push(
                <Pressable
                    key={"row" + i}
                    onPress={() => selectDice(i)}
                >
                    <MaterialCommunityIcons
                        name={board[i]}
                        key={"row" + i}
                        size={65}
                        color={selectedDices[i] ? "black" : "#9f4dfc"}
                    />
                </Pressable>
            );
        }
        return diceRow;
    };

    const renderNbrRow = () => {
        let nbrRow = [];
        for (let i = 0; i < 6; i++) {
            nbrRow.push(
                <View style={styles.numbers} key={"nbrRow" + i}>
                    <Text style={[styles.nbrSum, {paddingLeft: 20, paddingTop: 10, paddingBottom: 10,}]}>{state.nbrSum[i]}</Text>
                    <Pressable
                        key={"nbrRow" + i}
                        onPress={() => useNbr(i)}
                    >
                        <MaterialCommunityIcons
                            name={'numeric-' + (i + 1) + '-circle'}
                            key={"nbrRow" + i}
                            size={50}
                            color={usedNbrs[i] ? "black" : "#9f4dfc"}
                        />
                    </Pressable>
                </View>
            );
        }
        return nbrRow;
    };

    return (
        <View style={styles.gameboard}>
            <View style={[styles.flex, styles.dropShadow]}>
                {renderDiceRow()}
            </View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{state.status}</Text>
            <Pressable style={[styles.button, styles.dropShadow]} onPress={throwDices}>
                <Text style={styles.buttonText}>{gameOver ? 'New Game' : 'Throw dices'}</Text>
            </Pressable>
            {loading ? (
                <ActivityIndicator size="large" color="skyblue" /> // Display loading indicator
            ) : (
                <Text style={[styles.gameinfo, styles.gamevalue]}>Total: {totalScore}</Text> // Display total score
            )}
            <Text style={styles.gameinfo}>{checkBonus()}</Text>
            <View style={[styles.flex, styles.dropShadow]}>
                {renderNbrRow()}
            </View>
        </View>
    );
};


export default Gameboard;
