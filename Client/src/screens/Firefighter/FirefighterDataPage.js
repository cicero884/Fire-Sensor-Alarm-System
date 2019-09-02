import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Alert
} from "react-native";
import { Button } from "react-native-elements";
import { logOut, getUser } from '../../components/UserAction';


export class FirefighterDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }
    
    componentDidMount = async() => {
        try {
            const userdata = await getUser();
            await this.setState({ username: userdata.username });
        } catch(error) {
            Alert.alert("ERROR", error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userdata}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>使用者: {this.state.username}</Text>
                </View>
                <Button
                    title="登出"
                    onPress={()=>logOut()}
                    containerStyle={{ width: "30%" }}
					buttonStyle={{ backgroundColor: "#DDDDDD", }}
                    titleStyle={{ color: "#5BC100", fontWeight: "bold" }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    userdata: {
        height: "50%",
        width: "80%",
        alignItems: 'flex-start',
        borderColor: "black",
        borderWidth: 1,
        padding: "5%"
    }
});