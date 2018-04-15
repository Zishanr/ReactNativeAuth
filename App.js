import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Card, CardSection, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {
  state = { loggedIn: null };

  // LifeCycle Method
  componentWillMount() {
    // IntialLising Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyCpYe61WsCwy-rMB6E-ekYmd5gPwZ0Bqyc',
      authDomain: 'uthentication-f94a6.firebaseapp.com',
      databaseURL: 'https://uthentication-f94a6.firebaseio.com',
      projectId: 'uthentication-f94a6',
      storageBucket: 'uthentication-f94a6.appspot.com',
      messagingSenderId: '867940468974'
    });


    // onAuthStateChanged is called when the state of user is changed -> like user is loggedIn or loggedOut
    // onAuthStateChanged is called with the user parameter which tells state about the that user.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headingText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={this.logOutUser}>
            Log Out
        </Button>);
        break;
      case false:
        return <LoginForm />;
        break;
      default:
        return (
          <View style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
          }}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  logOutUser = () => {
    firebase.auth().signOut();
  }
}

