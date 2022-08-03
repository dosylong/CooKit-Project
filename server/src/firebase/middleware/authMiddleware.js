const firebase = require('../admin');

function authMiddleware(req, res, next) {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(401).send({ message: 'no_token_provided' });
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    res.status(401).send({ message: 'invalid_token' });
  }

  const token = headerToken.split(' ')[1];

  firebase
    .auth()
    .verifyIdToken(token)
    .then(() => {
      return next();
    })
    .catch(() => res.status(403).send({ message: 'could_not_authorize' }));
}

module.exports = authMiddleware;
