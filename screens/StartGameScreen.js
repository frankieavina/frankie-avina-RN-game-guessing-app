import { useState } from 'react';
import { TextInput, Button, View, StyleSheet, Alert} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';

import Colors from '../constants/colors'

function StartGameScreen({onPickedNumber}) {
  const [enteredNumber, setEnteredNumber] = useState('');

  const numberInputHandler = (enteredText) =>{
    setEnteredNumber(enteredText);
  }

  const resetInputHandler = () => {
    setEnteredNumber('');
  }

  const confirmInputHandler = () =>{
    const chosenNumber = parseInt(enteredNumber);

    // if number isn't valid
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [{text: 'Okay', style: 'destructive', onPress:resetInputHandler }]
      );
      return;
    }

    // if number is valid 
    onPickedNumber(chosenNumber);
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.numberInput} 
        maxLength={2} 
        keyboardType='number-pad'
        // autoCapitalize='none'
        // autoCorrect={false}
        onChangeText={numberInputHandler}
        value={enteredNumber}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmInputHandler} >Confirm</PrimaryButton>           
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen

const styles = StyleSheet.create({
  inputContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, 
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    backgroundColor: Colors.primary800,
    elevation: 4 , // adds shadow on Android
    shadowColor: 'black', // adding shadow on iOS
    shadowOffset: {width: 0,height: 2}, 
    shadowRadius: 6,
    shadowOpacity: 0.25
  },
  numberInput:{
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer:{
    flex: 1
  }
});