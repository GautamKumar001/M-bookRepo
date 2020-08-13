import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from '../../Database/firebaseDB';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import DocumentPicker from 'react-native-document-picker';

export default class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleFileOBJ: '',
    };
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
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },

  button: {
    width: '100%',
    backgroundColor: '#0091EA',
    borderRadius: 9,
  },

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
});
