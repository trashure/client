import React, { Component } from 'react'
import { Camera, Permissions, Location, } from 'expo';
import {
    View, Text, TouchableOpacity,
    Dimensions, Alert, AsyncStorage, Image, Button, ActivityIndicator
} from 'react-native'

import Icon from "react-native-vector-icons/FontAwesome"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { connect } from 'react-redux'
import { sendRawData } from '../store/Actions/Api'
import { Mutation } from 'react-apollo'
import { IOT } from '../graphQl/index.js'
import { TextInput } from 'react-native-gesture-handler';



class Iot extends Component {
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

    snapPhoto = async (iot) => {
        console.log('Button Pressed');
        let obj = {}

        if (this.camera) {
            console.log('Taking photo');
            const options = {
                quality: 0.01, base64: true, fixOrientation: true,
                exif: true
            };
            let photo = await this.camera.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;
                return photo
            });
            iot({
                variables: {
                    path: photo.base64
                }
            })
        }
    }

    render() {
        const { hasCameraPermission, imageUri, loading } = this.state;
        if (loading) return (<View>
            <ActivityIndicator
                size="large"
                color="black"
            />
        </View>)

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <Mutation mutation={IOT}>{(iot, { data }) => (
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
                                    onPress={
                                        this.snapPhoto.bind(this, iot)
                                    }
                                    style={{
                                        alignSelf: 'flex-end',
                                        alignItems: 'flex-start',
                                    }}>
                                    <Icon name="camera" color='white' size={24} />
                                </TouchableOpacity>

                            </View>
                        </Camera>

                    </View>
                )}
                </Mutation>
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


export default Iot