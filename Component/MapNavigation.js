import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export const MapNavigation = () => 
         (
            <View>
                <TouchableOpacity   
                    style={{ width: width / 5 }}
                    onPress={() => this.props.navigation.navigate('Maps')}
                ><Text>all</Text></TouchableOpacity>
                <TouchableOpacity
                    style={{ width: width / 5 }}
                    onPress={() => this.props.navigation.navigate('MetalMap')}
                ><Text>metal</Text></TouchableOpacity>
                <TouchableOpacity
                    style={{ width: width / 5 }}
                    onPress={() => this.props.navigation.navigate('PaperMap')}
                >
                    <Text>paper</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ width: width / 5 }}
                    onPress={() => this.props.navigation.navigate('PlasticMap')}
                >
                    <Text>plastic</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ width: width / 5 }}
                    onPress={() => this.props.navigation.navigate('CardboardMap')}
                >
                    <Text>cardboard</Text>
                </TouchableOpacity>
            </View>
        )

