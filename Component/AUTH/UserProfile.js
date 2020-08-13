import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
const profile = require('../../Figma/coverimg.jpg');
const cover = require('../../Figma/profile.jpg');
const bookpdf = require('../../images/bookcplusplus.png');
export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverimg: cover,
      profileimg: profile,
      bookimg: bookpdf,
      books: [
        'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/c%2B%2B1%2Fimage?alt=media&token=6fcbda98-36f4-48ff-92c4-e1da85fe276d',

        'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/c%2B%2B1%2Fpdf?alt=media&token=fffebea9-fd0a-4637-b0cc-2542a7e546d1',
      ],
      book: [
        {
          img: bookpdf,

          pdf:
            'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/c%2B%2B1%2Fpdf?alt=media&token=fffebea9-fd0a-4637-b0cc-2542a7e546d1',
        },
      ],
    };
  }
  openPdf = () => {
    this.props.navigation.navigate('PDF', {
      uri:
        'https://firebasestorage.googleapis.com/v0/b/fireinit-8e811.appspot.com/o/c%2B%2B1%2Fpdf?alt=media&token=fffebea9-fd0a-4637-b0cc-2542a7e546d1',
      cache: false,
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={Styles.cover}>
          <Image
            source={this.state.coverimg}
            resizeMode={'cover'}
            style={Styles.coverimg}
          />
        </View>
        <View style={Styles.profile}>
          <Image
            source={this.state.profileimg}
            resizeMode={'cover'}
            style={Styles.proimg}
          />
        </View>
        <View style={Styles.favbook}>
          <TouchableOpacity style={Styles.Book} onPress={() => this.openPdf()}>
            <Image source={this.state.bookimg} style={Styles.Bookimg}/>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.Book} onPress={() => this.openPdf()}>
            <Image source={this.state.bookimg} style={Styles.Bookimg}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    position: 'relative',
    height: 300,
    width: '100%',
  },
  profile: {
    position: 'relative',
    height: 150,
    width: 150,
    top: -130,
    left: 108,
  },
  proimg: {
    position: 'relative',
    height: 150,
    width: 150,
    borderRadius: 150,
    zIndex: 0.5,
  },
  coverimg: {
    position: 'relative',
    height: 320,
    width: '100%',
  },
  favbook: {
    //position: 'relative',
    flexDirection: 'row',
    width: '100%',
    top: -130,
  },
  Book: {
    height: 230,
    width: 170,
    position: 'relative',
    marginHorizontal: 4,
    left: 2,
    top: 2,
    borderWidth: 2,
    elevation: 15,
    borderRadius: 2,
    borderColor: 'pink',
    borderBottomWidth: 5,
  },
  Bookimg: {
    height: 220,
    width: 165,
    position: 'relative',
    left: 0,
    top: 2,
  },
});
