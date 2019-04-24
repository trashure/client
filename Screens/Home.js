import React, { Component } from 'react'
import {
    View, Text, Image,
    FlatList, Dimensions,
    AsyncStorage,
    StyleSheet, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { fecthData } from '../store/Actions/Api'
import Icon from 'react-native-vector-icons/Entypo'
import { Query, Mutation, graphql } from 'react-apollo';
import { getGarbages } from '../graphQl'
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


class Home extends Component {
    static navigationOptions = (props) => {
        return {
            headerTitle: 'Trashure',
            headerStyle: { backgroundColor: '#2d3436' },
            headerTitleStyle: { color: 'white' },
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
        let { data } = this.state
        return (

            <View
                style={{ flex: 1, alignItems: 'center' }}>
                {
                    this.state.token ?
                        (
                            <Query query={getGarbages} variables={{ token: this.state.token }}>
                                {({ loading, error, data }) => {
                                    if (loading) return loading;
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
                                                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                                            {item.userID.name}</Text>
                                                        <Text>ini nanti alamat</Text>
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
                        ) : (
                            <Text>Loading</Text>
                        )
                }
            </View >
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.Api.loading
})

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchData())
})


const s = StyleSheet.create({
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