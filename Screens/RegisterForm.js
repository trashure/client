import React, { Component } from 'react'
import {
    View, TextInput,
    KeyboardAvoidingView, Dimensions,
    Button, Text, TouchableOpacity, StyleSheet, Image
} from 'react-native'

import FeatherIcon from "react-native-vector-icons/Feather"
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Query, Mutation } from 'react-apollo'

import { register, login } from '../graphQl/index'


export default class RegisterForm extends Component {
    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,
    }

    state = {
        name: '',
        email: '',
        password: ''
    }

    render() {
        return (

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
                                    <FontAwesome name="user" size={20} color="black" style={s.icon} />
                                    <TextInput
                                        onChangeText={(name) => this.setState({ name })}
                                        style={s.textInput}
                                        placeholder="name" />
                                </View>
                                <View style={s.input}>
                                    <MaterialIcons name="email" size={20} color="black" style={s.icon} />
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
                                                    this.props.navigation.navigate('FirstRender')
                                                    // console.log(data.login.token);
                                                    // this._storeData(data.login.token)
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                    Alert.alert('register failed', JSON.stringify(err))
                                                })
                                        }}
                                        title="register" />
                                </View>
                                <View
                                    style={s.register}>
                                    <Text style={{ color: 'white' }}>Already have account ? </Text>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('FirstRender')} >
                                        <Text style={{ color: 'skyblue' }}>login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </KeyboardAvoidingView>
                )
                }
            </Mutation>

            // <Mutation mutation={register}>
            //     {(register, { data }) => (
            // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            //     <View style={s.layout}>
            //         <View style={{ flex: 1, justifyContent: 'center' }}>
            //            

            // <View style={s.button}>
            //     <Button
            //         onPress={() => {
            //             const { name, email, password } = this.state
            //             register({
            //                 variables: {
            //                     name,
            //                     email,
            //                     password
            //                 }
            //             })
            //                 .then(({ data }) => {
            //                     console.log(data);
            //                     this.props.navigation.navigate('FirstRender')
            //                 })
            //                 .catch(err => {
            //                     console.log(err);
            //                     Alert.alert('register failed', JSON.stringify(err))
            //                 })
            //         }}
            //         title="register" />
            // </View>

            //         </View>
            //     </View>
            // </KeyboardAvoidingView >
            // )}}
            // </Mutation>
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
    button: {
        flex: 1,
        maxHeight: deviceHeight * 0.06,
        marginTop: 3,
        marginLeft: deviceWidth * 0.3,
        marginRight: deviceWidth * 0.3,
        borderRadius: 15

    }
})