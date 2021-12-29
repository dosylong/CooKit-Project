const prisma = require('../models/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  register = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const response = await prisma.user.create({
        data: {
          username: username,
          password: bcrypt.hashSync(password, 10),
        },
      });
      res.status(201).json(response);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new UserController();
