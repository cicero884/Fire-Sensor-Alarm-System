import React, { Component } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity, Image, Alert, Text } from 'react-native';
import LoginPage from './LoginPage';
import { getUser } from '../../components/UserAction'
import NavigationService from '../../components/NavigationService'

export class LoadingPage extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            isAnimationFinish: false,
            isOverlayVisible: true,
            backgroundColorContainer: "#FFFFFF",
            signedIn: false,
            animationComponent: null,
            loginErrorMsg: "",
        }
        this.springAnimationXY = new Animated.ValueXY({ x: 0, y: 1000 })
    }

    cheakIfLoginBefore = async() => {
        const userdata = await getUser();
        console.log(userdata);
        /* If logged in before, redirect to specific user page */
        if(userdata !== null) {
            if(userdata.groups[0] === 'citizens') {
                NavigationService.navigate('CitizenBottomTabNavigator');
            }
            else if(userdata.groups[0] === 'firefighters') {
                NavigationService.navigate('FirefighterBottomTabNavigator');
            }
        }
        /* Else show login page */
        else {
            this.setState({ animationComponent: <LoginPage/>});
        }
    }

    /* For slide down the SafeHome icon */
    slideDown = () => {
        if(this.state.isAnimationFinish === false) {
            this.setState({isAnimationFinish: true});
            this.cheakIfLoginBefore();
            Animated.spring(
                this.springAnimationXY, {
                    toValue: { x: 0, y: 0 },
                }
            ).start();
            this.setState({ backgroundColorContainer: "grey" });
            if (this.interval)  // Remove the timer
                clearInterval(this.interval);
        }
    }

    /* If user doesn't click SafeHome icon after 3 seconds, automatically slide down it */
    setTimerlideDown = () => {
        this.interval = setInterval(this.slideDown, 1500);
    }
  
    render() {
        return (
            <TouchableOpacity style={[styles.container, { backgroundColor: this.state.backgroundColorContainer }]}
                onPress={this.slideDown}
                onLayout={this.setTimerlideDown}
                activeOpacity={1}>
                <View style={{ position: "absolute" }}>
                    <Image
                        source={require('../../assets/icons/FSAS.png')}
                        style={{ height: 200, width: 200, tintColor: "#5BC100" }}
                    />
                    <Text
                        style={{ textAlign: 'center', fontSize: 60, fontWeight: 'bold', color: "#5BC100" }}>
                    F S A S</Text>
                </View>
                <Animated.View style={[styles.container, this.springAnimationXY.getLayout()]}>
                    { this.state.animationComponent }     
                </Animated.View>
            </TouchableOpacity>
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
})

