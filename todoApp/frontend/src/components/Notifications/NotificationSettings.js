import React, { useState, useEffect } from 'react';
import './NotificationSettings.css';
import axios from 'axios';

const NotificationSettings = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState(30);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('https://todoapp-backend.cloud-stacks.com/api/notifications/settings', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setNotificationEnabled(response.data.notificationEnabled);
        setReminderTime(response.data.reminderTime);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const handleReminderTimeChange = (event) => {
    setReminderTime(event.target.value);
  };

  const handleSaveSettings = async () => {
    try {
      await axios.put('https://todoapp-backend.cloud-stacks.com/api/notifications/settings', {
        notificationEnabled,
        reminderTime,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings. Please try again later.');
    }
  };

  return (
    <div className="notification-settings">
      <h2>Notification Settings</h2>
      <div className="settings-section">
        <label>
          <input 
            type="checkbox" 
            checked={notificationEnabled} 
            onChange={handleNotificationToggle} 
          />
          Enable Notifications
        </label>
      </div>
      <div className="settings-section">
        <label>
          Reminder Time Before Due Date:
          <select 
            value={reminderTime} 
            onChange={handleReminderTimeChange}
          >
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={1440}>1 day</option>
          </select>
        </label>
      </div>
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default NotificationSettings;
