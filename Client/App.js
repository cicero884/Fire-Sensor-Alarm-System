import React, { Component } from 'react';
import { 
	StatusBar, 
	Alert 
} from 'react-native';
import { 
	createAppContainer, 
	StackActions,
} from 'react-navigation'; 
import firebase from 'react-native-firebase';
import { LoadingPageSwitchNavigator } from './src/components/Navigator';
import NavigationService from './src/components/NavigationService';
import { getToken, getUser } from './src/components/UserAction';

const AppContainer =  createAppContainer(LoadingPageSwitchNavigator);

export default class App extends React.Component {  
	
	async componentDidMount() {
		this.checkPermission();
		this.createNotificationListeners(); //add this line
	}
	 
	componentWillUnmount() {
		this.notificationListener();
		this.notificationOpenedListener();
	}
	//1
	async checkPermission() {
		const enabled = await firebase.messaging().hasPermission();
		if (enabled) {
			getToken();
		} else {
			this.requestPermission();
		}
	}

	//2
	async requestPermission() {
		try {
			await firebase.messaging().requestPermission();
			// User has authorised
			getToken();
		} catch (error) {
			// User has rejected permissions
			console.log('permission rejected');
		}
	}

	async createNotificationListeners() {
		/*
		* Triggered when a particular notification has been received in foreground
		* */
		this.notificationListener = firebase.notifications().onNotification((notification) => {
			const { data } = notification;
			this.showAlert(data);
		});
	  
		/*
		* If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
		* */
		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { data } = notificationOpen.notification;
            this.showAlert(data);
		});
	  
		/*
		* If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
		* */
		const notificationOpen = await firebase.notifications().getInitialNotification();
		if (notificationOpen) {
            const { data } = notificationOpen.notification;
            this.showAlert(data);
        }
		/*
		* Triggered for data only payload in foreground
		* */
		this.messageListener = firebase.messaging().onMessage((message) => {
			//process data message
			console.log(JSON.stringify(message));
		});
	}
	  
	showAlert = async (data) => {
		const userdata = await getUser();
		if(userdata !== null) {
			/* Only user that has logged in, show the alert */
			if(userdata.groups[0] === "citizens") {
				console.log('alert citizens');
				Alert.alert(
					data.title, data.body,
					[
						{
							text: '更新我的位置', 
							onPress: () => NavigationService.navigate('CitizenDataPageStackNavigator'),
							style: 'ok'
						},
						{
					  		text: '察看起火樓層',
					  		onPress: () => {
								NavigationService.push('CitizenBuildingPage', {
									building_name: data.building_name,
									floor_name: data.floor_name.replace(`${data.building_name}_`, "")
								});
							},
					  		style: 'cancel',
						},
					]
				);
			} else if (userdata.groups[0] === "firefighters"){
				console.log('alert firefighter');
				Alert.alert(
					data.title, data.body,
					[{
						text: '察看起火樓層',
						onPress: () => NavigationService.push('FirefighterBuildingPage', {
							building_name: data.building_name,
							floor_name: data.floor_name.replace(`${data.building_name}_`, "")
						}),
						style: 'cancel',
					}]
				);
			}
		}	

	}

	render() {
		return (
			<AppContainer
				ref={ navigatorRef => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
				onNavigationStateChange={() => {
					StatusBar.setBarStyle('dark-content');
					StatusBar.setBackgroundColor('white');
				}}
			/>
		);
    }
}
