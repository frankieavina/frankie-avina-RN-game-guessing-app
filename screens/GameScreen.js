import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View, ViewBase} from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItems from '../components/game/GuessLogItems';

let minBoundary = 1;
let maxBoundary = 100;

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
}

function GameScreen({userNumber, onGameOver}) {
    // need to hard code because will cause crash since useeffect is late 
    // one render on instead of useEffect we can use useMemo
    const initialGuess = generateRandomBetween(1,100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if( currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    },[currentGuess,userNumber, onGameOver])

    useEffect(() =>{
        minBoundary = 1;
        maxBoundary = 100;
    },[])

    function nextGuessHandler(direction){
        // checking if the user is lying and avoiding a crash 
        if (
          (direction === 'lower' && currentGuess < userNumber) || 
          (direction === 'greater' && currentGuess > userNumber)
        ){
            Alert.alert('Dont Lie!', 'You know this is wrong..',[{test:'Sorry!', style:'cancel'}]);
            return;
        }

        if(direction === 'lower'){
            maxBoundary = currentGuess;
        }else{
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary,maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds((prevGuessRounds) => [...prevGuessRounds, newRndNumber]);
    }

    const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Text></Text>
        <Card>
            <InstructionText>
                Higher or Lower?
            </InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    {/* bind allows us to pre-configure the parameter value that will be used in a future
                    function execution */}
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white"/>
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white"/>
                    </PrimaryButton>
                </View>
            </View>
            <View>
            </View>
        </Card>
        <View style={styles.listContainer}>
            <FlatList 
                data={guessRounds} 
                renderItem={(itemData) => (
                    <GuessLogItems 
                        roundNumber={guessRoundsListLength - itemData.index} 
                        guess={itemData.item}/>
                )}
                keyExtractor={(item) => item}
            />
        </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        height: 100,
        padding: 24
    },
    buttonsContainer:{
        flexDirection: 'row'
    },
    buttonContainer:{
        flex:1
    },
    listContainer:{
        flex:1,
        padding: 16
    }

})