/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

import doodlePaint from './src/reducers'

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
    this.socket = SocketIOClient('http://192.168.50.217:5000');
    this.socket.on('connect', () => console.log('connected'))
    console.log(this.socket.connected)
    // this._panResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: (evt, gs) => true,
    //   onMoveShouldSetPanResponder: (evt, gs) => true,
    //   onPanResponderGrant: (evt, gs) => this.onResponderGrant(evt, gs),
    //   onPanResponderMove: (evt, gs) => this.onResponderMove(evt, gs),
    //   onPanResponderRelease: (evt, gs) => this.onResponderRelease(evt, gs)
    // });
  }

  // onTouch(evt) {
  //   let [x, y] = [evt.nativeEvent.pageX, evt.nativeEvent.pageY];
  //   const newCurrentPoints = this.state.currentPoints;
  //   newCurrentPoints.push({ x, y });

  //   // console.log('entro')
  //   this.setState({
  //     currentPoints: newCurrentPoints,
  //     x: x,
  //     y: y
  //   });
  // }

  // onResponderGrant(evt) {
  //   this.onTouch(evt);
  // }

  // onResponderMove(evt) {
  //   this.onTouch(evt);
  // }

  // onResponderRelease() {
  //   console.log('Fin');
  //   const { reaction, currentPoints, pathCount } = this.state;
  //   const newPaths = this.state.donePaths;

  //   console.log(newPaths);
  //   if (currentPoints.length > 0) {
  //     newPaths.push(
  //       <Path
  //         key={pathCount}
  //         stroke="red"
  //         d={reaction.pointsToSvg(currentPoints)}
  //         fill="none"
  //       />
  //     );
  //     console.log('entro');
  //   }
  //   this.setState({
  //     donePaths: newPaths,
  //     currentPoints: [],
  //     pathCount: pathCount + 1
  //   });

  // }

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
            <Settings />
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
