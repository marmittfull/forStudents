import React, { Component } from 'react'
import {
  View, Animated
} from 'react-native'

class BackgroundProgress extends Component {
  state = {
    height: new  Animated.Value(0)
  }
  componentDidUpdate = prevProps => {
    if (prevProps.percentage !== this.props.percentage) {
      Animated.timing(this.state.height, {
        toValue: this.props.percentage,
        duration: 900,
        useNativeDriver: false
      }).start( )
    }
  }
  render() {
    const { percentage, children } = this.props
    const h = this.state.height.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    })
    const h2 = this.state.height.interpolate({
      inputRange: [0, 100],
      outputRange: ['100%', '0%']
    })
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Animated.View style={{ backgroundColor: '#D6304A', height: h2 }} />
          <Animated.View style={{ backgroundColor: '#2A0E12', height: h }} />
        </View>
        <View style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: 0 }}>
          {children}
        </View>
      </View>
    )
  }
}
export default BackgroundProgress