import * as React from 'react';
import {Button, Text, View, Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import UserProfile from './UserProfile';
const Loginstack = createStackNavigator();
const signupStack = createStackNavigator();

function loginStack() {
  return (
    <Loginstack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Loginstack.Screen name={'Login'} component={LoginScreen} />
      <Loginstack.Screen name={'User'} component={UserProfile} />
    </Loginstack.Navigator>
  );
}
function signUpStack() {
  return (
    <signupStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <signupStack.Screen name={'SignUp'} component={SignUpScreen} />
    </signupStack.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Tab.Navigator
        style={{ width: '100%'}}
        screenOptions={({route}) => ({
          tabBarLabel: ({focused, horizontal, tintColor}) => {
            let imageName;

            if (route.name === 'Login') {
              imageName = require('../../image/icons8-login-64-2.png');
            } else if (route.name === 'SignUp') {
              imageName = require('../../image/icons8-add-user-male-40.png');
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
        }}>
        <Tab.Screen name="Login" component={loginStack} />
        <Tab.Screen name="SignUp" component={signUpStack} />
      </Tab.Navigator>
    );
  }
}
