import React, { Component } from 'react';
import { 
	StatusBar, 
	AsyncStorage, 
	Alert 
} from 'react-native';
import { 
    createAppContainer, 
} from 'react-navigation'; 
import firebase from 'react-native-firebase';
import { LoadingPageSwitchNavigator } from './src/components/Navigator';
import NavigationService from './src/components/NavigationService';
import { getToken } from './src/components/UserAction';

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
			console.log(notification);
			const { title, body } = notification;
			this.showAlert(title, body);
		});
	  
		/*
		* If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
		* */
		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
			console.log(notificationOpen.notification.data);
            const { data } = notificationOpen.notification;
            this.showAlert(data.title,data.body);
		});
	  
		/*
		* If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
		* */
		const notificationOpen = await firebase.notifications().getInitialNotification();
		console.log(notificationOpen.notification.data);
		if (notificationOpen) {
            const { data } = notificationOpen.notification;
            this.showAlert(data.title,data.body);
        }
		/*
		* Triggered for data only payload in foreground
		* */
		this.messageListener = firebase.messaging().onMessage((message) => {
			//process data message
			console.log(JSON.stringify(message));
		});
	}
	  
	showAlert(title, body) {
		Alert.alert(
			title, body,
			[
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			],
			{ cancelable: false },
		);
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
