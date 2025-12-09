const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

router.post('/register', authenticateAdmin, adminController.register); // Only existing admins can register
router.post('/login', adminController.login);
router.get('/profile', authenticateAdmin, adminController.getProfile);

module.exports = router;

