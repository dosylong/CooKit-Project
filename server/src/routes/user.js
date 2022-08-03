const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../firebase/middleware/authMiddleware');
const getInfoFirebase = require('../firebase/middleware/getInfoFirebase');

//router POST user/edit/profile
router.post('/edit/profile', authMiddleware, UserController.editUserProfile);

//router PUT user/edit/avatar
router.put('/edit/avatar', authMiddleware, UserController.editUserAvatar);

//router GET user/get/all
router.get('/get/all', authMiddleware, UserController.getAllUser);

//router GET user/check
router.get('/check', authMiddleware, UserController.checkUserExist);

//router GET user/profile
router.get('/profile', authMiddleware, UserController.getUserProfile);

//router POST user/create
router.post('/create', authMiddleware, UserController.createUser);

module.exports = router;
