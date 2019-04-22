import React, { Component } from 'react';
import { AppRegistry, Text, View, Alert, Modal, Button, FlatList, TouchableHighlight, StyleSheet} from 'react-native';
import Parse from 'parse/react-native';

import CreateObject from './createObject';
import UpdateObject from './updateObject';

export default class HomeScreen extends Component{

    constructor(){
        super();
        this.state = {
            isOpen: false,
            results: '',
            modalComponent: 'createObject'
        }
    }

   toggleModal = (type) => {
       alert(type)
        this.setState({
            isOpen: !this.state.isOpen
        });
   }

   getAllData = async () => {
        console.log(this.state.results)
        const query = new Parse.Query("Cars");
        query.exists("name");
        const resultQuery = await query.find();
        this.setState({results:resultQuery}); 
   }

    componentWillMount(){
        //this.getAllData();
    }
    _onPressDeleteObject(id){
        const query = new Parse.Query("Cars");
        query.get(id).then((object) => {
            object.destroy();
            this.getAllData();
        }, (error) => {
            // This will be called.
            // error is an instance of Parse.Error with details about the error.
            if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
                alert("Uh oh, we couldn't find the object!");
            }
        });
    }
    _onPressUpdateObject(id){
        const query = new Parse.Query("Cars");
        query.get(id).then((object) => {
            alert(object)
        }, (error) => {
            // This will be called.
            // error is an instance of Parse.Error with details about the error.
            if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
                alert("Uh oh, we couldn't find the object!");
            }
        });
    }
    _onPress(id) {
        Alert.alert(
            'Which action would you like to do?',
            'Choose an action below:',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Update', onPress: () => this._onPressUpdateObject(id)},
                {text: 'Delete', onPress: () => this._onPressDeleteObject(id)},
            ],
            {cancelable: false},
          );
    }
    renderCars = ({item, separators}) => {
        return (
            <TouchableHighlight
                onPress={() => this._onPress(item.id, item.get("name"))}>
                <View style={styles.borderFlatListItens}>
                    <Text>{item.get("name")}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    renderCreateObject = () =>{
        return (
            <CreateObject 
                updatePage={this.getAllData}
                toogleModalPage={this.toggleModal}/>
        )
    }
    renderUpdateObject = (id) =>{
        return (
            <UpdateObject 
                id={id}/>
        )
    }
    render(){
        return(
           <View style={styles.container}>
               <View style={{height: 70}}>
                    <Button
                        color="#841584"
                        onPress={this.toggleModal}
                        title="Create"
                        accessibilityLabel="Create an object"/>
               </View>               

               <Modal
                   visible={this.state.isOpen}
                   onClose={this.toggleModal}
                   onRequestClose={()=> {}}
                   animationType={'slide'}
                   >
                    <View style={styles.modalContainer}>                       
                        
                    </View>                    
                </Modal>

               <FlatList
                   data={this.state.results}
                   showsVerticalScrollIndicator={false}
                   renderItem={this.renderCars}
                   showsVerticalScrollIndicator={true}
                   keyExtractor={(item, index) => index.toString()}
                />
           </View>
        )
    }
}

const styles = StyleSheet.create({
    borderFlatListItens: {
        paddingBottom: 20,
        borderBottomWidth: 2,
        height: 50
    },
    container: {
        padding: 30,
        flex: 1,
        justifyContent: 'center',
    }
 });

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);

