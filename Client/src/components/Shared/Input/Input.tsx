import React, { Component } from "react";
import { View } from "react-native";

interface InputProps {

}

interface InputState {

}

export default class Input extends Component<InputProps, InputState>{

    public constructor(props : InputProps){
        super(props);
        this.state = {};
    }

    public render() : JSX.Element{
        return (
            <View></View>
        );
    }

}