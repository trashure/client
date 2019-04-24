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
import { ImageManipulator } from 'expo';

class Iot extends Component {
    state = {
        loading: false,
        path: '',
        coordinate: {},
        token: '',
        imageUri: '',
        focusedScreen: true,
        hasLocationPermission: null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        flash: Camera.Constants.FlashMode.torch

    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
        this._retrieveData()
        console.log('Iot Screen');
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            // console.log('focused')

            this.setState({ focusedScreen: true })
        );
        navigation.addListener('willBlur', () =>
            // console.log('un focused')

            this.setState({ focusedScreen: false })
        );

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
                quality: 0.5, base64: true, fixOrientation: true,
                exif: true
            };
            // let photo = await this.camera.takePictureAsync(options).then(photo => {
            //     photo.exif.Orientation = 1;
            //     return photo
            // });

            let photo = await this.camera.takePictureAsync(options);
            let resizedPhoto = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 200, height: 200 } }],
                { compress: 1, format: "jpeg", base64: true }
            )
            console.log(resizedPhoto)
            iot({
                variables: {
                    path: resizedPhoto.base64
                }
            })
        }
    }

    render() {
        const { hasCameraPermission, imageUri, loading, focusedScreen } = this.state;
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
        } else if (focusedScreen) {
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
                                    onPress={this.snapPhoto.bind(this, iot)}
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
        else {
            return <Text>Masuk else</Text>
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