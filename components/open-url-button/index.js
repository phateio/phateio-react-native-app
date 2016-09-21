import React, { Component } from 'react';
import {
  View,
  Linking,
  TouchableHighlight,
} from 'react-native';

class OpenURLButton extends Component {
  handleClick() {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        alert('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.handleClick.bind(this)}>
        {this.props.children}
      </TouchableHighlight>
    );
  }
}

module.exports = OpenURLButton;
