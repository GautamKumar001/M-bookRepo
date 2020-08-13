import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
  NativeModules,
  BackHandler,
  Alert,
  WebView,
} from 'react-native';
import {Books} from '../BOOK/Booklist';
import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';
const bookpdf = require('../../images/bookcplusplus.png');

export default class BookScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherParam: 'cfgfcgfxcsfgdcxa',
      itemId: 234567,
    };
    this.state = {
      imagePath:
        ' https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/php1%2Fpdf?alt=media&token=a028e482-815d-4231-b794-cc0b19aacb1b',
      bookimg: bookpdf,
    };
  }
  getBook = () => {
    Books.catogery.map((language) => {
      console.log(language.bookpdf);
    });
  };
  getBookpdf = () => {
    Books.catogery.map((language) => {
      console.log(language.bookcount);
    });
  };
  openPdf = () => {
    this.props.navigation.navigate('PDF', {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/c%2B%2B1%2Fpdf?alt=media&token=fffebea9-fd0a-4637-b0cc-2542a7e546d1',
      cache: false,
    });
  };
  _download() {
    const {
      dirs: {DownloadDir, DocumentDir},
    } = RNFetchBlob.fs;
    const {config} = RNFetchBlob;
    const isIOS = Platform.OS === 'ios';
    const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});
    var Image_URL =
      'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/images%2Fpdf1?alt=media&token=a4853c4c-184d-4ef4-a3da-021a2be47305';
    //var ext = 'pdf';
    var file_ex = 'laravel.pdf';

    const fpath = '${aPath}/${file_ex}';
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: fpath,
      },

      android: {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: aPath + '/' + file_ex,
          description: 'Image',
        },
      },
    });

    if (isIOS) {
      this.setState({loading: true, progress: 0});
      RNFetchBlob.config(configOptions)
        .fetch('GET', Image_URL)
        .then((res) => {
          console.log('file', res);
          this.setState({loading: false});
          RNFetchBlob.ios.previewDocument('file://' + res.path());
        });
      return;
    } else {
      this.setState({loading: true});
      config(configOptions)
        .fetch('GET', Image_URL)
        .progress((received, total) => {
          console.log('progress', received / total);
          this.setState({progress: received / total});
        })
        .then((res) => {
          console.log('file_download', res);
          this.setState({loading: false, progress: 100});
          RNFetchBlob.android.actionViewIntent(res.path());
        })
        .catch((errorMessage) => {
          this.setState({loading: false});
          console.log('error with downloading file', errorMessage);
        });
    }
  }
  render() {
    const resourceType = 'base64';
    //const {itemId} = this.props.route.params;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.Book} onPress={() => this.openPdf()}>
          <Image style={styles.Bookimg} source={this.state.bookimg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.Book}>
          <Image style={styles.Bookimg} source={this.state.bookimg} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  Book: {
    flexDirection: 'row',
    height: 230,
    width: 170,
    position: 'relative',
    marginHorizontal: 4,
    left: 1,
    top: 2,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'pink',
    borderBottomWidth: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  Bookimg: {
    height: 220,
    width: 165,
    position: 'relative',
    left: 0,
    top: 2,
  },
});
