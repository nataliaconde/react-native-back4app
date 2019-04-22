import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, Button, Platform, StyleSheet, ActivityIndicator, Modal, Alert } from 'react-native';
import Parse from 'parse/react-native';

export default class LoginScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            result: '',
            password: '',
            username: '',
            loading: false,
            nameError: null
        };
      
        this.installParse();

        this.changeRoute = (page) => {
            this.props.navigation.navigate(page)
        }

    }
    
    installParse = () =>{
        let install = new Parse.Installation();
        
        let typeDevice = Platform.OS == 'ios'? 'ios' : 'android';
        console.log(Platform)
        install.set("deviceType", typeDevice);
    
        install.save().then((resp) => {
            console.log('Created install object', resp);
        
            this.setState({
                result: 'New object created with objectId: ' + resp.id
                })
        }, err => {
            console.log('Error creating install object', err);
        
            this.setState({
                result: 'Failed to create new object, with error code: ' + err.message
            })
        })
    }
    checkUser = async () => {
        let userDetails = this.state;
        
        if (!!!(userDetails.username || userDetails.password)){
            Alert.alert(
                `Unsuccessful login`,
                `It can't be empty! Please insert values`,
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
            );
        } else {
            const user = await Parse.User.logIn(userDetails.username, userDetails.password);
            console.log(user)
            if (user.getSessionToken()){
                Alert.alert(
                    `Successful login`,
                    `Welcome!`,
                    [
                        {text: 'OK', onPress: () => this.changeRoute('Home')},
                    ]
                );
            } else {
                Alert.alert(
                    `Unsuccessful login`,
                    `Check your username/password again!`,
                    [
                        {text: 'OK', onPress: () => console.log('Ok Pressed')},
                    ]
                );
            }
        }
    }
    

    render(){
        return(
            <View style={{padding: 30}}>                
                <Text>Username</Text>   
                <TextInput  
                    style={styles.inputTextForm}
                    onChangeText={(username) => this.setState({username})}
                />
                
                <Text>Password</Text>
                <TextInput  
                    style={styles.inputTextForm}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />

                <Button
                    onPress={this.checkUser}
                    title="Login"
                    color="#841584"
                />
            </View>
        )

    }
}
const styles = StyleSheet.create({
    inputTextForm: {
        marginBottom: 30,
        borderBottomColor: '#841584',
        borderBottomWidth: 2,
        height: 40
    }
});

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);