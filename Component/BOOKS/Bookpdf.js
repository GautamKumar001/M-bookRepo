import * as React from 'react';
import {Text, View, Image, Dimensions, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class Bookpdf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherParam: this.props.route.params.otherParam,
      userArr: this.props.route.params.userArr,
      itemId: this.props.route.params.itemId,
    };
  }

  render() {
    //const {itemId} = this.props.route.params;

    return (
      <View>
        <Text>itemId: {JSON.stringify(this.state.itemId)}</Text>
        <Text>otherParam: {JSON.stringify(this.state.otherParam)}</Text>
        <Image
          source={require('../../svg/ruby-original.png')}
          style={styles.image}
        />
        <View>
          {this.state.userArr.map((item, i) => (
            <Text key={item.id}>
              {item.id}, {item.author},{item.title},{item.description}
            </Text>
          ))}
        </View>
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
    resizeMode: 'contain',
    margin: 10,
  },
});
