import React from 'react';
import { View, Text, Image } from 'react-native';
import {  
    createSwitchNavigator,  
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation'; 
import { fromRight } from 'react-navigation-transitions'
import { Icon } from 'react-native-elements';
import { LoadingPage, RegisterPage } from '../screens/Login';
import { CitizenScanPage, CitizenBuildingPage, CitizenDataPage } from '../screens/Citizen';
import { FirefighterBuildingPage, FirefighterDataPage } from '../screens/Firefighter';


/* Conbine Loading, Register in Login */
const LoginPageStackNavigator = createStackNavigator({
    LoadingPage: {
        screen: LoadingPage,
    },
    RegisterPage: {
        screen: RegisterPage,
    },
},{
    initialRouteName: 'LoadingPage',
    transitionConfig: () => fromRight()
});


/* Put CitizenScan into StackNavigator to get header */
const CitizenScanPageStackNavigator = createStackNavigator({
    CitizenScanPage: {
        screen: CitizenScanPage,
        navigationOptions: {
            headerLeft: null,
            headerTitle: ( 
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center'}}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#5BC100', fontFamily: 'sans-serif-condensed'}}>FSAS</Text>
                    </View>
                        <Image
                            resizeMode="contain"
                            source={require('../assets/icons/FSAS.png')}
                            style={{ width: 40, height: 40, tintColor: "#5BC100" }} />
                </View>
            ),
        },
    },
},{
    headerLayoutPreset: 'center'
})

/* Put CitizenBuilding into StackNavigator to get header */
const CitizenBuildingPageStackNavigator = createStackNavigator({
    CitizenBuildingPage: {
        screen: CitizenBuildingPage,
        navigationOptions: {
            headerLeft: null,
            headerTitle: ( 
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center'}}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#5BC100', fontFamily: 'sans-serif-condensed'}}>FSAS</Text>
                    </View>
                        <Image
                            resizeMode="contain"
                            source={require('../assets/icons/FSAS.png')}
                            style={{ width: 40, height: 40, tintColor: "#5BC100" }} />
                </View>
            ),
        },
    },
},{
    headerLayoutPreset: 'center'
})

/* Put CitizenDataPage into StackNavigator to get header */
const CitizenDataPageStackNavigator = createStackNavigator({
    CitizenDataPage: {
        screen: CitizenDataPage,
        navigationOptions: {
            headerLeft: null,
            headerTitle: ( 
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center'}}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#5BC100', fontFamily: 'sans-serif-condensed'}}>FSAS</Text>
                    </View>
                        <Image
                            resizeMode="contain"
                            source={require('../assets/icons/FSAS.png')}
                            style={{ width: 40, height: 40, tintColor: "#5BC100" }} />
                </View>
            ),
        },
    },
},{
    headerLayoutPreset: 'center'
})

/* Conbine CitizenScan, CitizenBuilding, CitizenData in Citizen */
const CitizenBottomTabNavigator = createBottomTabNavigator({
    CitizenScanPageStackNavigator: {
        screen: CitizenScanPageStackNavigator,
        navigationOptions: {
            tabBarLabel: (
                <Text style={{ fontSize: 16, color: "#5BC100", textAlign: 'center'}}>掃描大樓</Text>
            ),
            tabBarIcon: (
                <Icon 
                    name='qrcode'
                    type="material-community"
                    size={30}
                    color='#5BC100'/>
            ),
        }, 
    },
    CitizenBuildingPageStackNavigator: {
        screen: CitizenBuildingPageStackNavigator,
        navigationOptions: {
            tabBarLabel: (
                <Text style={{ fontSize: 16, color: "#5BC100", textAlign: 'center'}}>我的大樓</Text>
            ),
            tabBarIcon: (
                <Icon 
                    name='home-city'
                    type="material-community"
                    size={30}
                    color='#5BC100'/>
            ),
        }, 
    },
    CitizenDataPageStackNavigator: {
        screen: CitizenDataPageStackNavigator,
        navigationOptions: {
            tabBarLabel: (
                <Text style={{ fontSize: 16, color: "#5BC100", textAlign: 'center'}}>我的資料</Text>
            ),
            tabBarIcon: (
                <Icon 
                    name='account'
                    type="material-community"
                    size={30}
                    color='#5BC100'/>
            ),
        }, 
    },
},{
    initialRouteName: 'CitizenBuildingPageStackNavigator',
    tabBarOptions: { 
        activeBackgroundColor: '#F2F1EF',
        inactiveBackgroundColor: '#FFFFFF',
    },

});

/* Put FirefighterBuildingPage into StackNavigator to get header */
const FirefighterBuildingPageStackNavigator = createStackNavigator({
    FirefighterBuildingPage: {
        screen: FirefighterBuildingPage,
        navigationOptions: {
            headerLeft: null,
            headerTitle: ( 
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center'}}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#5BC100', fontFamily: 'sans-serif-condensed'}}>FSAS</Text>
                    </View>
                        <Image
                            resizeMode="contain"
                            source={require('../assets/icons/FSAS.png')}
                            style={{ width: 40, height: 40, tintColor: "#5BC100" }} />
                </View>
            ),
        },
    },
},{
    headerLayoutPreset: 'center'
})

/* Put CitizenDataPage into StackNavigator to get header */
const FirefighterDataPageStackNavigator = createStackNavigator({
    FirefighterDataPage: {
        screen: FirefighterDataPage,
        navigationOptions: {
            headerLeft: null,
            headerTitle: ( 
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center'}}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#5BC100', fontFamily: 'sans-serif-condensed'}}>FSAS</Text>
                    </View>
                        <Image
                            resizeMode="contain"
                            source={require('../assets/icons/FSAS.png')}
                            style={{ width: 40, height: 40, tintColor: "#5BC100" }} />
                </View>
            ),
        },
    },
},{
    headerLayoutPreset: 'center'
})

/* Conbine FirefighterBuilding, FirefighterData in Firefighter */
const FirefighterBottomTabNavigator = createBottomTabNavigator({
    FirefighterBuildingPageStackNavigator: {
        screen: FirefighterBuildingPageStackNavigator,
        navigationOptions: {
            tabBarLabel: (
                <Text style={{ fontSize: 16, color: "#5BC100", textAlign: 'center'}}>大樓清單</Text>
            ),
            tabBarIcon: (
                <Icon 
                    name='home-city'
                    type="material-community"
                    size={30}
                    color='#5BC100'/>
            ),
        }, 
    },
    FirefighterDataPageStackNavigator: {
        screen: FirefighterDataPageStackNavigator,
        navigationOptions: {
            tabBarLabel: (
                <Text style={{ fontSize: 16, color: "#5BC100", textAlign: 'center'}}>我的資料</Text>
            ),
            tabBarIcon: (
                <Icon 
                    name='account'
                    type="material-community"
                    size={30}
                    color='#5BC100'/>
            ),
        }, 
    },
},{
    initialRouteName: 'FirefighterBuildingPageStackNavigator',
    tabBarOptions: { 
        activeBackgroundColor: '#F2F1EF',
        inactiveBackgroundColor: '#FFFFFF',
    },
});

/* Conbine Login, Citizen, Firefighter in App */
export const LoadingPageSwitchNavigator = createSwitchNavigator({
    LoginPageStackNavigator: {
        screen: LoginPageStackNavigator,
    },
    CitizenBottomTabNavigator: {
        screen: CitizenBottomTabNavigator,
    },
    FirefighterBottomTabNavigator: {
        screen: FirefighterBottomTabNavigator,
    }, 
},{
    initialRouteName: "CitizenBottomTabNavigator"
});