import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native'

import { Query } from 'react-apollo'
import { getGarbages } from '../graphQl'
import { ConvertCoordinate } from '../Helper'
import { Modal } from 'react-native-paper';
import { MapNavigation } from '../Component/MapNavigation'
const { width, height } = Dimensions.get('window')


export default class Detail extends Component {
    state = {
        modalVisible: false,
        loading: false,
        plastic: '',
        metal: '',
        paper: '',
        glass: '',
        cardboard: '',
        trash: '',
        findmetal: true,
        findpaper: false,
        findcardboard: false
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
            modalVisible: true,
            loading: false
        })
    }

    render() {
        console.log('masuk render');
        const { token, loading } = this.state
        if (loading) {
            return (
                <View style={s.loading}>
                    <ActivityIndicator size="large" color='gold' />
                    <Text style={{ color: 'gold' }}>Please wait ... </Text>
                </View>)
        }
        if (!token) {
            return (
                <View style={s.loading}>
                    <ActivityIndicator size="large" color='gold' />
                    <Text style={{ color: 'gold' }}>Please wait ... </Text>
                </View>)
        }
        if (token) {
            return (
                <Query query={getGarbages} variables={{ token: this.state.token }}>{
                    ({ loading, error, data }) => {
                        if (loading) return (
                            <View style={s.loading}>
                                <ActivityIndicator size="large" color='gold' />
                            </View>
                        )
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
                                        data.garbages.map(e => (
                                            <Marker
                                                key={e._id}
                                                pinColor={e.color}
                                                coordinate={ConvertCoordinate(e.coordinate)}>
                                                <Callout
                                                    onPress={() => this.setState({ [`find${e.type}`]: true })}                                                >
                                                    <Text>{e.type}</Text>
                                                </Callout>
                                            </Marker>
                                        ))
                                    }
                                </MapView>
                                <MapNavigation
                                    page={this.props.navigation} />
                                {/* <GetDetail
                                    mainProps ={this}/> */}

                                <View
                                    style={{ flex: 1, maxHeight: height * 0.05 }}>
                                    <Button
                                        title="see detail"
                                        onPress={() => {
                                            this.setState({ loading: true })
                                            this.getDetail(data.garbages)
                                        }} />
                                </View>

                                <Modal
                                    style={{}}
                                    animationType="slide"
                                    transparent={true}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                    }}>
                                    <View style={{ backgroundColor: 'white', marginTop: 22, justifyContent: 'center', alignItems: 'center' }}>


                                        <Text > metal :  {this.state.metal}</Text>
                                        <Text> plastic :  {this.state.plastic}</Text>
                                        <Text > paper :  {this.state.paper}</Text>
                                        <Text> glass :  {this.state.glass}</Text>
                                        <Text> cardboard :  {this.state.cardboard}</Text>
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
}



const s = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})