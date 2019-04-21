import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNav from './Navigation/Index'
import store from './store'
import { Provider } from 'react-redux'

import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: "http://10.0.2.2:4000/graphql"
  // uri: "http://192.168.5.43:4000/graphql"
});




export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainNav />
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
