const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
} = require('../Controllers/UserController');
const { protect } = require('../Middleware/Authmiddleware');
const router = express.Router();
router.post('/register', registerUser);

router.post('/login', loginUser);
router.get('/me', protect, getMe);
module.exports = router;
