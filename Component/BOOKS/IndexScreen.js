import * as React from 'react';
import {
  Button,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import firebase from '../../Database/firebaseDB';
import {Books} from '../BOOK/Booklist';
import {catogeryList} from '../BOOK/Catogery';
export default class IndexScreen extends React.Component {
  state = {
    userArr: [],
    uri: null,
    imageuri: null,
    cache: false,
    image: '/Users/gautam/Desktop/ProgrammerPalace/svg/php_emblem.png',
  };
  constructor(props) {
    super(props);
    this.image = '../../svg/php_emblem.png';
  }

  bringItOn = async () => {
    let catogery = [];
    for (let index = 0; index < Books.catogery.length; index++) {
      catogery[index] = Books.catogery[index].catogeryname;
      var fireBaseResponse = firebase.storage().ref(catogery[index]);
      fireBaseResponse.listAll().then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then((url) => {
            console.log(url);
          });
          console.log(itemRef.location.path_);
          return false;
        });
      });
    }
  };
  componentDidMount() {
    const userArr = [];
    var ref = firebase.database().ref('readers/');
    ref.once('value').then((snapshot) => {
      snapshot.forEach((item) => {
        const {title, description, author} = item.val();
        userArr.push({
          title,
          description,
          author,
        });
        return false;
      });
      this.setState({
        userArr,
      });
      console.log(userArr);
    });
  }
  /*componentDidMount() {
    const pdfRef = firebase.storage().ref('images').child('phppdf');

    pdfRef.getDownloadURL().then((url) => {
      console.log(url);
      this.setState({
        uri: url,
      });
    });
    const imageRef = firebase.storage().ref('images').child('image1');
    imageRef.getDownloadURL().then((url) => {
      console.log(url);
      this.setState({
        imageuri: url,
      });
    });
  }*/
  render() {
    return (
      <View>
        <ScrollView>
          {catogeryList.catogery.map((item) => (
            <TouchableOpacity
              style={{flexDirection: 'row', flexWrap: 'wrap'}}
              onPress={async () => {
                //console.log(item.catogeryname);
                await this.props.navigation.navigate('DOWNLOAD', {
                  uri: item.catogeryname,
                  cache: this.state.cache,
                });
              }}>
              <Image source={{uri: item.imageuri}} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button
          title="go to PG"
          onPress={() =>
            this.props.navigation.navigate('Contact', {name: 'abcde'})
          }
        />
        <Button title="firebase" onPress={() => this.bringItOn()} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 10,
  },
});
