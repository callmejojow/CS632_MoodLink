import React, { useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [reminderTime, setReminderTime] = useState('18:00');

  const handleExportData = () => {
    const moodData = localStorage.getItem('moodlink-entries');
    if (moodData) {
      const dataStr = JSON.stringify(JSON.parse(moodData), null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `moodlink-data-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete all your mood data? This action cannot be undone.')) {
      localStorage.removeItem('moodlink-entries');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Settings</h1>
        <p className="text-neutral-600 dark:text-neutral-300">Customize your MoodLink experience</p>
      </div>

      {/* Notifications */}
      <div className="card bg-white dark:bg-neutral-800 border-black dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Daily Mood Reminders</label>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Get reminded to track your mood</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-primary-600' : 'bg-neutral-300 dark:bg-neutral-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {notifications && (
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Reminder Time:</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
              />
            </div>
          )}
        </div>
      </div>

      {/* Appearance */}
      <div className="card bg-white dark:bg-neutral-800 border-black dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Dark Mode</label>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Switch to dark theme</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDarkMode ? 'bg-primary-600' : 'bg-neutral-300 dark:bg-neutral-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="card bg-white dark:bg-neutral-800 border-black dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Export Data</label>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Download your mood data as JSON</p>
            </div>
            <button onClick={handleExportData} className="btn-secondary text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-600">
              Export
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Clear All Data</label>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Permanently delete all mood entries</p>
            </div>
            <button onClick={handleClearData} className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200">
              Clear Data
            </button>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="card bg-white dark:bg-neutral-800 border-black dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Privacy</h3>
        <div className="space-y-3">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Your mood data is stored locally on your device and never shared with third parties.
          </p>
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-secondary-600 dark:text-secondary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Data stored locally on your device</span>
          </div>
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-secondary-600 dark:text-secondary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">No data shared with third parties</span>
          </div>
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-secondary-600 dark:text-secondary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">You control your data completely</span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="card bg-white dark:bg-neutral-800 border-black dark:border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">About MoodLink</h3>
        <div className="space-y-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Version 1.0.0</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            MoodLink is designed to help you track your mental health and wellbeing. 
            Always consult with healthcare professionals for serious mental health concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings; 