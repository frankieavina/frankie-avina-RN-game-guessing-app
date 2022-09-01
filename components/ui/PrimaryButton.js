import { Button, View, Text, Pressable, StyleSheet } from 'react-native';

function PrimaryButton({children, onPress}) {

  const pressHandler = () => {
    onPress(); 
  }

  return (
    <View style={ styles.buttonOuterContainer}>
      <Pressable 
      // this pressed property is part of Pressable component that we use to modify 
      // the button when we use iOS 
        style={ ({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer } 
        onPress={pressHandler}
        android_ripple={{color:'#640233'}}
        >
        <Text style={ styles.buttonText}>
            {children}
        </Text>
      </Pressable> 
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  buttonOuterContainer:{
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden'
  },
  buttonInnerContainer:{
    backgroundColor: '#72063c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation:2,
  },
  buttonText:{
    color: 'white',
    textAlign: 'center'
  },
  pressed:{
    opacity: 0.75, // 25 percent transparent giving an effect to iOS when button is pressed
  }
})