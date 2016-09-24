/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
  ListView,
  TouchableHighlight,
  DrawerLayoutAndroid,
  BackAndroid,
} from 'react-native';
import OpenURLButton from './components/open-url-button';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import PlayerPlatButton from './components/player-play-button';
import Icon from 'react-native-vector-icons/FontAwesome';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var moment = require('moment');

class phateio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      playlist: ds.cloneWithRows([]),
    };

    setInterval(() => {
      this.updatePlaylist();
      this.setState({});
    }, 1000);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  isPlaylistStale() {
    return this.state.playlist.getRowCount() === 0 || this.state.playlist.getRowCount() > 0
           && this.timeleftOrDuration(this.state.playlist.getRowData(0, 0)) === '0:00';
  }

  updatePlaylist() {
    if (!this.isPlaylistStale())
      return;
    fetch('https://phate.io/playlist.json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({playlist: ds.cloneWithRows(responseJson)});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  secondsToTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    return min + ':' + ('0' + sec).substr(-2, 2);
  }

  timeleftOrDuration(rowData) {
    if (moment(rowData.playedtime).unix() > 0) {
      var timeleft = rowData.duration - moment().diff(moment(rowData.playedtime)) / 1000;
      if (timeleft < 0)
        timeleft = 0;
      return this.secondsToTime(timeleft);
    } else {
      return this.secondsToTime(rowData.duration);
    }
  }

  getNowPlayingTitle() {
    if (this.state.playlist.getRowCount() === 0)
      return (<Text>Loading . . .</Text>);
    var rowData = this.state.playlist.getRowData(0, 0);
    var artist = rowData.artist;
    var title = rowData.title;
    return (
      <Text>        
        {artist} - {title}
      </Text>
    );
  }

  getNowPlayingTimeLeft() {
    if (this.state.playlist.getRowCount() === 0)
      return;
    var rowData = this.state.playlist.getRowData(0, 0);
    return (
      <Text>
        {this.timeleftOrDuration(rowData)} / {this.secondsToTime(rowData.duration)}
      </Text>
    );
  }

  exit() {
    ReactNativeAudioStreaming.stop();
    ReactNativeAudioStreaming.destroyNotification();
    BackAndroid.exitApp();
  }

  render() {
    let nowTime = moment().format('LT');

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
        <TouchableHighlight
          onPress={this.exit}>
          <View style={styles.sliderMenuItem}>
            <Text style={styles.sliderMenuItemText}><Icon name="sign-out" size={18} color="white" /> Exit</Text>
          </View>
        </TouchableHighlight>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        drawerBackgroundColor={'rgba(0,0,0,0.7)'}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={300}
        renderNavigationView={() => navigationView}>
        <View style={styles.container}>
          <Image source={{uri: 'https://i.imgur.com/8BOmHBN.jpg'}} style={styles.background} />
          <Text style={styles.clock}>
            {nowTime}
          </Text>
          <View
            style={styles.playerPlayButton}>
            <PlayerPlatButton />
          </View>
          <TouchableHighlight
            style={styles.playerNowPlayingContainer}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <View>
              <Text
                numberOfLines={2}
                style={styles.playerNowPlayingText}>
                {this.getNowPlayingTitle()}
              </Text>
              <Text
                style={styles.playerNowPlayingText}>
                {this.getNowPlayingTimeLeft()}
              </Text>
            </View>
          </TouchableHighlight>
          <Modal
            animationType={'slide'}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <TouchableHighlight
              style={{flex: 1, padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <ListView
                enableEmptySections={true}
                dataSource={this.state.playlist}
                renderRow={(rowData) =>
                  <Text style={{fontSize: 20}}>
                    <Icon name="asterisk" size={20} />{' '}
                    {rowData.artist} - {rowData.title}{' '}
                    ( {this.timeleftOrDuration(rowData)} / {this.secondsToTime(rowData.duration)} )
                  </Text>
                }
              />
            </TouchableHighlight>
          </Modal>
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
    backgroundColor: '#202020',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  clock: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    fontSize: 60,
    textAlign: 'center',
    color: '#EEEEEE',
    textShadowColor: '#111111',
    textShadowOffset: {width: 1, height: 1},
  },
  playerPlayButton: {
    alignItems: 'center',
    margin: 20,
  },
  playerNowPlayingContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 5,
  },
  playerNowPlayingText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#EEEEEE',
    textShadowColor: '#111111',
    textShadowOffset: {width: 1, height: 1},
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
