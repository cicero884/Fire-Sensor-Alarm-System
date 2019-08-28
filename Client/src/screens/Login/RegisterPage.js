import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { signUp } from '../../components/UserAction';
import NavigationService from '../../components/NavigationService'

export class RegisterPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameErrorMsg: "",
            password1: "",
            password1ErrorMsg: "",
            password2: "",
            password2ErrorMsg: " ",
        }
    }

    setRegisterErrorMsg = () => {
        alert("註冊失敗，請重新輸入");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerOverlay}>
                    <Text style={styles.textRegister}>民眾註冊</Text>
                    <View style={styles.containerInput}>
                        <Input
                            placeholder={"帳號"}
                            leftIcon={
                                <Icon 
                                name='user-circle'
                                type="font-awesome"
                                color="#5BC100"
                                iconStyle={{ height: 24, width: 24 }}/>}
                            errorMessage={this.state.usernameErrorMsg}
                            errorStyle={{ fontSize: 17 }}
                            value={this.state.username}
                            onChangeText={(username) => {
                                this.setState({username: username});
                                if(username === "")
                                    this.setState({usernameErrorMsg: "姓名不能為空"});
                                else
                                    this.setState({usernameErrorMsg: ""});
                            }}
                            keyboardType='default'
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
                            errorMessage={this.state.password1ErrorMsg}
                            errorStyle={{ fontSize: 17 }}
                            value={this.state.password1}
                            onChangeText={(password1) => {
                                this.setState({password1: password1});
                                if(password1 === "")
                                    this.setState({password1ErrorMsg: "密碼不能為空"});
                                else
                                    this.setState({password1ErrorMsg: ""});
                                if(this.state.password2 != password1)
                                    this.setState({password2ErrorMsg: "密碼不一致"})
                                else
                                    this.setState({password2ErrorMsg: " "})
                            }}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            inputStyle={{ paddingTop: 20, paddingLeft: 5 }}
                            containerStyle={{ paddingHorizontal: 18 }}
                            leftIconContainerStyle={{ marginLeft: 5, paddingTop: 10, }} />
                        <Input
                            placeholder={"再次確認密碼"}
                            leftIcon={
                                <Icon 
                                name='lock'
                                type="font-awesome"
                                color="#5BC100"
                                iconStyle={{ height: 24, width: 24 }}/>}
                            errorMessage={this.state.password2ErrorMsg}
                            errorStyle={{ fontSize: 17 }}
                            value={this.state.password2}
                            onChangeText={(password2) => {
                                this.setState({password2: password2});
                                if(password2 != this.state.password1)
                                    this.setState({password2ErrorMsg: "密碼不一致"})
                                else
                                    this.setState({password2ErrorMsg: " "})
                            }} 
                            secureTextEntry={true}
                            autoCapitalize='none'
                            inputStyle={{ paddingTop: 20, paddingLeft: 5 }}
                            containerStyle={{ paddingHorizontal: 18 }}
                            leftIconContainerStyle={{ marginLeft: 5, paddingTop: 10, }} />
                    </View>
                    <Button
                        title={"註冊並登入"}
                        disabled={ 
                            (this.state.username !== "" &&
                                this.state.password1 !== "" &&
                                this.state.password2 !== "" && 
                                this.state.password1 === this.state.password2) ? false : true}
                        onPress={() => signUp(this.state.username, this.state.password1, this.state.password2) }
                        containerStyle={styles.containerstyleButtonSubmit}
                        buttonStyle={{ backgroundColor: "#5BC100" }}
                        titleStyle={{ fontWeight: "bold" }} />
                    <Button
                        title={"取消"}
                        onPress={() => NavigationService.navigate('LoadingPage')}
                        containerStyle={styles.containerstyleButtonCancel}
                        buttonStyle={{ backgroundColor: "white", }}
                        titleStyle={{ color: "#BBBBBB", fontWeight: "bold" }} />
                </View>
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
    textRegister: {
        position: "relative",
        fontSize: 40,
        marginTop: "15%",
        marginBottom: "5%",
        color: "#BFBFBF",
    },
    containerInput: {
        padding: "2%",
        paddingBottom: "4%",
        width: "82%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
    },
    containerstyleButtonSubmit: {
        width: "82%",
        marginTop: "6%",
        marginHorizontal: "8%",
    },
    containerstyleButtonCancel: {
        width: "82%",
        marginTop: "3%",
        marginHorizontal: "8%",
        borderWidth: 1,
        borderColor: "#BFBFBF",
        marginBottom: "5%"
    },
})
export default RegisterPage;