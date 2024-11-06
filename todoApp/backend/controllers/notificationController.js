const NotificationSettings = require('path_to_model/NotificationSettings');

// Get notification settings
exports.getNotificationSettings = async (req, res) => {
    try {
        const settings = await NotificationSettings.findOne({ where: { userId: req.user.id } });
        if (!settings) {
            return res.status(404).json({ error: 'Settings not found' });
        }
        return res.json(settings);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Update notification settings
exports.updateNotificationSettings = async (req, res) => {
    const { notificationEnabled, reminderTime } = req.body;
    try {
        const settings = await NotificationSettings.findOne({ where: { userId: req.user.id } });
        if (!settings) {
            return res.status(404).json({ error: 'Settings not found' });
        }
        settings.notificationEnabled = notificationEnabled;
        settings.reminderTime = reminderTime;
        await settings.save();
        return res.json(settings);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Create notification settings
exports.createNotificationSettings = async (req, res) => {
    const { notificationEnabled, reminderTime } = req.body;
    try {
        const settings = await NotificationSettings.create({
            userId: req.user.id,
            notificationEnabled,
            reminderTime
        });
        return res.status(201).json(settings);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
