import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common/index';

export default class LoginForm extends Component {
    state = { email: '', password: '', error: '', showLoading: false };

    render() {
        return (
            <Card>
                <CardSection >
                    <Input
                        inputLabel="Email"
                        placeholder="user@gmail.com"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })} />{/* OnChangeText takes a callback function and pass the text to this function as a argument*/}
                </CardSection>

                <CardSection>
                    <Input
                        placeholder="password"
                        inputLabel="Password"
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                {this.renderLoginButton()}

            </Card>
        );
    }

    // Callback method when button is pressed
    onLoginButtonPressed() {
        const { email, password } = this.state;  // Destructring state in email and password
        this.setState({ error: '', showLoading: true });  // Passing multiple states in one setState method

        firebase.auth().signInWithEmailAndPassword(email, password)  // Firebase method to sign in using email and password
            .then(this.onLoginSuccess.bind(this))  // When api hit is success
            .catch(() => {   // When api hit is failure
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    // Helper method for successfull login
    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            showLoading: false
        });
    }


    // Helper method for fail login
    onLoginFail() {
        this.setState({
            error: 'Authentication Error',
            showLoading: false
        });

    }

    // Helper method return some amount of JSX
    // Logic to render either spinner or Button based on condition.
    renderLoginButton() {
        if (this.state.showLoading) {
            return <Spinner size="small" />;
        }

        return (
            // Binding Context  - Bind is used to bind the context
            <Button onPress={this.onLoginButtonPressed.bind(this)} >
                Login
        </Button>
        );
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center'
    }
});