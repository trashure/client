import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export const MapNavigation = (props) =>
    (
        <View
            style={{ flex: 1, maxHeight: height * 0.05, flexDirection: "row" }}>

<TouchableOpacity   
                style={{ width: width / 6 }}
                onPress={() => props.page.navigate('Maps')}
            ><Text>all</Text></TouchableOpacity>
            <TouchableOpacity
                style={{ width: width / 6 }}
                onPress={() => props.page.navigate('MetalMap')}
            ><Text>metal</Text></TouchableOpacity>
            <TouchableOpacity
                style={{ width: width / 6 }}
                onPress={() => props.page.navigate('PaperMap')}
            >
                <Text>paper</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ width: width / 6 }}
                onPress={() => props.page.navigate('PlasticMap')}
            >
                <Text>plastic</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ width: width / 6 }}
                onPress={() => props.page.navigate('CardboardMap')}
            >
                <Text>cardboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ width: width / 6, }}
                onPress={() => props.page.navigate('GlassMap')}
            >
                <Text>glass</Text>
            </TouchableOpacity>


        </View>


    )

