import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Title = props => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, props.marginTitle]}>{props.text}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title:{
    fontSize: 48,
    color: 'white',
    fontFamily: 'Ubuntu-Italic',
  }

})
export default Title