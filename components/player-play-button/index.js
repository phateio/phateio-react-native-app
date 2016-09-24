import React, { Component } from 'react';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import Icon from 'react-native-vector-icons/FontAwesome';

function DEBUG(...other) {
  if (!__DEV__)
    return;
  console.debug(new Date(), ...other);
}

class PlayerPlatButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'play-circle-o',
    };
  }

  handleClick() {
    ReactNativeAudioStreaming.getStatus((error, state) => {
      var status = state.status;
      switch (status) {
      case 'PLAYING':
        ReactNativeAudioStreaming.pause();
        ReactNativeAudioStreaming.destroyNotification();
        break;
      case 'PAUSED':
        ReactNativeAudioStreaming.resume();
        break;
      case 'STOPPED':
      case 'ERROR':
        ReactNativeAudioStreaming.play('https://phate.io/listen');
        break;
      case 'BUFFERING':
        ReactNativeAudioStreaming.stop();
        ReactNativeAudioStreaming.destroyNotification();
        break;
      }
    });
  }

  updateName() {
    ReactNativeAudioStreaming.getStatus((error, state) => {
      var status = state.status;
      if (this.state.status === status)
        return;
      DEBUG('ReactNativeAudioStreaming status changed: ' + status);
      this.setState({status: status});
      switch (status) {
      case 'PLAYING':
      case 'BUFFERING':
        this.setState({name: 'pause-circle-o'});
        break;
      case 'PAUSED':
      case 'STOPPED':
      case 'ERROR':
        this.setState({name: 'play-circle-o'});
        break;
      }
    });
  }

  render() {
    this.updateName();

    return (
      <Icon
        name={this.state.name}
        size={100}
        color="white"
        onPress={this.handleClick}
      />
    );
  }
}

module.exports = PlayerPlatButton;
