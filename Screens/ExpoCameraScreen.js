import React, { Component } from 'react'
import { Camera, Permissions, Location, } from 'expo';
import {
    View, Text, TouchableOpacity,
    Dimensions, Alert, AsyncStorage, Image, Button, ActivityIndicator
} from 'react-native'

import Icon from "react-native-vector-icons/FontAwesome"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
// import Geolocation from 'react-native-geolocation-service';

import { connect } from 'react-redux'

import { sendRawData } from '../store/Actions/Api'

import { Mutation } from 'react-apollo'
import { createTrash } from '../graphQl/index.js'
import { TextInput } from 'react-native-gesture-handler';



class ExpoCameraScreen extends Component {
    state = {
        loading: false,
        path: '',
        coordinate: {},
        token: '',
        imageUri: '',
        hasLocationPermission: null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        flash: Camera.Constants.FlashMode.torch

    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
        this._retrieveData()

    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({ hasLocationPermission: status === 'granted' });
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Token');
            if (value !== null) {
                this.setState({
                    token: value
                })
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    snapPhoto = async (createTrash) => {
        console.log('Button Pressed');
        let obj = {}

        if (this.camera) {
            console.log('Taking photo');
            const options = {
                quality: 0.05, base64: true, fixOrientation: true,
                exif: true
            };
            let photo = await this.camera.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;
                return photo
            });
            // this.setState({
            //     loading: true
            // })



            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
            let objLocation = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }

            this.setState({
                imageUri: photo.uri,
                coordinate: objLocation,
                path: photo.base64,
                loading: false

            })

            console.log('--------');
            console.log(location);
            console.log('--------');




            //     },
            //     (error) => {
            //         console.log(error.code, error.message);
            //     },
            //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            // )
        }
    }

    render() {
        const { hasCameraPermission, imageUri, loading, title, description } = this.state;
        if (loading) return (<View>
            <ActivityIndicator
                size="large"
                color="black"
            />
        </View>)
        if (imageUri.length > 0)
            return (
                <Mutation mutation={createTrash}>{(createTrash, { data }) => (
                    <View
                        style={{ flex: 1, width: deviceWidth * 1, height: deviceHeight * 1 }}>
                        <Image
                            style={{ height: 300, width: 300 }}
                            source={{ uri: imageUri }} />
                        <TextInput
                            value={title}
                            onChangeText={(title) => this.setState({ title })}
                            style={{ width: deviceWidth * 0.8 }}
                            placeholder="TITLE" />
                        <TextInput
                            value={description}
                            onChangeText={(description) => this.setState({ description })}
                            style={{ width: deviceWidth * 0.8 }}
                            placeholder="DESCRIPTION" />
                        <View
                            style={{ flex: 1, maxHeight: deviceHeight * 0.06, marginTop: 3, marginLeft: deviceWidth * 0.3, marginRight: deviceWidth * 0.3 }}>
                            <Button
                                style={{ color: 'black' }}
                                onPress={() => {
                                    this.setState({
                                        loading: true
                                    })
                                    const { token, path, coordinate, title, description } = this.state
                                    createTrash({
                                        variables: {
                                            token,
                                            path,
                                            coordinate: JSON.stringify(coordinate),
                                            title,
                                            createdAt: new Date().toISOString(),
                                            description
                                        }
                                    })
                                        .then(data => {
                                            this.props.navigation.navigate('Home')
                                        })
                                        .catch(err => {
                                            Alert.alert(JSON.stringify(err))
                                            console.log(err);
                                        })


                                }}
                                title="sign in" />
                        </View>

                    </View>
                )}
                </Mutation>)


        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (


                <View style={{ flex: 1 }}>
                    <Camera
                        style={{ flex: 1 }}
                        type={this.state.type}
                        ref={(ref) => { this.camera = ref }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                justifyContent: 'space-between'

                            }}>

                            <TouchableOpacity
                                style={{
                                    marginLeft: deviceWidth * 0.2,
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'flex-start',
                                    // width: deviceWidth*0.3
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <MaterialIcon name="rotate-3d" color='white' size={24} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={
                                    this.snapPhoto.bind(this, createTrash)
                                }
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'flex-start',
                                }}>
                                <Icon name="camera" color='white' size={24} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    marginRight: deviceWidth * 0.2,
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'flex-start',
                                    // width: deviceWidth*0.3
                                }}
                                onPress={() => {
                                    this.setState({
                                        flash: this.state.flash === Camera.Constants.FlashMode.off
                                            ? Camera.Constants.FlashMode.torch
                                            : Camera.Constants.FlashMode.torch
                                    });
                                }}>
                                <MaterialIcon name="flash" color='white' size={24} />
                            </TouchableOpacity>

                        </View>
                    </Camera>

                </View>
            );
        }
    }
}


const deviceWidth = Dimensions.get('window').width

const deviceHeight = Dimensions.get('window').height
// const deviceWidth = Dimensions.get('window').width

const mapStateToProps = (state) => ({
    loading: state.Api.loading
})

const mapDispatchToProps = (dispatch) => ({
    sendRawData: (object) => dispatch(sendRawData(object))
})


export default ExpoCameraScreen