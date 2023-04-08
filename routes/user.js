// File name: routes/user.js
// Author's name: Arvin Almario
// StudentID: 301225269
// Web App name: explorebooking

const express = require('express');
const router = express.Router();
let userController = require('../controllers/user');

// Route for displaying user profile
router.get('/', userController.userProfile);

// Routes for login
router.get('/login', userController.renderLogin);
router.post('/login', userController.processLogin);

// Routes for login
router.get('/signup', userController.renderSignup);
router.post('/signup', userController.processSignup);

// Route for logout
router.get('/logout', userController.logout);

module.exports = router;