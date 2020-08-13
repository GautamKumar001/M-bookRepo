import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Button,
  View,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ReaderScreen from './Component/BOOKS/ReaderScreen';
import HomeScreen from './Component/AUTH/HomeScreen';

console.disableYellowBox = ["Unable to symbolicate"];
const Tab = createBottomTabNavigator();
export default class App extends React.Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, horizontal, tintcolor}) => {
                let imageName;
                if (route.name === 'Users') {
                  imageName = require('./image/team.png');
                } else if (route.name === 'Readers') {
                  imageName = require('./image/icons8-read-online-40.png');
                }
                return (
                  <Image
                    source={imageName}
                    style={{width: 30, resizeMode: 'contain', tintcolor}}
                  />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Users" component={HomeScreen} />
            <Tab.Screen name="Readers" component={ReaderScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
