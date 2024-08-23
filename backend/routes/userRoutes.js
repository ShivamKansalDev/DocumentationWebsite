const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

// Define user-related routes
router.post('/create-user', UserController.createUser);
router.get('/get-all-users', UserController.getAllUsers);

module.exports = router;
