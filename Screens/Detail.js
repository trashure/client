import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Dimensions, View, Text, Picker } from 'react-native'

const { width, height } = Dimensions.get('window')
// const { Marker } = MapView


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
    render() {
        return (
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
                {this.state.data.map(e =>
                    (<Marker
                        pinColor={e.color}
                        title={e.title}
                        coordinate={e.coordinates}>

                    </Marker>
                    )
                )}
                <Picker
                    selectedValue={this.state.category}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ language: itemValue })
                    }>
                    {/* <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" /> */}
                </Picker>

            </MapView>


        )
    }
}
