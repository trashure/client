import React, { Component } from 'react'
import { 
    AsyncStorage, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
} from 'react-native'


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
                    <Text style={{ color: 'gold' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const s = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        padding: 10,
        borderRadius:20,
        backgroundColor: '#2d3436'
    }
})