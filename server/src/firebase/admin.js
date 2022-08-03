var firebase = require('firebase-admin');

var serviceAccount = require('../../cookit-private-key.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

module.exports = firebase;
