const prisma = require('../models/prisma');

class UserController {
  createUser = async (req, res, next) => {
    try {
      const response = await prisma.user.create({
        data: {
          userFirebaseId: req.body.userFirebaseId,
          email: req.body.email,
          username: req.body.username,
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
      res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };

  checkUserExist = async (req, res, next) => {
    try {
      const response = await prisma.user.findUnique({
        where: {
          userFirebaseId: req.query.userFirebaseId,
        },
      });
      if (response) {
        return res.status(200).json({ message: 'user-found' });
      } else {
        return res.status(200).json({ message: 'user-not-found' });
      }
    } catch (error) {
      return next(error);
    }
  };

  checkUserEmail = async (req, res, next) => {
    try {
      const response = await prisma.user.findUnique({
        where: {
          email: req.query.email,
        },
      });
      if (response) {
        return res.status(200).json({ message: 'email-exist' });
      }
    } catch (error) {
      return next(error);
    }
  };

  editUserProfile = async (req, res, next) => {
    try {
      const response = await prisma.user.update({
        where: {
          userFirebaseId: req.body.userFirebaseId,
        },
        data: {
          fullName: req.body.fullName,
          bio: req.body.bio,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };

  editUserAvatar = async (req, res, next) => {
    try {
      const response = await prisma.user.update({
        where: {
          userFirebaseId: req.body.userFirebaseId,
        },
        data: {
          photoURL: req.body.photoURL,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };

  getAllUser = async (req, res, next) => {
    try {
      const response = await prisma.user.findMany();
      res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new UserController();
