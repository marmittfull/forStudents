import React, { Component } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native'

export default class Select extends Component {
  state = {
    defaultOption: ''
  }
  componentDidMount = () => {
    this.setState({
      defaultOption: this.props.defaultOption
    })
  }
  handleDefaultOption = (id) => () => {
    this.setState({
      defaultOption: id
    })
    if(this.props.onSelectOption){
      this.props.onSelectOption(id)
    }
  }
  render() {
    const { options, label, marginSelect } = this.props
    return (
      <View style={[styles.container, marginSelect]}>
        <Text style={styles.label}>{label}</Text>
        <View style={{ flexDirection: "row", justifyContent: 'space-around', paddingTop: 20 }}>
          {
            options && options.map(option => {
              return (
                <TouchableOpacity onPress={this.handleDefaultOption(option.id)} key={option.id}>
                  <Text
                    style={[styles.text, this.state.defaultOption == option.id ? styles.defaultOption : null]}>
                    {option.label}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  label: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  text:{
    fontFamily: 'Ubuntu-Regular',
    color: 'black',
    fontSize: 20
  },
  defaultOption: {
    textDecorationLine: 'underline'
  }
})