import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, ViewBase} from 'react-native';

import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

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

function GameScreen({userNumber}) {
    const initialGuess = generateRandomBetween(minBoundary,maxBoundary, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    function nextGuessHandler(direction){
        // checking if the user is lying and avoiding a crash 
        if(direction === 'lower' && currentGuess < userNumber){
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
    }

  return (
    <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Text></Text>
        <View>
            <Text>
                Higher or Lower?
            </Text>
            <View>
                {/* bind allows us to pre-configure the parameter value that will be used in a future
                function execution */}
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                <PrimaryButton onPress={nextGuessHandler(this, 'greater')}>+</PrimaryButton>
            </View>
            <View>
                {/* Log Rounds */}
            </View>
        </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
    screen:{
        //flex: 1,
        padding: 24
    }
})