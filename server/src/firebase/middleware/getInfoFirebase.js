const firebase = require('../admin');

function getInfoFirebase(req, res, next) {
  firebase
    .auth()
    .getUser(req.query.uid)
    .then((userRecord) => {
      res.send(userRecord);
    })
    .then(() => next())
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
}

module.exports = getInfoFirebase;
