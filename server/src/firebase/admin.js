var firebase = require('firebase-admin');

var serviceAccount = require('D://Cookit-Private-Key/cookit-private-key.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:
    'https://cookit-project-default-rtdb.asia-southeast1.firebasedatabase.app',
});

module.exports = firebase;
