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
import {Books} from '../BOOK/Booklist';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class BookScreen extends React.Component {
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
  submitForm = async () => {
    let pdfuri = [];
    let imageuri = [];
    let nameimg = [];
    let namepdf = [];
    let catogery = [];
    let bookcount = [];
    let type = ['image', 'pdf'];
    for (let index = 0; index < Books.catogery.length; index++) {
      catogery[index] = Books.catogery[index].catogeryname;
      for (
        let indexs = 0;
        indexs < Books.catogery[index].bookpdf.length;
        indexs++
      ) {
        bookcount[indexs] = Books.catogery[index].bookcount;
        namepdf[indexs] = Books.catogery[indexs].bookname + 'pdf';
        nameimg[indexs] = Books.catogery[indexs].bookname + 'img';
        pdfuri[indexs] = Books.catogery[index].bookpdf[indexs];
        this.uploadImage(pdfuri[indexs], catogery[index] + indexs, type[1]);
        imageuri[indexs] = Books.catogery[index].bookimage[indexs];
        console.log(catogery[index] + indexs);
        console.log(pdfuri[indexs]);
        console.log(imageuri[indexs]);
        this.uploadImage(imageuri[indexs], catogery[index] + indexs, type[0]);
      }
    }
    ///console.log(Books.catogery[1].bookpdf);
    Books.catogery.map((language) => {
      //console.log(language);
      //console.log(language.php.bookpdf);
      //const pdfuri = language.php.bookpdf;
      //this.uploadImage(pdfuri, 'pdf1');
      //const imageuri = language.php.bookpdf;
      //this.uploadImage(imageuri, 'image1');
    });
  };

  uploadImage(uri, catogery, type, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;

      const imageRef = firebase.storage().ref(catogery).child(type);

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
      <ScrollView style={styles.container}>
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
