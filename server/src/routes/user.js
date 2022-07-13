const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

//router GET user/check
router.get('/check', UserController.checkUserExist);

//router GET user/profile
router.get('/profile', UserController.getUserProfile);

//router POST user/create
router.post('/create', UserController.createUser);

//router POST user/edit/profile
router.post('/edit/profile', UserController.editUserProfile);

//router PUT user/edit/avatar
router.put('/edit/avatar', UserController.editUserAvatar);

//router GET user/get/all
router.get('/get/all', UserController.getAllUser);

module.exports = router;
