import { AppRegistry } from 'react-native';
import { 
    createAppContainer, 
} from 'react-navigation'; 
import { LoadingPageSwitchNavigator } from './src/components/Navigator';

export default createAppContainer(LoadingPageSwitchNavigator);
AppRegistry.registerComponent('SafeHome', () => AppNavigator);