import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

export const MapNavigation = (props) =>
    (
        <View
            style={{ flex: 1, maxHeight: height * 0.05, flexDirection: "row" }}>

            <TouchableOpacity
                style={s.nav}
                onPress={() => props.page.navigate('Maps')}>
                <Text>all</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[s.nav, { backgroundColor: '#2980b9' }]}
                onPress={() => props.page.navigate('MetalMap')}>
                <Text style={s.text}>
                    metal</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[s.nav, { backgroundColor: '#9b59b6' }]}
                onPress={() => props.page.navigate('PaperMap')}>
                <Text style={s.text}>
                    paper</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[s.nav, { backgroundColor: '#16a085' }]}
                onPress={() => props.page.navigate('PlasticMap')}>
                <Text style={s.text}>
                    plastic</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[s.nav, { backgroundColor: '#e67e22' }]}
                onPress={() => props.page.navigate('CardboardMap')}>
                <Text style={s.text}>
                    cardboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[s.nav, { backgroundColor: '#27ae60' }]}
                onPress={() => props.page.navigate('GlassMap')}>
                <Text style={s.text}>
                    glass</Text>
            </TouchableOpacity>
        </View>
    )

const s = StyleSheet.create({
    text: {
        color: 'white'
    },
    nav: {
        width: width / 6,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
//      'cardboard': '#e67e22',
//     'glass': '#27ae60',
//     'metal': '#2980b9',
//     'paper': '#9b59b6',
//     'plastic': '#16a085',
//     'trash': '#f1c40f'