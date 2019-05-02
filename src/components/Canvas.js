
import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, PanResponder } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';


import Reaction from 'components/Reaction';


export default class Canvas extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      pathCount: 0,
      donePaths: [],
      currentPoints: [],
      reaction: new Reaction(),
    }
    console.log(Dimensions.get('window').height)
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gs) => true,
      onMoveShouldSetPanResponder: (evt, gs) => true,
      onPanResponderGrant: (evt, gs) => this.onResponderGrant(evt, gs),
      onPanResponderMove: (evt, gs) => this.onResponderMove(evt, gs),
      onPanResponderRelease: (evt, gs) => this.onResponderRelease(evt, gs)
    });
  }

  onTouch(evt) {
    let [x, y] = [evt.nativeEvent.pageX, evt.nativeEvent.pageY];
    const newCurrentPoints = this.state.currentPoints;
    newCurrentPoints.push({ x, y });
    this.props.addPoint({ x, y });
  }

  onResponderGrant(evt) {
    this.onTouch(evt);
  }

  onResponderMove(evt) {
    this.onTouch(evt);
  }

  onResponderRelease() {
    const { reaction, currentPoints, pathCount } = this.state;
    const donePaths = this.state.donePaths;

    if (currentPoints.length > 0) {
      // newPaths.push(
      //   <Path
      //     key={pathCount}
      //     stroke="red"
      //     d={reaction.pointsToSvg(currentPoints)}
      //     fill="none"
      //   />
      // );

      const newPath = (
        <Path
          key={pathCount}
          stroke="red"
          d={reaction.pointsToSvg(currentPoints)}
          fill="none"
        />
      );
      this.setState({
        donePaths: [...donePaths, newPath],
        currentPoints: [],
        pathCount: pathCount + 1
      });
      this.props.addPath()
      console.log('entro');
    }
    

  }

  render() {
    const { donePaths, pathCount, currentPoints, reaction } = this.state;
    // console.log(this.props.current)
    return (
      <View
        style={[
          styles.canvas,
          { width: Dimensions.get('window').width, height: Dimensions.get('window').width }
        ]}  
        {...this._panResponder.panHandlers}
      >
        <Svg
          style={[
            styles.svg,
            {width: Dimensions.get('window').width - 20, height: Dimensions.get('window').width - 20}
          ]}>
          <G>
            {this.props.completed}
            <Path
              key={pathCount}
              stroke="black"
              d={reaction.pointsToSvg(this.props.current)}
              fill="none"
            />
          </G>
        </Svg>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  canvas: {
    
  },
  svg: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    margin: 10
  }
})