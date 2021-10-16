import firebase from 'firebase/app';
// import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const fire = firebase.initializeApp({
    apiKey: "AIzaSyDupi8FxhYlz1P6_vCcybG4IFMqM1WJHVE",
    authDomain: "swen325-assignment2-lrf-app.firebaseapp.com",
    projectId: "swen325-assignment2-lrf-app",
    storageBucket: "swen325-assignment2-lrf-app.appspot.com",
    messagingSenderId: "376249415655",
    appId: "1:376249415655:web:bdf325b5c41a51f69daf42"
});

// export const auth = fire.auth();
export const FirestoreDB = fire.firestore();
export const FirebaseStorage = fire.storage();
export default {
  fire,
};