import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

export class FirefighterDataPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>FirefighterDataPage</Text>
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