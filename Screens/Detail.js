import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import {
    Dimensions, View,
    Text, Picker,
    Button, Image,
    AsyncStorage
} from 'react-native'

const { width, height } = Dimensions.get('window')

import { Query } from 'react-apollo'
import { getGarbages } from '../graphQl'
import { ConvertCoordinate, ConvertToImage } from '../Helper'
// import { Button } from 'react-native-paper';


export default class Detail extends Component {
    state = {
        category: {
            cardboard: 'cardboard',
            paper: 'paper',
        },
        selected: '',
        data: [
            {
                title: 'satu',
                color: 'black',
                coordinates:
                {
                    latitude: -6.279957319745124,
                    longitude: 106.79279722169972
                }
            },
            {
                title: 'dua',
                color: 'blue',
                coordinates:
                {
                    latitude: -6.259889929900885,
                    longitude: 106.78278230211664
                }
            }
        ]
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
        return (
            <Query query={getGarbages} variables={{ token: this.state.token }}>{
                ({ loading, error, data }) => {
                    if (loading) return loading
                    if (error) return error
                    if (data) return (

                        // <View>
                        //     <Text>
                        //     {JSON.stringify(data.garbages[10])}
                        //     </Text>
                        // </View>

                        <MapView
                            style={{ flex: 1, height: height * 1, width: width * 1 }}
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
                                data.garbages.map(e => (
                                    <Marker
                                        pinColor={ConvertToImage(e.type)}
                                        coordinate={ConvertCoordinate(e.coordinate)}>
                                    </Marker>
                                ))
                            }
                        </MapView>
                    )
                }}
            </Query>

        )
    }
}
