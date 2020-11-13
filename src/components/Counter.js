import React from 'react'
import {
  View, Text, StyleSheet
} from 'react-native'

const Counter = (props) => {
  const { time, defineCounter, appendedText } = props
  const minutes = parseInt(time / 60)
  const seconds = parseInt(time % 60)
  const format = number => {
    if(number < 10){
      return '0'+number
    }
    return number
  } 
  return (
  <Text style={defineCounter ? styles[defineCounter] : styles.counter}>
    { format(minutes)+':'+format(seconds) }{appendedText}</Text>
  )
}
const styles = StyleSheet.create({
  counter: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 80,
    color: 'white'
  },
  counter2: {
    fontFamily: 'Ubuntu-Italic',
    fontSize: 25,
    color: 'white'
  }
})
export default Counter