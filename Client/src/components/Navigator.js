import React from 'react';
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
const LoginRegisterPageStackNavigator = createStackNavigator({
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

/* Conbine CitizenScan, CitizenBuilding, CitizenData in Citizen */
const CitizenBottomTabNavigator = createBottomTabNavigator({
    CitizenScanPage: {
        screen: CitizenScanPage,
        navigationOptions: {
            tabBarIcon: (
                <Icon 
                    name='view-grid'
                    type="material-community"
                    color='#5BC100'/>
            ),
        },  
    },
    CitizenBuildingPage: {
        screen: CitizenBuildingPage,
        navigationOptions: {
            tabBarIcon: (
                <Icon 
                    name='bell'
                    type="material-community"
                    color='#5BC100'/>
            ),
        }, 
    },
    CitizenDataPage: {
        screen: CitizenDataPage,
        navigationOptions: {
            tabBarIcon: (
                <Icon 
                    name='account'
                    type="material-community"
                    color='#5BC100'/>
            ),
        }, 
    },
},{
    tabBarOptions: { 
        showLabel: false,
        activeBackgroundColor: '#F2F1EF',
        inactiveBackgroundColor: '#FFFFFF',
    },
});

/* Conbine FirefighterBuilding, FirefighterData in Firefighter */
const FirefighterBottomTabNavigator = createBottomTabNavigator({
    FirefighterBuildingPage: {
        screen: FirefighterBuildingPage,
        navigationOptions: {
            tabBarIcon: (
                <Icon 
                    name='bell'
                    type="material-community"
                    color='#5BC100'/>
            ),
        }, 
    },
    FirefighterDataPage: {
        screen: FirefighterDataPage,
        navigationOptions: {
            tabBarIcon: (
                <Icon 
                    name='account'
                    type="material-community"
                    color='#5BC100'/>
            ),
        }, 
    },
},{
    tabBarOptions: { 
        showLabel: false,
        activeBackgroundColor: '#F2F1EF',
        inactiveBackgroundColor: '#FFFFFF',
    },
});

/* Conbine Login, Citizen, Firefighter in App */
export const LoadingPageSwitchNavigator = createSwitchNavigator({
    LoginRegisterPageStackNavigator: {
        screen: LoginRegisterPageStackNavigator,
    },
    CitizenBottomTabNavigator: {
        screen: CitizenBottomTabNavigator,
    },
    FirefighterBottomTabNavigator: {
        screen: FirefighterBottomTabNavigator,
    },
    
});