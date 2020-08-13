/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = ['Unable to symbolicate'];
AppRegistry.registerComponent(appName, () => App);
