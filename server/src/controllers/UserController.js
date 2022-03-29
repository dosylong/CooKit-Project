const prisma = require('../models/prisma');

class UserController {
  createUser = async (req, res, next) => {
    try {
      //Check email is exist or not
      // const emailExist = await prisma.user.findUnique({
      //   where: {
      //     email: req.body.email,
      //   },
      // });

      // if (emailExist) {
      //   return res.status(400).json({ message: 'Email already exist' });
      // }

      const response = await prisma.user.create({
        data: {
          userFirebaseId: req.body.userFirebaseId,
          email: req.body.email,
          fullName: req.body.fullName,
          bio: req.body.bio,
        },
      });

      res.status(201).json(response);
    } catch (error) {
      return next(error);
    }
  };

  getUserProfile = async (req, res, next) => {
    try {
      const response = await prisma.user.findUnique({
        where: {
          userFirebaseId: req.query.userFirebaseId,
        },
      });
      if (!response) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new UserController();
