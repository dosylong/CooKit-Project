const UserController = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

//router GET user/profile
router.get('/profile', UserController.getUserProfile);

//router POST user/create
router.post('/create', UserController.createUser);

module.exports = router;
