import React, { Component } from "react";
import { View } from "react-native";

interface ButtonProps {

}

interface ButtonState {

}

export default class Button extends Component<ButtonProps, ButtonState>{

    public constructor(props : ButtonProps){
        super(props);
        this.state = {};
    }

    public render() : JSX.Element{
        return (
            <View></View>
        );
    }

}