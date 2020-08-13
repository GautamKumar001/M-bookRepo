import * as React from 'react';
import {
  View,
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
        };
      }
      onLeadingNavButtonPressed = () => {
        console.log('leading nav button pressed');
        if (Platform.OS === 'ios') {
          Alert.alert(
            'App',
            'onLeadingNavButtonPressed',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: true},
          );
        } else {
          BackHandler.exitApp();
        }
      };
    
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
      /*_download() {
        const {
          dirs: {DownloadDir, DocumentDir},
        } = RNFetchBlob.fs;
        const {config} = RNFetchBlob;
        const isIOS = Platform.OS === 'ios';
        const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});
        var Image_URL =
          //' https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/php0%2Fpdf?alt=media&token=af688285-6da8-4b84-9539-81366425dc2d';
          'file:///Users/gautam/Desktop/ProgrammerPalace/svg/thereactnativebook-sample.pdf';
        //'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/images%2Fpdf1?alt=media&token=a4853c4c-184d-4ef4-a3da-021a2be47305';
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
      }*/
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
      async componentDidMount() {
        /*RNFS.readFile(this.state.imagePath, 'base64').then((res) => {
          console.log(res);
        });*/
        var data = await RNFS.readFile(
          'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/php1%2Fpdf?alt=media&token=a028e482-815d-4231-b794-cc0b19aacb1b',
          'base64',
        ).then((res) => {
          console.log(res);
        });
      }
      render() {
        const resourceType = 'base64';
        //const {itemId} = this.props.route.params;
        return (
          <View style={{flex: 1}}>
            {/* Some Controls to change PDF resource */}
            <PDFView
              fadeInDuration={250.0}
              style={{flex: 1}}
              resource={resources[resourceType]}
              resourceType={resourceType}
              onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
              onError={() => console.log('Cannot render PDF', error)}
            />
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        height: 200,
        width: 140,
        borderWidth: 5,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 5,
        shadowColor: '#000',
        shadowOffset: {width: 6, height: 6},
        shadowOpacity: 1.9,
        shadowRadius: 3,
        elevation: 1,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 10,
      },
      Book: {
        height: 200,
        width: 140,
        position: 'relative',
        left: 0,
        top: -5,
        borderWidth: 2,
        elevation: 5,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 2,
        shadowColor: '#fff',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      Bookimg: {
        height: 193,
        width: 135,
        position: 'relative',
        left: 0,
        top: 2,
      },
    });