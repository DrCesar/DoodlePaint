

import React, {Component} from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Dimensions, Platform, StyleSheet, Text, View, PanResponder, Button, ScrollView} from 'react-native'
import Svg, { G, Path } from 'react-native-svg'
import SocketIOClient from 'socket.io-client'

import Canvas from 'components/Canvas'
import Reaction from 'components/Reaction'
import Settings from 'components/Settings'

import CanvasContainer from 'containers/CanvasContainer'
import SettingsContainer from 'containers/SettingsContainer'

import doodlePaint from './src/reducers'
import { SET_SESSION } from './src/actions'

const store = createStore(doodlePaint)

export default class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      reaction: new Reaction(),
      pathCount: 0,
      donePaths: [],
      currentPoints: [],
      x: 0,
      y: 0
    }
  }

  setCoordinates = (x, y) => {
    this.setState({x, y});
  }

  sendMessage = () => {
    console.log('message')
    this.socket.emit('message', { data: 'telefono' });
  }

  test(evt) {
    console.log('funciona')
  }

  componentDidMount() {
    fetch('http://127.0.0.1:4000/init', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        size: [Dimensions.get('window').width - 20, Dimensions.get('window').width - 20]
      })
    })
    .then(res => {
      console.log(res.headers.get('set-cookie'))
      // store.dispatch({
      //   type: SET_SESSION,
      //   session: res.headers.get('set-cookie')
      // })
      return res.json()
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  render() {
    const { x, y, pathCount, donePaths } = this.state;
    tempPaths = donePaths.slice(0);
    tempPaths.push(
      <Path
        key={this.state.pathCount}
        p={this.state.reaction.pointsToSvg(this.state.currentPoints)}
        stroke="red"
        fill="none"
      />
    );
    return (
      <Provider store={store}>
        <ScrollView
          contentContainerStyle={styles.container}>
          {/*<View style={styles.container} {...this._panResponder.panHandlers}>
                    <Svg
                      style={styles.canvas}>
                      <G>
                        {tempPaths}
                        
                      </G>
                    </Svg>
                  </View>*/}

          {/*<Canvas
            setCoordinates={this.setCoordinates}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').width}
          />*/}

          <CanvasContainer />

          <View style={{ minHeight: 200 }}>
            <Button title="message" onPress={this.sendMessage} />
            <SettingsContainer />
            <Text style={styles.instructions}>{x}</Text>
            <Text style={styles.instructions}>{y}</Text>
          </View>
        </ScrollView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  canvas: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
