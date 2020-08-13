import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyDN3r17cbK_OqNEstUa_MpsFf9MPhG2k54',
  authDomain: 'fireinit-8e811.firebaseapp.com',
  databaseURL: 'https://fireinit-8e811.firebaseio.com',
  projectId: 'fireinit-8e811',
  storageBucket: 'fireinit-8e811.appspot.com',
  messagingSenderId: '325861684691',
  appId: '1:325861684691:web:3f6515954e805c1a112b26',
  measurementId: 'G-L42LVQ3R1K',
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
