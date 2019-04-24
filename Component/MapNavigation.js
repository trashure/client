import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export const MapNavigation = (props) =>
    (
        <View
            style={{ flex: 1, maxHeight: height * 0.05, flexDirection: "row" }}>

<TouchableOpacity   
                style={{ width: width / 6, alignItems:'center' }}
                onPress={() => props.page.navigate('Maps')}
            ><Text>all</Text></TouchableOpacity>
            <TouchableOpacity
                style={{ width: width / 6,backgroundColor : '#2980b9', alignItems:'center' }}
                onPress={() => props.page.navigate('MetalMap')}
            ><Text>metal</Text></TouchableOpacity>
            <TouchableOpacity
                style={{ width: width / 6, backgroundColor : '#9b59b6', alignItems:'center' }}
                onPress={() => props.page.navigate('PaperMap')}
            >
                <Text>paper</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ width: width / 6,backgroundColor : '#16a085', alignItems:'center' }}
                onPress={() => props.page.navigate('PlasticMap')}
            >
                <Text>plastic</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ width: width / 6, backgroundColor : '#e67e22', alignItems:'center' }}
                onPress={() => props.page.navigate('CardboardMap')}
            >
                <Text>cardboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ width: width / 6, backgroundColor: '#27ae60', alignItems:'center' }}
                onPress={() => props.page.navigate('GlassMap')}
            >
                <Text>glass</Text>
            </TouchableOpacity>


        </View>


    )


    // et color = {
    //     'cardboard': '#e67e22',
    //     'glass': '#27ae60',
    //     'metal': '#2980b9',
    //     'paper': '#9b59b6',
    //     'plastic': '#16a085',
    //     'trash': '#f1c40f'
    // }
    // return color[result];