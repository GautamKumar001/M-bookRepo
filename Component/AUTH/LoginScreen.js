import * as React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from '../../Database/firebaseDB';
import {Button, Left} from 'native-base';
import PDFView from 'react-native-view-pdf';
import {TouchableOpacity} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const preLogin = require('../../Figma/prelogin6.png');
const postLogin = require('../../Figma/postLogin5.png');
const userimg = require('../../image/icons8-add-user-male-50.png');
export default class LoginScreen extends React.Component {
  state = {
    email: null,
    password: null,
    image: null,
    name: null,
    myemail: null,
    images: preLogin,
    showComponent: true,
    userImg: userimg,
  };
  handleText = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState({
      state: state,
    });
  };
  loginDetail = () => {
    const email = this.state.email;
    const password = this.state.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setState({
          email: '',
          password: '',
          myemail: res.user.email,
          images: postLogin,
          showComponent: false,
        });
        //this.postLogin();
        console.log(res.user.email);
      });
  };
  userProfile = () => {
    this.props.navigation.navigate('User');
  };

  render() {
    const userprofile = () => {
      if (!this.state.showComponent) {
        return (
          <TouchableOpacity onPress={() => this.userProfile()}>
            <Image source={this.state.userImg} />
          </TouchableOpacity>
        );
      }
    };
    const postlogin = () => {
      if (this.state.showComponent) {
        return (
          <View style={styles.inputcontainer}>
            <TextInput
              style={styles.input}
              value={this.state.email}
              onChangeText={(text) => this.handleText(text, 'email')}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              value={this.state.password}
              onChangeText={(text) => this.handleText(text, 'password')}
              placeholder="Password"
            />
            <Text>{this.state.email}</Text>
            <Text>{this.state.password}</Text>
            <Button
              full
              rounded
              success
              style={styles.login}
              onPress={() => this.loginDetail()}>
              <Text>SignIn</Text>
            </Button>
          </View>
        );
      }
    };
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ImageBackground
          resizeMode={'stretch'}
          source={this.state.images}
          style={styles.image}
        />
        {postlogin()}
        {userprofile()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // remove width and height to override fixed static size
  },
  image: {
    flex: 1,
    width: windowWidth,
    height: windowHeight - 90,
  },
  input: {
    position: 'relative',
    top: -250,
    textAlign: 'center',

    // Setting up TextInput height as 50 pixel.
    height: 40,

    // Set border width.
    borderWidth: 2,

    // Set border Hex Color Code Here.
    borderColor: '#FF5722',

    // Set border Radius.
    borderRadius: 20,

    //Set background color of Text Input.
    backgroundColor: '#FFFFFF',
    margin: 10,
  },
  inputcontainer: {
    marginTop: 260,
  },
  login: {
    position: 'relative',
    top: -280,
    width: 340,
    left: 10,
    height: 40,
  },
});
