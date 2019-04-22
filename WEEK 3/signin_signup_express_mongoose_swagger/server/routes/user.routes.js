const express = require('express');
const router = express.Router(); // SETUP ROUTER OBJECT
var userController = require('../controllers/user.controller');

//POST TO DATABASE USERNAME AND PASSWORD
router.post('/signin', userController.signin);

//GET FROM DATABASE
router.get('/1', userController.getUsers);

//ADD TO DATABASE THE USER JSON OBJECT
router.post('/signup', userController.signup);

module.exports = router;