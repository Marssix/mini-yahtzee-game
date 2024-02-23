import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, Button, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from 'react-native'; // Import AsyncStorage from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

export const NBR_OF_DICES = 5;
export const NBR_OF_THROWS = 3;
export const SUM_FOR_BONUS = 63;
export const BONUS = 50;
export const MIN_SPOT = 1;
export const MAX_SPOT = 6;

const SCOREBOARD_SIZE = 5;

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
    gameOver: false
};

const Gameboard = ({ playerName }) => {
    const [state, setState] = useState(initialState);
    const [totalScore, setTotalScore] = useState(0);
    const [totalTime, setTotalTime] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        checkGameStatus();
        let total = state.sum;
        if (total >= SUM_FOR_BONUS) {
            setState(prevState => ({ ...prevState, getBonus: true }));
            total += BONUS;
        }
        setTotalScore(total);
        if (state.gameOver) {
            const currentDate = new Date();
            const formattedTime = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
            setTotalTime(formattedTime);
            addScoreToScoreboard(playerName); // Pass playerName to addScoreToScoreboard
            Alert.alert("Your total score was: " + total);
        }
        setLoading(false);
    }, [state.sum, state.getBonus, state.nbrOfThrowsLeft, state.gameOver]);

    const { board, selectedDices, usedNbrs, nbrOfThrowsLeft, gameOver, sum } = state;

    const addScoreToScoreboard = async (playerName) => {
        try {
            const scoreboardData = await AsyncStorage.getItem('scoreboard');
            let scoreboard = [];
            if (scoreboardData !== null) {
                scoreboard = JSON.parse(scoreboardData);
            }
            const newScoreboardEntry = { playerName, score: totalScore, time: totalTime };
            const newScoreboard = [...scoreboard, newScoreboardEntry];
            newScoreboard.sort((a, b) => b.score - a.score);
            const updatedScoreboard = newScoreboard.slice(0, SCOREBOARD_SIZE);
            await AsyncStorage.setItem('scoreboard', JSON.stringify(updatedScoreboard));
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

        if (sum >= SUM_FOR_BONUS && !state.getBonus) {
            setState(prevState => ({ ...prevState, getBonus: true }));
        }
    };

    const selectDice = (i) => {
        if (state.diceSelectPossible) {
            const dices = [...selectedDices];
            dices[i] = !dices[i];
            setState(prevState => ({ ...prevState, selectedDices: dices }));
        } else {
            setState(prevState => ({ ...prevState, status: "You have to throw dices first." }));
            Alert.alert("Your have to throw a dice first!")
        }
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
        if (state.nbrSelectPossible && !nbrs[i]) {
            if (i >= MIN_SPOT - 1 && i <= MAX_SPOT - 1) {
                nbrs[i] = true;
                let tempSum = 0;
                for (let x = 0; x < selectedDices.length; x++) {
                    const diceVal = parseInt(board[x].match(/(\d+)/)[0]);
                    if (diceVal - 1 === i) {
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
        }
    };

    const checkBonus = () => {
        if (sum >= SUM_FOR_BONUS) {
            return "You got the Bonus!";
        } else {
            return "You are " + (SUM_FOR_BONUS - sum) + " points away from bonus.";
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
                    <Text style={styles.nbrSum}>{state.nbrSum[i]}</Text>
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
            {/* Display the total score or a loading indicator */}
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
