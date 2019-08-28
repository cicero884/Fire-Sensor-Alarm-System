import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Button } from "react-native-elements";
import { logOut } from '../../components/UserAction';


export class FirefighterDataPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>FirefighterDataPage</Text>
                <Button
                    title="logout"
                    onPress={()=>logOut()}
                />
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