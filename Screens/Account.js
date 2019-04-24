import React, { Component } from 'react'
import { Text, View, TouchableOpacity, AsyncStorage, StyleSheet, Dimensions } from 'react-native'


export default class Account extends Component {
    logout = () => {
        AsyncStorage.removeItem('Token', error => {
            if (!error) {
                this.props.navigation.navigate('FirstRender')
            }
        })
    }
    render() {
        return (
            <View style={s.layout}>
                <TouchableOpacity
                    onPress={() => this.logout()}
                    style={s.button}>
                    <Text style={{ color: 'white' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const s = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flex: 1,
        maxHeight: deviceHeight * 0.06,
        marginTop: 3,
        marginLeft: deviceWidth * 0.3,
        marginRight: deviceWidth * 0.3,
        backgroundColor: 'blue'
    }
})