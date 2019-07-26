import React, { Component } from "react";
import { View } from "react-native";

interface LoginProps {

}

interface LoginState {

}

export default class Login extends Component<LoginProps, LoginState>{

    public constructor(props : LoginProps){
        super(props);
        this.state = {};
    }

    public render() : JSX.Element{
        return (
            <View></View>
        );
    }

}