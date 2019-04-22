import React, { Component } from 'react'
import { View, Text, FlatList, Dimensions, Image, StyleSheet, TouchableOpacity, Modal, AsyncStorage } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { Query, Mutation, graphql } from 'react-apollo';
import { getCollections } from '../graphQl'
const { width, height } = Dimensions.get('window');



export default class Collection extends Component {
    state = {
        modalVisible: false,
        selectionItem: {},
        myCollection: [],
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
            <View>

                <Query query={getCollections} variables={{ token: this.state.token }}>
                    {({ loading, error, data }) => {
                        if (loading) return <View><Text>loading</Text></View>;
                        if (error) return <View><Text>error</Text></View>;
                        if (data) {
                            return (
                                <View style={s.collection}>
                                    {
                                        data.collections.map(e =>
                                            (
                                                <TouchableOpacity
                                                    key={e._id}
                                                    onPress={() => this.setState({ modalVisible: true, selectionItem: e })}                                        >
                                                    <Image
                                                        style={{ width: width / 3 - 3, height: width / 3 - 3, margin: 1 }}
                                                        source={{ uri: e.path }}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        )
                                    }
                                </View>
                            )
                        }
                    }}
                </Query>


                {/* M O D A L */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ width, height: width }}
                            source={{ uri: this.state.selectionItem.path }} />

                        <TouchableOpacity
                            style={{ backgroundColor: 'gold', padding: 5 }}
                            onPress={() => this.setState({ modalVisible: false })}>
                            <Text style={{ size: 30 }}>Okey</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>
            </View>
        )
    }
}

const s = StyleSheet.create({
    collection: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})