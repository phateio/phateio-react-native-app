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
  TouchableHighlight,
  DrawerLayoutAndroid,
} from 'react-native';
import OpenURLButton from './components/open-url-button';
import { Player } from 'react-native-audio-streaming';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

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

  function play_or_stop() {
    if (this.state.playing) {
      ReactNativeAudioStreaming.stop();
      this.setState({playing: false});
    } else {
      ReactNativeAudioStreaming.play('https://phate.io/listen');
      this.setState({playing: true});
    }
  }

    var navigationView = (
      <View style={styles.sliderMenu}>
        <TouchableHighlight>
          <View style={styles.sliderMenuItem}>
            <Text style={styles.sliderMenuItemText}> * Home</Text>
          </View>
        </TouchableHighlight>
        <OpenURLButton url='https://phate.io'>
          <View style={styles.sliderMenuItem}>
            <Text style={styles.sliderMenuItemText}> * Open https://phate.io</Text>
          </View>
        </OpenURLButton>
        <TouchableHighlight>
          <View style={styles.sliderMenuItem}>
            <Text style={styles.sliderMenuItemText}> * About</Text>
          </View>
        </TouchableHighlight>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        drawerBackgroundColor={'rgba(0,0,0,0.7)'}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={300}
        renderNavigationView={() => navigationView}
      >
        <View style={styles.container}>
          <Image source={{uri: 'https://i.imgur.com/8BOmHBN.jpg'}} style={styles.background} />
          <Text style={styles.welcome} onPress={play_or_stop.bind(this)}>
            Welcome to Phate Radio{'\n'}
            {now_time}
          </Text>
          <Text style={styles.instructions}>
            Experimental version{'\n'}
          </Text>
          <Player url={'https://phate.io/listen'} />
        </View>
      </DrawerLayoutAndroid>
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
  sliderMenu: {
    flex: 1,
    flexDirection: 'column',
  },
  sliderMenuItem: {
    padding: 10,
  },
  sliderMenuItemText: {
    color: 'white',
    fontSize: 18,
  },
});

AppRegistry.registerComponent('phateio', () => phateio);
