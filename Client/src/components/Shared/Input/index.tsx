import React, { Component } from "react";
import { View } from "react-native";

interface indexProps {

}

interface indexState {

}

export default class index extends Component<indexProps, indexState>{

    public constructor(props : indexProps){
        super(props);
        this.state = {};
    }

    public render() : JSX.Element{
        return (
            <View></View>
        );
    }

}