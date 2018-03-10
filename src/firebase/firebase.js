import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAGWC7RhHJXf4NYaMHRsMUdC-pfJv6iqEU",
  authDomain: "quick-notes-codefusion.firebaseapp.com",
  databaseURL: "https://quick-notes-codefusion.firebaseio.com",
  projectId: "quick-notes-codefusion",
  storageBucket: "",
  messagingSenderId: "641524305021"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase
  .auth
  .GoogleAuthProvider();

export {firebase, database, googleAuthProvider};