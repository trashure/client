

import React, { Component } from 'react'
import {
    View, Text,
    Dimensions, TextInput,
    KeyboardAvoidingView, Image,
    Button, TouchableOpacity,
    ActivityIndicator, Alert,
    AsyncStorage,
    StyleSheet
} from 'react-native'

import Icon from "react-native-vector-icons/FontAwesome"
import FeatherIcon from "react-native-vector-icons/Feather"
import { connect } from 'react-redux'
import { UserLogin } from '../store/Actions/Api'

import { Query, Mutation } from 'react-apollo'

import { login } from '../graphQl/index'


export default class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    componentDidMount = () => {
        this._retrieveData();
        // AsyncStorage.removeItem('Token', (error) => {
        //     console.log(error);
        // })
        // this._storeData()
    }

    _storeData = async (token) => {
        try {
            await AsyncStorage.setItem('Token', token);
        } catch (error) {
            console.log(error);
        }
    }
    
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Token');
            if (value !== null) {
                this.props.navigation.navigate('ContentPage')
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    render() {
        return (
            this.props.loading ?
                (
                    <View style={{ alignItems: 'center' }}><ActivityIndicator size="large" color="#0000ff" /></View>
                ) : (
                    <Mutation mutation={login}>
                        {(login, { data }) => (
                            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                                <View style={s.layout}>
                                    <View style={{ flex: 1, alignItems: 'center', }}>
                                        <Image
                                            style={{ flex: 1, width: deviceWidth * 0.5, resizeMode: 'contain' }}
                                            source={{ uri: 'https://dewey.tailorbrands.com/production/brand_version_mockup_image/206/1907076206_84935ce6-6685-4ed6-a63f-7cc24d2c01e3.png?cb=1555661827' }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, maxHeight: deviceHeight * 0.5, justifyContent: 'center' }}>
                                        <View style={s.input}>
                                            <FeatherIcon
                                                name="user" size={20} color="black" style={s.icon} />
                                            <TextInput
                                                onChangeText={(email) => this.setState({ email })}
                                                style={s.textInput}
                                                placeholder="email" />
                                        </View>
                                        <View style={s.input}>
                                            <FeatherIcon
                                                name="lock" size={20} color="black" style={s.icon} />
                                            <TextInput
                                                onChangeText={(password) => this.setState({ password })}
                                                style={s.textInput}
                                                placeholder="password" />
                                        </View>
                                        <View
                                            style={s.button}>
                                            <Button
                                                onPress={() => {
                                                    const { email, password } = this.state
                                                    login({
                                                        variables: {
                                                            email,
                                                            password
                                                        }
                                                    })
                                                        .then(({ data }) => {
                                                            this.props.navigation.navigate('ContentPage')
                                                            console.log(data.login.token);
                                                            this._storeData(data.login.token)
                                                        })
                                                        .catch(err => {
                                                            console.log(err);
                                                            Alert.alert('login failed', JSON.stringify(err))
                                                        })
                                                }}
                                                title="sign in" />
                                        </View>
                                        <View
                                            style={s.register}>
                                            <Text style={{ color: 'white' }}>Don't have account ? </Text>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('Register')} >
                                                <Text style={{ color: 'skyblue' }}>register</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                            </KeyboardAvoidingView>
                        )
                        }
                    </Mutation>
                )

        )
    }
}

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const s = StyleSheet.create({
    register: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: deviceWidth * 0.2,
        marginRight: deviceWidth * 0.2,
        maxHeight: deviceHeight * 0.06,
        justifyContent: 'center',
    },
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
    button: {
        flex: 1,
        maxHeight: deviceHeight * 0.06,
        marginTop: 3,
        marginLeft: deviceWidth * 0.3,
        marginRight: deviceWidth * 0.3,
    }
})