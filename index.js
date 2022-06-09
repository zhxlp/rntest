/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import Share from './src/Share';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
if (Platform.OS === 'ios') {
  AppRegistry.registerComponent('ShareMenuModuleComponent', () => Share);
}
