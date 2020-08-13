import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Platform,
} from 'react-native';
import {Button} from 'native-base';
import {ListItem} from 'react-native-elements';
import firebase from '../../Database/firebaseDB';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class TestScreen extends React.Component {
  state = {
    name: '',
    catogery: '',
    author: '',
    BookId: '',
    image: null,
    photo: null,
    singleFileOBJ: '',
    files: null,
  };
  handleChange = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };
  submitForm = async () => {
    const dbref = firebase
      .database()
      .ref('Books/')
      .push({
        name: this.state.name,
        catogery: this.state.catogery,
        author: this.state.author,
        image: this.state.image,
        file: this.state.singleFileOBJ.uri,
      })
      .then(() => {
        this.setState({
          name: '',
          catogery: '',
          author: '',
        });
      });
    this.uploadImage(this.state.singleFileOBJ.uri,"pdf2");
    //this.uploadImage(this.state.image.uri);

    const pdfuri =
      'file:///Users/gautam/Desktop/ProgrammerPalace/laravel-interview-questions.pdf';
    this.uploadImage(pdfuri, 'pdf1');
    const imageuri =
      'file:///Users/gautam/Desktop/ProgrammerPalace/svg/C++ Notes For Profs.png';
    this.uploadImage(imageuri, 'image1');
    var playersRef = firebase.database().ref('readers/');

    playersRef.on('child_added', function (data, prevChildKey) {
      var newPlayer = data.val();
      console.log('name: ' + data.name);
      console.log('catogery: ' + data.catogery);
      console.log('author: ' + data.author);
      console.log('Previous Player: ' + prevChildKey);
    });
    Alert.alert(
      this.state.name + '\n' + this.state.catogery + '\n' + this.state.author,
    );
  };

  bringItOn = async () => {
    var data1 = [];
    const userArr = [];
    var fireBaseResponse = firebase.database().ref('readers');
    fireBaseResponse.once('value').then((snapshot) => {
      snapshot.forEach((item) => {
        const {author, catogery, name, image, file} = item.val();
        var temp1 = {author: item.val().author};
        var temp2 = {name: item.val().name};
        var temp3 = {catogery: item.val().catogery};
        var temp4 = {image: item.val().image.uri};
        var temp5 = {file: item.val().file};
        data1.push(temp1, temp2, temp3, temp4, temp5);
        userArr.push({
          author,
          catogery,
          name,
          image,
          file,
        });
        const source = {uri: item.val().image.uri};
        this.setState({
          photo: source,
        });
        const fileUri = {uri: item.val().file};
        this.setState({
          files: fileUri,
        });
        return false;
      });
      this.setState({
        userArr,
      });
      console.log(data1);
      //console.log(userArr);
    });
  };
  selectImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log(source);
        this.setState({
          image: source,
        });
      }
    });
  };

  uploadImage(uri, str, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;

      const imageRef = firebase.storage().ref('images').child(str);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          imageRef.getDownloadURL().then((url) => {
            console.log(url);
          });
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async SingleFilePicker() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      this.setState({singleFileOBJ: res});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={'name'}
            value={this.state.name}
            onChangeText={(text) => this.handleChange(text, 'name')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'catogery'}
            value={this.state.catogery}
            onChangeText={(text) => this.handleChange(text, 'catogery')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={'Author'}
            value={this.state.author}
            onChangeText={(text) => this.handleChange(text, 'author')}
          />
        </View>
        <View style={{flex: 1, marginTop: 60}}>
          <View>
            {this.state.image ? (
              <Image
                source={this.state.image}
                style={{width: '100%', height: 300}}
              />
            ) : (
              <View style={styles.button}>
                <Button
                  large
                  leftIcon={{name: 'save'}}
                  onPress={this.selectImage}>
                  <Text>Add an image</Text>
                </Button>
              </View>
            )}
          </View>
        </View>
        <View style={styles.MainContainer}>
          <Text style={styles.text}>
            File Name:{' '}
            {this.state.singleFileOBJ.name ? this.state.singleFileOBJ.name : ''}
          </Text>

          <Text style={styles.text}>
            file Type:{' '}
            {this.state.singleFileOBJ.type ? this.state.singleFileOBJ.type : ''}
          </Text>

          <Text style={styles.text}>
            File Size:{' '}
            {this.state.singleFileOBJ.size ? this.state.singleFileOBJ.size : ''}
          </Text>

          <Text style={styles.text}>
            File URI:{' '}
            {this.state.singleFileOBJ.uri ? this.state.singleFileOBJ.uri : ''}
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={this.SingleFilePicker.bind(this)}>
            <Text style={styles.buttonText}>Click Here To Pick File</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Button large leftIcon={{name: 'save'}} onPress={this.submitForm}>
            <Text>upload </Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },

  button: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 9,
    margin: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 25,
    padding: 10,
    textAlign: 'center',
  },

  text: {
    color: '#000',
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
  },
});
