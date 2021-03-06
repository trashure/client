import React, { Component } from 'react'
import {
    Camera,
    Location,
    Permissions,
} from 'expo';
import {
    ActivityIndicator,
    Alert,
    AsyncStorage,
    Button,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import Icon from "react-native-vector-icons/FontAwesome"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { MaterialIcons } from '@expo/vector-icons';
import { Mutation } from 'react-apollo'
import { sendRawData } from '../store/Actions/Api'
import { createTrash, getGarbages, getCollections } from '../graphQl/index.js'
import { TextInput } from 'react-native-gesture-handler';
import { ImageManipulator } from 'expo';
import { connect } from 'react-redux'


const initialState = {
    loading: false,
    path: '',
    coordinate: {},
    imageUri: '',
    focusedScreen: true,
    hasLocationPermission: null,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.torch
}

class ExpoCameraScreen extends Component {
    state = { ...initialState, token: '' };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
        this._retrieveData()

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
            console.log(value);

        } catch (error) {
            // Error retrieving data
        }
    }

    snapPhoto = async () => {
        console.log('Button Pressed');

        if (this.camera) {
            console.log('Taking photo');
            this.setState({
                cameraLoading: true
            })

            const options = {
                quality: 0.5, base64: true, fixOrientation: true,
                exif: true
            };

            let photo = await this.camera.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;
                return photo
            });



            let resizedPhoto = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 150, height: 200 } }],
                { compress: 1, format: "jpeg", base64: true }
            )

            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })

            this.setState({
                imageUri: photo.uri,
                coordinate: `${location.coords.latitude}:${location.coords.longitude}`,
                path: resizedPhoto.base64,
                cameraLoading: false
            })
        }
    }

    render() {
        const { hasCameraPermission, imageUri, loading, title, description, focusedScreen } = this.state;
        if (loading) return (
            <View style={[s.loading, { flex: 1 }]}>
                <ActivityIndicator size="large" color='gold' />
                <Text style={{ color: 'gold' }}>In Progress ...</Text>
            </View>)
        if (imageUri.length > 0)
            return (
                <Mutation mutation={createTrash} refetchQueries={[{ query: getGarbages, variables: { token: this.state.token } }, { query: getCollections, variables: { token: this.state.token } }]}>
                    {(createTrash, { data }) => (
                        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                            <View style={s.layout}>
                                <Image
                                    style={{ minHeight: deviceWidth / 2, minWidth: deviceWidth / 2, maxHeight: 300, maxWidth: 300, marginTop: 20 }}
                                    source={{ uri: imageUri }} />
                                <View style={s.input}>
                                    <MaterialIcons
                                        name="title" size={20} color="black" style={s.icon} />
                                    <TextInput
                                        value={title}
                                        onChangeText={(title) => this.setState({ title })}
                                        style={s.textInput}
                                        placeholder="title" />
                                </View>
                                <View style={s.input}>
                                    <MaterialIcons
                                        name="description" size={20} color="black" style={s.icon} />
                                    <TextInput
                                        value={description}
                                        onChangeText={(description) => this.setState({ description })}
                                        style={s.textInput}
                                        placeholder="description" />
                                </View>

                                <View
                                    style={s.button}>
                                    <Button
                                        style={{ color: 'white', backgroundColor: "#2d3436" }}
                                        onPress={() => {
                                            this.setState({
                                                loading: true
                                            })
                                            const { token, path, coordinate, title, description } = this.state;
                                            console.log(token, path, coordinate, title, description)
                                            createTrash({
                                                variables: {
                                                    token,
                                                    path,
                                                    coordinate,
                                                    title,
                                                    createdAt: new Date().toISOString(),
                                                    description
                                                }
                                            })
                                                .then(data => {
                                                    this.setState({ imageUri: '', loading: false })
                                                    this.props.navigation.navigate('Home')
                                                })
                                                .catch(err => {
                                                    Alert.alert(JSON.stringify(err))
                                                    console.log(err);
                                                })
                                        }}
                                        title="P O S T" />
                                </View>

                            </View>
                        </KeyboardAvoidingView>
                    )}
                </Mutation>)



        if (hasCameraPermission === null) {
            return <View />
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else if (focusedScreen) {
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
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            {
                                this.state.cameraLoading ?
                                    (
                                        <View style={s.cameraLoading}>
                                            <ActivityIndicator size="large" color='gold' />
                                            <Text style={{ color: 'gold' }}>In Progress ...</Text>
                                        </View>
                                    ) : (
                                        <View></View>
                                    )
                            }
                        </View>


                        {
                            this.state.cameraLoading ?
                                (
                                    <View></View>
                                ) : (
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
                                                marginBottom: 15
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
                                            onPress={this.snapPhoto.bind(this, createTrash)}
                                            style={
                                                [s.actionButton,
                                                {
                                                    alignSelf: 'flex-end',
                                                    alignItems: 'flex-start'
                                                }
                                                ]}>
                                            <Icon name="camera" color='white' size={24} />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{
                                                marginRight: deviceWidth * 0.2,
                                                flex: 0.1,
                                                alignSelf: 'flex-end',
                                                alignItems: 'flex-start',
                                                marginBottom: 15
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
                                )
                        }

                    </Camera>
                </View >
            );
        }
        else {
            return (
                <View style={[s.loading, { flex: 1 }]}>
                    <ActivityIndicator size="large" color='gold' />
                </View>
            )

        }
    }
}


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const mapStateToProps = (state) => ({
    loading: state.Api.loading
})

const mapDispatchToProps = (dispatch) => ({
    sendRawData: (object) => dispatch(sendRawData(object))
})

const s = StyleSheet.create({
    actionButton: {
        backgroundColor: 'gold', padding: 7, borderRadius: 20, marginBottom: 15
    },
    cameraLoading: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d3436',
        padding: 15,
        borderRadius: 20
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d3436',
        padding: 15,
        borderRadius: 20
    },
    layout: {
        flex: 1,
        height: deviceHeight,
        alignItems: 'center',
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

export default ExpoCameraScreen