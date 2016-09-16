/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Player } from 'react-native-audio-streaming';

class phateio extends Component {
  constructor(props) {
    super(props);

    setInterval(() => {
      this.setState({});
    }, 1000);
  }

  render() {
    var moment = require('moment');
    let now_time = moment().format('LTS');
    return (
      <View style={styles.container}>
        <Image source={{uri: 'https://i.imgur.com/8BOmHBN.jpg'}} style={styles.background} />
        <Text style={styles.welcome}>
          Welcome to Phate Radio{'\n'}
          {now_time}
        </Text>
        <Text style={styles.instructions}>
          Experimental version{'\n'}
        </Text>
        <Player url={'https://phate.io/listen'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#EEEEEE',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#EEEEEE',
    marginBottom: 5,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 80,
    left: 0,
    right: 0,
  },
});

AppRegistry.registerComponent('phateio', () => phateio);
