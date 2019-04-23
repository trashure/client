import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNav from './Navigation/Index'
import store from './store'
import { Provider } from 'react-redux'

import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  // uri: "http://10.0.2.2:4000/graphql"
  // uri: "http://172.20.10.12:4000/graphql"
  // uri: "http://localhost:3000/graphql"
  uri: "http://35.237.249.100:81/graphql"
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
