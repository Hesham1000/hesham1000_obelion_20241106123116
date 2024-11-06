const express = require('express');
const { getNotificationSettings, updateNotificationSettings, createNotificationSettings } = require('../controllers/notificationController');
const router = express.Router();

// Get notification settings
router.get('/settings', getNotificationSettings);

// Create notification settings
router.post('/settings', createNotificationSettings);

// Update notification settings
router.put('/settings', updateNotificationSettings);

module.exports = router;
