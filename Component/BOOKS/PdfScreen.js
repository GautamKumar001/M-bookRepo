import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Pdf from 'react-native-pdf';
import firebase from '../../Database/firebaseDB';
const dwnld = require('../../images/download-2.png');
export default class PdfScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: this.props.route.params.uri,
      cache: this.props.route.params.cache,
      download: dwnld,
    };
  }
  PdfScreen = () => {
    const source = {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/c%2B%2B1%2Fpdf?alt=media&token=fffebea9-fd0a-4637-b0cc-2542a7e546d1',
    };
    return <Pdf source={source} style={styles.pdf} />;
  };

  render() {
    const source = {
      uri: this.state.uri,
      cache: this.state.cache,
    };
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
        />
        <TouchableOpacity style={styles.dnwnlad}>
          <Image source={this.state.download} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pdf: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  dnwnlad: {
    position: 'relative',
    top: 200,
  },
});
