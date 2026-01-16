const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {registerUser, loginUser, getUsers, getCurrentUser, updateUserProfile} = require('../controllers/authController');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/posts', protect);
router.get('/users', getUsers);
router.get('/me', protect, getCurrentUser);
router.patch('/me', protect, updateUserProfile);

module.exports = router