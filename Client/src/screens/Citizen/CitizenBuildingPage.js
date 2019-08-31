import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
} from "react-native";
import Svg, { Image, Circle } from 'react-native-svg';

export class CitizenBuildingPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>CitizenBuildingPage</Text>
                <Svg height='100' width='100'>
                    <Image  
                        x="5%"
                        y="5%"
                        width="90%"
                        height="90%"
                        href={{uri: "http://i.imgur.com/jieL5q9.jpg"}}/>
                    <Circle cx="-50" cy="-50" r="5" fill="pink" />
                    {/* <Circle cx="50" cy="50" r="5" fill="red" /> */}

                </Svg>
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