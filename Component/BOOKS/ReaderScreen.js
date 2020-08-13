/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  Button,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AppRegistry,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Pdf from 'react-native-pdf';
import firebase from '../../Database/firebaseDB';
import AboutScreen from './AboutScreen';
import IndexScreen from './IndexScreen';
import BookScreen from './BookScreen';
import TestScreen from './TestScreen';
import PdfScreen from './PdfScreen';
import ContactScreen from './ContactScreen';
import Bookpdf from './Bookpdf';
import DownloadScreen from './DownloadScreen';
import BooksScreen from '../BOOK/BookScreen'

const Homestack = createStackNavigator();
const Bookstack = createStackNavigator();
const Aboutstack = createStackNavigator();
const Contactstack = createStackNavigator();

function HomestackScreen() {
  return (
    <Homestack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Homestack.Screen name="Homes" component={IndexScreen} />
      <Homestack.Screen name="Profile" component={TestScreen} />
      <Homestack.Screen name="DOWNLOAD" component={DownloadScreen} />
      <Homestack.Screen name="PDF" component={PdfScreen} />
    </Homestack.Navigator>
  );
}
function BookstackScreen() {
  return (
    <Bookstack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Bookstack.Screen name="Books" component={BookScreen} />
      <Bookstack.Screen name="BookPdf" component={Bookpdf} />
      <Bookstack.Screen name="Book" component={BooksScreen} />

    </Bookstack.Navigator>
  );
}
function ContactstackScreen() {
  return (
    <Contactstack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Contactstack.Screen name="Contacts" component={ContactScreen} />
    </Contactstack.Navigator>
  );
}
function AboutstackScreen() {
  return (
    <Aboutstack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Aboutstack.Screen name="Abouts" component={AboutScreen} />
    </Aboutstack.Navigator>
  );
}
const Tab = createMaterialTopTabNavigator();
export default class ReaderScreen extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: ({focused, horizontal, tintColor}) => {
            let imageName;

            if (route.name === 'Home') {
              imageName = require('../../image/icons8-log-cabin-40.png');
            } else if (route.name === 'Book') {
              imageName = require('../../image/icons8-book-64.png');
            } else if (route.name === 'Contact') {
              imageName = require('../../image/icons8-contact-us-48.png');
            } else if (route.name === 'About') {
              imageName = require('../../image/icons8-about-48.png');
            }

            // You can return any component that you like here!
            return (
              <Image
                source={imageName}
                style={{width: 25, resizeMode: 'contain', tintColor}}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        style={{marginTop: 0}}>
        <Tab.Screen name="Home" component={HomestackScreen} />
        <Tab.Screen name="Book" component={BookstackScreen} />
        <Tab.Screen name="About" component={AboutstackScreen} />
        <Tab.Screen name="Contact" component={ContactstackScreen} />
      </Tab.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  image: {
    width: 100,
    resizeMode: 'contain',
    margin: 10,
  },
});
