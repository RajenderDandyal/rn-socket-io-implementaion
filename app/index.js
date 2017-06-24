import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import io from 'socket.io-client'; 

export default class App extends Component {

  constructor () {
    super();
    this.state = {
      socket: io('http://servup.io:8082', { 
        jsonp: false, transports: ['websocket'], forceNew: true
      }),
      connected: false,
      message: {},
    };
  }

  componentDidMount () {
    this.state.socket.on('connect', () => {
      this.setState({ connected: true });

      /**
       * Using subsribe event to subsribe to a chat room
       * @param event name 'subscribe'
       * @param value to pass to this event in second @param is the chat-room-id
       */
      this.state.socket.emit('subscribe', 'dcab4cf04f3e11e7b864e1a93bd6b3da');
    });
    this.state.socket.on('disconnect', () => {
      this.setState({ connected: false });
    });
    /**
     * Using 'new message' event to listen to socket messages that you have
     * subscribed in the socket.emit('subscribe', roomid) method. On line 28
     */
    this.state.socket.on('new message', (res) => {
      this.setState({ message: res.message });
    });
  }

  render() {
    const { connected, message } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          React Native! Socket-IO Client Implementation
        </Text>
        <Text style={styles.text}>Socket Connected: {JSON.stringify(connected)}</Text>
        <Text style={styles.text}>Socket Message: {JSON.stringify(message)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    margin: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  }
});