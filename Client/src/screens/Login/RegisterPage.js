import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button, Input, } from 'react-native-elements';
import qs from 'qs';

const axios = require('axios');
const cheerio = require('react-native-cheerio');
const htmlparser2 = require('htmlparser2-without-node-native');

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

    getCsrf = async (url) => {
        try {
            const response = await axios.get(url);  // get html from url
            if(response.status === 200) {
                const html = response.data; // Get raw html from server response
                const $ = cheerio.load(html);   // Using cheerio to parse raw html
                return $('input[name="csrfmiddlewaretoken"]').val();    // Get csrf_token from html 
            }
            else {
                Alert.alert('ERROR', 'Failed to get csrf token');
            }
        } catch(error) {
            Alert.alert('ERROR', error);
            console.log(error);
        }
    }

    signUp = async () => {
        try {
            /* Get csrf token */
            const csrf = await getCsrf('http://140.116.104.202:8000/userapp/registration/');    
            /* Try to signup, and get response from signup page */
            const signup_response = await axios.post('http://140.116.104.202:8000/userapp/registration/', qs.stringify({
                csrfmiddlewaretoken: csrf,  // csrf_token
                username: this.state.username,
                password1: this.state.password1,
                password2: this.state.password2,
            }))     
            /* If create new account succeed, login using this account */
            if(signup_response.data.status === 'success') {
                await logIn(
                    this.state.username, 
                    this.state.password1, 
                    false );   
            }
            /* Alert and log response from signup */
            Alert.alert('' ,signup_response.data);
            console.log(signup_response.data);
        
        } catch(error) {
            Alert.alert('ERROR', error);
            console.log(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerOverlay}>
                    <Text style={styles.textRegister}>註冊</Text>
                    <View style={styles.containerInput}>
                        <Input
                            placeholder={"姓名"}
                            leftIcon={
                                <Image
                                    source={require('../../assets/img/ICONS/Profile.png')}
                                    style={{ tintColor: "#5BC100", height: 17, width: 17 }}
                                />
                            }
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
                            placeholder={"填寫密碼"}
                            leftIcon={
                                <Image
                                    source={require('../../assets/img/ICONS/Lock.png')}
                                    style={{ tintColor: "#5BC100", height: 17, width: 17 }}
                                />
                            }
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
                            inputStyle={{ paddingTop: 20, paddingLeft: 10 }}
                            containerStyle={{ paddingHorizontal: 18 }}
                            leftIconContainerStyle={{ marginLeft: 0, paddingTop: 10, }} />
                        <Input
                            placeholder={"再次確認密碼"}
                            leftIcon={
                                <Image
                                    source={require('../../assets/img/ICONS/Lock.png')}
                                    style={{ tintColor: "#5BC100", height: 17, width: 17 }}
                                />
                            }
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
                            inputStyle={{ paddingTop: 20, paddingLeft: 10 }}
                            containerStyle={{ paddingHorizontal: 18 }}
                            leftIconContainerStyle={{ marginLeft: 0, paddingTop: 10, }} />
                    </View>
                    <Button
                        title={"提交"}
                        disabled={ 
                            (this.state.username !== "" &&
                                this.state.password1 !== "" &&
                                this.state.password2 !== "" && 
                                this.state.password1 === this.state.password2) ? false : true}
                        onPress={() => this.signUp() }
                        containerStyle={styles.containerstyleButtonSubmit}
                        buttonStyle={{ backgroundColor: "#5BC100" }}
                        titleStyle={{ fontWeight: "bold" }} />
                    <Button
                        title={"取消"}
                        onPress={() => this.props.navigation.navigate('LoadingPage')}
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