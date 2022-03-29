import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCaQuV6-_BwljZuMprJ1ZlMAVuLodrkzTE',
  authDomain: 'cookit-project.firebaseapp.com',
  databaseURL:
    'https://cookit-project-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'cookit-project',
  storageBucket: 'cookit-project.appspot.com',
  messagingSenderId: '366513407772',
  appId: '1:366513407772:web:27766122266377896d9cd9',
  measurementId: 'G-5RG6SZ8XEX',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const auth = firebase.auth();

export { storage, auth, firebase as default };
