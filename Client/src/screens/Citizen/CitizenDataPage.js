import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

export class CitizenDataPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>CitizenDataPage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});