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


export default class Detail extends Component {
    state = {
        modalVisible: false,
        plastic: '',
        metal: '',
        paper: '',
        glass: '',
        cardboard: '',
        trash: '',
        findmetal: false

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

    getDetail(allData) {
        this.setState({
            paper: allData.filter(e => { return e.type == 'paper' }).length,
            metal: allData.filter(e => { return e.type == 'metal' }).length,
            plastic: allData.filter(e => { return e.type == 'plastic' }).length,
            cardboard: allData.filter(e => { return e.type == 'cardboard' }).length,
            glass: allData.filter(e => { return e.type == 'glass' }).length,
            modalVisible: true

        })

    }

    render() {
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
                                    this.state.findmetal ? data.garbages.filter(e => { return e.type == 'metal' }).map(e => (
                                        <Marker
                                            pinColor={e.color}
                                            coordinate={ConvertCoordinate(e.coordinate)}>
                                        </Marker>
                                    )) :
                                        this.state.findpaper ? data.garbages.filter(e => { return e.type == 'paper' }).map(e => (
                                            <Marker
                                                pinColor={e.color}
                                                coordinate={ConvertCoordinate(e.coordinate)}>
                                            </Marker>
                                        )) :
                                            this.state.findcardboard ? data.garbages.filter(e => { return e.type == 'cardboard' }).map(e => (
                                                <Marker
                                                    pinColor={e.color}
                                                    coordinate={ConvertCoordinate(e.coordinate)}>
                                                </Marker>
                                            )) :

                                                data.garbages.map(e => (
                                                    <Marker
                                                        pinColor={e.color}
                                                        coordinate={ConvertCoordinate(e.coordinate)}>
                                                        <Callout
                                                            onPress={() => this.setState({ [`find${e.type}`]: true })}
                                                        >
                                                            <Text>{e.type}</Text>
                                                        </Callout>
                                                    </Marker>
                                                ))
                                }
                            </MapView>
                            <View>
                                <Button
                                    onPress={() => this.getDetail(data.garbages)}
                                    title="see detail" />
                            </View>


                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <View style={{ marginTop: 22, justifyContent: 'center', alignItems: 'center' }}>


                                    <Text style={{ size: 30 }}> metal :  {this.state.metal}</Text>
                                    <Text style={{ size: 30 }}> plastic :  {this.state.plastic}</Text>
                                    <Text style={{ size: 30 }}> paper :  {this.state.paper}</Text>
                                    <Text style={{ size: 30 }}> glass :  {this.state.glass}</Text>
                                    <Text style={{ size: 30 }}> cardboard :  {this.state.cardboard}</Text>
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'gold', padding: 5 }}
                                        onPress={() => this.setState({ modalVisible: false })}>
                                        <Text>close</Text>
                                    </TouchableOpacity>

                                </View>
                            </Modal>
                        </>
                    )
                }}
            </Query>

        )
    }
}
