import React, { Component } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet
} from 'react-native'
import Title from './src/components/Title'
import Select from './src/components/Select'
import Counter from './src/components/Counter'
import Sound from 'react-native-sound'
import BackgroundProgress from './src/components/BackgroundProgress'

const alert = require('./assets/sounds/alert.wav')

class App extends Component {
  state = {
    sessionTime: 25,
    pauseTime: 5,
    ciclos: 2,

    isRunning: false,
    countdown: 1,
    countdownTimerValue: 0,
    count: 0,
    pauseCount: 0,
    pause: false,
    repetitions: 1,
    wait: false
  }
  componentDidMount = () => {
    Sound.setCategory('Playback', true)
    this.alert = new Sound(alert)
  }
  play = () => {
    this.setState({
      isRunning: true,
      countdownTimerValue: 5
    })
    const count = () => {
      this.setState({
        count: this.state.count + 1
      }, () => {
        const sessionRest = (this.state.sessionTime * 60) - this.state.count
        if (sessionRest <= 5)
          this.alert.play()
        if (this.state.count === this.state.sessionTime * 60) {
          clearInterval(this.countTimer)
          this.pauseTimeTimer = setInterval(pauseTime, 1000)
          this.setState({
            pauseCount: 0,
            pause: true
          })
        }
      })
    }
    const pauseTime = () => {
      this.setState({
        pauseCount: this.state.pauseCount + 1
      }, () => {
        const pauseRest = (this.state.pauseTime * 60) - this.state.pauseCount
        if (pauseRest <= 5)
          this.alert.play()
        if (this.state.pauseCount === this.state.pauseTime * 60) {
          clearInterval(this.pauseTimeTimer)
          this.setState({
            count: 0,
            pause: false,
            repetitions: this.state.repetitions + 1
          })
          if (this.state.repetitions >= this.state.ciclos) {
            clearInterval(this.pauseTimeTimer)
            clearInterval(this.countTimer)
            return this.stop()
          } else {
            this.countTimer = setInterval(count, 1000)
          }
        }
      })
    }

    if (this.state.countdown === 1) {
      // this.alert.play()
      this.countdownTimer = setInterval(() => {
        this.setState({
          countdownTimerValue: this.state.countdownTimerValue - 1
        }, () => {
          // this.alert.play()
          if (this.state.countdownTimerValue === 0) {
            clearInterval(this.countdownTimer)
            this.countTimer = setInterval(count, 1000)
          }
        })
      }, 1000)
    }
    else {
      this.countTimer = setInterval(count, 1000)
    }

  }

 
  stop = () => {
    clearInterval(this.countdownTimer)
    clearInterval(this.countTimer)
    clearInterval(this.pauseTimeTimer)
    this.setState({
      countdownTimerValue: 0,
      count: 0,
      pauseCount: 0,
      repetitions: 1,
      isRunning: false
    })
  }
  render() {
    const percentage = parseInt((this.state.count / 60 / this.state.sessionTime) * 100)

    console.log(this.state.ciclos);
    console.log(this.state.repetitions);
    if (this.state.isRunning) {
      return (
        <BackgroundProgress percentage={percentage}>
          <View style={{ flex: 1 }}>
            <Title text="forStudents" marginTitle={{ paddingTop: 50 }} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {
                this.state.countdownTimerValue > 0 ?
                  <Text style={styles.countdown}>{this.state.countdownTimerValue}</Text>
                  :
                  this.state.pause ?
                    <View style={{ alignItems: 'center' }}>
                      <Counter time={this.state.pauseCount} />
                      <Counter defineCounter={'counter2'} time={this.state.pauseTime * 60 - this.state.pauseCount}
                        appendedText=" restantes de pausa"
                      />
                    </View>
                    :
                    <View style={{ alignItems: 'center' }}>
                      <Counter time={this.state.count} />
                      <Counter defineCounter={'counter2'} time={this.state.sessionTime * 60 - this.state.count}
                        appendedText=" restantes"
                      />
                    </View>
              }
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={this.stop} style={{ marginBottom: 50}}>
                  <Image style={{ width: 70, height: 70, tintColor: 'white' }} source={require('./assets/images/stop.png')} />
                </TouchableOpacity>
            </View>
          </View>
        </BackgroundProgress>
      )
    }
    return (
      <View style={styles.container}>
        <Title text="forStudents" marginTitle={{ paddingTop: 50 }} />
        <View style={{ flex: 2 }}>
          <Select
            label="Tempo da sessão"
            options={
              [
                {
                  id: 25,
                  label: '25m'
                },
                {
                  id: 50,
                  label: '50m'
                }
              ]
            }
            defaultOption={25}
            onSelectOption={(id) => this.setState({ sessionTime: 1 })}
          />
          <Select
            marginSelect={{ paddingTop: 30 }}
            label="Tempo de intervalo"
            options={
              [
                {
                  id: 5,
                  label: '5m'
                },
                {
                  id: 10,
                  label: '10m'
                },
                {
                  id: 15,
                  label: '15m'
                },
                {
                  id: 20,
                  label: '20m'
                }
              ]
            }
            defaultOption={5}
            onSelectOption={(id) => this.setState({ sessionTime: 1 })}
          />
          <Select
            marginSelect={{ paddingTop: 30 }}
            label="Ciclos"
            options={
              [
                {
                  id: 1,
                  label: '1'
                },
                {
                  id: 2,
                  label: '2'
                },
                {
                  id: 3,
                  label: '3'
                },
                {
                  id: 4,
                  label: '4'
                }
              ]
            }
            defaultOption={2}
            onSelectOption={(id) => this.setState({ ciclos: id })}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity onPress={this.play}>
            <Image style={{ width: 70, height: 70, tintColor: 'white' }} source={require('./assets/images/start.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6304A'
  },
  countdown: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 80,
    color: 'white'
  }

})
export default App