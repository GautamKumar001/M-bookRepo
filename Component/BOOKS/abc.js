import * as React from 'react';
import {View, StyleSheet, Image, Platform, Text} from 'react-native';
import {Button} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import firebase from '../../Database/firebaseDB';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class BookScreen extends React.Component {
  state = {
    userId: 12345,
    image: null,
    image_uri: null,
  };
  getPath = () => {
    const path =
      'file:///Users/gautam/Desktop/JOB/ProgrammerPalace/svg/thereactnativebook-sample.pdf';
    this.uploadImage(path);
    const pathimg =
      'file:///Users/gautam/Desktop/ProgrammerPalace/svg/Learn/C++.png';
    this.uploadImage(pathimg);
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
        //this.uploadImage(response.uri);
        const path =
          'file:///Users/gautam/Desktop/ProgrammerPalace/svg/Learn/C++.png';
        this.uploadImage(path);
        this.setState({
          image: source,
        });
      }
    });
  };
  uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;
      const imageRef = firebase.storage().ref('images').child('image_001');

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
  render() {
    return (
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
        <Button large leftIcon={{name: 'save'}} onPress={this.getPath}>
          <Text>getpath</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gallery: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
