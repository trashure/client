import React, { Component } from 'react'
import {
    View, TextInput,
    KeyboardAvoidingView, Dimensions,
    Button, Text, TouchableOpacity, StyleSheet
} from 'react-native'

import FeatherIcon from "react-native-vector-icons/Feather"
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default class RegisterForm extends Component {

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    }
    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                <View style={s.layout}>

                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={s.input}>
                            <FontAwesome name="user" size={20} color="black" style={s.icon} />
                            <TextInput
                                style={s.textInput}
                                placeholder="name" />
                        </View>
                        <View style={s.input}>
                            <MaterialIcons name="email" size={20} color="black" style={s.icon} />
                            <TextInput
                                style={s.textInput}
                                placeholder="email" />
                        </View>
                        <View style={s.input}>
                            <FeatherIcon
                                name="lock" size={20} color="black" style={s.icon} />
                            <TextInput
                                style={s.textInput}
                                placeholder="password" />
                        </View>
                        <View
                            style={s.button}>
                            <Button
                                title="Register" />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView >
        )
    }
}


const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const s = StyleSheet.create({
    layout: {
        flex: 1,
        height: deviceHeight,
        backgroundColor: '#2d3436',
    },
    input: {
        flex: 1,
        maxHeight: deviceHeight * 0.08,
        marginBottom: 3,
        marginRight: deviceWidth * 0.1,
        marginLeft: deviceWidth * 0.1,
        backgroundColor: 'white',
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 15
    },
    icon: {
        marginRight: 10,
        marginLeft: 10
    },
    textInput: {
        width: deviceWidth * 0.8,
    },
    button:{
        flex: 1, 
        maxHeight: 
        deviceHeight * 0.06, 
        marginTop: 3, 
        marginLeft: deviceWidth * 0.3, 
        marginRight: deviceWidth * 0.3 ,
        borderRadius: 15

    }
})