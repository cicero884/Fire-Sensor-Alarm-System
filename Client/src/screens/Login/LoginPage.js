import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { logIn } from '../../components/UserAction';
import NavigationService from '../../components/NavigationService'


export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_type: "citizens",   
            buttonUser1BColor: "#5BC100",
            buttonUser2BColor: "#FFFFFF",
            buttonUser3BColor: "#FFFFFF",
            buttonUser1Color: "#FFFFFF",
            buttonUser2Color: "#5BC100",
            buttonUser3Color: "#5BC100",
            username: "",
            password: "",
            loginErrorMsg: "",
            registerPageOpacity: new Animated.Value(0),
            registerPageIsVisible: false,
        }   
    }

    setLoginErrorMsg = (loginErrorMsg) => {
        console.log(loginErrorMsg);
        this.setState({loginErrorMsg: loginErrorMsg});
    }

    render() {
        return (
            <View style={styles.containerOverlay}>
                <Text style={styles.textLogin}>{this.state.user_type === "citizens" ? "民眾" : "消防員"}登入</Text>
                <View style={styles.containerButtonUser}>
                    <Button
                        onPress={
                            () => {this.setState({
                                user_type: "citizens",
                                buttonUser1BColor: "#5BC100",
                                buttonUser2BColor: "#FFFFFF",
                                buttonUser3BColor: "#FFFFFF",
                                buttonUser1Color: "#FFFFFF",
                                buttonUser2Color: "#5BC100",
                                buttonUser3Color: "#5BC100",});
                            this.setLoginErrorMsg("");
                        }}
                        title={"民眾"}
                        titleStyle={{ color: this.state.buttonUser1Color, fontSize: 18 }}
                        icon={<Icon 
                            name='user'
                            type="font-awesome"
                            color={this.state.buttonUser1Color}
                            iconStyle={{ height: 30, width: 30, marginRight: "5%", marginTop: "20%" }}/>}
                        buttonStyle={{ backgroundColor: this.state.buttonUser1BColor, paddingLeft: "5%" }}
                        containerStyle={{ justifyContent: 'center', flex: 1, marginRight: "2%" }} />
                    <Button
                        onPress={() => {
                            this.setState({
                                user_type: "firefighters",
                                buttonUser1BColor: "#FFFFFF",
                                buttonUser2BColor: "#5BC100",
                                buttonUser3BColor: "#FFFFFF",
                                buttonUser1Color: "#5BC100",
                                buttonUser2Color: "#FFFFFF",
                                buttonUser3Color: "#5BC100",
                            });
                            this.setLoginErrorMsg("");
                        }}
                        title={"消防員"}
                        titleStyle={{ color: this.state.buttonUser2Color, fontSize: 18 }}
                        icon={<Icon 
                            name='fire-extinguisher'
                            type="font-awesome"
                            color={this.state.buttonUser2Color}
                            iconStyle={{ height: 30, width: 30, marginRight: "5%", marginTop: "20%" }}/>}
                        containerStyle={{ justifyContent: 'center', flex: 1, marginRight: "2%" }}
                        buttonStyle={{ backgroundColor: this.state.buttonUser2BColor }}
                    />
                </View>
                <View style={styles.containerInput}>
                    <Input
                        placeholder={"帳號"}
                        leftIcon={
                            <Icon 
                                name='user-circle'
                                type="font-awesome"
                                color="#5BC100"
                                iconStyle={{ height: 24, width: 24 }}/>}
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username: username })}
                        autoCapitalize='none'
                        inputStyle={{ paddingTop: 20, paddingLeft: 10 }}
                        containerStyle={{ paddingHorizontal: 18 }}
                        leftIconContainerStyle={{ marginLeft: 0, paddingTop: 10, }} />
                    <Input
                        placeholder={"密碼"}
                        leftIcon={
                            <Icon 
                                name='lock'
                                type="font-awesome"
                                color="#5BC100"
                                iconStyle={{ height: 24, width: 24 }}/>}
                        errorMessage={this.state.loginErrorMsg}
                        errorStyle={{ fontSize: 17 }}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password: password })}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        inputStyle={{ paddingTop: 20, paddingLeft: 5 }}
                        containerStyle={{ paddingHorizontal: 18 }}
                        leftIconContainerStyle={{ marginLeft: 5, paddingTop: 10, }} />
                </View>
                <Button
                    title={"登入"}
                    disabled={(this.state.username !== "" && this.state.password !== "") ? false : true}
                    onPress={() => logIn(this.state.username, this.state.password, this.state.user_type)}
                    containerStyle={styles.containerstyleButtonLogin}
                    buttonStyle={{ backgroundColor: "#5BC100" }}
                    titleStyle={{ fontWeight: "bold" }} />
                <Button
                    title={"註冊"}
                    disabled={this.state.user_type === "citizens" ? false : true}
                    onPress={() => NavigationService.navigate('RegisterPage')}
                    containerStyle={[styles.containerstyleButtonRegister, this.state.user_type === "citizens" ? { opacity: 1 } : { opacity: 0 }]}
                    buttonStyle={{ backgroundColor: "#FFFFFF" }}
                    titleStyle={{ color: "#BBBBBB", fontWeight: "bold" }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "grey",
        zIndex: 0,
    },
    containerOverlay: {
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
        width: "90%",
        height: "auto",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#F2F1EF",
        zIndex: 2,
    },
    textLogin: {
        position: "relative",
        fontSize: 40,
        marginTop: "15%",
        color: "#BFBFBF"
    },
    containerButtonUser: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "82%",
        marginHorizontal: "8%",
        marginTop: "12%",
        marginBottom: "5%",
        padding: 0,
    },
    containerInput: {
        padding: "2%",
        paddingBottom: "5%",
        width: "82%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
    },
    containerstyleButtonForgetPW: {
        marginTop: "0.2%",
        paddingTop: 0,
        marginRight: "8%",
        marginLeft: "63.3%",
    },
    containerstyleButtonLogin: {
        width: "82%",
        marginTop: "18%",
        marginHorizontal: "8%",
    },
    containerstyleButtonRegister: {
        width: "82%",
        marginTop: "3%",
        marginHorizontal: "8%",
        borderWidth: 1,
        borderColor: "#BFBFBF",
        marginBottom: "5%",
    },
})

export default LoginPage;