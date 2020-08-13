import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from '../../Database/firebaseDB';
import {Button} from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const postLogin = require('../../Figma/Signup2.png');

export default class SignUpScreen extends React.Component {
  state = {
    name: null,
    email: null,
    password: null,
    image: null,
    images: postLogin,
  };
  goToLogin = () => this.props.navigation.navigate('Login');
  handleText(text, field) {
    const state = this.state;
    state[field] = text;
    this.setState({state: state});
  }
  authUser = () => {
    const email = this.state.email;
    const password = this.state.password;
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          this.goToLogin();
        });
    } catch (error) {
      console.log(error);
    }
    firebase
      .database()
      .ref('ReaderAuth/')
      .push({
        name: this.state.name,
        email: this.state.email,
      })
      .then(() => {
        this.setState({
          name: '',
          email: '',
          password: '',
          image: '',
        });
      });
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.MainContainer}>
        <ImageBackground
          resizeMode={'stretch'}
          source={this.state.images}
          style={styles.image}
        />
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={this.state.name}
            onChangeText={(name) => this.handleText(name, 'name')}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(email) => this.handleText(email, 'email')}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(password) => this.handleText(password, 'password')}
          />
        </View>
        <Button
          full
          rounded
          success
          style={styles.signup}
          onPress={(navigate) => this.authUser(navigate)}>
          <Text>Signup</Text>
        </Button>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  inputcontainer: {
    marginTop: 330,
  },

  button: {},

  buttonText: {
    color: '#fff',
    fontSize: 21,
    padding: 10,
    textAlign: 'center',
  },

  text: {
    color: '#000',
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
  },
  input: {
    position: 'relative',
    top: -330,
    textAlign: 'center',
    justifyContent: 'center',

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
    margin: 5,
  },
  signup: {
    position: 'absolute',
    top: 160,
    width: 330,
    height: 30,
    left: 15,
  },
  image: {
    flex: 1,
    width: windowWidth,
    height: windowHeight - 150,
  },
});
