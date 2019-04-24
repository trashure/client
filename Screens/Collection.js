import React, { Component } from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Query, Mutation } from 'react-apollo';
import { getGarbages, getCollections, deleteTrash } from '../graphQl'
const { width, height } = Dimensions.get('window');



export default class Collection extends Component {
    static navigationOptions = (props) => {
        return {
            headerTitle: 'Collections',
            headerStyle: { backgroundColor: '#2d3436' },
            headerTitleStyle: { color: 'gold' },
        }
    };

    state = {
        token: '',
        modalVisible: false,
        selectionItem: {},
        myCollection: [],
    }

    componentDidMount = () => {
        this._retrieveData();
        console.log('Collection Screen');

    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Token');
            if (value !== null) {
                this.setState({
                    token: value
                })
            }
            console.log(this.state.token);

        } catch (error) {
            // Error retrieving data
        }
    }

    render() {
        return (
            <View>
                {
                    this.state.token ?
                        (
                            <Query query={getCollections} variables={{ token: this.state.token }}>
                                {({ loading, error, data }) => {
                                    if (loading) return (
                                        <View style={s.loading}>
                                            <ActivityIndicator size="large" color='gold' />
                                            <Text style={{ color: 'gold' }}>Please wait ... </Text>
                                        </View>
                                    )
                                    if (error) return <View><Text>error</Text></View>;
                                    if (data) {
                                        return (
                                            <ScrollView>
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
                                            </ScrollView>
                                        )
                                    }
                                }}
                            </Query>
                        ) : (
                            <View style={[s.loading, { flex: 1 }]}>
                                <ActivityIndicator size="large" color='gold' />
                                <Text style={{ color: 'gold' }}>Please wait ... </Text>
                            </View>
                        )
                }



                {/* M O D A L */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false })
                    }}>
                    <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <FlatList
                            data={[this.state.selectionItem]}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) =>
                                <View>
                                    <Image
                                        style={{ width, height: width }}
                                        source={{ uri: item.path }} />
                                    <Text style={{ fontSize: 25 }}>
                                        {item.title}</Text>
                                    <Text>by {item.userID.name}</Text>
                                    <Text style={{ color: 'grey' }}>
                                        posted on {new Date(item.createdAt).toLocaleString()}</Text>
                                    <Text>ini nanti alamat</Text>

                                    <Text style={{ marginTop: 10 }}>Description:</Text>
                                    <Text>{item.description}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: 'gold',
                                                marginTop: 10,
                                                padding: 5,
                                                width: 80,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            onPress={() => this.setState({ modalVisible: false })}>
                                            <Text style={{ fontSize: 24 }}>Okey</Text>
                                        </TouchableOpacity>
                                        <Mutation mutation={deleteTrash} refetchQueries={[{ query: getGarbages, variables: { token: this.state.token } }, { query: getCollections, variables: { token: this.state.token } }]}>
                                            {(deleteTrash, { data }) => (
                                                <Feather
                                                    name="trash"
                                                    size={20}
                                                    color='crimson'
                                                    style={{ marginLeft: 20, marginTop: 10, padding: 5 }}
                                                    onPress={() => {
                                                        deleteTrash({
                                                            variables: {
                                                                trashID: item._id,
                                                                token: this.state.token
                                                            }
                                                        })
                                                            .then(res => {
                                                                console.log(res);
                                                                this.setState({ modalVisible: false })
                                                            })
                                                            .catch(err => {
                                                                console.log(err);
                                                                return (<Text>{err}</Text>)
                                                            });
                                                    }}
                                                />
                                            )}
                                        </Mutation>
                                    </View>
                                </View>
                            }>
                        </FlatList>
                    </View>
                </Modal>
            </View >
        )
    }
}

const s = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    collection: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})