const prisma = require('../models/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthTokenController {
  verifyToken = async (req, res, next) => {
    try {
      const response = await prisma.user.findFirst({});
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new AuthTokenController();
