// routes/admin.js
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/items', AdminController.getPendingItems);
router.put('/items/:id/approve', authMiddleware, adminMiddleware, AdminController.approveItem);

module.exports = router;
