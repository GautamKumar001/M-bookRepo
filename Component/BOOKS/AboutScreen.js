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
import Stars from 'react-native-stars';
import {Button} from 'native-base';
import * as Progress from 'react-native-progress';
//import {Surface, Shape} from '@react-native-community/art';
import * as ART from '@react-native-community/art';
//const profileimg = require('../../image/icons8-add-user-male-40.png');
const profileimg = require('../../Figma/coverimg.jpg');
const phoneicon = require('../../svg/glossy-3d-blue-phone-icon.png');
const emailicon = require('../../svg/glossy-3d-blue-orbs2-075-icon.png');
const msgicon = require('../../svg/Messages-icon3.png');
const giticon = require('../../svg/git-icon.png');
const cplusimg = require('../../svg/c++.png');
const mysql = require('../../svg/mysql-logo-organization-database-database-management-system-theory-implementation-line-circle-png-clipart.jpg');
const mongodb = require('../../svg/mongodb-1.png');
const Larvel = require('../../svg/larvel.png');
const reactnative = require('../../svg/Rn1.png');
const network = require('../../svg/networking.png');
const mern = require('../../svg/Unknown.jpg');
const college = require('../../svg/universsity.jpg');
const school = require('../../svg/school.jpg');
const education = require('../../svg/Categories-applications-education-university-icon.png');
const percent = require('../../svg/percentage-icon.png');
const clander = require('../../svg/8f8bd54f4bee44f0422d6816c069c819_blank-transparent-calendar-clipart_300-300.png');
const hindi = require('../../svg/902400-200.png');
const english = require('../../svg/english.png');
const cerificate = require('../../svg/74fcd39be73eb9bbf9f3d4e4dcd8165c.png');
// either import the whole module and call as Communications.method()
import Communications from 'react-native-communications';

export default class TestScreen extends React.Component {
  state = {
    phone: phoneicon,
    email: emailicon,
    message: msgicon,
    git: giticon,
    image: profileimg,
    cplus: cplusimg,
    mysql: mysql,
    mongo: mongodb,
    laravel: Larvel,
    reactnative: reactnative,
    Network: network,
    mern: mern,
    university: college,
    education: education,
    school: school,
    clander: clander,
    percent: percent,
    hindi: hindi,
    english: english,
    cerificate: cerificate,
  };

