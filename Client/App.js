import React, { Component } from 'react';
import { 
    createAppContainer, 
} from 'react-navigation'; 
import { LoadingPageSwitchNavigator } from './src/components/Navigator';
import NavigationService from './src/components/NavigationService';

const AppContainer =  createAppContainer(LoadingPageSwitchNavigator);

export default class App extends React.Component {  
    render() {
		return (
			<AppContainer
				ref={ navigatorRef => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
			/>
		);
    }
  }
