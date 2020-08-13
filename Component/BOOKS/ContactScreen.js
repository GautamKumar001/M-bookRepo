import * as React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
const phoneicon = require('../../svg/glossy-3d-blue-phone-icon.png');
const emailicon = require('../../svg/glossy-3d-blue-orbs2-075-icon.png');
const msgicon = require('../../svg/messages-icon.png');
const giticon = require('../../svg/git-icon.png');
// either import the whole module and call as Communications.method()
import Communications from 'react-native-communications';

// or can now import single methods and call straight via the method name
// import { web, phonecall } from 'react-native-communications';
// e.g. onPress={() => { web('http://www.github.com') }}

export default class ContactScreen extends React.Component {
  state = {
    phone: phoneicon,
    email: emailicon,
    message: msgicon,
    git: giticon,
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Communications.phonecall('+919123267691', true)}>
          <View style={styles.holder}>
            <Text style={styles.text}>Make phonecall</Text>
            <Image source={this.state.phone} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Communications.email(
              [
                'mailmekumargautam766@gmail.com',
                'mailmelearnersociety665@gmail.com',
              ],
              null,
              null,
              'email verification',
              'hello from mailer',
            )
          }>
          <View style={styles.holder}>
            <Text style={styles.text}>Send an email</Text>
            <Image source={this.state.email} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Communications.text('+917903911331')}>
          <View style={styles.holder}>
            <Text style={styles.text}>Send a text/iMessage</Text>
            <Image source={this.state.message} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Communications.web('https://github.com/facebook/react-native')
          }>
          <View style={styles.holder}>
            <Text style={styles.text}>Open react-native repo on Github</Text>
            <Image source={this.state.git} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(253,253,253)',
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});
