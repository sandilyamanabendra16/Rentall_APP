// routes/users.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:id', authMiddleware, UserController.getUserProfile);
router.put('/:id', authMiddleware, UserController.updateUserProfile);

module.exports = router;
