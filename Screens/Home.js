import React, { Component } from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Query } from 'react-apollo';
import { getGarbages } from '../graphQl'
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


class Home extends Component {
    static navigationOptions = (props) => {
        return {
            headerTitle: 'Trashure',
            headerStyle: { backgroundColor: '#2d3436' },
            headerTitleStyle: { color: 'gold' },
        }
    };

    state = {
        token: '',
        data: []
    }

    componentDidMount = () => {
        this._retrieveData();
        console.log('Home Screen');
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('Token');
            console.log(value);
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

        if (!this.state.token) return (
            <View style={s.loading}>
                <ActivityIndicator size="large" color='gold' />
                <Text>fetch data ... </Text>
            </View>

        )
        if (this.state.token) {
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    {
                        <Query query={getGarbages} variables={{ token: this.state.token }}>
                            {({ loading, error, data }) => {
                                if (loading) return (
                                    <View style={s.loading}>
                                        <ActivityIndicator size="large" color='gold' />
                                        <Text>fetch data ... </Text>
                                    </View>
                                )
                                if (error) return error;

                                if (data) {
                                    return (
                                        <FlatList
                                            data={data.garbages.reverse()}
                                            keyExtractor={(item) => item._id}
                                            renderItem={({ item }) =>
                                                <View style={s.card}>
                                                    <Image
                                                        style={s.image}
                                                        source={{ uri: item.path }} />
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text
                                                            style={{ fontWeight: 'bold', fontSize: 20 }}>
                                                            {item.title} - </Text>
                                                        <Text>{item.type}</Text>
                                                    </View>
                                                    <Text>Taken by {item.userID.name}</Text>
                                                    <Text>{item.address}</Text>
                                                    <Text>{item.description}</Text>
                                                    <Text
                                                        style={{ color: 'grey' }}>posted on {new Date(item.createdAt).toLocaleString()}</Text>
                                                </View>
                                            }>
                                        </FlatList>
                                    )
                                }
                            }}
                        </Query>

                    }
                </View >
            )
        }
    }
}

const mapStateToProps = (state) => ({
    loading: state.Api.loading
})

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchData())
})


const s = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: deviceWidth * 0.95,
        borderBottomColor: '#2980b9',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    image: {
        height: deviceHeight * 0.3,
        resizeMode: 'contain'
    }
})
export default Home