import React, { Component } from 'react';
import { AppRegistry, Text, View, Alert, Button, StyleSheet, TextInput} from 'react-native';
import Parse from 'parse/react-native';

export default class UpdateObject extends Component{

    constructor(){
        super();
        this.state = {
            isOpen: false,
            nameCar: '',
            colorCar: '',
            nameError: null
        }
    }

    insertObject = () => {
        let 
            nameCar = this.state.nameCar,
            colorCar = this.state.colorCar;
        
        if (nameCar.trim() === "" || colorCar.trim() === "" ) {
            this.setState(() => ({ nameError: `Fill the fields correctly.` }));
        } else {
            this.setState(() => ({ nameError: null }));

            const Cars = Parse.Object.extend("Cars");
            const cars = new Cars({
                name: nameCar,
                color: colorCar
            });

            cars.save()
                .then((object) => {
                // Execute any logic that should take place after the object is saved.
                this.props.updatePage();
                Alert.alert(
                    'Object created!',
                    `New car: ${nameCar}`,
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                this.props.toogleModalPage();
                            },
                            style: 'cancel',
                        }
                    ]
                )
                
            }, (error) => {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            });
        }
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    loadData = (id) => {
        
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.lineRow}>
                    <View style={styles.btnClose}>
                        <Button
                            color={'#841584'}
                            onPress={this.props.toogleModalPage}
                            title="X"
                            accessibilityLabel="Close"/>                            
                    </View>
                    <View style={styles.inputWrap}>
                        <Text style={styles.labelText}>Car name</Text>
                        <TextInput 
                            onChangeText={(text) => this.setState({nameCar: text})}
                            style={styles.inputdate}
                            multiline={false} 
                            maxLength = {40} />
                       
                        <Text style={styles.labelText}>Car Color</Text>
                        <TextInput 
                            onChangeText={(text) => this.setState({colorCar: text})}
                            style={styles.inputdate} 
                            multiline={false} 
                            maxLength = {40}/>

                        {!!this.state.nameError && (
                            <View styles={styles.divError}>
                                <Text style={styles.divErrorFont}>{this.state.nameError}</Text>
                            </View>
                        )}

                        <Button
                            onPress={this.insertObject}
                            title="Create"
                            accessibilityLabel="Create"
                            color={'#841584'}/>
                    </View> 
                </View>
            </View>
       )

   }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        justifyContent: 'center',
    },
    
    lineRow:{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 30
    },
    btnClose: {
        backgroundColor: '#841584',
        margin: 20,
        marginTop: -15,
        width: 50, 
        height: 50, 
        position: "absolute",
        right: 0
    },
    divErrorFont:{
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#ff0000',
        padding: 20,
        marginBottom: 20
    },
    inputWrap: {
        width: '100%',
        padding: 10
    },
    inputdate: {
        fontSize: 14,
        marginTop: -20,
        color: "#000",
        height: 60,
        marginBottom: 20,
        borderBottomWidth: 2
    },
    btnStyle:{
        
    }
 });

AppRegistry.registerComponent('UpdateObject', () => UpdateObject);

