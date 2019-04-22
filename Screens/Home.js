import React, { Component } from 'react'
import {
    View, Text, Image,
    FlatList, Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { fecthData } from '../store/Actions/Api'
import Icon from 'react-native-vector-icons/Entypo'
import { Query, Mutation, graphql } from 'react-apollo';
import { getGarbages } from '../graphQl'

class Home extends Component {
    static navigationOptions = (props) => {
        return {
            headerTitle: 'Trashure',
        }
    };

    state = {
        token: '',
        data: []
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
                                                    <View
                                                        style={{ flex: 1, width: deviceWidth * 0.95, borderBottomColor: 'black', marginTop: 20, minHeight: deviceHeight * 0.5, maxHeight: deviceHeight * 0.8 }}>
                                                        <View>
                                                            <Text
                                                                style={{ fontWeight: 'bold', fontSize: 20 }}>{item.userID.name}</Text>
                                                        </View>
                                                        <View
                                                            style={{ flexDirection: 'row' }}>
                                                            <Text>{item.coordinate}</Text>
                                                        </View>
                                                        <Image
                                                            style={{ flex: 1, minHeight: deviceHeight * 0.3, maxHeight: deviceHeight * 0.6, resizeMode: 'contain' }}
                                                            source={{ uri: item.path }} />
                                                        <View
                                                            style={{ marginTop: 10 }}>
                                                            <Text>{item.description}</Text>
                                                        </View>
                                                        <View>
                                                            <Text
                                                                style={{ color: 'grey' }}>posted on {item.createdAt}</Text>
                                                        </View>
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



const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const mapStateToProps = (state) => ({
    loading: state.Api.loading
})

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchData())
})

export default Home