import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import {
    Dimensions, View,
    Text, Picker,
    Button, Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'

const { width, height } = Dimensions.get('window')

import { Query } from 'react-apollo'
import { getGarbages } from '../graphQl'
import { ConvertCoordinate, ConvertToImage } from '../Helper'
import { Modal } from 'react-native-paper';
// import { Button } from 'react-native-paper';

import MapNavigation from '../Component/MapNavigation';


export default class PaperMap extends Component {
    state = {
        modalVisible: false,
        data: '',
        token: ''
    }
    componentDidMount = () => {
        this._retrieveData();
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

    render() {
        console.log('masuk render');

        return (
            <Query query={getGarbages} variables={{ token: this.state.token }}>{
                ({ loading, error, data }) => {
                    if (loading) return loading
                    if (error) return error
                    if (data) return (
                        <>
                            <MapView
                                style={{ flex: 1, maxHeight: height * 0.9, width: width * 1 }}
                                provider={PROVIDER_GOOGLE}
                                zoomEnabled={true}
                                scrollEnabled={true}
                                showsScale={true}
                                region={{
                                    latitudeDelta: 0.1,
                                    longitudeDelta: 0.1,
                                    latitude: -6.259831,
                                    longitude: 106.782795,
                                }}
                            >
                                {
                                    data.garbages.filter(e => { return e.type == 'glass' }).map(e => (
                                        <Marker
                                            pinColor={e.color}
                                            coordinate={ConvertCoordinate(e.coordinate)}>
                                            <Callout
                                                onPress={() => this.setState({ findpaper: true, findmetal: false })}
                                            >
                                                <Text>{e.type}</Text>
                                            </Callout>

                                        </Marker>))

                                }
                            </MapView>
                            <MapNavigation />
                        </>
                    )
                }
            }
            </Query>
        )

    }
}
