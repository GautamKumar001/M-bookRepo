import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import RNFS from 'react-native-fs';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../Database/firebaseDB';
import {Books} from '../BOOK/Booklist';
import Stars from 'react-native-stars';
import {catogeryList} from '../BOOK/Catogery';
import update from 'immutability-helper';
import {Button} from 'native-base';
export default class DownloadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false,
    };
    this.favb = 0;
    //this.onDownloadImagePress = this.onDownloadImagePress.bind(this);
    this.state = {
      uri: this.props.route.params.uri,
      imageuri: this.props.route.params.imageuri,
      cache: this.props.route.params.cache,
      loading: false,
      email: 'mail@gmail.com',
      book: 'book name',
      fav: 0,
    };
    console.log('image:=>' + this.props.route.params.imageuri);
    console.log('pdf:=>' + this.props.route.params.uri);
    console.log(this.props.route.params.cache);
    console.log(this.state.fav);
    this.state = {
      starCount: 3.5,
    };
    this.catogery = [];
    this.state = {
      stars: null,
    };
    this.state = {
      catogerylists: [{bookimg: 'ffgsdtgts', bookpdf: ''}],
    };
    this.state = {
      catogerylist: [],
    };
    this.urlList = [];
    this.state.urlList = ['image', 'pdf', 'pdf', 'image'];
    this.urlArray = [];
    this.arr = [
      {
        image: '',
        pdf: '',
      },
    ];
    this.targetObject = {};
  }
  componentDidMount() {
    let catogery = [];
    let catogerys = this.props.route.params.uri;
    console.log('catogerys:-' + catogerys);
    for (let index = 0; index < Books.catogery.length; index++) {
      catogery[index] = Books.catogery[index].catogeryname;
      console.log('catogery:-' + catogery[index]);
      if (catogery[index] === catogerys) {
        console.log('catogery2:-' + catogery[index]);
        //catogery[index] = Books.catogery[index].catogeryname;
        for (
          let indexs = 0;
          indexs < Books.catogery[index].bookpdf.length;
          indexs++
        ) {
          var storageref = firebase.storage().ref(catogerys + indexs);
          storageref.listAll().then((res) => {
            res.items.forEach((itemRef) => {
              console.log(itemRef.fullPath);
              itemRef.getDownloadURL().then((url) => {
                console.log(url);
                this.urlArray.push(url);
                this.arr.map((item) => {
                  item.image = url;
                  item.pdf = url;
                });
              });
              return false;
            });
          });
        }
      }
    }
  }
  stateDisplay = () => {
    /* for (let i = 0; i < this.urlArray.length; i++) {
      console.log('aarray:=>' + this.urlArray[i]);
      this.urlList.map((item) => {
        item.image = this.urlArray[i];
        item.pdf = this.urlArray[i];
      });
    }*/
    for (var iloop = 0; iloop < this.arr.length; iloop++) {
      //get the keys in your object
      var objectKeys = Object.keys(this.arr[iloop]);

      //loop over the keys of the object
      for (var jloop = 0; jloop < objectKeys.length; jloop++) {
        //if the key is present in your target object push in the array
        if (this.targetObject[objectKeys[jloop]]) {
          this.targetObject[objectKeys[jloop]].push(
            this.arr[iloop][objectKeys[jloop]],
          );
        } else {
          // else create a array and push inside the value
          this.targetObject[objectKeys[jloop]] = [];
          this.targetObject[objectKeys[jloop]].push(
            this.arr[iloop][objectKeys[jloop]],
          );
        }
      }
    }
    this.state.urlList.map((item) => {
      console.log('item' + item);
    });
    let subcat = ['image', 'pdf', 'image', 'pdf'];
    /*for (let index = 0; index < 2; index++) {
      Array.from(this.urlArray, (val) => subcat[index] + ':' + val);
    }*/
    let index = 0;
    let indexs = 0;
    for (var i = 0, n = this.urlArray.length; i < n; i++) {
      for (let j = 0; j < n / 2; j++) {
        this.urlArray[i] =
          '{' +
          'php' +
          index +
          ':' +
          '{' +
          subcat[j] +
          ':' +
          this.urlArray[i] +
          '}' +
          '}';
      }
      indexs = 0;
      index++;
    }
    //var newTest = Array.from(this.urlArray, (val) => subcat[0] + ':' + val);
    this.urlArray.map((item) => {
      console.log(item);
    });
    /*let maincat = 'php';
    for (var i = 0, n = this.urlArray.length; i < n; i++) {
      this.urlArray[i] = maincat + i + ':' + this.urlArray[i];
    }*/
    /*this.urlArray.map((item) => {
      console.log(item);
    });*/
    //console.log(newTest);
    this.arr.map((item) => {
      console.log(item);
    });
    console.log(this.targetObject);

    this.state.catogerylist.map((item) => {
      console.log(item);
    });
  };
  handleChange = (obj) => (e) => {
    let x = this.state[obj];
    x[e.target.name] = e.target.value;
    this.setState({[obj]: x});
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  /*onDownloadImagePress() {
    RNFS.downloadFile({
      fromUrl:
        'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/images%2Fimage_002?alt=media&token=105bb729-1396-45a8-a183-d38399cf1598',
      toFile: `${RNFS.DocumentDirectoryPath}/react-native.png`,
    }).promise.then((r) => {
      this.setState({isDone: true});
    });
  }*/

  /*download() {
    var date = new Date();
    var url =
      'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/images%2Fimage_002?alt=media&token=105bb729-1396-45a8-a183-d38399cf1598';
    //var ext = 'pdf';
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2),

        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', url)
      .then((res) => {
        Alert.alert('Success Downloaded');
      });
  }*/

  _download() {
    const {
      dirs: {DownloadDir, DocumentDir},
    } = RNFetchBlob.fs;
    const {config} = RNFetchBlob;
    const isIOS = Platform.OS === 'ios';
    const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});
    var Image_URL =
      'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/c%2B%2B0%2Fpdf?alt=media&token=d619c28a-6da5-4a63-b99d-0085bc9a0c5d';
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
          description: 'PDF',
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
  /*componentDidMount() {
    var fireBaseResponse = firebase.database().ref('favBook');
    fireBaseResponse
      .limitToLast(1)
      .once('child_added')
      .then((snap) => {
        console.log(snap.val().fav);
        this.setState({
          fav: snap.val().fav,
        });
        this.favb = snap.val().fav;
        console.log(this.favb);
        console.log(this.state.fav);
      });
    const fav = this.favb;
  }*/
  addToFav = async () => {
    var fireBaseResponse = firebase.database().ref('favBook');
    fireBaseResponse
      .limitToLast(1)
      .once('child_added')
      .then((snap) => {
        console.log(snap.val().fav);
        this.setState({
          fav: snap.val().fav,
        });
        this.favb = snap.val().fav;
        console.log(this.favb);
        console.log(this.state.fav);
      });
    const fav = this.favb;
    //const fav = this.favb;
    const user = firebase.auth().currentUser;
    //console.log(this.favb);
    if (user) {
      console.log('User email: ', user.email);
      const favbook = firebase
        .database()
        .ref('favBook/')
        .push({
          email: user.email,
          book: 'react nativ bool2',
          fav: fav + 1,
        })
        .then(() => {
          console.log('success');
        });
    }
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            color="#bc2b78"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      );
    }
    const {catogerylist} = this.state;
    return (
      <ScrollView>
        {this.state.urlList.map((lang) => (
          <View style={styles.container}>
            <View style={styles.Book}>
              <Image
                source={{
                  uri:
                    ' https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/php0%2Fimage?alt=media&token=6e965f87-5c3f-4bba-ab6b-9ef0dc0c586b',
                }}
                style={styles.Bookimg}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.infotext}>{this.state.uri}</Text>
              <Text style={styles.infotext}>{this.state.imageuri}</Text>
            </View>
            <TouchableOpacity
              style={styles.download}
              onPress={() => this._download()}>
              <Image
                source={require('../../images/student.png')}
                style={styles.downloadT}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fav}
              onPress={() => this.addToFav()}>
              <Image
                source={require('../../images/book.png')}
                style={styles.downloadT}
              />
              <Text style={styles.favcount}>{this.state.fav}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.read}
              onPress={async () => {
                await this.props.navigation.navigate('PDF', {
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/c%2B%2B1%2Fpdf?alt=media&token=fffebea9-fd0a-4637-b0cc-2542a7e546d1',
                  cache: this.props.route.params.cache,
                });
              }}>
              <Image
                source={require('../../images/reading-2.png')}
                style={styles.downloadT}
              />
            </TouchableOpacity>
            <View style={styles.star}>
              <Stars
                default={0}
                update={(val) => {
                  this.setState({stars: val});
                }}
                spacing={4}
                starSize={35}
                count={5}
                fullStar={require('../../images/240_F_178939613_sVSxc9vAxesWklgJzCG16a8wgP8rN1o6.jpg')}
                halfStar={require('../../images/starHalf.png')}
                emptyStar={require('../../images/240_F_346530797_v1Hf2ybXGqHuYzMyfiW4XKdxW8jy8Zlt.jpg')}
              />
            </View>
          </View>
        ))}
        <Button tittle="state" onPress={() => this.stateDisplay()} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
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
  info: {
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    left: 180,
  },
  infotext: {
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'normal',
  },
  download: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
    width: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    left: 230,
    top: -105,
  },
  downloadT: {
    height: 50,
    width: 55,
  },
  read: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
    width: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    left: 160,
    top: -185,
  },
  fav: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
    width: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    left: 300,
    top: -135,
  },
  star: {
    alignItems: 'center',
    position: 'relative',
    height: 10,
    left: 65,
    top: -170,
  },
  favcount: {
    position: 'relative',
    backgroundColor: '#ffff',
    textAlign: 'center',
    fontWeight: 'bold',
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: '#f0f',
    borderRadius: 10,
    top: -50,
    left: 20,
  },
});
