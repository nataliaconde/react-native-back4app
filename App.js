import React from 'react';
import { StyleSheet, AsyncStorage} from 'react-native';
import Parse from 'parse/react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import LoginScreen from "./app/components/Login/login";
import HomeScreen from "./app/components/Home/home";
import UpdateObject from "./app/components/Home/updateObject";

const RootStack = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen,
  UpdateObject: UpdateObject
});

const AppNavigator = createAppContainer(RootStack);

Parse.initialize("1wYm5gDa1crZKcE35VCHemr8aAepb2r2TuEE4uhZ", "20WTXD47RWASYkczHY7HYW9Y2PDRe8WTg6yf1rD6");
Parse.serverURL = "https://parseapi.back4app.com";
Parse.setAsyncStorage(AsyncStorage);

export default class App extends React.Component {
  constructor(){
    super();
  }
  render() {
    return ( <AppNavigator/>);
  }
}