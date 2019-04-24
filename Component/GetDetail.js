import React from 'react'
import {
    View,
    Button,
    Modal,
    Text,
    TouchableOpacity
} from 'react-native'

export default function GetDetail(props) {

    return (
        
        <>
            <View
                style={{ flex: 1, maxHeight: height * 0.05 }}>
                <Button
                    title="see detail"
                    onPress={() => {
                        this.setState({ loading: true })
                        this.getDetail(data.garbages)
                    }} />
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{ marginTop: 22, justifyContent: 'center', alignItems: 'center' }}>


                    <Text > metal :  {this.state.metal}</Text>
                    <Text> plastic :  {this.state.plastic}</Text>
                    <Text > paper :  {this.state.paper}</Text>
                    <Text> glass :  {this.state.glass}</Text>
                    <Text> cardboard :  {this.state.cardboard}</Text>
                    <TouchableOpacity
                        style={{ backgroundColor: 'gold', padding: 5 }}
                        onPress={() => this.setState({ modalVisible: false })}>
                        <Text>close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    )
}
