import React, { Component } from "react";
import { View } from "react-native";

interface hookProps {

}

interface hookState {

}

export default class hook extends Component<hookProps, hookState>{

    public constructor(props : hookProps){
        super(props);
        this.state = {};
    }

    public render() : JSX.Element{
        return (
            <View></View>
        );
    }

}