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
import PlayerPlatButton from './components/player-play-button';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    var navigationView = (
      <View style={styles.sliderMenu}>
        <TouchableHighlight>
          <View style={styles.sliderMenuItem}>
            <Text style={styles.sliderMenuItemText}><Icon name="home" size={18} color="white" /> Home</Text>
          </View>
        </TouchableHighlight>
        <OpenURLButton url='https://phate.io'>
          <View style={styles.sliderMenuItem}>
            <Text style={styles.sliderMenuItemText}><Icon name="external-link-square" size={18} color="white" /> Open https://phate.io</Text>
          </View>
        </OpenURLButton>
        <TouchableHighlight>
          <View style={styles.sliderMenuItem}>
            <Text style={styles.sliderMenuItemText}><Icon name="info-circle" size={18} color="white" /> About</Text>
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
          <Text style={styles.welcome}>
            Welcome to Phate Radio{'\n'}
            {now_time}
          </Text>
          <View style={{alignItems: 'center'}}>
            <PlayerPlatButton />
          </View>
          <Text style={styles.instructions}>
            Experimental version{'\n'}
          </Text>
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
    bottom: 0,
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