  render() {
    return (
      <ScrollView>
        <TouchableOpacity style={styles.imgcontainer}>
          <Image
            style={styles.img}
            source={this.state.image}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
        <View style={styles.contact}>
          <TouchableOpacity
            onPress={() => Communications.phonecall('+919123267691', true)}>
            <View style={styles.holder}>
              <Image style={styles.phone} source={this.state.phone} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Communications.email(
                [
                  'mailmekumargautam766@gmail.com',
                  'mailmelearnersociety665@gmail.com',
                ],
                null,
                null,
                'email verification',
                'hello from mailer',
              )
            }>
            <View style={styles.holder}>
              <Image style={styles.mail} source={this.state.email} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Communications.text('+917903911331')}>
            <View style={styles.holder}>
              <Image style={styles.msg} source={this.state.message} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Communications.web('https://github.com/facebook/react-native')
            }>
            <View style={styles.holder}>
              <Image style={styles.git} source={this.state.git} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.skill}>
          <View>
            <Image source={this.state.cplus} style={styles.cplus} />
            <Progress.Bar style={styles.bar} progress={0.5} />
          </View>
          <View>
            <Image source={this.state.mysql} style={styles.mysql} />
            <Progress.Bar style={styles.bar} progress={0.5} />
          </View>
          <View>
            <Image source={this.state.mongo} style={styles.mongo} />
            <Progress.Bar style={styles.bar} progress={0.5} />
          </View>
          <View>
            <Image source={this.state.laravel} style={styles.laravel} />
            <Progress.Bar style={styles.bar} progress={0.5} />
          </View>
          <View>
            <Image source={this.state.reactnative} style={styles.reactnative} />
            <Progress.Bar style={styles.bar} progress={0.5} />
          </View>
          <View>
            <Image source={this.state.mern} style={styles.mern} />
            <Progress.Bar style={styles.bar} progress={0.5} />
          </View>
          <View>
            <Image source={this.state.Network} style={styles.network} />
            <Progress.Bar style={styles.bar} progress={0.5} />
          </View>
        </View>
        <View style={styles.language}>
          <Image style={styles.hindi} source={this.state.hindi} />
          <View style={styles.starhind}>
            <Stars
              default={0}
              update={(val) => {
                this.setState({stars: val});
              }}
              spacing={4}
              starSize={25}
              count={5}
              fullStar={require('../../images/240_F_178939613_sVSxc9vAxesWklgJzCG16a8wgP8rN1o6.jpg')}
              halfStar={require('../../images/starHalf.png')}
              emptyStar={require('../../images/240_F_346530797_v1Hf2ybXGqHuYzMyfiW4XKdxW8jy8Zlt.jpg')}
            />
          </View>
          <Image style={styles.english} source={this.state.english} />
          <View style={styles.stareng}>
            <Stars
              default={0}
              update={(val) => {
                this.setState({stars: val});
              }}
              spacing={4}
              starSize={25}
              count={5}
              fullStar={require('../../images/240_F_178939613_sVSxc9vAxesWklgJzCG16a8wgP8rN1o6.jpg')}
              halfStar={require('../../images/starHalf.png')}
              emptyStar={require('../../images/240_F_346530797_v1Hf2ybXGqHuYzMyfiW4XKdxW8jy8Zlt.jpg')}
            />
          </View>
        </View>
        <View style={styles.education}>
          <Text style={styles.name}>gautam</Text>
          <Text style={styles.objective}>
            As a recent graduate, I am seeking a role which allows me to
            continue learning and perfecting my skills as I provide high-quality
            work, and encourages me to flourish as a fullstack web developer or
            network technician.
          </Text>
        </View>
        <View style={styles.educationlist}>
          <View style={styles.Primary}>
            <Image style={styles.education} source={this.state.education} />
            <Text style={styles.primaryedu}>{'Primery school \n CBSE'}</Text>
            <Image style={styles.school} source={this.state.school} />
            <Text style={styles.primarysch}>{'SVM \n JAMALPUR'}</Text>
            <Image style={styles.clander} source={this.state.clander} />
            <Text style={styles.primarycle}>2006</Text>
            <Image style={styles.percentage} source={this.state.percent} />
            <Text style={styles.primarycent}>55%</Text>
          </View>
          <View style={styles.Secondry}>
            <Image style={styles.education} source={this.state.education} />
            <Text style={styles.primaryedu}>{'Primery school \n CBSE'}</Text>
            <Image style={styles.school} source={this.state.school} />
            <Text style={styles.primarysch}>{'SVM \n JAMALPUR'}</Text>
            <Image style={styles.clander} source={this.state.clander} />
            <Text style={styles.primarycle}>2008-2010</Text>
            <Image style={styles.percentage} source={this.state.percent} />
            <Text style={styles.primarycent}>55%</Text>
          </View>
          <View style={styles.Dropout}>
            <Image style={styles.education} source={this.state.education} />
            <Text style={styles.primaryedu}>{'Primery school \n CBSE'}</Text>
            <Image style={styles.school} source={this.state.university} />
            <Text style={styles.primaryuni}>metric fail</Text>
            <Image style={styles.clander} source={this.state.clander} />
            <Text style={styles.primarycle}>2010-2014</Text>
            <Image style={styles.percentage} source={this.state.percent} />
            <Text style={styles.primarycent}>55%</Text>
          </View>
          <View style={styles.Graduate}>
            <Image style={styles.education} source={this.state.education} />
            <Text style={styles.primaryedu}>{'Primery school \n CBSE'}</Text>
            <Image style={styles.school} source={this.state.university} />
            <Text style={styles.primaryuni}>metric fail</Text>
            <Image style={styles.clander} source={this.state.clander} />
            <Text style={styles.primarycle}>2017-2020</Text>
            <Image style={styles.percentage} source={this.state.percent} />
            <Text style={styles.primarycent}>55%</Text>
          </View>
        </View>
        <View style={styles.cerificate}>
          <Image source={this.state.cerificate} style={styles.cerificateimg}/>
          <Text style={styles.cerificatetext}>{`C and C++ \n niit`}</Text>
        </View>
        <View style={styles.projects}>
          <Text>projects</Text>
          <TouchableOpacity
            onPress={() =>
              Communications.web('https://github.com/GautamKumar001/VirtualClassRoom')
            }>
            <View style={styles.holder}>
              <Image style={styles.git} source={this.state.git} />
            </View>
          </TouchableOpacity>
          <Text>project2</Text>
          <TouchableOpacity
            onPress={() =>
              Communications.web('https://github.com/facebook/react-native')
            }>
            <View style={styles.holder}>
              <Image style={styles.git} source={this.state.git} />
            </View>
          </TouchableOpacity>
          <Text>project3</Text>
          <TouchableOpacity
            onPress={() =>
              Communications.web('https://github.com/facebook/react-native')
            }>
            <View style={styles.holder}>
              <Image style={styles.git} source={this.state.git} />
            </View>
          </TouchableOpacity>
          <Text>project4</Text>
          <TouchableOpacity
            onPress={() =>
              Communications.web('https://github.com/facebook/react-native')
            }>
            <View style={styles.holder}>
              <Image style={styles.git} source={this.state.git} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.work}>
          <Text>0-6 years</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgcontainer: {
    position: 'relative',
    height: 100,
    width: 100,
    borderRadius: 150,
  },
  img: {
    position: 'relative',
    height: 120,
    width: 100,
    borderRadius: 150,
  },
  contact: {
    position: 'relative',
    height: 300,
    width: 160,
    backgroundColor: '#f5f5dc',
    top: 25,
  },
  skill: {
    position: 'relative',
    height: 650,
    width: 160,
    top: 20,
    backgroundColor: '#f0f8ff',
  },
  bar: {
    position: 'relative',
    height: 8,
    top: 5,
    width: 154,
  },
  pie: {
    position: 'relative',
    top: 50,
  },
  starhind: {
    position: 'relative',
    top: 10,
  },
  stareng: {
    position: 'relative',
    top: 80,
  },
  language: {
    position: 'relative',
    height: 400,
    width: 160,
    top: 20,
    backgroundColor:'#fffafa'
  },
  hindi: {
    position: 'relative',
    height: 140,
    width: 140,
    top: 0,
  },
  english: {
    position: 'relative',
    height: 80,
    width: 60,
    top: 20,
  },
  name: {
    position: 'relative',
    fontStyle: 'italic',
    fontWeight: 'bold',
    left: 100,
    top: -1200,
  },
  objective: {
    position: 'relative',
    height: 100,
    width:269,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
    left: 103,
    top: -1460,
    backgroundColor: '#f0ffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  educationlist: {
    position: 'relative',
    height: 1000,
    width: 215,
    left: 160,
    top: -1350,
    backgroundColor: '#f0ffff',
  },
  Primary:{
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  Secondry:{
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  Dropout:{
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },Graduate:{
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  education: {
    position: 'relative',
    width: 30,
    height: 30,
    left: 0,
    top: 5,
  },
  university: {
    position: 'relative',
    width: 30,
    height: 30,
    left: 0,
    top: -10,
  },
  school: {
    position: 'relative',
    width: 30,
    height: 30,
    left: 0,
    top: 0,
  },
  clander: {
    position: 'relative',
    width: 30,
    height: 30,
    marginTop: -20,
    left: 0,
  },
  percentage: {
    position: 'relative',
    width: 30,
    height: 30,
    left: 0,
    top: -10,
  },
  primaryedu: {
    width: 205,
    textAlign: 'center',
    left: 0,
    top: -19,
    position: 'relative',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  primarysch: {
    width: 205,
    textAlign: 'center',
    left: 0,
    top: -30,
    position: 'relative',
    height: 50,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
  },
  primaryuni: {
    width: 205,
    textAlign: 'center',
    left: 0,
    top: -30,
    position: 'relative',
    height: 50,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
  },
  primarycle: {
    width: 205,
    textAlign: 'center',
    left: 0,
    top: -25,
    position: 'relative',
    height: 35,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
  },
  primarycent: {
    width: 205,
    textAlign: 'center',
    left: 0,
    top: -30,
    position: 'relative',
    height: 35,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
  },
  secoundry: {
    position: 'relative',
    width: 205,
    textAlign: 'center',
    left: 0,
    top: -20,
    position: 'relative',
    height: 45,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'pink',
    borderBottomWidth: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  Drop: {
    position: 'relative',
    width: 205,
    textAlign: 'center',
    left: 0,
    top: 5,
    position: 'relative',
    height: 45,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'pink',
    borderBottomWidth: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  gradute: {
    position: 'relative',
    width: 205,
    textAlign: 'center',
    left: 0,
    top: -20,
    position: 'relative',
    height: 45,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'pink',
    borderBottomWidth: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  cerificate: {
    position: 'relative',
    height: 200,
    width: 215,
    left: 160,
    top: -1350,
    backgroundColor:"#faebd7"
  },
  cerificatetext:{
    position: 'relative',
    height: 100,
    width: 215,
    left:0,
    top: -20,
    fontStyle:"italic",
    fontWeight:'bold',
    textAlign:'center',
    textTransform: 'uppercase',
  },
  cerificateimg:{
    position: 'relative',
    height: 45,
    width: 45,
    left: 0,
    top: 10,
  },
  projects: {
    position: 'relative',
    height: 200,
    width: 215,
    left: 160,
    top: -1400,
    backgroundColor:"#f5fffa",
  },
  work: {
    position: 'relative',
    height: 100,
    width: 215,
    left: 160,
    top: -1400,
    backgroundColor:"#ffe4e1",
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
  holder: {
    position: 'relative',
    justifyContent: 'center',
  },
  mail: {
    position: 'relative',
    width: 80,
    height: 80,
    left: 35,
    top: -20,
  },
  msg: {
    position: 'relative',
    width: 60,
    height: 60,
    left: 47,
    top: -15,
  },
  phone: {
    position: 'relative',
    width: 80,
    height: 80,
    top: -10,
    left: 35,
  },
  git: {
    position: 'relative',
    width: 70,
    height: 70,
    left: 45,
  },
  cplus: {
    position: 'relative',
    width: 70,
    height: 70,
    left: 45,
  },
  mysql: {position: 'relative', width: 90, height: 80, left: 45, marginTop: 15},
  mongo: {position: 'relative', width: 90, height: 80, left: 45, marginTop: 15},
  laravel: {
    position: 'relative',
    width: 140,
    height: 60,
    left: 5,
    marginTop: 15,
  },
  reactnative: {
    position: 'relative',
    width: 120,
    height: 70,
    left: 15,
    marginTop: 15,
  },
  network: {
    position: 'relative',
    width: 120,
    height: 70,
    left: 15,
    marginTop: 15,
  },
  mern: {
    position: 'relative',
    width: 120,
    height: 50,
    left: 15,
    marginTop: 15,
  },
});
